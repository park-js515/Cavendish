import { memberCustomInstance, memberDefaultInstance } from "./lib/index";

// 1. 회원조회
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const memberInfo = (success, fail) => {
  const api = memberCustomInstance();
  api.get(``).then(success).catch(fail);
};

// 2. 회원수정
/**
 * @param {object} body [{password: string, nick: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberUpdate = (body, success, fail) => {
  const api = memberCustomInstance();
  api.put(``, JSON.stringify(body)).then(success).catch(fail);
};

// 3.회원탈퇴
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const memberRemove = (success, fail) => {
  const api = memberCustomInstance();
  api.delete(``).then(success).catch(fail);
};

// 4. 아이디 중복검사
/**
 *
 * @param {object} body [{loginId: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const memberCheckId = (body, success, fail) => {
  const api = memberDefaultInstance();
  api.post(`/checkId`, JSON.stringify(body)).then(success).catch(fail);
};

// 5. 닉네임 중복검사
/**
 *
 * @param {object} body [{nickname: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const memberCheckNickname = (body, success, fail) => {
  const api = memberDefaultInstance();
  api.post(`/checkNickname`, JSON.stringify(body)).then(success).catch(fail);
};

// 6. 로그인
/**
 *
 * @param {object} body [{loginId: string, password: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberLogin = (body, success, fail) => {
  const api = memberDefaultInstance();
  api.post(`/login`, JSON.stringify(body)).then(success).catch(fail);
};

// 7. 회원가입
/**
 *
 * @param {object} body [{loginId: string, password: string, nickname: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
const memberSignUp = (body, success, fail) => {
  const api = memberDefaultInstance();
  api.post(`/signup`, JSON.stringify(body)).then(success).catch(fail);
};

export {
  memberInfo,
  memberUpdate,
  memberRemove,
  memberCheckId,
  memberCheckNickname,
  memberLogin,
  memberSignUp,
};
