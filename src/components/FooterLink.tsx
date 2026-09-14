
interface Props {
    label: string;
    href: string;
}

export const FooterLink = (props: Props) => {
  return (
    <li key={props.href}>
        <a href={props.href} className="inline-flex min-h-11 items-center rounded text-sm text-[#b3a8bd] transition-colors hover:text-[#e3d7d9]">
            {props.label}
        </a>
    </li>
  )
}
