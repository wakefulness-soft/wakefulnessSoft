# Auditoría integral de la landing de Wakefulness Soft

Fecha de auditoría inicial: 2026-09-13

## Alcance y línea base

La aplicación es una SPA construida con React 19.2, TypeScript 6, Vite 8, CSS Modules, Tailwind CSS 4 e i18next. El punto de entrada real es `src/main.tsx`; `src/App.tsx` compone `Navbar`, `HomePage`, `Footer`, `ThemeSwitcher` y `LanguageSwitcher`. La landing se ensambla en `src/pages/Home/HomePage.tsx`.

Componentes encontrados y usados inicialmente:

- `Navbar`: `src/components/Navbar/Navbar.tsx`.
- `HeroMidnightTerminal`: `src/components/HeroMidnightTerminal/HeroMidnightTerminal.tsx`.
- About: export default `About` en `src/pages/About/About.tsx` (importado con el alias local `AboutSection`).
- `WhySection`: `src/components/WhySection/WhySection.tsx`.
- `ProcessSection`: `src/components/ProcessSection/ProcessSection.tsx`.
- `ProjectsSection`: export default `ProjectSection` en `src/components/ProjectsSection/ProjectsSection.tsx`.
- `TestimonialSection`: `src/components/TestimonialSection/TestimonialSection.tsx`.
- `CtaSection`: `src/components/CtaSection/CtaSection.tsx`.
- `Footer`: `src/components/Footer/Footer.tsx`.
- `ServicesSection` existe en `src/components/ServicesSection/ServicesSection.tsx`, pero solo devuelve el texto de marcador `ServicesSection` y no está montado.

Los tokens globales están en `src/index.css`: paleta oscura/púrpura y alternativa clara, escala tipográfica de `0.75rem` a `6rem`, ancho máximo de `72rem`, gutters de `1rem`/`1.5rem`/`2rem`, separación vertical de `4rem`/`5.5rem`/`7rem` y breakpoints principales en 768 y 1024 px. Los componentes añaden algunos cortes en 640 px. Existe una regla global para `prefers-reduced-motion` y varias anulaciones locales.

## Matriz de auditoría inicial

