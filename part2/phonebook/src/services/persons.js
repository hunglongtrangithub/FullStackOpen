import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

const replacePerson = (oldPersonId, newPerson) => {
  return axios.put(`${baseUrl}/${oldPersonId}`, newPerson);
};

export default { getAllPersons, addPerson, deletePerson, replacePerson };