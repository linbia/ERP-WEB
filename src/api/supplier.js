import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 获取供应商列表
 * @param params
 * @returns {*}
 */
export function getSupplyList(params) {
  return fetch(`${baseUrl}/supply-demand-management/supply-demands?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
}
/**
 * 添加供应商
 * @param params
 * @returns {*}
 */
export function addSupplyList(params) {
  return fetch(`${baseUrl}/supply-demand-management/supply-demands`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res)
  })
}/**
 * 添加供应商
 * @param params
 * @returns {*}
 */
export function deleteSupplyList(id) {
  return fetch(`${baseUrl}/supply-demand-management/supply-demands/${id}`, id, 'DELETE').then(res => {
  })
}
