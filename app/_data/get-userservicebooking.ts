"use server"

import { db } from "../_lib/prisma"

export const getBookingsUserService = async () => {
  return db.booking.findMany({
    select: {
      date: true, // Data da agenda
      service: {
        select: {
          name: true, // Serviço agendado
        },
      },
      user: {
        select: {
          name: true, // Nome do cliente
        },
      },
    },
  })
}
