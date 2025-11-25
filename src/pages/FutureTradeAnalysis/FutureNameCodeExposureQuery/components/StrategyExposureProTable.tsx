import { strategyWeightListUsingGet } from '@/services/raiden/futureRiskController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const StrategyExposureProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.StrategyWeightDto>[] = [
    {
      title: '策略名称',
      dataIndex: 'strategyName',
      search: false,
    },
    {
      title: '品种敞口',
      dataIndex: 'weight',
      sorter: (a, b) => a.weight - b.weight, // 设置 sorter 函数
      search: false,
    },
  ];
  const getPositionData = async () => {
    const result = await strategyWeightListUsingGet({});
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) => a.strategyName.localeCompare(b.strategyName));
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.StrategyWeightDto>
        columns={columns}
        actionRef={actionRef}
        request={getPositionData}
        rowKey={'id'}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="子策略敞口分析"
        search={false}
      />
    </>
  );
};
export default StrategyExposureProTable;
