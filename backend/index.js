require("dotenv").config({});
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./utils/db");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const messageRouter = require("./routes/messageRoutes");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am comming from backend",
    success: true,
  });
});
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/user", userRouter);
app.use("/post", postRouter);
app.use("/message", messageRouter);
app.listen(process.env.PORT, () => {
  try {
    console.log(`Server listen at port ${process.env.PORT}`);
    connectDb();
  } catch (error) {
    console.log(error);
  }
});
