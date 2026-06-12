import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ stats }) {

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
        Ticket Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;