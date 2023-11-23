// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取日度仓位完整列表 获取日度仓位完整列表 GET /api/v1/daily/position/list */
export async function dailyPositionListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dailyPositionListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.DailyPositionDto[]>>(
    `${BACKEND_URL}/api/v1/daily/position/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取日度仓位分页列表 获取日度仓位分页列表 GET /api/v1/daily/position/page */
export async function dailyPositionPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dailyPositionPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageableResponse<API.DailyPositionDto>>(
    `${BACKEND_URL}/api/v1/daily/position/page`,
    {
      method: 'GET',
      params: {
        // pageSize has a default value: 10
        pageSize: '10',
        // sortField has a default value: id
        sortField: 'id',
        // sortOrder has a default value: asc
        sortOrder: 'asc',
        ...params,
      },
      ...(options || {}),
    },
  );
}
