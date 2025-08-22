import { indicatorDataListUsingGet } from '@/services/raiden/indicatorController';
import { DualAxes } from '@ant-design/charts';
import { LineChartOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type IndicatorDualAxeChartProp = {
  linechartConfig: API.IndicatorConfigDto;
  startDate: string;
  endDate: string;
};
const IndicatorDualAxeChart: React.FC<IndicatorDualAxeChartProp> = (props) => {
  const [leftData, setLeftData] = useState<API.IndicatorDataDto[]>();
  const [rightData, setRightData] = useState<API.IndicatorDataDto[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const config = {
    padding: 'auto',
    forceFit: true,
    title: props.linechartConfig.plotTableName,
    connectNulls: true,
    theme: 'academy',
    xAxis: {
      type: 'date',
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    xField: 'tday',
    yField: 'value',
    children: [
      {
        type: 'line',
        data: leftData,
        seriesField: 'labelName',
        colorField: 'labelName',
        axis: {
          y: {
            position: 'left',
          },
        },
      },
      {
        type: 'line',
        data: rightData,
        seriesField: 'labelName',
        colorField: 'labelName',
        axis: {
          y: {
            position: 'right',
          },
        },
      },
    ],
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
      label: props.linechartConfig.label.replace(';', ','),
      labelName: props.linechartConfig.labelName.replace(';', ','),
      tableName: props.linechartConfig.tableName,
      nameCode: props.linechartConfig.nameCode,
      schema: props.linechartConfig.schemaName,
      cdAdj: props.linechartConfig.cdAdj,
    };
    const result = await indicatorDataListUsingGet(queryParams);
    const left_group_label_arr = props.linechartConfig.labelName.split(';')[0].split(',');
    const right_group_label_arr = props.linechartConfig.labelName.split(';')[1].split(',');
    const left_tmp = [],
      right_tmp = [];
    if (result.status === 0 && result.res) {
      for (const d of result.res) {
        if (left_group_label_arr.includes(d.labelName)) {
          d.labelName = d.labelName + '（左）';
          left_tmp.push(d);
        } else if (right_group_label_arr.includes(d.labelName)) {
          d.labelName = d.labelName + '（右）';
          right_tmp.push(d);
        }
      }
    }
    setLeftData(left_tmp);
    setRightData(right_tmp);
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
        <DualAxes {...config} />
      </Row>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1500}>
        <DualAxes {...config} width={1400} height={600} />
      </Modal>
    </>
  );
};
export default IndicatorDualAxeChart;
