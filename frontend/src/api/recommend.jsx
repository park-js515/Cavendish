import {
  fapiSearchInstance,
  fapiSearchCategoryInstance,
  fapiRecommendInstance,
} from "./lib/index";

/**
 *
 * 1. 호환되는 부품 API
 * redux에 있는 값이 defaultValue일 경우 params에 담아서 보내지 않는다.
 * @param {string} partName
 * @param {number} page
 * @param {object} params [{keyword, case, cooler, cpu, gpu, hdd, mainboard, power, ram, ssd, ram_num}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const searchPart = (partName, page, params, success, fail) => {
  const api = fapiSearchInstance();
  api.get(`/${partName}/${page}`, { params: params }).then(success).catch(fail);
};

/**
 * 2. 대분류에 속하는 목록 조회
 * @param {string} category 
 * @param {number} page 
 * @param {object} params [{keyword: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const serachProgram = (category, page, params, success, fail) => {
  const api = fapiSearchCategoryInstance();
  api.get(`/${category}/${page}`, { params: params }).then(success).catch(fail);
};

export { searchPart, serachProgram };
