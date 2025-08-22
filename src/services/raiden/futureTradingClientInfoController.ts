// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const { BACKEND_URL } = window.API;

/** 获取帐户信息 获取帐户信息 GET /api/v1/future/trading/client/info/accountInfo */
export async function getAccountInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResponse<API.AccountInfoDto>>(
    `${BACKEND_URL}/api/v1/future/trading/client/info/accountInfo`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
