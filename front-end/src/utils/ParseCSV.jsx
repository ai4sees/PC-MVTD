export const ParseCSV = async () => {
  try {
    const response = await fetch("http://localhost:5000/fetch-csv");
    console.log(response);
    const data = await response.json();
    console.log(data); // First 100 rows in JSON format
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
