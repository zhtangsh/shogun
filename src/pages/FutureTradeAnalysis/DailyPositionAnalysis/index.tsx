import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import DailyImpactCostDetail from './components/DailyImpactCostDetail';
import DailyPositionMonitorDetail from './components/DailyPositionMonitorDetail';

const DailyPositionAnalysis: React.FC = () => {
  const [activeKey, setActiveKey] = useState('impactCost');
  const handleTabsChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard
              tabs={{
                type: 'card',
                size: 'small',
                tabPosition: 'top',
                activeKey: activeKey,
                onChange: handleTabsChange,
              }}
            >
              <ProCard.TabPane key="impactCost" tab="冲击成本">
                <DailyImpactCostDetail />
              </ProCard.TabPane>
              <ProCard.TabPane key="positionMonitor" tab="持仓监控">
                <DailyPositionMonitorDetail />
              </ProCard.TabPane>
              <ProCard.TabPane key="revenueTrace" tab="收益归因">
                收益归因
              </ProCard.TabPane>
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default DailyPositionAnalysis;
