import axios from "axios";
import { logout, useAuthDispatch, useAuthState } from "../context/authContext";

export function useAxios() {
  const { token }: any = useAuthState();
  const dispatch = useAuthDispatch();
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  axios.interceptors.request.use((request) => {
    if (token) {
      request.headers.common["Authorization"] = `Bearer ${token}`;
    }

    request.timeout = 20000;

    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      // const { status, statusText, data } = response;
      return Promise.resolve(response);
    },
    (error) => {
      const { status } = error.response;

      if (status === 401) {
        logout(dispatch);
      }

      return Promise.reject(error);
    }
  );
}
