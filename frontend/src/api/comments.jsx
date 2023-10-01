import { commentCustomInstance, commentDefaultInstance } from "./lib/index";

// 1. 댓글 작성
/**
 *
 * @param {object} body [{boardId: string, contents: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const createComment = (body, sucess, fail) => {
  const api = commentCustomInstance();
  api.post(``, body).then(sucess).catch(fail);
};

// 2. 댓글 목록 조회
/**
 *
 * @param {params} params [{page:int, size:int}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const getCommentsList = (params, sucess, fail) => {
  const api = commentDefaultInstance(params);
  api.get(``).then(sucess).catch(fail);
};

// 3. 댓글 삭제
/**
 *
 * @param {object} body [{boardId: string, contents: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const deleteComment = (commentId, sucess, fail) => {
  const api = commentCustomInstance();
  api.delete(`/delete/${commentId}`).then(sucess).catch(fail);
};

// 4. 댓글 수정
/**
 *
 * @param {object} body [{boardId: string, contents: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const updateComment = (body, sucess, fail) => {
  const api = commentCustomInstance();
  api.put(``, body).then(sucess).catch(fail);
};

export { getCommentsList, createComment, deleteComment, updateComment };
