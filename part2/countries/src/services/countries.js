import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`).then((response) => response.data);
};

export default { getAllCountries };
