import {fetch, fetchapi, baseUrl} from 'config/index.js'
/**
 * 获取公司列表
 * @param params
 * @returns {*}
 */
export function getCompanyList(params) {
  return fetch(`${baseUrl}/​/company-management​/companies?pageNum=${params.pageNum}&pageSize=${params.pageSize}&paging=${params.paging}`, params)
}
