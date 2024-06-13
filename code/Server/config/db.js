const mongoose = require("mongoose")

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_NAME;

exports.connectDB = async function () {
  const URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}`;
  const connectionParams = {};

  mongoose.set("strictQuery", false);

  mongoose
    .connect(URI, connectionParams)
    .then(() => console.info("Connection established"))
    .catch((err) => console.error("Error" + err.message));
};