// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取指标数据列表 获取指标数据列表 GET /api/v1/research/indicatorV2/category/list */
export async function indicatorCategoryListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.indicatorCategoryListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<string[]>>(
    `${BACKEND_URL}/api/v1/research/indicatorV2/category/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取指标配置列表 获取指标配置列表 GET /api/v1/research/indicatorV2/config/list */
export async function indicatorConfigListUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.indicatorConfigListUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.IndicatorConfigV2Dto[]>>(
    `${BACKEND_URL}/api/v1/research/indicatorV2/config/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取指标数据列表 获取指标数据列表 GET /api/v1/research/indicatorV2/data/list */
export async function indicatorDataListUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.indicatorDataListUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.IndicatorDataV2Dto[]>>(
    `${BACKEND_URL}/api/v1/research/indicatorV2/data/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
