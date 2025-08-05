import { ctpPositionListUsingGet } from '@/services/raiden/futureCtpInfoController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import moment from 'moment';
import React, { useRef } from 'react';

const FuturePositionProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const posiDirectionEnum = {
    THOST_FTDC_PD_Net: {
      text: 'net',
    },
    THOST_FTDC_PD_Long: {
      text: '多',
    },
    THOST_FTDC_PD_Short: {
      text: '空',
    },
  };
  const positionDateEnum = {
    THOST_FTDC_PSD_Today: {
      text: '今仓',
    },
    THOST_FTDC_PSD_History: {
      text: '昨仓',
    },
  };
  const columns: ProColumns<API.PositionDto>[] = [
    {
      title: '合约代码',
      dataIndex: 'instrumentId',
      search: false,
    },
    {
      title: '日期',
      dataIndex: 'tradingDay',
      valueType: 'date',
      initialValue: moment().format('YYYY-MM-DD'),
      search: {
        transform: (value: any) => new Date(value).getTime(),
      },
    },
    {
      title: '方向',
      dataIndex: 'posiDirection',
      valueEnum: posiDirectionEnum,
      search: false,
    },
    {
      title: '持仓日期',
      dataIndex: 'positionDate',
      valueEnum: positionDateEnum,
      search: false,
    },
    {
      title: '总仓位',
      dataIndex: 'position',
      search: false,
    },
    {
      title: '平仓盈亏',
      dataIndex: 'closeProfit',
      search: false,
    },
    {
      title: '持仓盈亏',
      dataIndex: 'positionProfit',
      search: false,
    },
    {
      title: '保证金',
      dataIndex: 'useMargin',
      search: false,
    },
    {
      title: '今日仓位',
      dataIndex: 'todayPosition',
      search: false,
    },
    {
      title: '昨日仓位',
      dataIndex: 'ydPosition',
      search: false,
    },
  ];
  const getPositionData = async (params: any) => {
    const queryParams = {
      ...(params?.tradingDay && {
        tradingDay: params.tradingDay,
      }),
    };
    console.log(queryParams);
    const result = await ctpPositionListUsingGet(queryParams);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) =>
      a.instrumentId < b.instrumentId ? -1 : a.instrumentId > b.instrumentId ? 1 : 0,
    );
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.PositionDto>
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
export default FuturePositionProTable;
