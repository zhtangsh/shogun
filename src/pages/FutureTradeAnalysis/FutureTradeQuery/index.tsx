import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';
import FutureTradeProTable from './components/FutureTradeProTable';

const FutureTradeQuery: React.FC = () => {
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <FutureTradeProTable />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FutureTradeQuery;
