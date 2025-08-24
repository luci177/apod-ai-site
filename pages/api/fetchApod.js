import axios from "axios";
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const nasaRes = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );

    const { title, url, explanation, date } = nasaRes.data;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const aiRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `
            Write a 2-3 sentence engaging description of this astronomy image
            for a website visitor. Include interesting facts in simple language.
            Title: ${title}
            Date: ${date}
            NASA explanation: ${explanation}
          `,
        },
      ],
    });

    const aiDescription = aiRes.choices[0].message.content;

    res.status(200).json({ title, url, aiDescription, date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch APOD or generate description" });
  }
}
