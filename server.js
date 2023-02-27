const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Uncaught Exception Sync
process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

// console.log(process.env);

// 4) START SERVER
const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Promise Rejection
process.on("unhandledRejection", err => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