| Criterio | Estado inicial | Evidencia | Recomendación | Prioridad |
| --- | --- | --- | --- | --- |
| Propuesta de valor en hero | No cumplido | El hero activo usa una metáfora nocturna y pregunta por “hablar de código”, sin explicar servicios ni beneficios. | Mantener la terminal y añadir un H1 comercial, descripción explícita y CTAs reales. | P1 |
| H1 único y jerarquía | No cumplido | `HeroMidnightTerminal` renderiza un `h2`; el único `h1` está en `HeroSection`, que no se monta. | Convertir el título activo en el único H1 y conservar H2/H3 en las secciones. | P1 |
| Servicios explícitos | No cumplido | `ServicesSection` es un marcador sin estilos y está comentado en `HomePage`. | Implementar una sección reusable con los cuatro ámbitos ya presentes en el contenido existente y expresar que el alcance se confirma en la conversación inicial. | P1 |
| Navegación interna | Parcialmente cumplido | Header y footer usan anclas; `#projects`, `#us` y `#contact` existen, pero `#top` no existe y Servicios no está en `linkKeys`. | Crear destinos válidos, incluir Servicios y mantener una CTA principal coherente. | P1 |
| Navegación móvil | Parcialmente cumplido | Hay menú modal, bloqueo de scroll, cierre con Escape y trampa de foco. Falta verificación visual y funcional real en todos los anchos solicitados. | Conservar el patrón y probar teclado, cierre, áreas táctiles y overflow. | P1 |
| Formulario: campos y labels | Parcialmente cumplido | Nombre, correo, servicio y mensaje tienen labels visibles; servicio no es obligatorio. | Requerir los cuatro datos, añadir ayudas y errores específicos vinculados con `aria-describedby`. | P1 |
| Formulario: envío honesto | No cumplido | EmailJS usa variables vacías de `.env.template`, muestra `alert` y además ejecuta `setTimeout(() => sent)` independientemente del resultado. El estado `error` nunca se asigna. | Detectar configuración, no enviar si falta, esperar el resultado real y mostrar estados accesibles de éxito/error/no disponible. | P1 |
| CTA y contacto directo | Parcialmente cumplido | El correo Gmail fue incorporado en un commit específico, pero el footer muestra otro correo y un teléfono `0000 0000`. GitHub apunta a la portada genérica. | Unificar el correo confirmado por el historial, enlazar el GitHub del remoto y eliminar destinos/datos de marcador. | P1 |
| Principios y beneficios | Parcialmente cumplido | Hay seis principios, pero varios afirman pruebas, revisiones, arquitectura o entrega sin evidencia operativa dentro del repo y no separan el beneficio. | Reescribir con lenguaje verificable y mostrar explícitamente “beneficio para el proyecto”. | P2 |
| Proceso | Parcialmente cumplido | La interacción es usable con botones, foco y `aria-pressed`; el copy se apoya demasiado en la metáfora del café y contiene afirmaciones técnicas no acreditadas. | Mantener la metáfora como acento, pero explicar descubrimiento, definición, construcción, validación, entrega y evolución en lenguaje claro. | P2 |
| Proyectos | No cumplido | Nebula, Phantom API, Drift UI y Hollow CLI se publican como “live/WIP”, con stacks y resultados concretos, pero no existen enlaces ni evidencia en el repositorio. Todos los `href` son `#`. | Identificarlos inequívocamente como conceptos y retirar estados, métricas y tecnologías no verificadas; dejar estructura preparada para casos reales. | P1/P2 |
| Testimonios | No cumplido | Se publican cinco identidades, fechas y reseñas sin fuente, empresa, autorización ni evidencia en el repositorio. | Retirar el carrusel de la experiencia publicada y sustituirlo por capacidades/criterios de colaboración sin atribuciones inventadas. | P1/P2 |
| Credibilidad técnica | Parcialmente cumplido | Hay lenguaje técnico y stacks decorativos, pero no una separación clara entre beneficios y detalle; varias capacidades no están verificadas. | Explicar criterios de ingeniería reales de esta implementación y marcar lo que debe confirmarse para cada proyecto. | P2 |
| Semántica y teclado | Parcialmente cumplido | Existen `main`, `section`, `nav`, `footer`, skip link, foco visible y controles reales. Faltan H1, estados del formulario y revisión de iconos/elementos decorativos. | Corregir la jerarquía y nombres accesibles, y mantener foco visible de alto contraste. | P1 |
| Contraste | Parcialmente cumplido | El texto secundario usa `--color-muted` sobre fondos oscuros y claros; no existe medición documentada. | Elevar el token muted y comprobar contraste visual en ambos temas. | P1 |
| Idioma del documento | Parcialmente cumplido | `html lang="en"` permanece fijo aunque el selector cambie i18next a español. | Sincronizar `document.documentElement.lang` y metadatos con el idioma activo. | P2 |
| SEO básico | No cumplido | Solo existe `<title>Wakefulness Soft</title>` y viewport; no hay description, Open Graph, robots ni texto indexable de servicios. | Añadir metadatos descriptivos y `robots.txt`; posponer canonical/sitemap hasta confirmar el dominio de producción. | P1 |
| Responsive | Parcialmente cumplido | La base es mobile-first, usa `min-width: 20rem`, grids fluidos y `overflow-x: clip`; falta inspección real a 320, 375, 425, 768, 1024 y 1440 px. | Ejecutar capturas/mediciones de layout y corregir cualquier desborde o solapamiento. | P1 |
| Movimiento reducido | Cumplido | Hay regla global y anulaciones en navbar, About, proyectos, CTA y otros componentes. | Mantenerla al modificar animaciones. | P1 |
| Recursos e imágenes | Parcialmente cumplido | Logos responsive usados: 5.9 KB y 19.3 KB. `public/favicon.svg` pesa 1,375,536 bytes. `logo.png` y `muerte_chan.png` superan 1.7 MB cada uno, aunque no se importan en la landing activa. | Sustituir el favicon por un SVG compacto y mantener fuera del bundle los PNG no usados; confirmar antes de eliminarlos. | P1/P2 |
| JavaScript inicial | Parcialmente cumplido | Build inicial: JS 315.63 KB (99.01 KB gzip). EmailJS se importa de forma estática aunque el formulario puede no estar configurado. | Cargar EmailJS solo al enviar y comparar el bundle. | P2 |
| CSS inicial | Parcialmente cumplido | Build inicial: CSS 62.16 KB (12.93 KB gzip), incluyendo componentes de heroes alternativos importados pero no usados. | Eliminar imports muertos y comprobar el CSS generado. | P2 |
| Calidad de build | Parcialmente cumplido | `npm run build` pasa. `npm run lint` falla por tres imports no usados en `HomePage`. No hay script de pruebas. | Corregir imports, repetir build/lint y documentar la ausencia de tests. | P1 |
| Entry point | Parcialmente cumplido | El archivo real es `src/main.tsx`, pero `index.html` referencia `/src/main.jsx`; Vite lo resuelve en el build actual. | Corregir la referencia para evitar depender de resolución implícita. | P1 |
| Consola y métricas de navegador | No cumplido | No se habían ejecutado pruebas de navegador, Lighthouse ni Web Vitals al iniciar la auditoría. | Levantar la aplicación localmente, revisar consola/layout y ejecutar las herramientas disponibles. | P1 |

