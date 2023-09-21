import { memberCustomInstance, memberDefaultInstance } from "./lib/index";

/**
 *
 * @param {object} body [{memberId: string, password: string}]
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberLogin = (body, sucess, fail) => {
  const api = memberDefaultInstance();
  api.post(`/login`, JSON.stringify(body)).then(sucess).catch(fail);
};


/**
 * 
 * @param {object} body [{memberId: string, password: string, nickname: string}] 
 * @param {function} sucess [callback]
 * @param {function} fail [callback]
 */
const memberSignUp = (body, sucess, fail) => {
  const api = memberDefaultInstance();
  api.post('/signup', JSON.stringify(body)).then(sucess).catch(fail);
}

export { memberLogin, memberSignUp };


