import { Router } from "express";
import axios from "axios";
import { body, validationResult } from "express-validator";

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
  body("ingredients").isArray().withMessage("Ingredients must be an array"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { ingredients } = req.body;
      const ingredientStr = ingredients.join(", ");
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `give me a recipe that I can make using: ${ingredientStr}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
          },
        }
      );
      const { data } = response;
      return res.status(200).send(data);
    } catch (e) {
      console.log("Error", e);
      return res.status(500).send(e);
    }
  }
);

export const getImages = router.post(
  "/images",
  authMiddleware,
  body("prompt").isString().withMessage("Prompt must be a string"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { prompt } = req.body;
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt,
          n: 2,
          size: "512x512",
        },
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
