import { positionMonitorListUsingGet } from '@/services/raiden/dailyPositionStatisticController';
import { Pie } from '@ant-design/charts';
import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const DailyPositionMonitorDetail: React.FC = () => {
  const [queryParam, setQueryParam] = useState<API.positionMonitorListUsingGETParams>({
    recordDate: moment().valueOf(),
    grouper: '行业',
  });
  const [pieData, setPieData] = useState<any[]>([]);
  const config = {
    autoFit: false,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: (d: any) => `${d.type}\n ${d.value}`,
      style: {
        fontSize: 14,
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  const [form] = Form.useForm();
  const getPositionMonitorDetail = async () => {
    const result = await positionMonitorListUsingGet(queryParam);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    console.log(data);
    setPieData(data);
  };

  const onFinish = (value: any) => {
    const { recordDate, grouper } = value;
    setQueryParam({
      ...queryParam,
      recordDate: recordDate.valueOf(),
      grouper: grouper,
    });
  };

  useEffect(() => {
    getPositionMonitorDetail();
  }, [queryParam]);
  return (
    <>
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="recordDate" label="日期" initialValue={moment()}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="grouper" label="归因类型" initialValue={'行业'}>
              <Select
                options={[
                  { value: '行业', label: '行业' },
                  { value: '转债类型', label: '转债类型' },
                  { value: '大小票', label: '大小票' },
                ]}
              />
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
      <Row>
        <Pie {...config} data={pieData} />
      </Row>
    </>
  );
};
export default DailyPositionMonitorDetail;
