const express = require("express");
const { connection } = require("./config/db");
const dotenv = require("dotenv");
const { CounselorRouter } = require("./routes/counselor.route");
const { EnquiryRouter } = require("./routes/enquiry.route");
dotenv.config();

const PORT = process.env.PORT || 9090;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1 style='text-align:center;'>Welcome To CRM System</h1>");
});

app.use("/counselor", CounselorRouter);
app.use("/enquiries", EnquiryRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Connected to MongoDB and live at ${PORT}`);
  } catch (error) {
    console.error("Error while connecting to DB", error);
  }
});
