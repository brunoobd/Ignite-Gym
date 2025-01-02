import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.6:3333",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});
