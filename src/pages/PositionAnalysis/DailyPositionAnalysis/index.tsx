import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';
import DailyPositionProTable from './components/DailyPositionProTable';

const DailyPositionAnalysis: React.FC = () => {
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <DailyPositionProTable />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default DailyPositionAnalysis;
