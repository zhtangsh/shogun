import { indicatorDataListUsingGet1 } from '@/services/raiden/indicatorV2Controller';
import { Line } from '@ant-design/charts';
import { LineChartOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type IndicatorLineChartV2Props = {
  linechartConfig: API.IndicatorConfigV2Dto;
  startDate: string;
  endDate: string;
};
const IndicatorLineChartV2: React.FC<IndicatorLineChartV2Props> = (props) => {
  const [data, setData] = useState<API.IndicatorDataV2Dto[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
export default IndicatorLineChartV2;
