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
  const instance = createCustomAxios("/boards");

  return instance;
};

const boardDefaultInstance = () => {
  const instance = createDefaultAxios("/boards");

  return instance;
};

export {
  memberCustomInstance,
  memberDefaultInstance,
  boardCustomInstance,
  boardDefaultInstance,
};
