import { createCustomAxios, createDefaultAxios } from "./createCustomAxios";

const memberCustomInstance = () => {
  const instance = createCustomAxios("/member");

  return instance;
};

const memberDefaultInstance = () => {
  const instance = createDefaultAxios("/member");

  return instance;
};

export { memberCustomInstance, memberDefaultInstance };
