import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});
