import logo from "../../assets/logo.png";
import type { ILink } from "../../types/links.interface";
import { FooterLink } from "../FooterLink";

const navLinks: Array<ILink> = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#us" },
];

const socials: Array<ILink> = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
];

const services: string[] = [
  "Desarrollo web",
  "Aplicaciones móviles",
  "Consultoría técnica",
  "Mantenimiento y soporte",
];

// Mismo "humito" del navbar, para que la marca se sienta consistente.
function Wisp() {
  return (
    <svg
      className="pointer-events-none absolute left-0 -bottom-2 h-3 w-full overflow-visible opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
      viewBox="0 0 60 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,8 C8,2 12,11 20,5 C28,-1 32,11 40,5 C48,-1 52,9 60,4"
        fill="none"
        stroke="#c9b8d4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#2a242c] bg-[#0b0a0d] text-[#cfc6e0]">
      {/* Línea de vapor que cruza el borde superior */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-[#c9b8d4]/60 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-4">
        {/* Marca */}
        <div className="md:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <img src={logo} alt="Wakefulness Soft" className="h-10 w-10 object-contain" />
            <span className="text-lg font-semibold text-[#e3d7d9]">
              Wakefulness<span className="text-[#c9b8d4]"> Soft</span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#8d7f99]">
            Construimos software mientras el resto del mundo duerme: código despierto, ideas con cafeína.
          </p>
          <div className="mt-6 flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group relative text-sm text-[#cfc6e0] hover:text-[#e3d7d9]"
              >
                {s.label}
                <Wisp />
              </a>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#e3d7d9]">
            Navegación
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <FooterLink key={link.href} label={link.label} href={link.href} />
            ))}
          </ul>
        </div>

        {/* Servicios */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#e3d7d9]">
            Servicios
          </h3>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s} className="text-sm text-[#8d7f99]">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#e3d7d9]">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-[#8d7f99]">
            <li>hola@wakefulnesssoft.com</li>
            <li>+52 33 0000 0000</li>
            <li>Guadalajara, Jalisco, México</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#2a242c]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-[#6e5f8c] sm:flex-row">
          <span>© {year} Wakefulness Soft. Todos los derechos reservados.</span>
          <span>Hecho con ☕ y líneas de código a medianoche.</span>
        </div>
      </div>
    </footer>
  );
}