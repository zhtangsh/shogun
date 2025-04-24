import { gutter } from '@/config/font';
import { indicatorConfigListUsingGet1 } from '@/services/raiden/indicatorV2Controller';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Card, Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import GroupLineChartContainerV2 from './GroupLineChartContainer';
const { RangePicker } = DatePicker;

type IndicatorOverviewPannelV2Prop = {
  tagGroup: number;
};
const IndicatorOverviewPannelV2: React.FC<IndicatorOverviewPannelV2Prop> = (props) => {
  const [indicatorConfigData, setIndicatorConfigData] = useState<
    Record<string, API.IndicatorConfigV2Dto[]>
  >({});
  const [queryParam, setQueryParam] = useState({
    startDate: moment('2024-01-01').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  const [tabKeyList, setTabKeyList] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState('');
  const handleTabsChange = (key: string) => {
    setActiveKey(key);
  };
  const getIndicatorConfig = async () => {
    const result = await indicatorConfigListUsingGet1({ tabGroup: props.tagGroup });
    const dataList = [];
    if (result.status === 0 && result.res) {
      dataList.push(...result.res);
    }
    const tabConfig = {} as Record<string, any>;
    const res = {} as Record<string, API.IndicatorConfigV2Dto[]>;
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
    console.log(res);
    console.log(tList);
    setIndicatorConfigData(res);
    setTabKeyList(tList);
    if (tList.length > 0) {
      setActiveKey(tList[0]);
    }
  };

  const generateTab = () => {
    return tabKeyList.map((key) => (
      <ProCard.TabPane key={key} tab={indicatorConfigData[key][0].tabName}>
        <GroupLineChartContainerV2
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
  }, [props]);

  const [form] = Form.useForm();
  const onFinish = (value: any) => {
    const { dateRange } = value;

    setQueryParam({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
    });
  };
  // const handleDownload = () => {
  //   const url = `${window.API.BACKEND_URL}/api/v1/research/indicator/excel?startDate=${queryParam.startDate}&endDate=${queryParam.endDate}&tabGroup=${props.tagGroup}`;
  //   // 直接通过浏览器行为下载（无需处理响应）
  //   const link = document.createElement('a');
  //   link.href = url;
  //   // link.download = '自定义文件名.pdf'; // 设置下载后的文件名（跨域时可能失效）
  //   link.style.display = 'none';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link); // 清理 DOM
  // };

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
                      initialValue={[moment('2024-01-01'), moment()]}
                    >
                      <RangePicker />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      {/* <Button onClick={handleDownload}>导出</Button> */}
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
export default IndicatorOverviewPannelV2;
