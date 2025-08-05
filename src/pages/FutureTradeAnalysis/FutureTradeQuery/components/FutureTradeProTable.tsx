import { ctpTradeDataListUsingGet } from '@/services/raiden/futureCtpInfoController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import moment from 'moment';
import React, { useRef } from 'react';

const FutureTradeProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const directionEnum = {
    '0': {
      text: '买',
    },
    '1': {
      text: '卖',
    },
  };
  const offsetFlagEnum = {
    '0': {
      text: '开',
    },
    '1': {
      text: '平',
    },
    '2': {
      text: '强平',
    },
    '3': {
      text: '平今',
    },
    '4': {
      text: '平昨',
    },
  };
  const columns: ProColumns<API.CtpTradeDataDto>[] = [
    {
      title: '合约代码',
      dataIndex: 'instrumentID',
      search: false,
    },
    {
      title: '交易所',
      dataIndex: 'exchangeID',
      search: false,
    },
    {
      title: '日期',
      dataIndex: 'tradingDay',
      hideInTable: true,
      valueType: 'date',
      initialValue: moment().format('YYYY-MM-DD'),
      search: {
        transform: (value: any) => new Date(value).getTime(),
      },
    },
    {
      title: '买卖方向',
      dataIndex: 'direction',
      valueEnum: directionEnum,
      search: false,
    },

    {
      title: '组合开平标志',
      dataIndex: 'offsetFlag',
      valueEnum: offsetFlagEnum,
      search: false,
    },
    {
      title: '价格',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '数量',
      dataIndex: 'volume',
      search: false,
    },
    {
      title: '交易时间',
      dataIndex: 'dt',
      search: false,
    },
  ];
  const getPositionData = async (params: any) => {
    const queryParams = {
      ...(params?.tradingDay && {
        tradingDay: params.tradingDay,
      }),
    };
    const result = await ctpTradeDataListUsingGet(queryParams);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort(
      (a, b) => a.tradeDate.localeCompare(b.tradeDate) || a.tradeTime.localeCompare(b.tradeTime),
    );
    data.forEach(
      (v) =>
        (v.dt =
          v.tradeDate.substring(0, 4) +
          '-' +
          v.tradeDate.substring(4, 6) +
          '-' +
          v.tradeDate.substring(6) +
          ' ' +
          v.tradeTime),
    );
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.CtpTradeDataDto>
        columns={columns}
        actionRef={actionRef}
        request={getPositionData}
        rowKey={'id'}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
      />
    </>
  );
};
export default FutureTradeProTable;
