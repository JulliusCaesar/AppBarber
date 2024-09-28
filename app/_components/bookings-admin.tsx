import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

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
  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex flex-col p-0">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} className="flex justify-between py-5 pl-5">
                <div className="flex flex-col gap-2">
                  <Badge className="w-fit" variant="default">
                    Agendado
                  </Badge>
                  <h3 className="font-semibold">{booking.service.name}</h3>
                  <p>Cliente: {booking.user.name}</p>
                  <p>Data: {new Date(booking.date).toLocaleDateString()}</p>
                  <p>Hora: {new Date(booking.date).toLocaleTimeString()}</p>
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

export default BookingAdmin
