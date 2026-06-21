
interface Props {
    label: string;
    href: string;
}

export const NavbarLink = (props: Props) => {
  return (
    <li>
        <a
            href={props.href}
            className="text-sm font-medium text-[#9a8eb8] transition-colors hover:text-[#e3d7d9]"
        >
            {props.label}
        </a>
    </li>
  )
}
