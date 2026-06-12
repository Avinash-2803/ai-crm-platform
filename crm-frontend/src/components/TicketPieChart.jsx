import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function TicketPieChart({ stats }) {

  const data = [

    {
      name: "Open",
      value: stats.open_tickets,
    },

    {
      name: "In Progress",
      value: stats.in_progress_tickets,
    },

    {
      name: "Resolved",
      value: stats.resolved_tickets,
    },

    {
      name: "Closed",
      value: stats.closed_tickets,
    },

  ];

  const COLORS = [
    "#facc15",
    "#3b82f6",
    "#22c55e",
    "#6b7280",
  ];

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        mb-10
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Ticket Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
             label={({ name, value }) =>
    `${name} (${value})`
  }
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[index]
                }
              />

            ))}

          </Pie>

          <Tooltip />
          <Legend/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}

export default TicketPieChart;