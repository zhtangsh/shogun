import { indicatorDataListUsingGet } from '@/services/raiden/indicatorController';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

type IndicatorLineChartProp = {
  linechartConfig: API.IndicatorConfigDto;
};
const IndicatorLineChart: React.FC<IndicatorLineChartProp> = (props) => {
  const [data, setData] = useState<API.IndicatorDataDto[]>();
  const config = {
    xField: 'tday',
    yField: 'value',
    padding: 'auto',
    forceFit: true,
    connectNulls: true,
    xAxis: {
      type: 'date',
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const getIndicatorData = async () => {
    const queryParams: API.indicatorDataListUsingGETParams = {
      startDate: '2023-10-01',
      endDate: '2024-01-01',
      label: props.linechartConfig.label,
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
  }, [props.linechartConfig]);
  return (
    <>
      <Line {...config} data={data} />
    </>
  );
};
export default IndicatorLineChart;
