import { gutter } from '@/config/font';
import { indicatorConfigListUsingGet } from '@/services/raiden/indicatorController';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import GroupLineChartContainer from './components/GroupLineChartContainer';

const DailyPositionAnalysis: React.FC = () => {
  const [indicatorConfigData, setIndicatorConfigData] = useState<
    Record<string, API.IndicatorConfigDto[]>
  >({});
  const [tabKeyList, setTabKeyList] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState('');
  const handleTabsChange = (key: string) => {
    setActiveKey(key);
  };
  const getIndicatorConfig = async () => {
    const result = await indicatorConfigListUsingGet({});
    const dataList = [];
    if (result.status === 0 && result.res) {
      dataList.push(...result.res);
    }
    const res = {} as Record<string, API.IndicatorConfigDto[]>;
    for (const data of dataList) {
      const keyValue = data['tab'] || '';
      if (!res[keyValue]) {
        res[keyValue] = [];
      }
      res[keyValue].push(data);
    }
    const tList = Object.keys(res);
    setIndicatorConfigData(res);
    setTabKeyList(tList);
    if (tList.length > 0) {
      setActiveKey(tList[0]);
    }
  };

  const generateTab = () => {
    return tabKeyList.map((key) => (
      <ProCard.TabPane key={key} tab={indicatorConfigData[key][0].tabName}>
        <GroupLineChartContainer
          linechartConfig={indicatorConfigData[key].sort((a, b) =>
            a.idx < b.idx ? -1 : a.idx > b.idx ? 1 : 0,
          )}
        />
      </ProCard.TabPane>
    ));
  };

  useEffect(() => {
    getIndicatorConfig();
  }, []);
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
              {generateTab()}
            </ProCard>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default DailyPositionAnalysis;
