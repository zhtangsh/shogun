// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取交易执行预览列表 获取交易执行预览列表 GET /api/v1/future/risk/execution/preview/list */
export async function executionPreviewListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.executionPreviewListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.FutureExecutionPreviewDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/execution/preview/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
