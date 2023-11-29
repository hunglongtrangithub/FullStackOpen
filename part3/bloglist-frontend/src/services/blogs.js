import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  });
  return response.data;
};

export default { getAll, setToken, create };
