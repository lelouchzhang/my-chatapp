import express from "express";
import AuthRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", () => {
  res.send("Hello World");
});

app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
