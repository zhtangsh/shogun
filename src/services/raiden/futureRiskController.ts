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

/** 获取日度帐户信息曲线 获取日度帐户信息曲线 GET /api/v1/future/risk/account/info/curve */
export async function accountInfoCurveUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.AccountInfoDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/account/info/curve`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 策略权重完整列表 策略权重完整列表 GET /api/v1/future/risk/strategyWeightList */
export async function strategyWeightListUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.StrategyWeightDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/strategyWeightList`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 汇总品种权重完整列表 汇总品种权重完整列表 GET /api/v1/future/risk/contractWeightList */
export async function contractWeightListUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.ContractWeightDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/contractWeightList`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 截面中性策略权重完整列表 截面中性策略权重完整列表 GET /api/v1/future/risk/neutralStrategyContractWeightList */
export async function neutralStrategyContractWeightListUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.ContractWeightDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/neutralStrategyContractWeightList`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 带敞口的截面策略权重完整列表 带敞口的截面策略权重完整列表 GET /api/v1/future/risk/exposureStrategyContractWeightList */
export async function exposureStrategyContractWeightListUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.ContractWeightDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/exposureStrategyContractWeightList`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 汇总品种手数完整列表 汇总品种手数完整列表 GET /api/v1/future/risk/contractVolumeList */
export async function contractVolumeListUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.ContractVolumeDto[]>>(
    `${BACKEND_URL}/api/v1/future/risk/contractVolumeList`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
