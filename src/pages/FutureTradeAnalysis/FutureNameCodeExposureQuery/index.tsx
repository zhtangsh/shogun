import { gutter } from '@/config/font';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row, Tabs } from 'antd';
import React from 'react';
import ContractExposureProTable from './components/ContractExposureProTable';
import ExposureContractExposureProTable from './components/ExposureContractExposureProTable';
import NeutralContractExposureProTable from './components/NeutralContractExposureProTable';
import StrategyExposureProTable from './components/StrategyExposureProTable';

const FutureNameCodeExposureQuery: React.FC = () => {
  const items = [
    {
      key: 'strategyExposure',
      label: '子策略敞口分析',
      children: <StrategyExposureProTable />,
    },
    {
      key: 'contractExposure',
      label: '汇总品种权重分析',
      children: <ContractExposureProTable />,
    },
    {
      key: 'neutralStrategyExposure',
      label: '截面中性策略权重分析',
      children: <NeutralContractExposureProTable />,
    },
    {
      key: 'exposureContractExposureProTable',
      label: '带敞口的截面策略权重分析',
      children: <ExposureContractExposureProTable />,
    },
  ];
  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter} justify="center">
          <Col span={24}>
            <ProCard>
              <Tabs defaultActiveKey="strategyExposure" items={items} />
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default FutureNameCodeExposureQuery;
