import Link from "next/link"
import { Menu, MenuItem } from "types/menu"

const { SITE_NAME } = process.env

export default function MenuNav({ menu }: { menu: Menu }) {
  return menu.length ? (
    <ul className="hidden gap-6 text-sm md:flex md:items-center">
      {menu.map((item: MenuItem) => (
        <li key={item.title}>
          <Link
            href={item.path}
            className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  ) : null
}
