import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 *登陆
 * @param params
 * @returns {*}
 */
export function loginApi(params) {
  return fetch(`${baseUrl}/login`, params, 'POST')
}
