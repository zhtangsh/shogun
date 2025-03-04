import { ProCard } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import React from 'react';
import IndicatorLineChart from './IndicatorLineChart';

type GroupLineChartContainerProps = {
  linechartConfig: API.IndicatorConfigDto[];
};
const GroupLineChartContainer: React.FC<GroupLineChartContainerProps> = (props) => {
  return (
    <>
      <ProCard title="图表列表" gutter={[24, 24]}>
        <Row>
          {props.linechartConfig.map((val) => (
            <Col key={val.label} span={12}>
              <Card title={val.labelName}>
                <IndicatorLineChart linechartConfig={val} />
              </Card>
            </Col>
          ))}
        </Row>
      </ProCard>
    </>
  );
};
export default GroupLineChartContainer;
