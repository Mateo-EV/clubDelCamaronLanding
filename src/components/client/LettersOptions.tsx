import { cn } from "@/lib/utils"
import {
  BabyIcon,
  ChefHatIcon,
  GlassWaterIcon,
  MartiniIcon,
  UtensilsCrossedIcon
} from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const RESTAURANTE_LETTER_CATEGORIES = [
  {
    href: "/carta/especialidades",
    name: "Especialidades",
    icon: ChefHatIcon
  },
  {
    href: "/carta/platos-criollos",
    name: "Platos Criollos",
    icon: UtensilsCrossedIcon
  },
  {
    href: "/carta/menu-infantil",
    name: "Menu Infantil",
    icon: BabyIcon
  },
  {
    href: "/carta/bebidas",
    name: "Bebidas",
    icon: GlassWaterIcon
  },
  {
    href: "/carta/cocktails",
    name: "Cocktails",
    icon: MartiniIcon
  }
] as const

export default function LettersOptions() {
  const [activeOption, setActiveOption] = useState(0)

  const interval = useRef<ReturnType<typeof setInterval>>()

  const startChangeAnimation = useCallback(() => {
    clearInterval(interval.current)
    interval.current = setInterval(() => {
      setActiveOption(prev => {
        const index = prev + 1
        if (RESTAURANTE_LETTER_CATEGORIES[index]) {
          return index
        }

        return 0
      })
    }, 1000)
  }, [])

  useEffect(() => {
    startChangeAnimation()

    return () => {
      clearInterval(interval.current)
    }
  }, [])

  return (
    <ul className="flex w-full justify-center gap-8 mt-12 flex-wrap">
      {RESTAURANTE_LETTER_CATEGORIES.map(({ name, icon: Icon, href }, i) => {
        const isActive = activeOption === i

        return (
          <li data-aos="fade-down" data-aos-delay={100 * i} key={i}>
            <a
              href={href}
              className={cn(
                "min-w-48 aspect-square flex justify-center items-center bg-secondary rounded-full relative shadow-md transition-transform duration-300",
                isActive && "-translate-y-2"
              )}
              onMouseOver={() => {
                clearInterval(interval.current)
                setActiveOption(i)
              }}
              onMouseOut={() => {
                startChangeAnimation()
              }}
              style={{ viewTransitionName: name }}
            >
              <div
                className={cn(
                  "absolute inset-1/4 scale-0 opacity-0 transition delay-200 duration-300",
                  isActive && "scale-100 opacity-100"
                )}
              >
                <Icon className="size-full" />
              </div>
              <span
                className={cn(
                  "text-xl font-semibold uppercase transition delay-200 duration-300",
                  isActive && "opacity-0 scale-0"
                )}
              >
                {name}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
