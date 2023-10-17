const express = require("express");
const {
  createProxyMiddleware,
  createTable,
  defaultLogProvide,
} = require("http-proxy-middleware");

const compression = require("compression");
const helmet = require("helmet");

const app = express();
const port = 3000;

// Security Middleware
app.use(helmet());

// Compression Middleware
app.use(compression());

// create  proxy-table for LB

const proxyTable = createTable();

const backendServers = ["http://localhost:4000", "http://localhost:4001"];

//create proxy middle ware for each backend server

backendServers.forEach((target, index) => {
  proxyTable.use(
    `/api/${index}`,
    createProxyMiddleware({ target, changeOrigin: true })
  );
});

// Reverse Proxy Middleware
// const proxyMiddleware = createProxyMiddleware({
//   target: "http://localhost:4000", // Replace with your backend server URL
//   changeOrigin: true,
// });

app.use((req, res, next) => {
  // todo lB algo -- Round robin  who gets next??

  const target = proxyTable.get(
    `/api${proxyTable.size() % backendServers.length}`
  );
  target(req, res, next);
});

app.use("/api", proxyMiddleware); // Forward requests to /api to the backend server

// Start the server
app.listen(port, () => {
  console.log(`Reverse proxy server is running on port ${port}`);
});
