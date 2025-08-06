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

  type DailyImpactCostSumDto = {
    /** 冲击成本汇总 */
    impactCostSum?: number;
    /** 冲击成本汇总Bps */
    impactCostSumBps?: number;
    /** 交易数目 */
    numberTrade?: number;
    /** 日期 */
    recordDate: string;
    /** 总成交金额 */
    tradedAmountSum?: number;
  };

  type DailyImpactCostDto = {
    /** 唯一ID */
    id?: string;
    /** 冲击成本 */
    impactCost?: number;
    /** 策略备注 */
    orderRemark?: string;
    /** 交易类型 */
    orderType?: '股票买入' | '股票卖出';
    /** 日期 */
    recordDate?: string;
    /** 股票编码 */
    stockCode?: string;
    /** 策略名称 */
    strategyName?: string;
    /** vwap1m */
    tradePrice?: number;
    /** 成交金额 */
    tradedAmount?: number;
    /** 交易ID */
    tradedId?: string;
    /** 交易日期 */
    tradedTime?: string;
    /** 成交量 */
    tradedVolume?: string;
    /** vwap1m */
    vwap1mPrice?: number;
  };

  type dailyImpactCostListUsingGETParams = {
    /** 记录日期 */
    recordDate?: string;
  };

  type dailyImpactCostStatisticUsingGETParams = {
    /** 结束时间 */
    endDate?: string;
    /** 开始时间 */
    startDate?: string;
  };

  type PieChartDto = {
    type?: string;
    value?: number;
  };

  type positionMonitorListUsingGETParams = {
    /** 分组汇总类别 */
    grouper?: '行业' | '转债类型' | '大小票';
    /** 记录日期 */
    recordDate?: number;
  };

  type indicatorDataListUsingGETParams = {
    /** cdAdj */
    cdAdj?: string;
    /** 结束时间 */
    endDate?: string;
    /** 指标名称 */
    label?: string;
    /** 指标中文名称 */
    labelName?: string;
    /** nameCode */
    nameCode?: string;
    /** schema */
    schema?: string;
    /** 开始时间 */
    startDate?: string;
    /** tableName */
    tableName?: string;
  };

  type IndicatorConfigDto = {
    cdAdj: string;
    databaseEngine: string;
    idx: string;
    label: string;
    labelName: string;
    nameCode: string;
    schemaName: string;
    tab: string;
    tabIdx: number;
    tabName: string;
    tableName: string;
    plotTableName: string;
  };

  type IndicatorDataDto = {
    label: string;
    labelName: string;
    tday: string;
    value: number;
  };

  type excelExportUsingGETParams = {
    /** 结束时间 */
    endDate?: string;
    /** 开始时间 */
    startDate?: string;
    /** tab */
    tab?: string;
  };
  type indicatorConfigListUsingGETParams = {
    /** tabGroup */
    tabGroup?: number;
  };
  type indicatorCategoryListUsingGETParams = {
    /** 分组列 */
    categoryCol?: string;
    /** x列 */
    dateCol?: string;
    /** 结束时间 */
    endDate?: string;
    /** 过滤的字段 */
    filterCols?: string;
    /** 过滤的值 */
    filterValues?: string;
    /** schema名称 */
    schemaName?: string;
    /** 开始时间 */
    startDate?: string;
    /** tableName */
    tableName?: string;
  };
  type indicatorConfigListUsingGET1Params = {
    /** tabGroup */
    tabGroup?: number;
  };

  type IndicatorConfigV2Dto = {
    categoryCol: string;
    categoryKey?: string;
    categoryZhName?: string;
    dateCol?: string;
    filterCols?: string;
    filterValues?: string;
    idx: string;
    plotTableName?: string;
    plotType?: string;
    schemaName?: string;
    selectCols?: string;
    tab: string;
    tabIdx: string;
    tabName?: string;
    tableName?: string;
    xcol?: string;
    xdirection?: string;
    xvalueType?: string;
    ycol?: string;
  };

  type indicatorDataListUsingGET1Params = {
    /** 分组列 */
    categoryCol?: string;
    /** 分组键值 */
    categoryKey?: string;
    /** 日期列 */
    dateCol?: string;
    /** 结束时间 */
    endDate?: string;
    /** 过滤的字段 */
    filterCols?: string;
    /** 过滤的值 */
    filterValues?: string;
    /** schema名称 */
    schemaName?: string;
    /** 选取的字段 */
    selectCols?: string;
    /** 开始时间 */
    startDate?: string;
    /** tableName */
    tableName?: string;
    /** x列 */
    xCol?: string;
    /** x数据类型 */
    xValueType?: string;
    /** x列 */
    yCol?: string;
  };

  type IndicatorDataV2Dto = {
    categoryValue: string;
    x: any;
    y: number;
  };

  type PositionDto = {
    /** 平仓金额 */
    closeAmount?: number;
    /** 平仓盈亏 */
    closeProfit?: number;
    /** 平仓量 */
    closeVolume?: number;
    /** 手续费 */
    commission?: number;
    /** 交易所代码 */
    exchangeId?: string;
    /** 唯一ID */
    id?: string;
    /** 合约代码 */
    instrumentId: string;
    /** 多头冻结 */
    longFrozen?: number;
    /** 多头开仓冻结金额 */
    longFrozenAmount?: number;
    /** 开仓金额 */
    openAmount?: number;
    /** 开仓量 */
    openVolume?: number;
    /** 持仓多空方向 */
    posiDirection?: 'THOST_FTDC_PD_Net' | 'THOST_FTDC_PD_Long' | 'THOST_FTDC_PD_Short';
    /** 总仓位 */
    position?: number;
    /** 持仓成本 */
    positionCost?: number;
    /** 某标志位 */
    positionDate: 'THOST_FTDC_PSD_Today' | 'THOST_FTDC_PSD_History';
    /** 持仓盈亏 */
    positionProfit?: number;
    /** 上次占用的保证金 */
    preMargin?: number;
    /** 上次结算价 */
    preSettlementPrice?: number;
    /** 本次结算价 */
    settlementPrice?: number;
    /** 空头冻结 */
    shortFrozen?: number;
    /** 空头开仓冻结金额 */
    shortFrozenAmount?: number;
    /** 今仓 */
    todayPosition?: number;
    /** 交易日 */
    tradingDay?: string;
    /** 持仓成本 */
    useMargin?: number;
    /** 昨仓 */
    ydPosition?: number;
  };

  type ctpPositionListUsingGETParams = {
    /** 记录日期 */
    tradingDay?: string;
  };

  type ctpPositionPageUsingGETParams = {
    /** 当前页码 */
    pageNum?: number;
    /** 每页大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序方向 */
    sortOrder?: string;
    /** 记录日期 */
    tradingDay?: string;
  };

  type ctpTradeDataListUsingGETParams = {
    /** 记录日期 */
    tradingDay?: string;
  };

  type CtpTradeDataDto = {
    /** 经纪公司代码 */
    brokerId?: string;
    /** 业务单元 */
    businessUnit?: string;
    /** 结算会员编号 */
    clearingPartID?: string;
    /** 客户代码 */
    clientID?: string;
    /** 买卖方向 */
    direction?: string;
    /** 交易所代码 */
    exchangeID?: string;
    /** 合约在交易所的代码 */
    exchangeInstID?: string;
    /** 组合投机套保标志 */
    hedgeFlag?: string;
    /** 唯一ID */
    id?: string;
    /** 合约代码 */
    instrumentID: string;
    /** 投资单元代码 */
    investUnitID?: string;
    /** 投资者代码 */
    investorID?: string;
    /** 组合开平标志 */
    offsetFlag?: string;
    /** 本地报单编号 */
    orderLocalID?: string;
    /** 报单引用 */
    orderRef?: string;
    /** 报单编号 */
    orderSysID?: string;
    /** 会员代码 */
    participantID?: string;
    /** 价格 */
    price?: number;
    /** 成交价来源 */
    priceSource?: string;
    /** 保留的无效字段 */
    reserve1?: string;
    /** 序号 */
    sequenceNo?: string;
    /** 结算编号 */
    settlementID?: string;
    /** 成交时期 */
    tradeDate: string;
    /** 成交编号 */
    tradeID?: string;
    /** 成交来源 */
    tradeSource?: string;
    /** 成交时间 */
    tradeTime: string;
    /** 成交类型 */
    tradeType?: string;
    /** 交易所交易员代码 */
    traderID?: string;
    /** 交易日 */
    tradingDay?: string;
    /** 交易角色 */
    tradingRole?: string;
    /** 用户代码 */
    userID?: string;
    /** 数量 */
    volume?: string;
    dt?: string;
  };

  type nameCodePnlUsingGETParams = {
    /** 记录日期 */
    recordDate?: string;
  };

  type FutureNameCodePnlDto = {
    /** 唯一ID */
    id: string;
    /** 品种代码 */
    nameCode: string;
    /** 损益 */
    pnl: number;
    /** 日期 */
    recordDate: string;
    /** 累积损益 */
    cumPnl: number;
  };
}
