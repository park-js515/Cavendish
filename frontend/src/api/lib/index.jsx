import { createCustomAxios, createDefaultAxios } from "./createCustomAxios";

const memberCustomInstance = () => {
  const instance = createCustomAxios("/member");

  return instance;
};

const memberDefaultInstance = () => {
  const instance = createDefaultAxios("/member");

  return instance;
};

const boardCustomInstance = () => {
  const instance = createCustomAxios(`/board`);

  return instance;
};

const boardDefaultInstance = (params) => {
  const instance = createDefaultAxios(
    `/board?page=${params.page ? params.page : 0}&size=${
      params.size ? params.size : 10
    }&sort=${params.sort ? params.sort : "contents,ASC"}`,
  );

  return instance;
};

const boardDetailDefaultInstance = () => {
  const instance = createDefaultAxios(`/board`);

  return instance;
};

const searchDefaultInstance = () => {
  const instance = createDefaultAxios(`/search`);

  return instance;
};

export {
  memberCustomInstance,
  memberDefaultInstance,
  boardCustomInstance,
  boardDefaultInstance,
  boardDetailDefaultInstance,
  searchDefaultInstance,
};
