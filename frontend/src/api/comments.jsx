import { commentCustomInstance, commentDefaultInstance } from "./lib/index";


// 1. 댓글 작성
/**
 * 
 * @param {object} body [{boardId: string, contents: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */ 
const createComment = (body,sucess, fail) => {
  const api = commentCustomInstance();
  api.post(``,body).then(sucess).catch(fail);
};

// 2. 댓글 조회
/**
 *
 * @param {params} params [{page:int, size:int}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const getCommentsList = (params,sucess, fail) => {
  const api = commentDefaultInstance(params);
  api.get(``).then(sucess).catch(fail);
};


export {
  getCommentsList,
  createComment,
}