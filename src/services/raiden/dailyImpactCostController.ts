// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 按日获取交易冲击成本列表 按日获取交易冲击成本列表 GET /api/v1/daily/impactCost/daily/list */
export async function dailyImpactCostListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dailyImpactCostListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.DailyImpactCostDto[]>>(
    `${BACKEND_URL}/api/v1/daily/impactCost/daily/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取日度冲击成本统计列表 获取日度冲击成本统计列表 GET /api/v1/daily/impactCost/statistic/daily */
export async function dailyImpactCostStatisticUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dailyImpactCostStatisticUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.DailyImpactCostSumDto[]>>(
    `${BACKEND_URL}/api/v1/daily/impactCost/statistic/daily`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
