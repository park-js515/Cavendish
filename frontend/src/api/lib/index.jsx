import {
  createCustomAxios,
  createDefaultAxios,
  createFapiAxios,
} from "./createCustomAxios";

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

const imageDefaultInstance = () => {
  const instance = createDefaultAxios(`/image`);

  return instance;
};

const searchDefaultInstance = () => {
  const instance = createDefaultAxios(`/search`);

  return instance;
};

const commentDefaultInstance = (params) => {
  const instance = createDefaultAxios(
    `/comment/${params.boardId}?page=${params.page}&size=${params.size}`,
  );

  return instance;
};

const commentCustomInstance = () => {
  const instance = createCustomAxios(`/comment`);

  return instance;
};

<<<<<<< HEAD
const quotationCustomInstance = () => {
  const instance = createCustomAxios(`/quotation`);
=======
const fapiSearchInstance = () => {
  const instance = createFapiAxios(`/search`);
>>>>>>> 560f3b42d192b3f7197cdf2ae4842f1320eae7b2

  return instance;
};

<<<<<<< HEAD
const quotationCustomListInstance = (params) => {
  const instance = createCustomAxios(
    `/quotation?page=${params.page ? params.page : 0}&size=${
      params.size ? params.size : 10
    }`,
  );
  return instance;
};

const quotationDetailDefaultInstance = () => {
  const instance = createDefaultAxios(`/quotation`);
=======
const fapiRecommendInstance = () => {
  const instance = createFapiAxios(`/recommend`);

  return instance;
};

const fapiPartInstance = () => {
  const instance = createFapiAxios(`/parts`);

  return instance;
};

const fapiMaxPageInstance = () => {
  const instance = createFapiAxios(`/maxpage`);
>>>>>>> 560f3b42d192b3f7197cdf2ae4842f1320eae7b2

  return instance;
};

export {
  memberCustomInstance,
  memberDefaultInstance,
  boardCustomInstance,
  boardDefaultInstance,
  boardDetailDefaultInstance,
  searchDefaultInstance,
  imageDefaultInstance,
  commentDefaultInstance,
  commentCustomInstance,
<<<<<<< HEAD
  quotationCustomInstance,
  quotationCustomListInstance,
  quotationDetailDefaultInstance,
=======
  fapiSearchInstance,
  fapiRecommendInstance,
  fapiPartInstance,
  fapiMaxPageInstance,
>>>>>>> 560f3b42d192b3f7197cdf2ae4842f1320eae7b2
};
