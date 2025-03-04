// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取指标配置列表 获取指标配置列表 GET /api/v1/research/indicator/config/list */
export async function indicatorConfigListUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.IndicatorConfigDto[]>>(
    `${BACKEND_URL}/api/v1/research/indicator/config/list`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取指标数据列表 获取指标数据列表 GET /api/v1/research/indicator/data/list */
export async function indicatorDataListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.indicatorDataListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.IndicatorDataDto[]>>(
    `${BACKEND_URL}/api/v1/research/indicator/data/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
