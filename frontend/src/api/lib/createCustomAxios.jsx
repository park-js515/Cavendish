import axios from "axios";

let isAlertDisplayed = false;

const createCustomAxios = (URL) => {
  const customAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API}${URL}`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  customAxios.interceptors.request.use(
    function (config) {
      return config;
    },

    function (error) {
      return Promise.reject(error);
    },
  );

  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        if (!isAlertDisplayed) {
          isAlertDisplayed = true;
          alert("세션 만료");
        }
      } else {
        return error;
      }
    },
  );

  return customAxios;
};

const createFapiAxios = (URL) => {
  const defaultAxios = axios.create({
    baseURL: `${process.env.REACT_APP_FAPI}${URL}`, // 추후 변경 예정
    headers: {
      accept: "application/json",
    },
  });

  return defaultAxios;
};

const createDefaultAxios = (URL) => {
  const defaultAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API}${URL}`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`?`Bearer ${localStorage.getItem("accessToken")}`:null ,
    },
  });

  return defaultAxios;
};

export { createCustomAxios, createFapiAxios, createDefaultAxios };
