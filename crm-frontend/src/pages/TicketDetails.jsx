import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../services/api";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";

function TicketDetails() {

  const { id } = useParams();

  const [ticket, setTicket] =
    useState(null);

  const [activities, setActivities] =
    useState([]);

  const token =
    localStorage.getItem("access");

  const fetchTicket =
    async () => {

      try {

        const response =
          await api.get(
            `tickets/${id}/`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTicket(
          response.data
        );

      } catch (error) {

        console.log(
          "ERROR:",
          error
        );

        console.log(
          "RESPONSE:",
          error.response?.data
        );

      }

    };

  const fetchActivities =
    async () => {

      try {

        const response =
          await api.get(
            `tickets/${id}/activities/`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setActivities(
          response.data
        );

      } catch (error) {

        console.log(
          "Activities Error:",
          error
        );

      }

    };

  useEffect(() => {

    fetchTicket();

    fetchActivities();

  }, []);

  if (!ticket) {

    return (
      <Layout title="Ticket Details">
        <h2>Loading...</h2>
      </Layout>
    );

  }

  return (

    <Layout title="Ticket Details">

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
            text-3xl
            font-bold
            mb-4
          "
        >
          {ticket.title}
        </h2>

        <p
          className="
            text-gray-600
            mb-6
          "
        >
          {ticket.description}
        </p>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >

          <p>
            <strong>ID:</strong>{" "}
            {ticket.id}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {ticket.category}
          </p>

          <p>
            <strong>Priority:</strong>{" "}
            {ticket.priority}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <StatusBadge
              status={ticket.status}
            />
          </p>

          <p>
            <strong>Customer:</strong>{" "}
            {ticket.customer}
          </p>

          <p>
            <strong>Assigned Agent:</strong>{" "}
            {
              ticket.assigned_agent ||
              "None"
            }
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {
              new Date(
                ticket.created_at
              ).toLocaleString()
            }
          </p>

          <p>
            <strong>Updated:</strong>{" "}
            {
              new Date(
                ticket.updated_at
              ).toLocaleString()
            }
          </p>

        </div>

      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          mt-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Activity Timeline
        </h2>

        {
          activities.length === 0 ? (

            <p
              className="
                text-gray-500
              "
            >
              No activity found
            </p>

          ) : (

            activities.map(
              (
                activity
              ) => (

                <div
                  key={
                    activity.id
                  }
                  className="
                    border-l-4
                    border-blue-500
                    pl-4
                    mb-5
                  "
                >

                  <p
                    className="
                      font-semibold
                    "
                  >
                    {
                      activity.activity
                    }
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    {
                      new Date(
                        activity.created_at
                      ).toLocaleString()
                    }
                  </p>

                </div>

              )
            )

          )
        }

      </div>

    </Layout>

  );

}

export default TicketDetails;