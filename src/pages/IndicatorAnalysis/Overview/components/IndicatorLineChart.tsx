import { indicatorDataListUsingGet } from '@/services/raiden/indicatorController';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

type IndicatorLineChartProp = {
  linechartConfig: API.IndicatorConfigDto;
  startDate: string;
  endDate: string;
};
const IndicatorLineChart: React.FC<IndicatorLineChartProp> = (props) => {
  const [data, setData] = useState<API.IndicatorDataDto[]>();
  const config = {
    xField: 'tday',
    yField: 'value',
    padding: 'auto',
    forceFit: true,
    title: props.linechartConfig.plotTableName,
    connectNulls: true,
    seriesField: 'labelName',
    colorField: 'labelName',
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

  const getIndicatorData = async () => {
    const queryParams: API.indicatorDataListUsingGETParams = {
      startDate: props.startDate,
      endDate: props.endDate,
      label: props.linechartConfig.label,
      labelName: props.linechartConfig.labelName,
      tableName: props.linechartConfig.tableName,
      nameCode: props.linechartConfig.nameCode,
      schema: props.linechartConfig.schemaName,
      cdAdj: props.linechartConfig.cdAdj,
    };
    const result = await indicatorDataListUsingGet(queryParams);
    const tmp = [];
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
    }
    setData(tmp);
  };

  useEffect(() => {
    getIndicatorData();
  }, [props]);
  return (
    <>
      <Line {...config} data={data} />
    </>
  );
};
export default IndicatorLineChart;
