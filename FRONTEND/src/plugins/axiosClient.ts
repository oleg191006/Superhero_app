import qs from "qs";

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_PATH,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});
