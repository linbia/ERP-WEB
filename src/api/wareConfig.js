import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 获取仓库列表
 * @param params
 * @returns {*}
 */
export function getWareHousesList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouses?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
}
/**
 *更新仓库
 * @param params
 * @returns {*}
 */
export function updateWareHousesList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouses?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params, 'PUT')
}

/**
 *添加仓库
 * @param params
 * @returns {*}
 */
export function addWareHousesList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouses?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params, 'POST')
}

