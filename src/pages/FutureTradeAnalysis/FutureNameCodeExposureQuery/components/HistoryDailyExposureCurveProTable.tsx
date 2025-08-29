import { dailyExposureCurveUsingGet } from '@/services/raiden/futureRiskController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const HistoryDailyExposureCurveProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.FutureExposureCurveDto>[] = [
    {
      title: '日期',
      dataIndex: 'tradingDay',
      sorter: (a, b) => a.tradingDay.localeCompare(b.tradingDay), // 设置 sorter 函数
      search: false,
    },
    {
      title: '敞口值',
      dataIndex: 'exposure',
      sorter: (a, b) => a.exposure - b.exposure, // 设置 sorter 函数
      search: false,
    },
  ];
  const fetchData = async () => {
    const result = await dailyExposureCurveUsingGet({ bIncludeToday: false });
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) => -a.tradingDay.localeCompare(b.tradingDay));
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.FutureExposureCurveDto>
        columns={columns}
        actionRef={actionRef}
        request={fetchData}
        search={false}
        rowKey={'id'}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="历史日度总敞口"
      />
    </>
  );
};
export default HistoryDailyExposureCurveProTable;
