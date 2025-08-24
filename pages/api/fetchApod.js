import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.NASA_API_KEY || "DEMO_KEY"; // Replace DEMO_KEY with your NASA API key
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("APOD API error:", error.message);
    res.status(500).json({ error: "Failed to fetch APOD data." });
  }
}
