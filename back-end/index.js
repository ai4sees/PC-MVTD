const express = require("express");
const cors = require("cors");
const axios = require("axios");
const csvParser = require("csv-parser");
const { PassThrough } = require("stream");

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Update this with your frontend URL
  })
);

app.get("/fetch-csv", async (req, res) => {
  const { fileId, maxRows = 100 } = req.query; // Accept file ID and maxRows from the client

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

    // Stream and parse the CSV file
    const csvStream = new PassThrough();
    fileResponse.data.pipe(csvStream);

    const results = [];
    let rowCount = 0;

    csvStream
      .pipe(csvParser())
      .on("data", (row) => {
        rowCount++;
        if (results.length < maxRows) {
          results.push(row);
        }
      })
      .on("end", () => {
        console.log(`Successfully parsed ${rowCount} rows.`);
        res.json(results); // Send the parsed rows as JSON
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
