import { useEffect, useState } from "react";
import api from "../services/api";
import LogoutButton from "../components/LogoutButton";

function AgentDashboard() {

  const [tickets, setTickets] =
    useState([]);

  const fetchTickets =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "access"
          );

        const response =
          await api.get(
            "tickets/my_tickets/",
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

  const updateStatus =
    async (
      ticketId,
      newStatus
    ) => {

      try {

        const token =
          localStorage.getItem(
            "access"
          );

        await api.post(
          `tickets/${ticketId}/update_status/`,
          {
            status: newStatus,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Status Updated"
        );

        fetchTickets();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Update Status"
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
          Agent Dashboard
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
            p-6
            rounded-xl
            shadow-md
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
            p-6
            rounded-xl
            shadow-md
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
            p-6
            rounded-xl
            shadow-md
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
            p-6
            rounded-xl
            shadow-md
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
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Assigned Tickets
        </h2>

        {
          tickets.length === 0 ? (

            <p>
              No tickets assigned
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
                      className="
                        bg-blue-100
                        text-blue-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      {
                        ticket.priority
                      }
                    </span>

                  </div>

                  <p
                    className="
                      text-gray-600
                      mt-2
                    "
                  >
                    {
                      ticket.description
                    }
                  </p>

                  <div
                    className="
                      mt-4
                    "
                  >

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {
                        ticket.status
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

                  </div>

                  <select
                    value={
                      ticket.status
                    }
                    onChange={(e) =>
                      updateStatus(
                        ticket.id,
                        e.target.value
                      )
                    }
                    className="
                      mt-4
                      border
                      rounded-lg
                      p-2
                    "
                  >

                    <option value="OPEN">
                      OPEN
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="RESOLVED">
                      RESOLVED
                    </option>

                    <option value="CLOSED">
                      CLOSED
                    </option>

                  </select>

                </div>

              )
            )

          )
        }

      </div>

    </div>

  );

}

export default AgentDashboard;