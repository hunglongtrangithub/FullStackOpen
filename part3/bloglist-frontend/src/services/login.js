import axios from "axios";
const baseUrl = "/api/login";

const login = async ({ username, password }) => {
  // credentials = { username, password }
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
};

export default { login };
