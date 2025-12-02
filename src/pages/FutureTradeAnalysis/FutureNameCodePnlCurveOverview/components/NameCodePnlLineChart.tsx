import { nameCodePnlCurveUsingGet } from '@/services/raiden/futureCtpInfoController';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
const { STAGE } = window.API;

type NameCodePnlLineChartProp = {
  title: string;
  yField: string;
};
const NameCodePnlLineChart: React.FC<NameCodePnlLineChartProp> = (props) => {
  const [data, setData] = useState<API.NameCodePnlDto[]>();
  const config = {
    xField: 'tradingDay',
    yField: props.yField,
    padding: 'auto',
    forceFit: true,
    title: props.title,
    connectNulls: true,
    seriesField: 'nameCodeCategory',
    colorField: 'nameCodeCategory',
    theme: 'academy',
    xAxis: {
      type: 'date',
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    legend: {
      color: {
        itemMarkerSize: 25,
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
  };

  const fetchData = async () => {
    const result = await nameCodePnlCurveUsingGet({});
    const tmp = [];
    if (STAGE === 'test') {
      tmp.push({
        tradingDay: '2025-07-25',
        nameCodeCategory: '国债期货',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 20000000,
      });
      tmp.push({
        tradingDay: '2025-07-25',
        nameCodeCategory: '股指期货',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 20000000,
      });
      tmp.push({
        tradingDay: '2025-07-25',
        nameCodeCategory: '商品期货',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 20000000,
      });
    }
    if (STAGE === 'prod') {
      tmp.push({
        tradingDay: '2025-11-21',
        nameCodeCategory: '国债期货',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 5500000,
      });
      tmp.push({
        tradingDay: '2025-11-21',
        nameCodeCategory: '商品期货',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 5500000,
      });
      tmp.push({
        tradingDay: '2025-11-21',
        nameCodeCategory: '股指期货',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 5500000,
      });
    }
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
    }
    console.log(tmp);
    setData(tmp);
  };

  useEffect(() => {
    fetchData();
  }, [props]);
  return (
    <>
      <Line {...config} data={data} />
    </>
  );
};
export default NameCodePnlLineChart;
