import { ProCard } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import React from 'react';
import IndicatorDualAxeChart from './IndicatorDualAxeChart';
import IndicatorLineChart from './IndicatorLineChart';

type GroupLineChartContainerProps = {
  linechartConfig: API.IndicatorConfigDto[];
  startDate: string;
  endDate: string;
};
const GroupLineChartContainer: React.FC<GroupLineChartContainerProps> = (props) => {
  const buildChart = () => {
    return props.linechartConfig.map((val) => {
      if (val.labelName.indexOf(';') > 0) {
        return (
          <Col key={val.label} span={12}>
            <Card>
              <IndicatorDualAxeChart
                linechartConfig={val}
                startDate={props.startDate}
                endDate={props.endDate}
              />
            </Card>
          </Col>
        );
      } else {
        return (
          <Col key={val.label} span={12}>
            <Card>
              <IndicatorLineChart
                linechartConfig={val}
                startDate={props.startDate}
                endDate={props.endDate}
              />
            </Card>
          </Col>
        );
      }
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
export default GroupLineChartContainer;
