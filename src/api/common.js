import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 会员登陆
 * @param params
 * @returns {*}
 */
export function loginUserNo(params) {
  return fetch(`${baseUrl}/api/declare/login?userName=${params.userName}&password=${params.password}`, params)
}/**
 * 会员登陆
 * @param params
 * @returns {*}
 */
export function warehouses(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouses?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
}
