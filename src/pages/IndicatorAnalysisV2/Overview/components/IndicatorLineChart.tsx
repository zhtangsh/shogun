import { indicatorDataListUsingGet1 } from '@/services/raiden/indicatorV2Controller';
import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

type IndicatorLineChartV2Props = {
  linechartConfig: API.IndicatorConfigV2Dto;
  startDate: string;
  endDate: string;
};
const IndicatorLineChartV2: React.FC<IndicatorLineChartV2Props> = (props) => {
  const [data, setData] = useState<API.IndicatorDataV2Dto[]>();
  const config = {
    xField: 'x',
    yField: 'y',
    padding: 'auto',
    forceFit: true,
    title: props.linechartConfig.plotTableName,
    connectNulls: true,
    seriesField: 'categoryValue',
    colorField: 'categoryValue',
    theme: 'academy',
    ...(props.linechartConfig.xdirection === 'desc' && {
      scale: {
        x: {
          domain: [120, 0],
          tickMethod: () => [120, 100, 80, 60, 40, 20, 0],
        },
      },
    }),
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

  // const filterCompleteDateData = (data_list: API.IndicatorDataV2Dto[], label_list: string[]) => {
  //   if (label_list.length === 0) return [];

  //   //  按日期分组
  //   const dateMap = new Map<any, API.IndicatorDataV2Dto[]>();
  //   for (const item of data_list) {
  //     const dateItems = dateMap.get(item.x) || [];
  //     dateItems.push(item);
  //     dateMap.set(item.x, dateItems);
  //   }

  //   // 筛选完整日期的数据
  //   const result: API.IndicatorDataV2Dto[] = [];
  //   for (const [, items] of dateMap) {
  //     // 获取当前日期存在的所有标签
  //     const existingLabels = new Set(items.map((item) => item.categoryValue));

  //     // 检查是否包含所有必需标签
  //     const hasAllLabels = label_list.every((label) => existingLabels.has(label));

  //     if (hasAllLabels) {
  //       result.push(...items);
  //     }
  //   }

  //   return result;
  // };

  const getIndicatorData = async () => {
    const queryParams: API.indicatorDataListUsingGET1Params = {
      startDate: props.startDate,
      endDate: props.endDate,
      categoryCol: props.linechartConfig.categoryCol,
      dateCol: props.linechartConfig.dateCol,
      filterCols: props.linechartConfig.filterCols,
      filterValues: props.linechartConfig.filterValues,
      schemaName: props.linechartConfig.schemaName,
      selectCols: props.linechartConfig.selectCols,
      tableName: props.linechartConfig.tableName,
      xCol: props.linechartConfig.xcol,
      yCol: props.linechartConfig.ycol,
      xValueType: props.linechartConfig.xvalueType,
      categoryKey: props.linechartConfig.categoryKey,
    };
    const result = await indicatorDataListUsingGet1(queryParams);
    let tmp: API.IndicatorDataV2Dto[] = [];
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
      tmp = tmp.filter((v) => v.x <= 120);
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
export default IndicatorLineChartV2;
