import { ProCard } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import React from 'react';
import IndicatorLineChartV2 from './IndicatorLineChart';

type GroupLineChartContainerV2Props = {
  linechartConfig: API.IndicatorConfigV2Dto[];
  startDate: string;
  endDate: string;
};
const GroupLineChartContainerV2: React.FC<GroupLineChartContainerV2Props> = (props) => {
  const buildChart = () => {
    return props.linechartConfig.map((val) => {
      return (
        <Col key={val.categoryCol + val.categoryKey} span={12}>
          <Card>
            <IndicatorLineChartV2
              linechartConfig={val}
              startDate={props.startDate}
              endDate={props.endDate}
            />
          </Card>
        </Col>
      );
    });
  };
  return (
    <>
      <ProCard title="图表列表" gutter={[24, 24]}>
        <Row>{buildChart()}</Row>
      </ProCard>
    </>
  );
};
export default GroupLineChartContainerV2;
