import { gutter } from '@/config/font';
import { indicatorConfigListUsingGet } from '@/services/raiden/indicatorController';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Card, Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import GroupLineChartContainer from './components/GroupLineChartContainer';
const { RangePicker } = DatePicker;

const DailyPositionAnalysis: React.FC = () => {
  const [indicatorConfigData, setIndicatorConfigData] = useState<
    Record<string, API.IndicatorConfigDto[]>
  >({});
  const [queryParam, setQueryParam] = useState({
    startDate: moment('2023-01-01').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
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
    const tabConfig = {} as Record<string, any>;
    const res = {} as Record<string, API.IndicatorConfigDto[]>;
    for (const data of dataList) {
      const keyValue = data['tab'] || '';
      if (!res[keyValue]) {
        res[keyValue] = [];
      }
      res[keyValue].push(data);
      tabConfig[keyValue] = {
        tab: keyValue,
        tabIdx: data.tabIdx,
      };
    }
    const tList = Object.values(tabConfig)
      .sort((a, b) => (a['tabIdx'] < b['tabIdx'] ? -1 : a['tabIdx'] > b['tabIdx'] ? 1 : 0))
      .map((v) => v['tab']);
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
          startDate={queryParam.startDate}
          endDate={queryParam.endDate}
        />
      </ProCard.TabPane>
    ));
  };

  useEffect(() => {
    getIndicatorConfig();
  }, []);

  const [form] = Form.useForm();
  const onFinish = (value: any) => {
    const { dateRange } = value;
    console.log(dateRange[0].format('YYYY-MM-DD'));
    console.log(dateRange[1].format('YYYY-MM-DD'));

    setQueryParam({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
    });
  };

  return (
    <>
      <PageContainer header={{ title: false }}>
        <Row gutter={gutter}>
          <Col span={24}>
            <Card>
              <Form form={form} layout="horizontal" onFinish={onFinish}>
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item
                      name="dateRange"
                      label="日期"
                      initialValue={[moment('2023-01-01'), moment()]}
                    >
                      <RangePicker />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
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
