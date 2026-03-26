import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import AuthRoutes from "./routes/auth.route.js";
import MessageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", () => {
  res.send("Hello World");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
