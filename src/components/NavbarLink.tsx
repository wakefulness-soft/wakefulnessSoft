
interface Props {
    label: string;
    href: string;
}

export const NavbarLink = (props: Props) => {
  return (
    <li>
        <a
            href={props.href}
            className="text-sm font-medium text-[#c9b8d4] transition-colors hover:text-[#f8f9fa]"
        >
            {props.label}
        </a>
    </li>
  )
}
