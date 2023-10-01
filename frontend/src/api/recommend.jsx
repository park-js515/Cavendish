import {
  fapiSearchInstance,
  fapiRecommendInstance,
  fapiMaxPageInstance,
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
  api.get(`/${partName}/${page}`, params).then(success).catch(fail);
};

/**
 *
 * 2. 해당 부품의 전체 페이지 수 반환
 * @param {string} partName
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const maxPage = (partName, success, fail) => {
  const api = fapiMaxPageInstance();

  api.get(`/${partName}`).then(success).catch(fail);
};

export { searchPart, maxPage };
