import { strategyPnlUsingGet } from '@/services/raiden/futureCtpInfoController';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

type PnlLineChartProp = any;
const PnlLineChart: React.FC<PnlLineChartProp> = (props) => {
  const [data, setData] = useState<API.StrategyPnlDto[]>();
  const config = {
    xField: 'tradingDay',
    yField: 'npv',
    padding: 'auto',
    forceFit: true,
    title: '策略收益分析',
    connectNulls: true,
    seriesField: 'strategyName',
    colorField: 'strategyName',
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
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
  };

  const fetchData = async () => {
    const queryParams = {};
    const result = await strategyPnlUsingGet(queryParams);
    const tmp = [];
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
export default PnlLineChart;
