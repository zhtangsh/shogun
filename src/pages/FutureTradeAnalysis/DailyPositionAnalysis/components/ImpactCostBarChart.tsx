import { dailyImpactCostListUsingGet } from '@/services/raiden/dailyImpactCostController';
import { Column } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

type ImpactCostBarChartProps = {
  recordDate?: string;
};
const ImpactCostBarChart: React.FC<ImpactCostBarChartProps> = (props) => {
  const [data, setData] = useState<API.DailyImpactCostDto[]>();
  const config = {
    xField: 'stockCode',
    yField: 'impactCost',
    label: {
      position: 'middle',
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
    meta: {
      recordDate: {
        alias: '日期',
      },
      impactCost: {
        alias: '冲击成本',
      },
    },
  };

  const getDailyImpactCost = async () => {
    const queryParams = {
      recordDate: props.recordDate,
    };
    const result = await dailyImpactCostListUsingGet(queryParams);
    const tmp = [];
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
    }
    setData(tmp);
  };

  useEffect(() => {
    getDailyImpactCost();
  }, [props.recordDate]);
  return (
    <>
      <Column {...config} data={data} />
    </>
  );
};
export default ImpactCostBarChart;
