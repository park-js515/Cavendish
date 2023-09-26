import { createRecomAxios } from "./lib/createCustomAxios";

// cpu
const searchCPU = (keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/cpu/${keyword}/${page}`).then(success).catch(fail);
};

// cooler
const searchCooler = (keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/cooler/${keyword}/${page}`).then(success).catch(fail);
};

// hdd
const searchHdd = (keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/hdd/${keyword}/${page}`).then(success).catch(fail);
};

// mainboard
const searchMainboard = (keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/mainboard/${keyword}/${page}`).then(success).catch(fail);
};

// ram
const searchRam = (keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/ram/${keyword}/${page}`).then(success).catch(fail);  
}

// gpu
const searchGPU = (keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/gpu/${keyword}/${page}`).then(success).catch(fail);  
}

// 