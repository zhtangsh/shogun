import { indicatorDataListUsingGet } from '@/services/raiden/indicatorController';
import { Line } from '@ant-design/charts';
import { LineChartOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type IndicatorLineChartProp = {
  linechartConfig: API.IndicatorConfigDto;
  startDate: string;
  endDate: string;
};
const IndicatorLineChart: React.FC<IndicatorLineChartProp> = (props) => {
  const [data, setData] = useState<API.IndicatorDataDto[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const filterCompleteDateData = (data_list: API.IndicatorDataDto[], label_list: string[]) => {
    if (label_list.length === 0) return [];

    //  按日期分组
    const dateMap = new Map<string, API.IndicatorDataDto[]>();
    for (const item of data_list) {
      const dateItems = dateMap.get(item.tday) || [];
      dateItems.push(item);
      dateMap.set(item.tday, dateItems);
    }

    // 筛选完整日期的数据
    const result: API.IndicatorDataDto[] = [];
    for (const [, items] of dateMap) {
      // 获取当前日期存在的所有标签
      const existingLabels = new Set(items.map((item) => item.label));

      // 检查是否包含所有必需标签
      const hasAllLabels = label_list.every((label) => existingLabels.has(label));

      if (hasAllLabels) {
        result.push(...items);
      }
    }

    return result;
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
      const res_filtered = filterCompleteDateData(
        result.res,
        props.linechartConfig.label.split(','),
      );
      tmp.push(...res_filtered);
    }
    setData(tmp);
  };
  const onModalClick = () => {
    setIsModalOpen(true);
    console.log('onModalClick');
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getIndicatorData();
  }, [props]);
  return (
    <>
      <Row>
        <Flex>
          <Button
            type="primary"
            shape="circle"
            icon={<LineChartOutlined />}
            onClick={onModalClick}
          />
        </Flex>
      </Row>
      <Row>
        <Line {...config} data={data} />
      </Row>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1500}>
        <Line {...config} data={data} width={1400} height={600} />
      </Modal>
    </>
  );
};
export default IndicatorLineChart;
