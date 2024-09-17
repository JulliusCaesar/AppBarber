import Link from "next/link"

const AdminNav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/admin/appointments">Agendamentos</Link>
        </li>
        <li>
          <Link href="/admin/customers">Clientes</Link>
        </li>
        <li>
          <Link href="/admin/services">Serviços</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav
