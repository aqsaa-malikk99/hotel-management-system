const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();

connectDB();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
app.listen(PORT, () => console.log(`Server is running @localhost ${PORT}`));