## Línea base de validación

- `npm ls --depth=0`: ejecutado; muestra las versiones instaladas y varios paquetes transitivos extraneous en `node_modules`.
- `npm run lint`: falla con 3 errores por imports no usados (`Hero3AMFocus`, `HeroEspresso`, `HeroSleepingCode`).
- `npm run build`: pasa con Vite 8.0.16; JS 315.63 KB (99.01 KB gzip), CSS 62.16 KB (12.93 KB gzip).
- Pruebas: no existe script `test` ni archivos de prueba detectados.

## Restricciones confirmadas por la inspección

- No hay backend propio en el repositorio.
- EmailJS está previsto mediante tres variables `VITE_*`, pero `.env.template` no contiene valores y no hay una configuración local versionada.
- El historial confirma `wakefulnesssoft@gmail.com` como el correo corporativo elegido en el commit `86e48a7`; el remoto confirma la organización `https://github.com/wakefulness-soft`.
- No hay evidencia local que permita validar clientes, testimonios, años, número de proyectos, métricas de rendimiento de los conceptos ni dominio de producción.
- Por lo anterior, canonical, sitemap, datos estructurados de empresa, teléfono, testimonios y casos de cliente deben esperar confirmación del propietario.

## Plan de cambios localizado

1. Corregir entry point, metadatos, idioma del documento y recurso favicon.
2. Convertir el hero activo en una propuesta comercial clara sin perder la terminal.
3. Implementar y montar `ServicesSection` usando el vocabulario de servicios ya existente.
4. Reescribir About, principios y proceso para relacionar decisiones con beneficios sin añadir prácticas no confirmadas.
5. Reetiquetar los cuatro proyectos como conceptos y retirar enlaces/estados/stacks no verificables.
6. Reemplazar testimonios no verificables por una sección de capacidades y criterios de colaboración.
7. Hacer que el formulario valide, comunique estados accesibles y dependa exclusivamente del resultado real de EmailJS.
8. Unificar navegación/footer y retirar datos de marcador.
9. Repetir lint/build y ejecutar validación responsive, consola y rendimiento con las herramientas disponibles.

## Resultado de la implementación

Los cambios se realizaron sobre la arquitectura existente. No se cambió el framework, no se añadieron dependencias y no se incorporó ningún backend o proveedor nuevo. La composición oscura, los acentos púrpura, la terminal, las tarjetas conceptuales y la metáfora de claridad/enfoque permanecen.

