import {
  boardCustomInstance,
  boardDefaultInstance,
  boardDetailDefaultInstance,
  imageDefaultInstance,
} from "./lib/index";

// 1. 게시글 조회
/**
 *
 * @param {params} params [{page:int, size:int, sort:"contents,ASC"}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */

const getBoardsList = (params, sucess, fail) => {
  const api = boardDefaultInstance(params);
  api.get(``).then(sucess).catch(fail);
};

// 2. 게시글 작성
/**
 *
 * @param {object} body [{title: string, contents: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */

const createBoardContent = (body, sucess, fail) => {
  const api = boardCustomInstance();
  api.defaults.headers["Content-Type"] = "multipart/form-data";
  api.post(``, body).then(sucess).catch(fail);
};

// 3. 게시글 상세 페이지 조회
/**
 *
 * @param {id} id [{id:int}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */

const getBoardDetailContent = (id, sucess, fail) => {
  const api = boardDetailDefaultInstance();
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  api.get(`/detail/${id}`).then(sucess).catch(fail);
};

// 4. 게시글 삭제
/**
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */

const deleteBoardContent = (id, sucess, fail) => {
  const api = boardCustomInstance();
  api.delete(`/delete/${id}`).then(sucess).catch(fail);
};

// 5. 이미지 로드
/**
 *
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */

const getBoardImage = (id, sucess, fail) => {
  const api = imageDefaultInstance();
  api.defaults.headers["Content-Type"] = "multipart/form-data";
  api.get(`/${id}`).then(sucess).catch(fail);
};

// 6. 게시판 수정 인터페이스 로드

const getUpdateBoardContent = (id, sucess, fail) => {
  const api = boardCustomInstance();
  api.defaults.headers["Content-Type"] = "multipart/form-data";
  api.get(`/update/${id}`).then(sucess).catch(fail);
};

const updateBoardContent = (body, sucess, fail) => {
  const api = boardCustomInstance();
  api.defaults.headers["Content-Type"] = "multipart/form-data";
  api.put(``, body).then(sucess).catch(fail);
};

export {
  getBoardsList,
  createBoardContent,
  getBoardDetailContent,
  deleteBoardContent,
  getBoardImage,
  getUpdateBoardContent,
  updateBoardContent,
};
