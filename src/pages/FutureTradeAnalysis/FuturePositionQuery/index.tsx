import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';
import FuturePositionProTable from './components/FuturePositionProTable';

const FuturePositionQuery: React.FC = () => {
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <FuturePositionProTable />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FuturePositionQuery;
