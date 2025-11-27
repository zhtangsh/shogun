import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';
import NameCodePnlLineChart from './components/NameCodePnlLineChart';

const FutureNameCodePnlCurveOverview: React.FC = () => {
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <NameCodePnlLineChart title="资产大类损益统计(累计收益)" yField="cumPnl" />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FutureNameCodePnlCurveOverview;
