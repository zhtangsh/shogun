import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';
import PnlLineChart from './components/PnlLineChart';

const FutureStrategyPnlOverview: React.FC = () => {
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <PnlLineChart />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FutureStrategyPnlOverview;
