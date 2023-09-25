import { boardCustomInstance, boardDefaultInstance } from "./lib/index";

// 1. 게시글 조회
/**
 *
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */

const getBoardsList = (sucess, fail) => {
  const api = boardDefaultInstance();
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
  const api = boardDefaultInstance();
  api.defaults.headers["Content-Type"] = "multipart/form-data";
  api.post(``).then(sucess).catch(fail);
};

export { getBoardsList, createBoardContent };
