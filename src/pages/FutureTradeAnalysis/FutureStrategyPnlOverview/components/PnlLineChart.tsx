import { strategyPnlUsingGet } from '@/services/raiden/futureCtpInfoController';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

type PnlLineChartProp = {
  title: string;
  yField: string;
  pnlValueMethod: '总市值' | '策略市值';
};
const PnlLineChart: React.FC<PnlLineChartProp> = (props) => {
  const [data, setData] = useState<API.StrategyPnlDto[]>();
  const config = {
    xField: 'tradingDay',
    yField: props.yField,
    padding: 'auto',
    forceFit: true,
    title: props.title,
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
    const queryParams = {
      valueMethod: props.pnlValueMethod,
    };
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
