declare namespace API {
  type CommonResponse<T> = {
    /** 响应信息 */
    message?: string;
    /** 响应值 */
    res?: T;
    /** 堆栈信息 */
    stackTrace?: string[];
    /** 响应码 */
    status?: number;
  };

  type PageableResponse<T> = {
    /** 当前页码的数据 */
    data?: T[];
    /** 当前页码(从0开始编号) */
    pageNum?: string;
    /** 每页大小 */
    pageSize?: number;
    /** 数据的总条数 */
    totalSize?: string;
  };

  type DailyPositionDto = {
    /** 账户ID */
    accountId?: string;
    /** 账户类型 */
    accountType?: string;
    /** 可用数量 */
    canUseVolume?: string;
    /** 冻结数量 */
    frozenVolume?: string;
    /** 唯一ID */
    id: string;
    /** 市值 */
    marketValue: number;
    /** 在途股份 */
    onRoadVolume?: string;
    /** 平均建仓成本 */
    openPrice?: number;
    /** 日期 */
    recordDate: string;
    /** 股票编码 */
    stockCode: string;
    /** 持仓数量 */
    volume: number;
    /** 昨夜拥股 */
    yesterdayVolume: number;
  };

  type dailyPositionListUsingGETParams = {
    /** 记录日期 */
    recordDate?: string;
  };

  type dailyPositionPageUsingGETParams = {
    /** 当前页码 */
    pageNum?: number;
    /** 每页大小 */
    pageSize?: number;
    /** 记录日期 */
    recordDate?: string;
    /** 排序字段 */
    sortField?: string;
    /** 排序方向 */
    sortOrder?: string;
  };
}
