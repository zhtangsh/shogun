import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row, Tabs } from 'antd';
import React from 'react';
import DailyExposureCurveProTable from './components/DailyExposureCurveProTable';
import FutureExecutionPreviewProTable from './components/FutureExecutionPreviewProTable';
import NameCodeExposurePreviewProTable from './components/NameCodeExposurePreviewProTable';

const FutureExecutionPreviewQuery: React.FC = () => {
  const items = [
    {
      key: 'executionPreview',
      label: '当日交易执行预览',
      children: <FutureExecutionPreviewProTable />,
    },
    {
      key: 'nameCodeExposurePreview',
      label: '当日品种敞口预览',
      children: <NameCodeExposurePreviewProTable />,
    },
    {
      key: 'dailyExposureCurveProTable',
      label: '日度总敞口预览',
      children: <DailyExposureCurveProTable />,
    },
  ];

  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <Tabs defaultActiveKey="executionPreview" items={items} />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default FutureExecutionPreviewQuery;