### Estado posterior por área

| Área | Estado posterior | Evidencia de cierre | Limitación o siguiente paso |
| --- | --- | --- | --- |
| Hero y propuesta de valor | Cumplido | Un único H1 explica software a la medida; el subtítulo nombra web, móvil y soluciones digitales; las CTAs llevan a contacto y servicios. | El propietario debe confirmar si esos tres ámbitos describen el posicionamiento definitivo. |
| Servicios | Cumplido con confirmación comercial pendiente | `ServicesSection` presenta cuatro servicios, la necesidad que atienden y el beneficio, sin usar tecnologías como argumento principal. | Confirmar que web, móvil, consultoría y mantenimiento/soporte son la oferta oficial. |
| Navegación y CTAs | Cumplido | Todos los destinos internos auditados existen; la CTA principal es consistente; los controles de tema/idioma forman parte del navbar y del menú móvil. | Añadir analítica solo cuando exista una política y herramienta autorizadas. |
| Formulario | Cumplido para el estado actual | Cuatro campos obligatorios, labels visibles, errores vinculados, foco al primer error, carga, éxito/error reales y estado no configurado. Sin credenciales, conserva los datos y declara que no se envió nada. | Configurar las tres variables de EmailJS o sustituirlo por un endpoint propio para habilitar envío real. |
| Principios y proceso | Cumplido | Cada principio separa explicación y beneficio; el proceso usa seis etapas comprensibles y evita garantizar prácticas no confirmadas. | Sustituir texto general por evidencia operativa cuando el equipo la documente. |
| Proyectos | Cumplido con contenido pendiente | Nebula, Phantom API, Drift UI y Hollow CLI se muestran explícitamente como conceptos, no como casos de cliente; se retiraron estados, enlaces, resultados y stacks no verificables. | Se necesitan fichas autorizadas para convertirlos o reemplazarlos por casos reales. |
| Testimonios | Cumplido para la evidencia disponible | El carrusel no verificable se retiró de la landing activa y se reemplazó por capacidades demostrables en este repositorio. | Publicar testimonios solo con texto, atribución, empresa y autorización confirmados. |
| Credibilidad técnica | Cumplido con alcance acotado | `CapabilitiesSection` diferencia el beneficio comprensible de la evidencia técnica visible: React/TypeScript, CSS Modules/Vite, i18n, responsive, teclado, lint y build. | APIs, bases de datos, seguridad, despliegue, pruebas y otros lenguajes quedan expresamente sujetos a evidencia del equipo. |
| Accesibilidad | Parcialmente cumplido | H1 único, secuencia H1/H2/H3, skip link, labels, errores accesibles, foco, teclado, objetivos táctiles y movimiento reducido. Auditoría automatizada: cero controles sin nombre, imágenes sin alt y objetivos menores de 24 px. | Falta una auditoría formal de contraste y una prueba con lector de pantalla/axe en navegadores y dispositivos reales. |
| Responsive | Cumplido en laboratorio | 320, 375, 425, 768, 1024 y 1440 px: ancho de documento igual al viewport, sin overflow detectado; capturas completas y por sección revisadas. | Confirmar en Safari/iOS y dispositivos físicos, especialmente teclado virtual del formulario. |
| SEO técnico | Parcialmente cumplido | Title/description bilingües, viewport, theme color, Open Graph básico, H1 y texto indexable, enlaces válidos y `robots.txt`. `lang` cambia con i18next. | Canonical, `og:url`, `og:image`, sitemap y datos estructurados requieren dominio, imagen social e identidad legal confirmados. |
| Rendimiento | Cumplido en laboratorio local | EmailJS se carga solo al enviar; el favicon reutiliza el logo de taza de 5.85 KB del navbar; no hay recursos externos activos; CLS 0 y LCP de 92 a 256 ms en el recorrido local. | INP necesita interacciones representativas; repetir Lighthouse/Web Vitals en el hosting real con red y CPU limitadas. |
| Calidad de código | Cumplido | Lint y build pasan; el entry point apunta a `main.tsx`; no hay errores de consola en los seis viewports; no se agregaron dependencias. | El proyecto no tiene pruebas automatizadas ni script `test`. |

