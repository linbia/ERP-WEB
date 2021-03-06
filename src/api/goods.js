import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 查询产品分类
 * @param params
 * @returns {*}
 */
export function getClassifications(params) {
  return fetch(`${baseUrl}/product-management/classifications`, params)
}/**
 * 查询产品信息
 * @param params
 * @returns {*}
 */
export function getProducts(params) {
  return fetch(`${baseUrl}/product-management/products`, params)
}
/**
 * 查询产品规格
 * @param params
 * @returns {*}
 */
export function getSpecs(params) {
  return fetch(`${baseUrl}/product-management/specs`, params)
}
