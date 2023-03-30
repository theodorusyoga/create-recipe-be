import { Router } from "express";
import axios from "axios";

const router = Router();

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  const cleanToken = token?.replace("Bearer ", "");

  if (cleanToken === process.env.STATIC_API_KEY) {
    next();
  } else {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};

export const getCompletionChat = router.post(
  "/completions",
  authMiddleware,
  async (req, res) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        req.body,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
          },
        }
      );
      const { data } = response;
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

export const getImages = router.post(
  "/images",
  authMiddleware,
  async (req, res) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        req.body,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
          },
        }
      );
      const { data } = response;
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);
