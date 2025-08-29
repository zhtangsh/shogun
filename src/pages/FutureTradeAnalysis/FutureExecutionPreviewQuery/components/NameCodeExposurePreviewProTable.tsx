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
      search: false,
    },
  ];
  const fetchData = async () => {
    // 获取当前时间
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 100 + minutes; // 简化时间比较，例如 20:40 -> 2040

    let tradeHour: '夜盘' | '早盘九点' | '早盘九点半' = '夜盘';

    if (currentTime >= 2040 || currentTime < 840) {
      tradeHour = '夜盘';
    } else if (currentTime >= 840 && currentTime <= 910) {
      tradeHour = '早盘九点';
    } else if (currentTime > 910 && currentTime <= 2040) {
      tradeHour = '早盘九点半';
    }
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
        search={false}
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
export default NameCodeExposurePreviewProTable;
