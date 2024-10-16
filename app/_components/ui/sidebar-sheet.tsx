"use client"

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  SquareCode,
} from "lucide-react"
import { Button } from "./button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./sheet"
import { Avatar, AvatarImage } from "./avatar"
import Link from "next/link"
import { quickSearchOptions } from "@/app/_constants/search"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "./dialog"
import { useSession } from "next-auth/react"
import SignInDialog from "../sign-in-dialog"
import SignOutDialog from "../sign-out-dialog"

const SidebarSheet = () => {
  const { data } = useSession()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>
        {data?.user && (
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/admin">
              <SquareCode size={18} />
              Painel Administrativo
            </Link>
          </Button>
        )}
        {data?.user && (
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} />
              Agendamento
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {data?.user && (
        <div className="flex items-center justify-between gap-5 border-b border-solid py-3">
          <>
            <h2 className="font-bold">Sair da conta</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Link href="/">
                  <Button size="icon" variant="ghost">
                    <LogOutIcon />
                  </Button>
                </Link>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignOutDialog />
              </DialogContent>
            </Dialog>
          </>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
