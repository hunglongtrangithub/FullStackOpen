import axios from "axios";
const baseUrl = "/api/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

const replacePerson = (oldPersonId, newPerson) => {
  return axios
    .put(`${baseUrl}/${oldPersonId}`, newPerson)
    .then((response) => response.data);
};

export default { getAllPersons, addPerson, deletePerson, replacePerson };
