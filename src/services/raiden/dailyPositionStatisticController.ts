// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取日度持仓分类占比数据 获取日度持仓分类占比数据 GET /api/v1/daily/position/statistic/positionMonitor/list */
export async function positionMonitorListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.positionMonitorListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.PieChartDto[]>>(
    `${BACKEND_URL}/api/v1/daily/position/statistic/positionMonitor/list`,
    {
      method: 'GET',
      params: {
        // grouper has a default value: 行业
        grouper: '行业',
        ...params,
      },
      ...(options || {}),
    },
  );
}
