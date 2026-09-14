import { spawn, spawnSync } from "node:child_process";
import { randomInt } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = process.env.AUDIT_URL ?? "http://127.0.0.1:4173/";
const DEBUG_PORT = randomInt(12000, 18000);
const WIDTHS = [320, 375, 425, 768, 1024, 1440];
const outputDirectory = resolve(".artifacts/ui-audit");
const profileDirectory = join(tmpdir(), `wakefulness-edge-${Date.now()}`);

mkdirSync(outputDirectory, { recursive: true });

const edge = spawn(
  EDGE,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profileDirectory}`,
    "--window-size=1440,1000",
    BASE_URL,
  ],
  { stdio: "ignore", windowsHide: true },
);

const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

async function getPageTarget() {
  for (let attempt = 0; attempt < 150; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === "page");
      if (page) return page;
    } catch {
      // Edge may still be starting.
    }
    await delay(100);
  }
  throw new Error("Could not connect to the Edge debugging target.");
}

class DevToolsClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    await new Promise((resolveConnection, rejectConnection) => {
      this.socket.addEventListener("open", resolveConnection, { once: true });
      this.socket.addEventListener("error", rejectConnection, { once: true });
    });

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }

      const listeners = this.listeners.get(message.method) ?? [];
      listeners.forEach((listener) => listener(message.params));
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolveMessage, rejectMessage) => {
      this.pending.set(id, { resolve: resolveMessage, reject: rejectMessage });
    });
  }

  once(method, timeout = 10000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const listener = (params) => {
        clearTimeout(timer);
        const current = this.listeners.get(method) ?? [];
        this.listeners.set(method, current.filter((item) => item !== listener));
        resolveEvent(params);
      };
      const current = this.listeners.get(method) ?? [];
      this.listeners.set(method, [...current, listener]);
      const timer = setTimeout(() => rejectEvent(new Error(`Timed out waiting for ${method}`)), timeout);
    });
  }

  close() {
    this.socket.close();
  }
}

const auditExpression = `(() => {
  const viewportWidth = document.documentElement.clientWidth;
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
  };
  const label = (element) => {
    const id = element.id ? '#' + element.id : '';
    const classes = typeof element.className === 'string'
      ? '.' + element.className.trim().split(/\\s+/).slice(0, 2).join('.')
      : '';
    return (element.tagName.toLowerCase() + id + classes).slice(0, 140);
  };
  const overflowElements = [...document.body.querySelectorAll('*')]
    .filter((element) => visible(element) && !element.closest('svg'))
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => rect.right > viewportWidth + 1 || rect.left < -1)
    .slice(0, 30)
    .map(({ element, rect }) => ({
      element: label(element),
      left: Math.round(rect.left * 10) / 10,
      right: Math.round(rect.right * 10) / 10,
      width: Math.round(rect.width * 10) / 10,
    }));
  const internalLinks = [...document.querySelectorAll('a[href^="#"]')];
  const brokenInternalLinks = internalLinks
    .map((link) => link.getAttribute('href'))
    .filter((href) => href && href !== '#' && !document.querySelector(href));
  const controlsWithoutLabels = [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')]
    .filter((control) => !control.labels?.length && !control.getAttribute('aria-label'))
    .map(label);
  const imagesWithoutAlt = [...document.images]
    .filter((image) => !image.hasAttribute('alt'))
    .map(label);
  const smallTargets = [...document.querySelectorAll('a, button, input, select, textarea')]
    .filter(visible)
    .map((element) => ({ element: label(element), rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => rect.width < 24 || rect.height < 24)
    .slice(0, 30)
    .map(({ element, rect }) => ({ element, width: Math.round(rect.width), height: Math.round(rect.height) }));
  const headings = [...document.querySelectorAll('h1, h2, h3')].map((heading) => ({
    level: Number(heading.tagName.slice(1)),
    text: heading.textContent.trim().slice(0, 120),
  }));
  return {
    lang: document.documentElement.lang,
    title: document.title,
    viewportWidth,
    pageHeight: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth,
    h1Count: document.querySelectorAll('h1').length,
    headings,
    overflowElements,
    brokenInternalLinks: [...new Set(brokenInternalLinks)],
    controlsWithoutLabels,
    imagesWithoutAlt,
    smallTargets,
  };
})()`;

const vitalsExpression = `(async () => {
  let largestContentfulPaint = 0;
  let cumulativeLayoutShift = 0;
  const observers = [];

  if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const latest = entries[entries.length - 1];
      if (latest) largestContentfulPaint = latest.startTime;
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.push(lcpObserver);
  }

  if (PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) cumulativeLayoutShift += entry.value;
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    observers.push(clsObserver);
  }

  await new Promise((resolveVitals) => setTimeout(resolveVitals, 150));
  observers.forEach((observer) => observer.disconnect());

  const navigation = performance.getEntriesByType('navigation')[0];
  const paints = Object.fromEntries(
    performance.getEntriesByType('paint').map((entry) => [entry.name, entry.startTime]),
  );
  const resources = performance.getEntriesByType('resource');
  const transferFor = (type) => resources
    .filter((entry) => entry.initiatorType === type)
    .reduce((total, entry) => total + entry.transferSize, 0);

  return {
    firstContentfulPaintMs: Math.round((paints['first-contentful-paint'] ?? 0) * 10) / 10,
    largestContentfulPaintMs: Math.round(largestContentfulPaint * 10) / 10,
    cumulativeLayoutShift: Math.round(cumulativeLayoutShift * 10000) / 10000,
    domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd * 10) / 10,
    loadMs: Math.round(navigation.loadEventEnd * 10) / 10,
    totalTransferBytes: navigation.transferSize + resources.reduce((total, entry) => total + entry.transferSize, 0),
    scriptTransferBytes: transferFor('script'),
        cssTransferBytes: transferFor('link'),
    imageTransferBytes: transferFor('img'),
    inpMs: null,
    inpNote: 'INP requires a representative user interaction and is not reported from this navigation-only lab run.',
  };
})()`;

async function run() {
  const target = await getPageTarget();
  const client = new DevToolsClient(target.webSocketDebuggerUrl);
  await client.connect();
  await Promise.all([
    client.send("Page.enable"),
    client.send("Runtime.enable"),
    client.send("Log.enable"),
    client.send("Network.enable"),
  ]);
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });

  let currentConsoleErrors = [];
  client.listeners.set("Runtime.exceptionThrown", [
    (params) => currentConsoleErrors.push(params.exceptionDetails.text),
  ]);
  client.listeners.set("Runtime.consoleAPICalled", [
    (params) => {
      if (params.type === "error") {
        currentConsoleErrors.push(params.args.map((item) => item.value ?? item.description).join(" "));
      }
    },
  ]);
  client.listeners.set("Log.entryAdded", [
    (params) => {
      if (params.entry.level === "error") currentConsoleErrors.push(params.entry.text);
    },
  ]);

  const results = [];
  for (const width of WIDTHS) {
    currentConsoleErrors = [];
    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    const loaded = client.once("Page.loadEventFired");
    await client.send("Page.navigate", { url: BASE_URL });
    await loaded;
    await delay(500);

    const evaluation = await client.send("Runtime.evaluate", {
      expression: auditExpression,
      returnByValue: true,
    });
    const vitalsEvaluation = await client.send("Runtime.evaluate", {
      expression: vitalsExpression,
      awaitPromise: true,
      returnByValue: true,
    });
    const metrics = await client.send("Page.getLayoutMetrics");
    const content = metrics.cssContentSize ?? metrics.contentSize;
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width: Math.ceil(content.width),
        height: Math.ceil(content.height),
        scale: 1,
      },
    });
    writeFileSync(join(outputDirectory, `${width}.png`), Buffer.from(screenshot.data, "base64"));

    const captureSections = width === 375 || width === 1440
      ? ["top", "services", "us", "why", "process", "projects", "capabilities", "contact"]
      : ["top"];
    for (const sectionId of captureSections) {
        await client.send("Runtime.evaluate", {
          expression: `(() => {
            document.documentElement.style.scrollBehavior = 'auto';
            const section = document.getElementById(${JSON.stringify(sectionId)});
            if (section) window.scrollTo(0, Math.max(0, section.offsetTop - 96));
          })()`,
        });
        await delay(120);
        const viewportScreenshot = await client.send("Page.captureScreenshot", {
          format: "png",
          fromSurface: true,
        });
        writeFileSync(
          join(outputDirectory, `${width}-${sectionId}.png`),
          Buffer.from(viewportScreenshot.data, "base64"),
        );
    }

    let interactiveChecks = null;
    if (width === 375) {
      await client.send("Runtime.evaluate", {
        expression: `document.querySelector('button[aria-controls="primary-mobile-menu"]')?.click()`,
      });
      await delay(200);
      const menuOpen = await client.send("Runtime.evaluate", {
        expression: `(() => ({
          dialogOpen: Boolean(document.getElementById('primary-mobile-menu')),
          bodyOverflow: document.body.style.overflow,
          focusedHref: document.activeElement?.getAttribute('href'),
        }))()`,
        returnByValue: true,
      });
      const menuScreenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
      });
      writeFileSync(join(outputDirectory, "375-menu.png"), Buffer.from(menuScreenshot.data, "base64"));
      const preferences = await client.send("Runtime.evaluate", {
        expression: `(() => {
          const visible = (element) => Boolean(element.offsetWidth || element.offsetHeight);
          const english = [...document.querySelectorAll('button')].find((button) => visible(button) && button.textContent.trim() === 'EN');
          english?.click();
          const theme = [...document.querySelectorAll('input[type="checkbox"]')].find(visible);
          theme?.click();
          return true;
        })()`,
      });
      await delay(100);
      const preferenceState = await client.send("Runtime.evaluate", {
        expression: `({ lang: document.documentElement.lang, theme: document.documentElement.dataset.theme, title: document.title })`,
        returnByValue: true,
      });
      const lightMenuScreenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
      });
      writeFileSync(join(outputDirectory, "375-menu-light.png"), Buffer.from(lightMenuScreenshot.data, "base64"));
      await client.send("Runtime.evaluate", {
        expression: `(() => {
          const visible = (element) => Boolean(element.offsetWidth || element.offsetHeight);
          const spanish = [...document.querySelectorAll('button')].find((button) => visible(button) && button.textContent.trim() === 'ES');
          spanish?.click();
          const theme = [...document.querySelectorAll('input[type="checkbox"]')].find(visible);
          theme?.click();
        })()`,
      });
      await delay(100);
      await client.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
      await client.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape" });
      await delay(100);
      const menuClosed = await client.send("Runtime.evaluate", {
        expression: `(() => ({
          dialogOpen: Boolean(document.getElementById('primary-mobile-menu')),
          bodyOverflow: document.body.style.overflow,
          focusReturned: document.activeElement?.getAttribute('aria-controls') === 'primary-mobile-menu',
        }))()`,
        returnByValue: true,
      });

      await client.send("Runtime.evaluate", {
        expression: `document.querySelector('#contact button[type="submit"]')?.click()`,
      });
      await delay(100);
      const emptyForm = await client.send("Runtime.evaluate", {
        expression: `(() => ({
          errorCount: document.querySelectorAll('#contact [aria-invalid="true"]').length,
          focusedField: document.activeElement?.id,
        }))()`,
        returnByValue: true,
      });

      await client.send("Runtime.evaluate", {
        expression: `(() => {
          const setValue = (element, value, prototype) => {
            Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
          };
          setValue(document.getElementById('name'), 'Ada Example', HTMLInputElement.prototype);
          setValue(document.getElementById('email'), 'ada@example.com', HTMLInputElement.prototype);
          setValue(document.getElementById('service'), 'webDev', HTMLSelectElement.prototype);
          setValue(document.getElementById('message'), 'A sufficiently detailed project need for validation.', HTMLTextAreaElement.prototype);
        })()`,
      });
      await delay(100);
      await client.send("Runtime.evaluate", {
        expression: `document.querySelector('#contact button[type="submit"]')?.click()`,
      });
      await delay(100);
      const configuredForm = await client.send("Runtime.evaluate", {
        expression: `(() => ({
          alertText: document.querySelector('#contact [role="alert"]')?.textContent.trim() ?? '',
          messageWasPreserved: document.getElementById('message')?.value.length > 0,
        }))()`,
        returnByValue: true,
      });

      interactiveChecks = {
        menuOpen: menuOpen.result.value,
        preferenceState: preferenceState.result.value,
        menuClosed: menuClosed.result.value,
        emptyForm: emptyForm.result.value,
        unconfiguredForm: configuredForm.result.value,
        preferenceActionCompleted: preferences.result.value,
      };
    }

    results.push({
      width,
      ...evaluation.result.value,
      vitals: vitalsEvaluation.result.value,
      consoleErrors: [...new Set(currentConsoleErrors)],
      interactiveChecks,
    });
  }

  writeFileSync(join(outputDirectory, "results.json"), JSON.stringify(results, null, 2));
  client.close();
  return results;
}

try {
  const results = await run();
  console.log(JSON.stringify(results, null, 2));
} finally {
  edge.kill();
  if (edge.pid) {
    spawnSync("taskkill", ["/PID", String(edge.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
  }
}
