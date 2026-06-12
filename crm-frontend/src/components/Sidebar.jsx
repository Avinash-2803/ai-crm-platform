import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <aside
      className="
        w-64
        bg-white
        shadow-lg
        min-h-screen
        p-6
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          text-blue-600
          mb-10
        "
      >
        CRM Platform
      </h1>

      <nav className="space-y-3">

        <Link
          to="/admin"
          className="
            block
            p-3
            rounded-lg
            hover:bg-blue-100
            transition
          "
        >
          Dashboard
        </Link>

        <Link
          to="/admin"
          className="
            block
            p-3
            rounded-lg
            hover:bg-blue-100
            transition
          "
        >
          Tickets
        </Link>

        <Link
          to="/customers"
          className="
            block
            p-3
            rounded-lg
            hover:bg-blue-100
            transition
          "
        >
          Customers
        </Link>

        <Link
          to="/agents"
          className="
            block
            p-3
            rounded-lg
            hover:bg-blue-100
            transition
          "
        >
          Agents
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;