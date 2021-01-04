import axios from "axios";

let baseURL = "   ";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
export { baseURL };
