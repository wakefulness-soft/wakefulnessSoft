
interface Props {
    label: string;
    href: string;
}

export const FooterLink = (props: Props) => {
  return (
    <li key={props.href}>
        <a href={props.href} className="text-sm text-[#8d7f99] transition-colors hover:text-[#e3d7d9]">
            {props.label}
        </a>
    </li>
  )
}
