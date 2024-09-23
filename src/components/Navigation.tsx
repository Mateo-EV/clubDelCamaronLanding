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

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button className="p-4 relative" onClick={() => setIsOpen(p => !p)}>
      {LINES.map(({ open, close }, i) => (
        <span
          key={i}
          className={`bg-orange-300 h-1 rounded-md block absolute top-1/2 left-1/2 -translate-x-1/2 transition-[transform_width] ${isOpen ? open : close}`}
        />
      ))}
    </button>
  )
}
