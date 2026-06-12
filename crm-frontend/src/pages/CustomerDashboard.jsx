import { useEffect, useState } from "react";
import api from "../services/api";
import LogoutButton from "../components/LogoutButton";

function CustomerDashboard() {

  const [tickets, setTickets] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [priority,
    setPriority] =
    useState("LOW");

  const fetchTickets =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "access"
          );

        const response =
          await api.get(
            "tickets/",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTickets(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchTickets();

  }, []);

  const createTicket =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "access"
          );

        await api.post(
          "tickets/",
          {
            title,
            description,
            priority,
            customer: 34
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Ticket Created"
        );

        setTitle("");
        setDescription("");
        setPriority("LOW");

        fetchTickets();

      } catch (error) {

        console.log(error);

        console.log(
          error.response?.data
        );

        alert(
          JSON.stringify(
            error.response?.data
          )
        );

      }

    };

  const totalTickets =
    tickets.length;

  const openTickets =
    tickets.filter(
      (t) =>
        t.status === "OPEN"
    ).length;

  const inProgressTickets =
    tickets.filter(
      (t) =>
        t.status ===
        "IN_PROGRESS"
    ).length;

  const resolvedTickets =
    tickets.filter(
      (t) =>
        t.status ===
        "RESOLVED"
    ).length;

  const getStatusColor =
    (status) => {

      switch (status) {

        case "OPEN":
          return "bg-red-100 text-red-700";

        case "IN_PROGRESS":
          return "bg-yellow-100 text-yellow-700";

        case "RESOLVED":
          return "bg-green-100 text-green-700";

        case "CLOSED":
          return "bg-gray-100 text-gray-700";

        default:
          return "bg-blue-100 text-blue-700";

      }

    };

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-6
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Customer Dashboard
        </h1>

        <LogoutButton />

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
          mb-8
        "
      >

        <div
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
          "
        >

          <h3
            className="
              text-gray-500
            "
          >
            Total Tickets
          </h3>

          <p
            className="
              text-3xl
              font-bold
            "
          >
            {totalTickets}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
          "
        >

          <h3
            className="
              text-gray-500
            "
          >
            Open
          </h3>

          <p
            className="
              text-3xl
              font-bold
              text-red-600
            "
          >
            {openTickets}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
          "
        >

          <h3
            className="
              text-gray-500
            "
          >
            In Progress
          </h3>

          <p
            className="
              text-3xl
              font-bold
              text-yellow-600
            "
          >
            {inProgressTickets}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
          "
        >

          <h3
            className="
              text-gray-500
            "
          >
            Resolved
          </h3>

          <p
            className="
              text-3xl
              font-bold
              text-green-600
            "
          >
            {resolvedTickets}
          </p>

        </div>

      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          mb-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          Create New Ticket
        </h2>

        <form
          onSubmit={
            createTicket
          }
          className="
            grid
            gap-4
          "
        >

          <input
            type="text"
            placeholder="Ticket Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="
              border
              rounded-lg
              p-3
            "
          />

          <textarea
            placeholder="Describe your issue"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              border
              rounded-lg
              p-3
              h-32
            "
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
              border
              rounded-lg
              p-3
            "
          >

            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>

          </select>

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              rounded-lg
              p-3
              hover:bg-blue-700
            "
          >
            Create Ticket
          </button>

        </form>

      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          My Tickets
        </h2>

        {
          tickets.length === 0 ? (

            <p>
              No tickets found
            </p>

          ) : (

            tickets.map(
              (ticket) => (

                <div
                  key={ticket.id}
                  className="
                    border
                    rounded-xl
                    p-4
                    mb-4
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      mb-2
                    "
                  >

                    <h3
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      {
                        ticket.title
                      }
                    </h3>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${getStatusColor(
                          ticket.status
                        )}
                      `}
                    >
                      {
                        ticket.status
                      }
                    </span>

                  </div>

                  <p
                    className="
                      text-gray-600
                      mb-3
                    "
                  >
                    {
                      ticket.description
                    }
                  </p>

                  <div
                    className="
                      grid
                      md:grid-cols-2
                      gap-2
                      text-sm
                    "
                  >

                    <p>
                      <strong>
                        Priority:
                      </strong>{" "}
                      {
                        ticket.priority
                      }
                    </p>

                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {
                        ticket.category ||
                        "General"
                      }
                    </p>

                    <p>
                      <strong>
                        Assigned Agent:
                      </strong>{" "}
                      {
                        ticket.assigned_agent ||
                        "Not Assigned"
                      }
                    </p>

                    <p>
                      <strong>
                        Created:
                      </strong>{" "}
                      {
                        ticket.created_at
                          ? new Date(
                              ticket.created_at
                            ).toLocaleDateString()
                          : "-"
                      }
                    </p>

                  </div>

                </div>

              )
            )

          )
        }

      </div>

    </div>

  );

}

export default CustomerDashboard;