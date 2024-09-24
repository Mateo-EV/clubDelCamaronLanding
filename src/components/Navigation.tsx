import { useMemo, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

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

  const navItems = useMemo(
    () =>
      MENU_ITEMS.map(({ href, name }) => (
        <li key={href} className="text-primary">
          <a href={href}>{name}</a>
        </li>
      )),
    []
  )

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
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
        </SheetTrigger>
        <SheetContent side="left">
          <ul className="flex flex-col gap-8 [&>li]:text-xl">{navItems}</ul>
        </SheetContent>
      </Sheet>
      <ul className="lg:flex items-center hidden gap-10">{navItems}</ul>
    </>
  )
}
