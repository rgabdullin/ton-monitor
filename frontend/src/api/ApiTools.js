import axios from "axios";
// @ts-ignore
import Apipie from "apipie";
import endPoints from "./endPoints";
export const API_URL = "http://51.250.1.141:8080";
const routes = [endPoints];

axios.defaults.baseURL = API_URL;

axios.defaults.validateStatus = () => true;

axios.interceptors.response.use((response) => {
  if (response.data.status && response.data.status === "error") {
    throw response.data;
  }

  if (response.data) {
    return response.data;
  }

  return response;
});

const apipie = new Apipie(routes, { axios });

const api = apipie.create();
export default api;
