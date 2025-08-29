import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row, Tabs } from 'antd';
import React from 'react';
import FutureNameCodeExposureProTable from './components/FutureNameCodeExposureProTable';
import HistoryDailyExposureCurveProTable from './components/HistoryDailyExposureCurveProTable';

const FutureNameCodeExposureQuery: React.FC = () => {
  const items = [
    {
      key: 'futreNameCodeExposure',
      label: '品种敞口分析',
      children: <FutureNameCodeExposureProTable />,
    },
    {
      key: 'historyExposure',
      label: '历史日度总敞口',
      children: <HistoryDailyExposureCurveProTable />,
    },
  ];
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <Tabs defaultActiveKey="futreNameCodeExposure" items={items} />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FutureNameCodeExposureQuery;
