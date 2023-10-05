import axios from "axios";
import Swal from "sweetalert2";

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
      if (error) {
        if (!isAlertDisplayed) {
          isAlertDisplayed = true;
          Swal.fire({
            icon: "error",
            title: "세션 만료",
            text: "세션이 만료되었습니다. 로그아웃을 진행합니다.",
            willClose: () => {
              window.location.replace("/logout");
            },
          });
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
    },
  });

  return defaultAxios;
};

export { createCustomAxios, createFapiAxios, createDefaultAxios };
