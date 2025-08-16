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
              <PnlLineChart title="策略收益分析（基于总市值）" pnlValueMethod="总市值" />
            </ProCard>
          </Col>
          <Col span={24}>
            <ProCard>
              <PnlLineChart title="策略收益分析（基于策略市值）" pnlValueMethod="策略市值" />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FutureStrategyPnlOverview;