## Archivos modificados y creados

- Configuración y documento: `.gitignore`, `package.json`, `index.html`, `public/robots.txt`, `src/App.tsx`, `src/i18n/index.ts`, `src/i18n/locales/en.json` y `src/i18n/locales/es.json`.
- Composición: `src/pages/Home/HomePage.tsx`, `src/pages/About/About.tsx` y `src/pages/About/About.module.css`.
- Navegación: `src/components/Navbar/Navbar.tsx`, su CSS Module y los componentes `ThemeSwitcher` y `LanguageSwitcher` con sus CSS Modules.
- Contenido y conversión: `HeroMidnightTerminal`, `ServicesSection`, `WhySection`, `ProjectsSection`, `CtaSection`, `Footer` y `FooterLink`, con los CSS Modules correspondientes.
- Nuevos componentes: `src/components/CapabilitiesSection/CapabilitiesSection.tsx`, `src/components/CapabilitiesSection/CapabilitiesSection.module.css` y `src/components/ServicesSection/ServicesSection.module.css`.
- Auditoría: `scripts/ui-audit.mjs` y este informe. Los resultados y capturas se generan en `.artifacts/ui-audit` y están excluidos de Git.

`ProcessSection` se conservó estructuralmente y se mejoró mediante el contenido bilingüe. `TestimonialSection` y sus piezas siguen disponibles en el código para una futura fuente verificada, pero ya no se montan en `HomePage`.

## Cambios por área

### Contenido, UX y conversión

- Se convirtió la promesa conceptual del hero en una explicación inmediata de qué construye la empresa y para qué sirve, conservando la terminal interactiva.
- Se agregó el recorrido `Hero → Servicios → Nosotros → Principios → Proceso → Conceptos → Capacidades → Contacto`.
- Los principios muestran el beneficio para el proyecto y los conceptos declaran sus límites de evidencia.
- Se unificó la acción principal en iniciar/hablar sobre un proyecto. El correo confirmado y la organización de GitHub son los únicos destinos externos publicados; se retiraron teléfono y perfiles de marcador.
- El formulario ya no simula éxito. EmailJS se importa dinámicamente solo después de validar y únicamente si existen service ID, template ID y public key.

### Accesibilidad y responsive

- Se corrigió la jerarquía a un H1, H2 por sección y H3 por tarjeta; el panel revelado del hero dejó de introducir un encabezado fuera de orden.
- Menú móvil: diálogo con cierre por Escape, bloqueo de scroll, foco inicial, trampa de foco y retorno al disparador. Tema e idioma son accesibles dentro del mismo menú.
- Formulario: `aria-invalid`, `aria-describedby`, regiones de estado y foco programático al primer campo inválido.
- Se mantuvo `prefers-reduced-motion`, se evitaron contenidos inicialmente invisibles y se elevaron contraste/tamaño interactivo en footer, formulario y navegación.
- La verificación de layout cubrió los seis anchos solicitados y ambas apariencias en móvil.

### SEO y rendimiento

- Metadatos base y Open Graph describen el servicio; el title y la description cambian entre español e inglés, al igual que `html[lang]`.
- Se corrigió `/src/main.jsx` a `/src/main.tsx` y se añadió `robots.txt` sin inventar un sitemap.
- El favicon activo reutiliza exactamente `src/assets/logo-64.png`, la taza que aparece en el navbar, con un peso de 5.85 KB. El SVG original de 1,375,536 bytes permanece sin cambios en el repositorio, pero ya no se solicita durante la carga. Los demás PNG grandes no usados tampoco forman parte del bundle activo.
- Build final: JS principal 326.63 KB/102.30 KB gzip, chunk diferido de EmailJS 3.49 KB/1.49 KB gzip y CSS 63.86 KB/13.06 KB gzip. Frente a la línea base, el contenido y los componentes nuevos aumentan modestamente JS/CSS; la integración de correo queda fuera de la carga inicial y reutilizar el logo ligero como favicon evita aproximadamente 1.31 MiB de transferencia potencial.

