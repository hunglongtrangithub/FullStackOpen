import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_API_KEY;
console.log(api_key);
const getWeatherInCapital = (country) => {
  return axios
    .get(`${baseUrl}?q=${country.capital[0]}&appid=${api_key}&units=metric`)
    .then((response) => {
      return response.data;
    });
};

export default { getWeatherInCapital };
