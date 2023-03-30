import express from "express";
import { getCompletionChat } from "./routes";
import cookieParser from "cookie-parser";

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", getCompletionChat);

app.listen(3001, () => {
  console.log(`Started on port 3001`);
});

export default app;
