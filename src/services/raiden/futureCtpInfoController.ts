// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取ctp中的日度仓位完整列表 获取ctp中的日度仓位完整列表 GET /api/v1/future/ctp/position/list */
export async function ctpPositionListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ctpPositionListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.PositionDto[]>>(
    `${BACKEND_URL}/api/v1/future/ctp/position/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取ctp中的日度仓位分页列表 获取ctp中的日度仓位分页列表 GET /api/v1/future/ctp/position/page */
export async function ctpPositionPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ctpPositionPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageableResponse<API.PositionDto>>(
    `${BACKEND_URL}/api/v1/future/ctp/position/page`,
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

/** 获取ctp中的交易数据完整列表 获取ctp中的交易数据完整列表 GET /api/v1/future/ctp/tradeData/list */
export async function ctpTradeDataListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ctpTradeDataListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.CtpTradeDataDto[]>>(
    `${BACKEND_URL}/api/v1/future/ctp/tradeData/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取nameCode损益完整列表 获取nameCode损益完整列表 GET /api/v1/future/ctp/nameCodePnl/list */
export async function nameCodePnlUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.nameCodePnlUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.FutureNameCodePnlDto[]>>(
    `${BACKEND_URL}/api/v1/future/ctp/nameCodePnl/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
