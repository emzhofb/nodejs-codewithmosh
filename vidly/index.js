const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
// const config = require("config");
// const startupDebugger = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const debug = require("debug")("app:startup");
const genres = require("./routes/genres");
const home = require("./routes/home");

const express = require("express");
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use("/api/genres", genres);
app.use("/", home);

// Pug
app.set("view engine", "pug");
app.set("views", "./views"); // by default

// configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // startupDebugger("Morgan enabled....");
  debug("Morgan enabled....");
}

// DB work....
// dbDebugger("Connected to Databases....");

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));
