import express from "express";
import { getCompletionChat, getImages } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

var app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/chats", getCompletionChat, getImages);

app.listen(3001, () => {
  console.log(`Started on port 3001`);
});

export default app;
