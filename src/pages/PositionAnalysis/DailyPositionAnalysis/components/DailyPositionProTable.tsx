import { dailyPositionListUsingGet } from '@/services/raiden/dailyPositionController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';

const buildLabel = (record: API.DailyPositionDto) => {
  let name = '继续持有';
  let color = 'success';
  if (record.yesterdayVolume === 0) {
    if (record.volume > 0) {
      name = '建仓';
      color = 'success';
    }
  } else {
    if (record.volume === 0) {
      name = '清仓';
      color = 'error';
    } else {
      if (record.volume > record.yesterdayVolume) {
        name = '增持';
        color = 'success';
      } else if (record.volume < record.yesterdayVolume) {
        name = '减持';
        color = 'error';
      }
    }
  }
  return <Tag key={`${record.stockCode}.${name}`} color={color}>
    {name}
  </Tag>;
};
const DailyPositionProTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.DailyPositionDto>[] = [
    {
      title: '股票编码',
      dataIndex: 'stockCode',
      search: false,
    },
    {
      title: '日期',
      dataIndex: 'recordDate',
      valueType: 'date',
      initialValue: moment().format('YYYY-MM-DD'),
      search: {
        transform: (value: any) => new Date(value).getTime(),
      },
    },
    {
      title: '持仓数量',
      dataIndex: 'volume',
      search: false,
    },
    {
      title: '昨夜拥股',
      dataIndex: 'yesterdayVolume',
      search: false,
    },
    {
      title: '市值',
      dataIndex: 'marketValue',
      search: false,
    },
    {
      title: '平均建仓成本',
      dataIndex: 'openPrice',
      search: false,
    },
    {
      title: '标签',
      search: false,
      render: (_, record) => (
        <Space>
          {
            buildLabel(record)
          }
        </Space>
      ),
    },
  ];
  const getPositionData = async (params: any) => {
    const queryParams = {
      ...(params?.recordDate && {
        recordDate: params.recordDate,
      }),
    };
    const result = await dailyPositionListUsingGet(queryParams);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) => -(a?.marketValue - b?.marketValue));
    return {
      data: data,
      success: true,
    };
  };
  return (
    <>
      <ProTable<API.DailyPositionDto>
        columns={columns}
        actionRef={actionRef}
        request={getPositionData}
        rowKey={'id'}
        pagination={{
          pageSize: 30,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
      />
    </>
  );
};
export default DailyPositionProTable;
