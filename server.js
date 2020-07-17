require("dotenv").config();

const path = require("path");
const express = require("express");
const history = require("connect-history-api-fallback");
const { MongoClient } = require("mongodb");

const app = express();

const staticFileMiddleware = express.static(path.join(__dirname, "dist"));
const historyMiddleware = history();

app.use(staticFileMiddleware);

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) next();
  else historyMiddleware(req, res, next);
});

app.use(staticFileMiddleware); // double is intentional

app.get("/api/me", (_, res) => {
  MongoClient.connect(process.env.DB_CONN, (err, db) => {
    if (err) throw err;
    var dbo = db.db("personal");
    dbo.collection("users").findOne({ key: "guidoruiz" }, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server listening on port ${port}!`);
});
