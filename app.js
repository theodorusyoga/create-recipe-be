import express from "express";
import { getCompletionChat, getImages } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

require("dotenv").config();
console.log("Loaded environment variables", process.env);

var app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/chats", getCompletionChat, getImages);

app.listen(process.env.API_PORT, () => {
  console.log(`Started on port ${process.env.API_PORT}`);
});

export default app;
