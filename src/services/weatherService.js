import axios from "axios";

const API_KEY = "4eb241b7af83393993d52117f98abaad";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
