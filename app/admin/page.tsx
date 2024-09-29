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
  if (session?.user?.email == process.env.ADMIN_LOGIN_SECRET) {
    // Buscando todos os agendamentos e ordenando por data e hora
    const bookings: Booking[] = await db.booking.findMany({
      where: {
        date: {
          gte: new Date(), // Filtra para pegar apenas agendamentos com data maior ou igual à data atual
        },
      },
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
            name: true, // Permite que o nome do usuário seja null
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
              {format(new Date(), "EEEE, dd ", { locale: ptBR })}
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
  } else {
    return (
      <div>
        <Header />
        <div className="p-5">
          <h1 className="text-xl font-bold">Acesso Restrito</h1>
          <p>Você não possui permissão para acessar essa página.</p>
        </div>
      </div>
    )
  }
}

export default PageAdmin
