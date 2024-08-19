import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const weatherAPIKey = process.env.WEATHER_API_KEY;
const weatherBaseURL = process.env.WEATHER_BASE_URL;
const HCMcoordinate = "10.762622,106.660172";
const sunnyReminders = [
  "Don't forget to wear sunscreen",
  "Stay hydrated",
  "Wear sunglasses",
  "Wear a hat",
];
const rainyReminders = [
  "Bring an umbrella",
  "Wear waterproof shoes",
  "Stay dry",
];
const cloudyReminders = ["Wear a light jacket", "Stay dry", "Wear a hat"];

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const weather = await axios.get(
      `${weatherBaseURL}/current.json?key=${weatherAPIKey}&q=${HCMcoordinate}`
    );
    const condition = weather.data.current.condition.text;
    const temp = weather.data.current.temp_c;
    const humidity = weather.data.current.humidity;
    const uv = weather.data.current.uv;
    const icon = weather.data.current.condition.icon;
    let reminder = [];
    if (condition.toLowerCase().includes("sunny")) {
      reminder = sunnyReminders;
    } else if (condition.toLowerCase().includes("rainy")) {
      reminder = rainyReminders;
    } else {
      reminder = cloudyReminders;
    }
    console.log(reminder);
    res.render("index.ejs", {
      condition: condition,
      temp: temp,
      humidity: humidity,
      uv: uv,
      reminder: reminder,
      icon: icon,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
