const express = require("express");
const app = express();
const port = 4000;

app.get("/api/data", (req, res) => {
  // Simulate data retrieval or processing
  const data = {
    message: "This is data from your backend server.",
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
