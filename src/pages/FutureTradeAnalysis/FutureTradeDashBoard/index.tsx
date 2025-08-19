import { directionEnum, offsetEnum, tradeHourEnum } from '@/constants/enum';
import { strategyPnlUsingGet } from '@/services/raiden/futureCtpInfoController';
import { executionPreviewListUsingGet } from '@/services/raiden/futureRiskController';
import { Line } from '@ant-design/charts';
import { DollarOutlined, FundOutlined, RiseOutlined } from '@ant-design/icons';
import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';

// 定义数据类型
interface AccountSummary {
  totalValue: number; // 市值
  cash: number; // 现金
  margin: number; // 保证金
  todayPnl: number; // 今日损益
}

const FutureTradeDashBoard: React.FC = () => {
  const [accountSummary] = useState<AccountSummary | null>(null);
  const [pnlData, setPnlData] = useState<API.StrategyPnlDto[]>([]);

  // 模拟获取账户概要数据的 API 调用
  const fetchAccountSummary = async () => {
    // 这里应该替换为真实的 API 调用，例如:
    // const response = await fetch('/api/account/summary');
    // const data = await response.json();
    // return data;

    // 模拟网络延迟和数据
    return new Promise<AccountSummary>((resolve) => {
      setTimeout(() => {
        resolve({
          totalValue: 125000.5,
          cash: 45000.0,
          margin: 80000.0,
          todayPnl: 2350.75,
        });
      }, 1000);
    });
  };

  const fetchPnlData = async () => {
    const queryParams: API.strategyPnlUsingGETParams = {
      valueMethod: '策略市值',
    };
    const result = await strategyPnlUsingGet(queryParams);
    const tmp = [];
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
    }
    setPnlData(tmp);
  };

  const fetchTradeExecutions = async (params: any) => {
    const { tradeHour } = params;
    const queryParams = { ...(tradeHour && { tradeHour }) };

    const result = await executionPreviewListUsingGet(queryParams);
    const data = [];
    if (result.status === 0 && result.res) {
      data.push(...result.res);
    }
    data.sort((a, b) => a.instrumentId.localeCompare(b.instrumentId));
    return {
      data: data,
      success: true,
    };
  };

  // 组件挂载时获取所有数据
  useEffect(() => {
    const loadData = async () => {
      fetchAccountSummary();
      fetchPnlData();
    };
    loadData();
  }, []);

  // 收益率曲线配置
  const lineConfig = {
    xField: 'tradingDay',
    yField: 'npv',
    padding: 'auto',
    forceFit: true,
    // title: '策略收益率',
    connectNulls: true,
    seriesField: 'strategyName',
    colorField: 'strategyName',
    theme: 'academy',
    xAxis: {
      type: 'date',
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    legend: {
      color: {
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
  };
  const columns: ProColumns<API.FutureExecutionPreviewDto>[] = [
    {
      title: '合约代码',
      dataIndex: 'instrumentId',
      width: 180,
      sorter: (a, b) => a.instrumentId.localeCompare(b.instrumentId), // 设置 sorter 函数
      search: false,
    },
    {
      title: '买卖方向',
      dataIndex: 'direction',
      valueEnum: directionEnum,
      search: false,
    },
    {
      title: '开平标志',
      dataIndex: 'offset',
      valueEnum: offsetEnum,
      search: false,
    },
    {
      title: '执行数量',
      dataIndex: 'volume',
      search: false,
      sorter: (a, b) => a.volume - b.volume, // 设置 sorter 函数
    },
    {
      title: '交易所代码',
      dataIndex: 'exchangeId',
      search: false,
    },
    {
      title: '批次时间戳',
      dataIndex: 'dt',
      valueType: 'date',
      search: false,
    },
    {
      title: '交易时段',
      dataIndex: 'tradeHour',
      initialValue: '夜盘',
      valueEnum: tradeHourEnum,
      search: {
        transform: (value: any) => value,
      },
    },
    {
      title: '交易批次',
      dataIndex: 'tradeHourOffset',
      search: false,
    },
  ];

  return (
    <ProCard title="期货交易总览" extra={<RiseOutlined />} headerBordered>
      <Row gutter={[16, 16]}>
        {/* 账户概要卡片 */}
        <Col xs={24} lg={12}>
          <Card title="账户概要" bordered>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="当前市值"
                  value={accountSummary?.totalValue}
                  precision={2}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="可用现金"
                  value={accountSummary?.cash}
                  precision={2}
                  prefix={<FundOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </Row>
            <Divider dashed />
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="已用保证金"
                  value={accountSummary?.margin}
                  precision={2}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="今日盈亏"
                  value={accountSummary?.todayPnl}
                  precision={2}
                  prefix={<RiseOutlined />}
                  valueStyle={{
                    color:
                      accountSummary?.todayPnl && accountSummary.todayPnl >= 0
                        ? '#52c41a'
                        : '#f5222d',
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 收益率曲线卡片 */}
        <Col xs={24} lg={12}>
          <Card title="策略收益率" bordered>
            <Line {...lineConfig} data={pnlData} />
          </Card>
        </Col>

        {/* 最新交易执行列表 */}
        <Col span={24}>
          <Card title="最新交易执行" bordered>
            <ProTable<API.FutureExecutionPreviewDto>
              headerTitle="交易执行预览"
              rowKey="id"
              request={fetchTradeExecutions}
              columns={columns}
              options={false}
              pagination={{
                pageSize: 100,
                onChange: (page) => console.log(page),
              }}
              dateFormatter="string"
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
      </Row>
    </ProCard>
  );
};

export default FutureTradeDashBoard;
