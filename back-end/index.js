const express = require("express");
const cors = require("cors");
const axios = require("axios");
const csvParser = require("csv-parser");
const { PassThrough } = require("stream");

const app = express();

// CORS setup
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // Update this with your frontend URL
  })
);

app.get("/fetch-csv", async (req, res) => {
  const { fileId, maxRows = 100, startIndex = 0 } = req.query; // Accept file ID and maxRows from the client
  // console.log(fileId, maxRows, startIndex);
  if (!fileId) {
    return res.status(400).send("Missing 'fileId' query parameter.");
  }

  const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    // Request to get the file from Google Drive
    const fileResponse = await axios.get(fileUrl, {
      maxRedirects: 5, // Allow sufficient redirects
      responseType: "stream",
      timeout: 60000,
    });

    // Set the response headers to handle chunked transfer encoding
    res.setHeader("Content-Type", "application/json");
    res.flushHeaders(); // Start sending data immediately

    // Stream and parse the CSV file
    const csvStream = new PassThrough();
    fileResponse.data.pipe(csvStream);

    let rowCount = 0;
    let sentCount = 0;

    csvStream
      .pipe(csvParser())
      .on("data", (row) => {
        rowCount++;
        // Skip rows until we reach the startIndex
        if (rowCount <= startIndex) return;

        // Send only up to maxRows rows
        if (sentCount < maxRows) {
          res.write(JSON.stringify(row) + "\n");
          sentCount++;
        }
      })
      .on("end", () => {
        console.log(
          `Successfully streamed ${sentCount} rows starting from index ${startIndex}.`
        );
        res.end(); // End the response when parsing is done
      })
      .on("error", (error) => {
        console.error("Error parsing CSV:", error.message);
        res.status(500).send("Error parsing CSV.");
      });
  } catch (error) {
    if (error.response) {
      console.error(
        `Error fetching file: ${error.message}, Status Code: ${error.response.status}`
      );
      res
        .status(500)
        .send(
          `Failed to fetch file from Google Drive. Status Code: ${error.response.status}`
        );
    } else {
      console.error("Error fetching file:", error.message);
      res.status(500).send("Failed to fetch file from Google Drive.");
    }
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// const express = require("express");
// const cors = require("cors");
// const { spawn } = require("child_process");
// const path = require("path");

// const app = express();

// // CORS setup
// app.use(
//   cors({
//     origin: ["http://localhost:5174", "http://localhost:5173"], // Frontend URLs
//   })
// );

// // Endpoint to fetch system monitoring data
// app.get("/monitor-system", async (req, res) => {
//   const duration = req.query.duration || 60; // Default duration: 60 seconds

//   try {
//     // Determine Python executable path
//     const pythonPath =
//       "C:/Users/RedmiBook/AppData/Local/Programs/Python/Python312/python.exe" ||
//       "python";

//     // Python script path
//     const scriptPath = path.resolve(__dirname, "./scripts/monitor.py");

//     // Spawn Python process
//     const pythonProcess = spawn(pythonPath, [scriptPath, duration.toString()]);

//     let dataBuffer = "";

//     // Collect script output
//     pythonProcess.stdout.on("data", (data) => {
//       dataBuffer += data.toString();
//     });

//     // Handle script completion
//     pythonProcess.on("close", (code) => {
//       if (code === 0) {
//         try {
//           const jsonData = JSON.parse(dataBuffer);
//           res.json(jsonData); // Send JSON data to the client
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//           res.status(500).send("Error parsing Python script output.");
//         }
//       } else {
//         console.error(`Python script exited with code: ${code}`);
//         res.status(500).send("Python script exited with an error.");
//       }
//     });

//     // Handle errors
//     pythonProcess.stderr.on("data", (error) => {
//       console.error("Error from Python script:", error.toString());
//     });
//   } catch (error) {
//     console.error("Error starting Python script:", error);
//     res.status(500).send("Failed to start Python script.");
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
