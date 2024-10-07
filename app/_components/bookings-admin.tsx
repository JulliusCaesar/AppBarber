"use client"
import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"
import { Calendar } from "./ui/calendar" // Importa o componente Calendar

// Interface para os dados de agendamento
interface Booking {
  date: Date
  service: {
    name: string
  }
  user: {
    name: string | null
  }
}

interface BookingAdminProps {
  bookings: Booking[]
}

const BookingAdmin: React.FC<BookingAdminProps> = ({ bookings }) => {
  // Estado para armazenar a data selecionada no calendário
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredBookings = selectedDate
    ? bookings.filter(
        (booking) =>
          format(new Date(booking.date), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd"),
      )
    : bookings

  // Obter as datas de todos os agendamentos para marcar no calendário
  const fullyBookedDates = bookings.map((booking) => new Date(booking.date))

  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex flex-col p-0">
          <h2 className="mb-5 text-xl font-bold">Calendário de Agendamentos</h2>

          {/* Componente de Calendário */}
          <Calendar
            selected={selectedDate}
            onDayClick={setSelectedDate} // Atualiza a data selecionada ao clicar em um dia
            modifiers={{ fullyBooked: fullyBookedDates }} // Marcamos as datas com agendamentos
            modifiersClassNames={{
              fullyBooked: "bg-primary text-primary-foreground",
            }}
          />
          <h2 className="mt-8 text-xl font-bold">Lista de Agendamentos</h2>

          {/* Lista de Agendamentos Filtrados */}
          <CardContent className="mt-5 flex flex-col p-0">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <div key={index} className="flex justify-between py-5 pl-5">
                  <div className="flex flex-col gap-2">
                    <Badge className="w-fit" variant="default">
                      Agendado
                    </Badge>
                    <h3 className="font-semibold">{booking.service.name}</h3>
                    <p>Cliente: {booking.user.name}</p>
                    <p>
                      Data:
                      {format(new Date(booking.date), " dd", {
                        locale: ptBR,
                      })}{" "}
                      de{" "}
                      {format(new Date(booking.date), "MMMM", { locale: ptBR })}{" "}
                      de{" "}
                      {format(new Date(booking.date), "yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p>
                      Hora:{" "}
                      {format(new Date(booking.date), "HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Sem agendamentos para esta data.</p>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingAdmin

{
  /* {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} className="flex justify-between py-5 pl-5">
                <div className="flex flex-col gap-2">
                  <Badge className="w-fit" variant="default">
                    Agendado
                  </Badge>
                  <h3 className="font-semibold">{booking.service.name}</h3>
                  <p>Cliente: {booking.user.name}</p>
                  <p>
                    Data:
                    {format(new Date(booking.date), " dd", {
                      locale: ptBR,
                    })}{" "}
                    de{" "}
                    {format(new Date(booking.date), "MMMM", { locale: ptBR })}{" "}
                    de{" "}
                    {format(new Date(booking.date), "yyyy", { locale: ptBR })}
                  </p>
                  <p>
                    Hora:{" "}
                    {format(new Date(booking.date), "HH : mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Sem agendamentos no momento.</p>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default BookingAdmin */
}
