import { exposureStrategyContractWeightListUsingGet } from '@/services/raiden/futureRiskController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const ExposureContractExposureProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.ContractWeightDto>[] = [
    {
      title: '合约代码',
      dataIndex: 'strategyName',
      search: false,
    },
    {
      title: '权重',
      dataIndex: 'weight',
      sorter: (a, b) => a.weight - b.weight, // 设置 sorter 函数
      search: false,
    },
  ];
  const getPositionData = async () => {
    const result = await exposureStrategyContractWeightListUsingGet({});
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.ContractWeightDto>
        columns={columns}
        actionRef={actionRef}
        request={getPositionData}
        rowKey={'id'}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="截面中性策略权重分析"
        search={false}
      />
    </>
  );
};
export default ExposureContractExposureProTable;
