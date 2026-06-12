import { useEffect, useState } from "react";

import api from "../services/api";
import Layout from "../components/Layout";

function Agents() {

  const [agents, setAgents] =
    useState([]);

  const [tickets, setTickets] =
    useState([]);

  const token =
    localStorage.getItem("access");

  const fetchAgents = async () => {

    try {

      const response =
        await api.get(
          "agents/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setAgents(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchTickets = async () => {

    try {

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

    fetchAgents();
    fetchTickets();

  }, []);

  const getAgentStats = (
    agentId
  ) => {

    const assignedTickets =
      tickets.filter(
        (ticket) =>
          ticket.assigned_agent ===
          agentId
      );

    const openTickets =
      assignedTickets.filter(
        (ticket) =>
          ticket.status ===
          "OPEN"
      ).length;

    const inProgressTickets =
      assignedTickets.filter(
        (ticket) =>
          ticket.status ===
          "IN_PROGRESS"
      ).length;

    const resolvedTickets =
      assignedTickets.filter(
        (ticket) =>
          ticket.status ===
          "RESOLVED"
      ).length;

    const totalAssigned =
      assignedTickets.length;

    const performance =
      totalAssigned > 0
        ? Math.round(
            (
              resolvedTickets /
              totalAssigned
            ) * 100
          )
        : 0;

    return {
      totalAssigned,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      performance,
    };

  };

  return (

    <Layout title="Agent Management">

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
        "
      >

        <table
          className="w-full"
        >

          <thead>

            <tr
              className="
                bg-gray-100
              "
            >

              <th className="p-4">
                ID
              </th>

              <th className="p-4">
                Agent
              </th>

              <th className="p-4">
                Assigned
              </th>

              <th className="p-4">
                Open
              </th>

              <th className="p-4">
                In Progress
              </th>

              <th className="p-4">
                Resolved
              </th>

              <th className="p-4">
                Performance
              </th>

            </tr>

          </thead>

          <tbody>

            {agents.map(
              (agent) => {

                const stats =
                  getAgentStats(
                    agent.id
                  );

                return (

                  <tr
                    key={
                      agent.id
                    }
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >

                    <td className="p-4">
                      {agent.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {agent.username}
                    </td>

                    <td className="p-4">
                      {
                        stats.totalAssigned
                      }
                    </td>

                    <td className="p-4">
                      {
                        stats.openTickets
                      }
                    </td>

                    <td className="p-4">
                      {
                        stats.inProgressTickets
                      }
                    </td>

                    <td className="p-4">
                      {
                        stats.resolvedTickets
                      }
                    </td>

                    <td className="p-4">

                      <span
                        className="
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          font-semibold
                        "
                      >
                        {
                          stats.performance
                        }%
                      </span>

                    </td>

                  </tr>

                );

              }
            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );
}

export default Agents;