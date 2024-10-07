// AdminCalendar.tsx
"use client"

import React, { useState } from "react"
import { Calendar } from "@/app/_components/ui/calendar" // Reutilizando o Calendar que já está no projeto
import { format } from "date-fns"

interface AdminCalendarProps {
  blockedDates?: Date[] // Datas bloqueadas que o administrador não quer permitir agendamento
}

const AdminCalendar: React.FC<AdminCalendarProps> = ({ blockedDates = [] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    console.log(
      "Data selecionada:",
      date ? format(date, "dd/MM/yyyy") : "Nenhuma",
    )
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold">Controle de Agendamentos</h2>
      <Calendar
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={blockedDates}
      />
      {selectedDate && (
        <p>Data selecionada: {format(selectedDate, "dd/MM/yyyy")}</p>
      )}
    </div>
  )
}

export default AdminCalendar
