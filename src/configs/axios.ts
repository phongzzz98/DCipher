import axios from "axios";
import { getAccessToken } from "../utils/localStorage";

export const axiosInstance = axios.create({
  baseURL: 'https://code-ide-forum.herokuapp.com/api/',
  timeout: 22000,
  headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  const accessHeader = `Bearer ${accessToken}`;
  request.headers!["Authorization"] = accessHeader;
  return request;
});
