import axios from "axios";
import { useState, useEffect } from "react";
import TimeVsElementGraph from "../../GenerateGraphs/TimeVsElementGraph/TimeVsElementGraph";
import DataVsAnomaliesGraph from "../../GenerateGraphs/DataVsAnomaliesGraph/DataVsAnomaliesGraph";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ParseCSV = async () => {
    setLoading(true);
    const fileId = "1Xy5X4U-wDxtJhcQEpH8V0H7IGFBgKQqi"; // File ID to send
    const maxRows = 200;

    try {
      const response = await axios.get(
        `http://localhost:5000/fetch-csv?fileId=${fileId}&maxRows=${maxRows}`
      );
      setData(response.data); // Set the data fetched from the backend
      setLoading(false);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch CSV data.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-5">
      <h2 className="text-center font-bold text-5xl mb-10">
        Get Data to Analyse your Machine
      </h2>
      <div className="text-center">
        <button onClick={ParseCSV} className="btn btn-primary text-2xl">
          Get data
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {/* Display error if any */}
      <div className="w-full">
        {loading && <p>Loading .......</p>}
        {data.length > 0 && (
          <table className="hidden table-auto w-full mt-10 border-collapse border border-gray-300">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border border-gray-400 px-4 py-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border border-gray-400 px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Render TimeVsElementGraph for various metrics */}
        <TimeVsElementGraph
          data={data}
          metric="cpu_temperature"
          label="CPU Temperature (°C)"
          title="CPU Temperature Over Time"
          color="rgba(255, 99, 132, 1)"
        />
        <TimeVsElementGraph
          data={data}
          metric="cpu_usage"
          label="CPU Usage (%)"
          title="CPU Usage Over Time"
          color="rgba(54, 162, 235, 1)"
        />
        <TimeVsElementGraph
          data={data}
          metric="battery_level"
          label="Battery Level (%)"
          title="Battery Level Over Time"
          color="rgba(75, 192, 192, 1)"
        />
        <TimeVsElementGraph
          data={data}
          metric="cpu_load"
          label="CPU Load"
          title="CPU Load Over Time"
          color="rgba(153, 102, 255, 1)"
        />
        <TimeVsElementGraph
          data={data}
          metric="memory_usage"
          label="Memory Usage (%)"
          title="Memory Usage Over Time"
          color="rgba(255, 159, 64, 1)"
        />
        <TimeVsElementGraph
          data={data}
          metric="cpu_power"
          label="CPU Power (W)"
          title="CPU Power Over Time"
          color="rgba(255, 99, 132, 1)"
        />
        <DataVsAnomaliesGraph
          data={data}
          property="cpu_temperature"
          label="CPU Temperature (°C)"
          yLabel="CPU Temperature (°C)"
          normalColor="rgba(54, 162, 235, 1)" // Blue
        />

        <DataVsAnomaliesGraph
          data={data}
          property="cpu_load"
          label="CPU Load"
          yLabel="CPU Load (%)"
          normalColor="rgba(75, 192, 192, 1)" // Green
        />

        <DataVsAnomaliesGraph
          data={data}
          property="memory_usage"
          label="Memory Usage (%)"
          yLabel="Memory Usage (%)"
          normalColor="rgba(153, 102, 255, 1)" // Purple
        />

        <DataVsAnomaliesGraph
          data={data}
          property="cpu_power"
          label="CPU Power (W)"
          yLabel="CPU Power (W)"
          normalColor="rgba(255, 159, 64, 1)" // Orange
        />

        <DataVsAnomaliesGraph
          data={data}
          property="battery_level"
          label="Battery Level (%)"
          yLabel="Battery Level (%)"
          normalColor="rgba(54, 162, 235, 1)" // Blue
        />

        <DataVsAnomaliesGraph
          data={data}
          property="cpu_usage"
          label="CPU Usage (%)"
          yLabel="CPU Usage (%)"
          normalColor="rgba(255, 205, 86, 1)" // Yellow
        />
      </div>
    </div>
  );
};

export default Dashboard;
