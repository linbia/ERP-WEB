import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 查询产品分类
 * @param params
 * @returns {*}
 */
export function getClassifications(params) {
  return fetch(`${baseUrl}/product-management/classifications`, params)
}

/**
 *添加产品分类
 * @param params
 * @returns {*}
 */
export function addClassifications(params) {
  return fetch(`${baseUrl}/product-management/classifications?companyId=${params.productClassification.companyId}&warehouseId=${params.productClassification.warehouseId}`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res)
  })
}
/**
 * 查询产品信息
 * @param params
 * @returns {*}
 */
export function getProducts(params) {
  return fetch(`${baseUrl}/product-management/products`, params)
}

/**
 *添加产品
 * @param params
 * @returns {*}
 */
export function addProducts(params) {
  return fetch(`${baseUrl}/product-management/products`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res)
  })
}
/**
 * 查询产品规格
 * @param params
 * @returns {*}
 */
export function getSpecs(params) {
  return fetch(`${baseUrl}/product-management/specs`, params)
}
/**
 *添加产品规格
 * @param params
 * @returns {*}
 */
export function addSpecs(params) {
  return fetch(`${baseUrl}/product-management/specs?companyId=${params.productSpec.companyId}&warehouseId=${params.productSpec.warehouseId}`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res)
  })
}
/**
 * 查询产品规格组
 * @param params
 * @returns {*}
 */
export function getSpecsGroups(params) {
  return fetch(`${baseUrl}/product-management/spec-groups`, params)
}
/**
 *添加产品规格组
 * @param params
 * @returns {*}
 */
export function addSpecsGroups(params) {
  return fetch(`${baseUrl}/product-management/spec-groups`, params, 'POST').then(res => {
    console.log('+++++++++++++++++++++',res)
  })
}
