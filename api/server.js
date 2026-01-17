"use strict";

const path = require("path");
const express = require("express");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3185;

app.use(express.json({ limit: "1mb" }));
app.use("/api", routes);
app.use("/", express.static(path.join(__dirname, "..", "web")));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});
