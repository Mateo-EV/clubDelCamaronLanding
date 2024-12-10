import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { axios } from "@/lib/utils"
import { isAxiosError } from "axios"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

function getDateInOneMonth() {
  const currentDate = new Date()
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
}

function getDateInTwoMonths() {
  const currentDate = new Date()
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 3,
    currentDate.getDate()
  )
}

export default function ReservationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    persons: 0,
    date: new Date(),
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  })

  const handlePersonSelect = (number: number) => {
    setFormData({ ...formData, persons: number })
    setStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setFormData({ ...formData, date })
    setStep(3)
  }

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time })
    setStep(4)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const localDate = new Date(formData.date)
    const [hours, minutes] = formData.time
      .replace(/(AM|PM)/, "")
      .trim()
      .split(":")
      .map(Number)

    const isPM = formData.time.includes("PM")
    const adjustedHours =
      isPM && hours !== 12 ? hours + 12 : !isPM && hours === 12 ? 0 : hours

    localDate.setHours(adjustedHours, minutes, 0, 0)

    const utcDate = localDate.toISOString()
    try {
      await axios.post("/api/reservas", {
        ...formData,
        date: utcDate
      })
      toast.success("Reserva creada exitosamente.")
      document.getElementById("redirect")?.click()
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error)
      }
    }
  }

  return (
    <div className="min-h-screen mt-36 pt-4 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(step - 1)}
                className="text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <span className="font-semibold">
              {step === 1 && "Personas"}
              {step === 2 && `${formData.persons} Personas`}
              {step === 3 && new Date(formData.date).toLocaleDateString()}
              {step === 4 && "Tus datos"}
            </span>
          </div>
        </div>
        <div className="w-full bg-primary-foreground h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-transparent border-none">
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">
                Elija la cantidad de personas
              </h2>
              <div className="flex justify-center gap-4 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map(number => (
                  <Button
                    key={number}
                    variant={
                      formData.persons === number ? "default" : "outline"
                    }
                    className="rounded-full w-12 h-12"
                    onClick={() => handlePersonSelect(number)}
                  >
                    {number}
                  </Button>
                ))}
                <Button variant="outline" className="rounded-full w-12 h-12">
                  +
                </Button>
              </div>
              <p className="text-sm text-center text-gray-400">
                * Bebés y niños deben ser incluidos en la cantidad de personas.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">
                Seleccione una fecha
              </h2>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={date => date && handleDateSelect(date)}
                  minDate={getDateInOneMonth()}
                  maxDate={getDateInTwoMonths()}
                  blockedDates={[]}
                  defaultMonth={getDateInOneMonth()}
                />
              </div>
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Días disponibles (sin lista de espera)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span>Días disponibles (con lista de espera)</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Elija una hora</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                  "4:00 PM",
                  "5:00 PM"
                ].map(time => (
                  <Button
                    key={time}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Tus datos</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={e =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={e =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  Confirmar reserva
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
