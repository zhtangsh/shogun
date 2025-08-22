import { directionEnum, offsetEnum, tradeHourEnum } from '@/constants/enum';
import { executionPreviewListUsingGet } from '@/services/raiden/futureRiskController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const FutureExecutionPreviewProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.FutureExecutionPreviewDto>[] = [
    {
      title: '合约代码',
      dataIndex: 'instrumentId',
      sorter: (a, b) => a.instrumentId.localeCompare(b.instrumentId), // 设置 sorter 函数
      search: false,
    },
    {
      title: '买卖方向',
      dataIndex: 'direction',
      valueEnum: directionEnum,
      search: false,
    },
    {
      title: '开平标志',
      dataIndex: 'offset',
      valueEnum: offsetEnum,
      search: false,
    },
    {
      title: '执行数量',
      dataIndex: 'volume',
      search: false,
      sorter: (a, b) => a.volume - b.volume, // 设置 sorter 函数
    },
    {
      title: '交易所代码',
      dataIndex: 'exchangeId',
      search: false,
    },
    {
      title: '批次时间戳',
      dataIndex: 'dt',
      valueType: 'date',
      search: false,
    },
    {
      title: '交易时段',
      dataIndex: 'tradeHour',
      initialValue: '夜盘',
      valueEnum: tradeHourEnum,
      search: {
        transform: (value: any) => value,
      },
    },
    {
      title: '交易批次',
      dataIndex: 'tradeHourOffset',
      search: false,
    },
  ];
  const fetchData = async (params: any) => {
    const { tradeHour } = params;
    const queryParams = { ...(tradeHour && { tradeHour }) };

    const result = await executionPreviewListUsingGet(queryParams);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) => a.instrumentId.localeCompare(b.instrumentId));
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.FutureExecutionPreviewDto>
        columns={columns}
        actionRef={actionRef}
        request={fetchData}
        rowKey={'id'}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="当日品种敞口预览"
      />
    </>
  );
};
export default FutureExecutionPreviewProTable;
