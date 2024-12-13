import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TimeVsElementGraph = ({ data, metric, label, title, color }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      // Extract the timestamps and metric values
      const times = data.map((item) =>
        new Date(item.timestamp).toLocaleString()
      );
      const metricData = data.map((item) => parseFloat(item[metric])); // Use dynamic metric

      // Prepare chart data structure
      setChartData({
        labels: times,
        datasets: [
          {
            label: label || metric,
            data: metricData,
            borderColor: color || "rgba(75, 192, 192, 1)",
            backgroundColor: color ? `${color}0.2` : "rgba(75, 192, 192, 0.2)",
            fill: false,
            tension: 0.1,
          },
        ],
      });
    }
  }, [data, metric, label, color]);

  return (
    <div className="min-w-full min-h-[500px]">
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time",
                },
              },
              y: {
                title: {
                  display: true,
                  text: label || metric,
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: title || `${metric} Over Time`,
              },
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TimeVsElementGraph;
