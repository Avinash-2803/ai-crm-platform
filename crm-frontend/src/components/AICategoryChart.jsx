import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AICategoryChart({ stats }) {

  const data = [
    {
      name: "Billing",
      value: Number(
        stats.billing_tickets || 0
      ),
    },
    {
      name: "Technical",
      value: Number(
        stats.technical_tickets || 0
      ),
    },
    {
      name: "Product",
      value: Number(
        stats.product_tickets || 0
      ),
    },
    {
      name: "Delivery",
      value: Number(
        stats.delivery_tickets || 0
      ),
    },
    {
      name: "Account",
      value: Number(
        stats.account_tickets || 0
      ),
    },
    {
      name: "General",
      value: Number(
        stats.general_tickets || 0
      ),
    },
  ].filter(
    (item) => item.value > 0
  );

  console.log(
    "AI CATEGORY DATA:",
    data
  );

  const COLORS = [
    "#2563eb", // Billing
    "#16a34a", // Technical
    "#dc2626", // Product
    "#ca8a04", // Delivery
    "#7c3aed", // Account
    "#6b7280", // General
  ];

  return (
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
          text-xl
          font-bold
          mb-6
        "
      >
        AI Ticket Categories
      </h2>

      {data.length === 0 ? (

        <div
          className="
            text-center
            text-gray-500
            py-20
          "
        >
          No categorized tickets found
        </div>

      ) : (

        <div
          style={{
            width: "100%",
            height: "400px",
          }}
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ name, value }) =>
                  `${name}: ${value}`
                }
              >

                {data.map(
                  (_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>
  );
}

export default AICategoryChart;