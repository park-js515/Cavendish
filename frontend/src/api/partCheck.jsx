import { createRecomAxios } from "./lib/createCustomAxios";

const searchItem = (type, keyword, page, success, fail) => {
  const api = createRecomAxios();
  api.get(`/${type}/${keyword}/${page}`).then(success).catch(fail);
};

export { searchItem };
