import { Router } from "express";

const router = Router();

export const getCompletionChat = router.get("/completion", (req, res) => {
  return res.status(200).send({ hello: "hello" });
});
