import { contractVolumeListUsingGet } from '@/services/raiden/futureRiskController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const ContractVolumeProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.ContractVolumeDto>[] = [
    {
      title: '合约代码',
      dataIndex: 'contract',
      search: false,
    },
    {
      title: '权重',
      dataIndex: 'weight',
      sorter: (a, b) => a.weight - b.weight, // 设置 sorter 函数
      search: false,
    },
    {
      title: '手数',
      dataIndex: 'totalVolume',
      sorter: (a, b) => a.totalVolume - b.totalVolume, // 设置 sorter 函数
      search: false,
    },
  ];
  const getPositionData = async () => {
    const result = await contractVolumeListUsingGet({});
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
      <ProTable<API.ContractVolumeDto>
        columns={columns}
        actionRef={actionRef}
        request={getPositionData}
        rowKey={'id'}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="汇总品种手数分析"
        search={false}
      />
    </>
  );
};
export default ContractVolumeProTable;
