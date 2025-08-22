import { tradeHourEnum } from '@/constants/enum';
import { nameCodeUsingGet } from '@/services/raiden/futureRiskController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const NameCodeExposurePreviewProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.NameCodeExposurePreviewDto>[] = [
    {
      title: '品种',
      dataIndex: 'nameCode',
      sorter: (a, b) => a.nameCode.localeCompare(b.nameCode), // 设置 sorter 函数
      search: false,
    },
    {
      title: '品种的权重敞口总和',
      dataIndex: 'exposure',
      sorter: (a, b) => a.exposure - b.exposure, // 设置 sorter 函数
      search: false,
    },
    {
      title: '交易时段',
      dataIndex: 'tradeHour',
      hideInTable: true,
      initialValue: '夜盘',
      valueEnum: tradeHourEnum,
      search: {
        transform: (value: any) => value,
      },
    },
  ];
  const fetchData = async (params: any) => {
    const { tradeHour } = params;
    const queryParams = { ...(tradeHour && { tradeHour }) };

    const result = await nameCodeUsingGet(queryParams);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) => a.nameCode.localeCompare(b.nameCode));
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.NameCodeExposurePreviewDto>
        columns={columns}
        actionRef={actionRef}
        request={fetchData}
        rowKey={(v) => `${v.nameCode}-${v.tradeHour}`}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="日度总敞口预览"
      />
    </>
  );
};
export default NameCodeExposurePreviewProTable;
