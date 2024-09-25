import { cn } from "@/lib/utils"
import { useState } from "react"

const LINES = [
  {
    close: "w-7 translate-y-[calc(.5rem-50%)]",
    open: "w-7 -rotate-45"
  },
  {
    close: "w-7 -translate-y-1/2",
    open: "w-0"
  },
  {
    close: "w-7 -translate-y-[calc(.5rem+50%)]",
    open: "w-7 rotate-45"
  }
]

const MENU_ITEMS = [
  {
    href: "/",
    name: "Inicio"
  },
  {
    href: "#nosotros",
    name: "Nosotros"
  },
  {
    href: "#carta",
    name: "Carta"
  },
  {
    href: "#reservas",
    name: "Reservas"
  },
  {
    href: "#contacto",
    name: "Contáctanos"
  }
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        className="p-4 relative lg:hidden"
        onClick={() => setIsOpen(p => !p)}
      >
        {LINES.map(({ open, close }, i) => (
          <span
            key={i}
            className={`bg-primary h-1 rounded-md block absolute top-1/2 left-1/2 -translate-x-1/2 transition-[transform_width] ${isOpen ? open : close}`}
          />
        ))}
      </button>
      <ul
        className={cn(
          "flex lg:items-center p-10 lg:p-0 flex-col lg:static lg:flex-row fixed gap-10 top-0 transition-[left] bg-primary-foreground w-[80%] h-screen duration-300 lg:h-auto lg:bg-transparent lg:w-fit",
          isOpen ? "left-0" : "-left-full"
        )}
      >
        {MENU_ITEMS.map(({ href, name }) => (
          <li key={href} className="text-primary font-semibold text-xl">
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
