import {
  dailyImpactCostListUsingGet,
  dailyImpactCostStatisticUsingGet,
} from '@/services/raiden/dailyImpactCostController';
import { Column } from '@ant-design/charts';
import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const DailyImpactCostDetail: React.FC = () => {
  const [openDailyModal, setOpenDailyModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [selectRecordDate, setSelectRecordDate] = useState<string>('');
  const [barData, setBarData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<API.DailyImpactCostDto[]>([]);
  const columns = [
    {
      title: '日期',
      key: 'recordDate',
      dataIndex: 'recordDate',
    },
    {
      title: '冲击成本',
      key: 'impactCost',
      dataIndex: 'impactCost',
    },
    {
      title: '交易类型',
      key: 'orderType',
      dataIndex: 'orderType',
    },
    {
      title: '股票编码',
      key: 'stockCode',
      dataIndex: 'stockCode',
    },
    {
      title: 'vwap1m',
      key: 'vwap1mPrice',
      dataIndex: 'vwap1mPrice',
    },
    {
      title: '成交价格',
      key: 'tradePrice',
      dataIndex: 'tradePrice',
    },
    {
      title: '成交量',
      key: 'tradedVolume',
      dataIndex: 'tradedVolume',
    },
    {
      title: '成交金额',
      key: 'tradedAmount',
      dataIndex: 'tradedAmount',
    },
  ];

  const config = {
    xField: 'recordDate',
    yField: 'value',
    seriesField: 'series',
    label: {
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  const getDailyImpactCostSum = async () => {
    const result = await dailyImpactCostStatisticUsingGet({});
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    let tmp = [];
    for (let dto of data) {
      tmp.push({
        recordDate: dto.recordDate,
        series: '冲击成本',
        value: dto.impactCostSum,
      });
    }
    setBarData(tmp);
  };

  const getDailyImpactCost = async (params: any) => {
    const result = await dailyImpactCostListUsingGet(params);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    setTableData(data);
    console.log(data);
  };
  const onReadyCallback = (plot: any) => {
    plot.chart.on('element:click', (e: any) => {
      setSelectRecordDate(e?.data?.data?.recordDate);
    });
  };
  useEffect(() => {
    getDailyImpactCostSum();
  }, []);
  useEffect(() => {
    if (!!selectRecordDate) {
      setOpenDailyModal(true);
      setModalTitle(`${selectRecordDate} - 交易冲击成本`);
      getDailyImpactCost({ recordDate: new Date(selectRecordDate).getTime() });
    } else {
      setOpenDailyModal(false);
      setTableData([]);
      setModalTitle(`${selectRecordDate} - 交易冲击成本`);
    }
  }, [selectRecordDate]);
  return (
    <>
      <Column {...config} data={barData} onReady={onReadyCallback} />

      <Modal
        title={modalTitle}
        centered
        open={openDailyModal}
        destroyOnClose
        onOk={() => {
          setOpenDailyModal(false);
          setTableData([]);
        }}
        onCancel={() => {
          setOpenDailyModal(false);
          setTableData([]);
        }}
        width={1000}
      >
        <Table bordered columns={columns} dataSource={tableData} rowKey={'id'} />
      </Modal>
    </>
  );
};
export default DailyImpactCostDetail;
