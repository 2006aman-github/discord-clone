import axios from "axios";

const instance = axios.create({
  baseURL: "https://discord-clone2021.herokuapp.com",
});

export default instance;
