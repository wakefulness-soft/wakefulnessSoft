import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4">
      <nav
        className={`relative mx-auto flex max-w-5xl items-center justify-between overflow-hidden rounded-full border border-[#2a242c] bg-[#18151c]/80 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "px-5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : "px-6 py-3"
        }`}
      >
        {/* hilo de vapor ambiental, decorativo, detrás del contenido */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="wf-steam-path"
            d="M-20,20 C20,5 40,35 80,20 C120,5 140,35 180,20 C220,5 240,35 280,20 C320,5 340,35 380,20 C400,12 410,20 420,20"
            fill="none"
            stroke="#c9b8d4"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        {/* Logo */}
        <a href="#inicio" className="relative z-10 flex items-center gap-2.5">
          <img
            src={logo}
            alt="Wakefulness Soft"
            className="wf-ghost-float h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(201,184,212,0.4)]"
          />
          <span className="text-base font-semibold tracking-tight text-[#e3d7d9]">
            Wakefulness<span className="text-[#c9b8d4]"> Soft</span>
          </span>
        </a>

        {/* Links de escritorio */}
        <ul className="relative z-10 hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#9a8eb8] transition-colors hover:text-[#e3d7d9]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          className="relative z-10 hidden items-center rounded-full bg-[#c9b8d4] px-4 py-1.5 text-sm font-semibold text-[#0b0a0d] transition-all hover:bg-[#d8c9e1] hover:shadow-[0_0_25px_rgba(201,184,212,0.45)] md:inline-flex"
        >
          Hablemos
        </a>

        {/* Botón móvil */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="relative z-10 rounded p-1 text-[#e3d7d9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9b8d4] md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menú móvil flotante */}
      <div
        className={`mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-[#2a242c] bg-[#18151c]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-base text-[#9a8eb8] transition-colors hover:text-[#e3d7d9]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-full bg-[#c9b8d4] px-4 py-1.5 text-sm font-semibold text-[#0b0a0d]"
            >
              Hablemos
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes wfSteamDrift {
          0%   { transform: translateX(0) translateY(0); opacity: 0.18; }
          50%  { transform: translateX(-12px) translateY(-2px); opacity: 0.28; }
          100% { transform: translateX(0) translateY(0); opacity: 0.18; }
        }
        .wf-steam-path {
          animation: wfSteamDrift 9s ease-in-out infinite;
        }
        @keyframes wfGhostFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .wf-ghost-float {
          animation: wfGhostFloat 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .wf-steam-path, .wf-ghost-float { animation: none; }
        }
      `}</style>
    </header>
  );
}