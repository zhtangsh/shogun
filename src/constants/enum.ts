export const directionEnum = {
  THOST_FTDC_DEN_Buy: {
    text: '买',
  },
  THOST_FTDC_DEN_Sell: {
    text: '卖',
  },
} as const;
export const offsetEnum = {
  THOST_FTDC_OFEN_Open: {
    text: '开',
  },
  THOST_FTDC_OFEN_Close: {
    text: '平(不区分)',
  },
  THOST_FTDC_OFEN_ForceClose: {
    text: '强平',
  },
  THOST_FTDC_OFEN_CloseToday: {
    text: '平今',
  },
  THOST_FTDC_OFEN_CloseYesterday: {
    text: '平昨',
  },
  THOST_FTDC_OFEN_ForceOff: {
    text: '强减',
  },
  THOST_FTDC_OFEN_LocalForceClose: {
    text: '本地强平',
  },
} as const;

export const tradeHourEnum = {
  夜盘: { text: '夜盘' },
  早盘九点: { text: '早盘九点' },
  早盘九点半: { text: '早盘九点半' },
} as const;
