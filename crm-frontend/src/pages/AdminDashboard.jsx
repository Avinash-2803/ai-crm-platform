import { useEffect, useState } from "react";
import api from "../services/api";
import AICategoryChart from "../components/AICategoryChart";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import AnalyticsChart from "../components/AnalyticsChart";
import TicketPieChart from "../components/TicketPieChart";
import KPIBanner from "../components/KPIBanner";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

const [statusFilter, setStatusFilter] =
  useState("");

const [priorityFilter, setPriorityFilter] =
  useState("");

const [sortOrder, setSortOrder] =
  useState("latest");

  const token = localStorage.getItem("access");

  const fetchDashboard = async () => {

    try {

      const response = await api.get(
        "tickets/dashboard/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchTickets = async () => {

    try {

      const response = await api.get(
        "tickets/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchAgents = async () => {

    try {

      const response = await api.get(
        "agents/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const assignAgent = async (
    ticketId,
    agentId
  ) => {

    try {

      await api.post(
        `tickets/${ticketId}/assign_agent/`,
        {
          agent_id: agentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Agent Assigned");

      fetchTickets();

    } catch (error) {

      console.log(error);

      alert("Assignment Failed");

    }

  };

  useEffect(() => {

    fetchDashboard();

    fetchTickets();

    fetchAgents();

  }, []);

  const filteredTickets = tickets
  .filter((ticket) => {

    const matchesSearch =
      ticket.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      ticket.description
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      !statusFilter ||
      ticket.status === statusFilter;

    const matchesPriority =
      !priorityFilter ||
      ticket.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );

  })
  .sort((a, b) => {

    if (sortOrder === "latest") {

      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      );

    }

    return (
      new Date(a.created_at) -
      new Date(b.created_at)
    );

  });

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout title="Admin Dashboard">

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          mb-10
        "
      >

        <StatCard
          title="Customers"
          value={stats.total_customers}
        />

        <StatCard
          title="Tickets"
          value={stats.total_tickets}
        />

        <StatCard
          title="Open"
          value={stats.open_tickets}
        />

        <StatCard
          title="In Progress"
          value={stats.in_progress_tickets}
        />

        <StatCard
          title="Resolved"
          value={stats.resolved_tickets}
        />

        <StatCard
          title="Closed"
          value={stats.closed_tickets}
        />

       </div>
       
       <KPIBanner
  stats={stats}
/>

<div className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-6
    mb-10
  ">


<AnalyticsChart
  stats={stats}
/>

<TicketPieChart
  stats={stats}
/>

<div className="mb-10">

  <AICategoryChart
    stats={stats}
  />

</div>
</div>
      
      <div
  className="
    bg-white
    rounded-xl
    shadow-md
    p-4
    mb-6
  "
>

  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-4
      gap-4
    "
  >

    <input
      type="text"
      placeholder="Search tickets..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(
          e.target.value
        )
      }
      className="
        border
        rounded-lg
        p-2
      "
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(
          e.target.value
        )
      }
      className="
        border
        rounded-lg
        p-2
      "
    >

      <option value="">
        All Statuses
      </option>

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

    <select
      value={priorityFilter}
      onChange={(e) =>
        setPriorityFilter(
          e.target.value
        )
      }
      className="
        border
        rounded-lg
        p-2
      "
    >

      <option value="">
        All Priorities
      </option>

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

    <select
      value={sortOrder}
      onChange={(e) =>
        setSortOrder(
          e.target.value
        )
      }
      className="
        border
        rounded-lg
        p-2
      "
    >

      <option value="latest">
        Latest First
      </option>

      <option value="oldest">
        Oldest First
      </option>

    </select>

  </div>

</div>

      <h2 className="text-2xl font-bold mb-6">
        All Tickets
      </h2>

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          overflow-x-auto
        "
      >

        <table className="w-full">

          <thead>

            <tr
              className="
                bg-gray-100
                border-b
              "
            >

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                 Category
              </th>

              <th className="p-4 text-left">
                 Priority
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Assigned Agent
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTickets.map((ticket) => (

              <tr
                key={ticket.id}
                className="
                  border-b
                  hover:bg-gray-50
                "
              >

                <td className="p-4">
                  {ticket.id}
                </td>

                <td className="p-4">

                  <div className="font-semibold">
                    {ticket.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {ticket.description}
                  </div>

                </td>

                <td className="p-4">

  <span
    className="
      px-3
      py-1
      rounded-full
      bg-indigo-100
      text-indigo-700
      text-sm
      font-semibold
    "
  >
    {ticket.category || "General"}
  </span>

</td>

<td className="p-4">

  <span
    className={
      ticket.priority === "HIGH"
        ? "text-red-600 font-bold"
        : ticket.priority === "MEDIUM"
        ? "text-yellow-600 font-bold"
        : "text-green-600 font-bold"
    }
  >
    {ticket.priority}
  </span>

</td>

<td className="p-4">

  <StatusBadge
    status={ticket.status}
  />

</td>

<td className="p-4">

  {ticket.assigned_agent
    ? ticket.assigned_agent
    : "None"}

</td>

                <td className="p-4">

  <div className="flex gap-2">

    <button
      onClick={() =>
        window.location.href =
          `/tickets/${ticket.id}`
      }
      className="
        bg-blue-600
        text-white
        px-3
        py-2
        rounded-lg
      "
    >
      View
    </button>

    {!ticket.assigned_agent ? (

      <select
        className="
          border
          rounded-lg
          p-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
        onChange={(e) =>
          assignAgent(
            ticket.id,
            e.target.value
          )
        }
      >

        <option value="">
          Select Agent
        </option>

        {agents.map((agent) => (

          <option
            key={agent.id}
            value={agent.id}
          >
            {agent.username}
          </option>

        ))}

      </select>

    ) : (

      <span
        className="
          text-green-600
          font-semibold
          self-center
        "
      >
        Assigned
      </span>

    )}

  </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default AdminDashboard;