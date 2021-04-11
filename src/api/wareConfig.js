import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 获取仓库列表
 * @param params
 * @returns {*}
 */
export function getWareHousesList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouses?paging=${params.paging}`, params)
}
/**
 * 获取仓库分区列表
 * @param params
 * @returns {*}
 */
export function getWareHousesAreasList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouse-areas?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
}
/**
 * 获取货架列表
 * @param params
 * @returns {*}
 */
export function getWareHousesShelvesesList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouse-shelveses?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
}
/**
 * 获取货位列表
 * @param params
 * @returns {*}
 */
export function getWareHousesLocationsList(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouse-locations?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
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
  return fetch(`${baseUrl}/warehouse-management/warehouses`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res)
  })
}
/**
 *添加分区
 * @param params
 * @returns {*}
 */
export function addWareHousesAreas(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouse-areas`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res.data.message)
  })
}
/**
 *添加货架
 * @param params
 * @returns {*}
 */
export function addWareHousesShelveses(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouse-shelveses`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res.data.message)
  })
}
/**
 *添加货位
 * @param params
 * @returns {*}
 */
export function addWareHousesLocations(params) {
  return fetch(`${baseUrl}/warehouse-management/warehouse-locations`, params, 'POST').then(res => {

    //return fetch(`${baseUrl}/warehouse-management​/warehouse-locations`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res.data.message)
  })
}

