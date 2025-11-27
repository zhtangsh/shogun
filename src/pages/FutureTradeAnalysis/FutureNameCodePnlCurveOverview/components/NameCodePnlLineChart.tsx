import { nameCodePnlCurveUsingGet } from '@/services/raiden/futureCtpInfoController';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

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
