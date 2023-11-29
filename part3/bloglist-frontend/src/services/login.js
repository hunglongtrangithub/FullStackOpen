import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  // credentials = { username: "username", password: "password" }
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
