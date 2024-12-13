import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataVsAnomaliesGraph = ({
  data,
  property,
  label,
  yLabel,
  normalColor,
}) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  // Extract timestamps and filter out null or undefined values
  const timestamps = data.map((d) => d.timestamp || "Unknown");

  // Filter and map the data points for the selected property
  const propertyData = data
    .map((d) => parseFloat(d[property])) // Parse numeric values for the selected property
    .map((value) => (isNaN(value) ? null : value)); // Replace invalid numbers with null

  if (propertyData.every((value) => value === null))
    return <p>No valid data available</p>;

  // Calculate the mean and standard deviation for the valid data points
  const validData = propertyData.filter((value) => value !== null);
  const mean =
    validData.reduce((sum, value) => sum + value, 0) / validData.length;
  const stdDev = Math.sqrt(
    validData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      validData.length
  );

  const lowerThreshold = mean - 2 * stdDev;
  const upperThreshold = mean + 2 * stdDev;

  // Assign colors based on whether the data is within the threshold or not
  const pointColors = propertyData.map((value) =>
    value === null || value > upperThreshold || value < lowerThreshold
      ? "rgba(255, 99, 132, 1)" // Anomalous points are red
      : normalColor
  );

  // Data to be plotted in the chart
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: label,
        data: propertyData,
        backgroundColor: pointColors,
        borderColor: normalColor,
        borderWidth: 2,
        pointRadius: 5,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const isAnomaly =
              value === null || value > upperThreshold || value < lowerThreshold
                ? " (Anomaly)"
                : "";
            return `${label}: ${value !== null ? value : "N/A"}${isAnomaly}`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: yLabel } },
      x: { title: { display: true, text: "Timestamp" } },
    },
  };

  return (
    <div className="my-5">
      <h3 className="text-xl font-bold text-center mb-4">{label}</h3>
      <Line data={chartData} options={options} />
      <p className="text-center mt-2">
        Threshold: {lowerThreshold.toFixed(2)} - {upperThreshold.toFixed(2)}
      </p>
    </div>
  );
};

export default DataVsAnomaliesGraph;
