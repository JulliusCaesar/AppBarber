import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import BookingAdmin from "../_components/bookings-admin"
import { db } from "../_lib/prisma" // Certifique-se de que o Prisma está configurado corretamente

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

const PageAdmin = async () => {
  const session = await getServerSession(authOptions)

  // Buscando todos os agendamentos e ordenando por data e hora
  const bookings: Booking[] = await db.booking.findMany({
    orderBy: {
      date: "asc", // Ordena por data em ordem crescente
    },
    select: {
      date: true,
      service: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "Erro"}{" "}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          de
          <span className="capitalize">
            {format(new Date(), " MMMM", { locale: ptBR })}{" "}
          </span>
        </p>
      </div>

      <div className="p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
      </div>

      <div className="p-5">
        {/* Passamos os agendamentos para o BookingAdmin */}
        <BookingAdmin bookings={bookings} />
      </div>
    </div>
  )
}

export default PageAdmin