## Comandos y resultados finales

- `npm ls --depth=0`: stack instalado inspeccionado; se observaron dependencias transitivas `extraneous` ya presentes en `node_modules`.
- `npm run lint`: aprobado, 0 errores.
- `npm run build`: aprobado con Vite 8.0.16; 1,878 módulos transformados en la ejecución final.
- `npm run preview -- --host 127.0.0.1 --port 4173`: build de producción servido para inspección.
- `npm run audit:ui`: auditor CDP/Edge aprobado en 320, 375, 425, 768, 1024 y 1440 px.
- `git diff --check`: aprobado; solo se informan advertencias de normalización LF/CRLF en Windows, sin errores de whitespace.
- Pruebas automatizadas: no ejecutadas porque `package.json` no contiene script `test` y no se localizaron archivos de prueba.

El auditor de navegador registró en todos los anchos: un H1, cero overflow horizontal, cero anclas internas rotas, cero controles sin label/nombre, cero imágenes sin alt, cero objetivos interactivos menores de 24 px y cero errores de consola. En 375 px también verificó el menú y retorno de foco, el cambio de idioma/tema, cuatro errores del formulario vacío y el estado honesto del formulario no configurado conservando el mensaje.

Medición local sin throttling: FCP/LCP entre 92 y 256 ms, CLS 0, transferencia total entre 121,862 y 122,784 bytes, scripts 101,546 bytes, CSS 13,376 bytes e imágenes 6,158 bytes. Estos son datos de laboratorio local, no garantías de producción. INP no se reporta porque necesita una secuencia representativa de interacciones. Lighthouse no está instalado en el proyecto, por lo que se utilizó CDP y `PerformanceObserver` sin añadir dependencias.

## Decisiones pendientes del propietario

1. Confirmar la oferta comercial definitiva y si el desarrollo móvil forma parte de ella.
2. Confirmar Guadalajara, México como ubicación pública y proporcionar razón social/datos de empresa si se desean datos estructurados.
3. Proporcionar dominio canónico, URL final y una imagen social autorizada para completar canonical, sitemap y Open Graph.
4. Decidir entre configurar EmailJS existente o implementar posteriormente un endpoint propio; mientras tanto el correo directo es la conversión real.
5. Entregar casos de estudio verificables: tipo, problema, solución, capacidades, tecnologías autorizadas, estado, enlaces y resultados demostrables.
6. Confirmar si los cuatro conceptos actuales deben conservarse, desarrollarse o reemplazarse.
7. Proporcionar testimonios autorizados y verificables antes de volver a montar el carrusel.
8. Documentar capacidades operativas reales de backend, datos, arquitectura, pruebas, seguridad, CI/CD, despliegue y mantenimiento antes de publicarlas.

## Recomendaciones para la siguiente iteración

1. Habilitar un canal real de leads y añadir pruebas de integración para éxito, error y protección contra abuso.
2. Crear uno o dos casos de estudio auténticos antes de ampliar el contenido comercial.
3. Añadir pruebas automatizadas de componentes y recorrido crítico; ejecutar axe y lector de pantalla en ambos idiomas.
4. Ejecutar Lighthouse y Web Vitals en staging/producción con throttling móvil y tráfico real, incluyendo INP.
5. Completar canonical, sitemap, `og:image` y datos estructurados cuando se confirme la identidad de producción.
6. Revisar y, con autorización, eliminar recursos y componentes alternativos no usados para reducir mantenimiento del repositorio.
7. Incorporar analítica de CTA/formulario solo con objetivos, consentimiento y privacidad definidos.
