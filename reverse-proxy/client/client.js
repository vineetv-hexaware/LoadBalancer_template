const axios = require("axios");

// Define the URL of your reverse proxy
const reverseProxyUrl = "http://localhost:3000";

// Define the API endpoint you want to request through the reverse proxy
const apiEndpoint = "/api/data";

// Make a GET request to the reverse proxy
axios
  .get(reverseProxyUrl + apiEndpoint)
  .then((response) => {
    console.log("Response from the reverse proxy:");
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
