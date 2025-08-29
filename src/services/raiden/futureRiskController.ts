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

/** 获取日度总敞口曲线 获取日度总敞口曲线 GET /api/v1/future/risk/nameCode/exposure/cureve */
export async function dailyExposureCurveUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dailyExposureCurveUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.FutureExposureCurveDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/nameCode/exposure/cureve`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取品种敞口预览列表 获取品种敞口预览列表 GET /api/v1/future/risk/nameCode/exposure/preview/list */
export async function nameCodeUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.nameCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResponse<API.NameCodeExposurePreviewDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/nameCode/exposure/preview/list`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
