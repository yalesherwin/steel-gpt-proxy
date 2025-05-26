const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// ✅ 你提供的 API Key（只能在服务器使用，不能放前端）
const OPENAI_API_KEY = "sk-wzPDV2SYX2ARnaZSk91UAZ2DKZhnWEX2g1JzlkfhGTxpaTa0";

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("OpenAI API 调用失败：", error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI 请求失败" });
  }
});

app.listen(port, () => {
  console.log(`⚡ 中转服务器运行中: http://localhost:${port}`);
});
