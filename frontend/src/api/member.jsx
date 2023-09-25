import { memberCustomInstance, memberDefaultInstance } from "./lib/index";

// 1. 회원조회
/**
 *
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberInfo = (sucess, fail) => {
  const api = memberCustomInstance();
  api.get(``).then(sucess).catch(fail);
};

// 2. 회원수정
/**
 * @param {object} body [{password: string, nick: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberUpdate = (body, sucess, fail) => {
  const api = memberCustomInstance();
  api.put(``, JSON.stringify(body)).then(sucess).catch(fail);
};

// 3.회원탈퇴
/**
 *
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberRemove = (sucess, fail) => {
  const api = memberCustomInstance();
  api.delete(``).then(sucess).catch(fail);
};

// 4. 로그인
/**
 *
 * @param {object} body [{loginId: string, password: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberLogin = (body, sucess, fail) => {
  const api = memberDefaultInstance();
  api.post(`/login`, JSON.stringify(body)).then(sucess).catch(fail);
};

// 5. 회원가입
/**
 *
 * @param {object} body [{loginId: string, password: string, nickname: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberSignUp = (body, sucess, fail) => {
  const api = memberDefaultInstance();
  api.post(`/signup`, JSON.stringify(body)).then(sucess).catch(fail);
};

export { memberInfo, memberUpdate, memberRemove, memberLogin, memberSignUp };
