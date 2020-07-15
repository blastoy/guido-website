require('dotenv').config()

const express = require("express");
const history = require("connect-history-api-fallback");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const staticFileMiddleware = express.static("dist");
const historyMiddleware = history();

app.use(staticFileMiddleware);

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) next();
  else historyMiddleware(req, res, next);
});

app.use(staticFileMiddleware); // double is intentional

app.get("/api/me", (res) => {
  MongoClient(process.env.DB_CONN, (err, client) => {
    if (err) throw err;
    const db = client.db("personal");
    db.collection("users").find({ key: "guidoruiz" }, (err, me) => {
      if (err) throw err;
      res.json(me);
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server listening on port ${port}!`);
});
