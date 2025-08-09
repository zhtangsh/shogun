import { nameCodeExposureUsingGet } from '@/services/raiden/futureCtpInfoController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import moment from 'moment';
import React, { useRef } from 'react';

const FutureNameCodeExposureProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.FutureNameCodeExposureDto>[] = [
    {
      title: '品种代码',
      dataIndex: 'nameCode',
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
      title: '品种敞口',
      dataIndex: 'exposure',
      sorter: (a, b) => a.exposure - b.exposure, // 设置 sorter 函数
      search: false,
    },
  ];
  const getPositionData = async (params: any) => {
    const queryParams = {
      ...(params?.tradingDay && {
        recordDate: params.tradingDay,
      }),
    };
    const result = await nameCodeExposureUsingGet(queryParams);
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
      <ProTable<API.FutureNameCodeExposureDto>
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
export default FutureNameCodeExposureProTable;
