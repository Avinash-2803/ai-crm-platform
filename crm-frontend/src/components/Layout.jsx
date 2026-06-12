import LogoutButton from "./LogoutButton";
import Sidebar from "./Sidebar";

function Layout({
  title,
  children,
}) {

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        flex
      "
    >

      <Sidebar />

      <div className="flex-1">

        <nav
          className="
            bg-white
            shadow-sm
            px-8
            py-4
            flex
            justify-between
            items-center
          "
        >

          <h1
            className="
              text-2xl
              font-bold
            "
          >
            {title}
          </h1>

          <LogoutButton />

        </nav>

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>
  );
}

export default Layout;