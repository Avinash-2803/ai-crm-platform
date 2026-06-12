function KPIBanner({ stats }) {

  const resolutionRate =
    stats.total_tickets === 0
      ? 0
      : Math.round(
          (
            stats.resolved_tickets /
            stats.total_tickets
          ) * 100
        );

  return (

    <div
      className="
        bg-green-100
        border
        border-green-300
        rounded-xl
        p-5
        mb-10
      "
    >

      <h2
        className="
          text-xl
          font-bold
        "
      >
        KPI Summary
      </h2>

      <p className="mt-2">

        Resolution Rate:

        <span
          className="
            font-bold
            ml-2
          "
        >
          {resolutionRate}%
        </span>

      </p>

    </div>

  );
}

export default KPIBanner;