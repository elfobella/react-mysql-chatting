import express from "express";
import authRouter from "./router/auth.js";
import userRouter from "./router/users.js";
import messageRouter from "./router/messages.js";
import postRouter from "./router/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT_URL || 8800;

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", messageRouter);
app.use("/api/v1", postRouter);

app.listen(PORT, () => {
  console.log("Connected");
});
