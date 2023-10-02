import {
  quotationCustomInstance,
  quotationCustomListInstance,
} from "./lib/index";

// 1. 견적서 작성
/**
 *
 * @param {params} body [{ name : string }]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 *
 */
const createQuotation = (body, sucess, fail) => {
  const api = quotationCustomInstance();
  api.post(``, body).then(sucess).catch(fail);
};

// 2. 견적서 리스트 조회
/**
 *
 * @param {params} params [{ page : int, size : int }]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const getQuotationList = (params, sucess, fail) => {
  const api = quotationCustomListInstance(params);
  api.get(``).then(sucess).catch(fail);
};

// 3.견적서 상세 페이지 조회
/**
 *
 * @param {params} id [id : int]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const getQuotationDetail = (id, sucess, fail) => {
  const api = quotationCustomInstance();
  api.get(`/detail/${id}`).then(sucess).catch(fail);
};

// 4. 견적서 삭제
/**
 *
 * @param {params} id [id : int]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const deleteQuotation = (id, sucess, fail) => {
  const api = quotationCustomInstance();
  api.delete(`/delete/${id}`).then(sucess).catch(fail);
};

// 5. 견적서 수정
/**
 *
 * @param {params} body [{ name : string }]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const updateQuotation = (body, sucess, fail) => {
  const api = quotationCustomInstance();
  api.put(``, body).then(sucess).catch(fail);
};

export {
  createQuotation,
  getQuotationList,
  getQuotationDetail,
  deleteQuotation,
  updateQuotation,
};
