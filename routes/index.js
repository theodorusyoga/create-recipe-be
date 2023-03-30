import { Router } from "express";
import axios from "axios";

const router = Router();
const API_KEY = "xxx";
const STATIC_API_KEY = "bd7a997a-8762-47fb-92de-b3b88bf4a0ea";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  const cleanToken = token?.replace("Bearer ", "");

  if (cleanToken === STATIC_API_KEY) {
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
            Authorization: `Bearer ${API_KEY}`,
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
            Authorization: `Bearer ${API_KEY}`,
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
