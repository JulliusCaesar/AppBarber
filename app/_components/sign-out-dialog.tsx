import { signOut } from "next-auth/react"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"

const SignOutDialog = () => {
  const handleLogoutClick = () => signOut()
  return (
    <>
      <DialogHeader className="items-center gap-3">
        <DialogTitle>Você deseja sair da plataforma?</DialogTitle>
        <DialogDescription>
          Você não será mais capaz de acessar os dados salvos.
        </DialogDescription>
        <Button
          variant="destructive"
          className="gap-1 font-bold"
          onClick={handleLogoutClick}
        >
          Sair
        </Button>
      </DialogHeader>
    </>
  )
}

export default SignOutDialog
