import { boardCustomInstance, boardDefaultInstance } from "./lib/index";

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
  if (body.files !== null)
    api.defaults.headers["Content-Type"] = "multipart/form-data";
  api.post(``, body).then(sucess).catch(fail);
};

export { getBoardsList, createBoardContent };

// 3. 게시글 상세 페이지 조회
/**
 *
 * @param {id} id [{id:int}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
