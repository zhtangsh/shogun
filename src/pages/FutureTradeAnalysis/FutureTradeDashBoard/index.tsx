import ZoomableChart from '@/components/Chart/ZoomableChart';
import { directionEnum, offsetEnum, tradeHourEnum } from '@/constants/enum';
import { netPnlUsingGet, strategyPnlUsingGet } from '@/services/raiden/futureCtpInfoController';
import {
  accountInfoCurveUsingGet,
  executionPreviewListUsingGet,
} from '@/services/raiden/futureRiskController';
import { getAccountInfoUsingGet } from '@/services/raiden/futureTradingClientInfoController';
import { Line } from '@ant-design/charts';
import {
  DollarOutlined,
  FundOutlined,
  PercentageOutlined,
  RiseOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
const { STAGE } = window.API;

const FutureTradeDashBoard: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<API.AccountInfoDto | null>(null);
  const [pnlData, setPnlData] = useState<API.StrategyPnlDto[]>([]);
  const [netPnlData, setNetPnlData] = useState<API.NetPnlDto[]>([]);
  const [marginRatioData, setMarginRatioData] = useState<API.AccountInfoDto[]>([]);

  const fetchAccountInfo = async () => {
    const result = await getAccountInfoUsingGet();
    if (result.status === 0 && result.res && result.res.accountId) {
      setAccountInfo(result.res);
    } else {
      setAccountInfo(null);
    }
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

  const fetchNetPnlData = async () => {
    const queryParams: API.netPnlUsingGETParams = {
      valueMethod: '总市值',
    };
    const result = await netPnlUsingGet(queryParams);
    const tmp = [];
    if (STAGE === 'test') {
      tmp.push({
        tradingDay: '2025-07-25',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 20000000,
      });
    }
    if (STAGE === 'prod') {
      tmp.push({
        tradingDay: '2025-11-24',
        cumPnl: 0,
        npv: 1,
        r: 0,
        pnl: 0,
        value: 5500000,
      });
    }
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
    }
    setNetPnlData(tmp);
  };

  const fetchMarginRatioData = async () => {
    const result = await accountInfoCurveUsingGet();
    const tmp = [];
    if (result.status === 0 && result.res) {
      tmp.push(...result.res);
    }
    tmp.forEach((v) => (v.marginRatio = v.currMargin / v.balance));
    tmp.forEach((v) => (v.updateTime = moment(v.updateTime).format('YYYY-MM-DD')));

    setMarginRatioData(tmp);
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
      fetchAccountInfo();
      fetchPnlData();
      fetchNetPnlData();
      fetchMarginRatioData();
    };
    loadData();
    // 设置每 5 分钟（300000ms）拉取一次账户信息
    const intervalId = setInterval(() => {
      fetchAccountInfo();
    }, 5 * 60 * 1000); // 5分钟
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 收益率曲线配置
  const lineConfig = {
    xField: 'tradingDay',
    yField: 'npv',
    padding: 'auto',
    forceFit: true,
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
        itemMarkerSize: 25,

        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
  };
  // 收益率曲线配置
  const netLineConfig = {
    xField: 'tradingDay',
    yField: 'npv',
    padding: 'auto',
    forceFit: true,
    connectNulls: true,
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
  // 保证金率曲线配置
  const marginRatioLineConfig = {
    xField: 'updateTime',
    yField: 'marginRatio',
    padding: 'auto',
    forceFit: true,
    connectNulls: true,
    theme: 'academy',
    xAxis: {
      type: 'time',
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
  // 辅助函数：格式化数字，保留两位小数
  const formatNumber = (value?: number | null) => {
    if (value === null || value === undefined) return '--';
    return value.toFixed(2);
  };

  // 辅助函数：格式化百分比
  const formatPercentage = (value?: number | null) => {
    if (value === null || value === undefined) return '--';
    return `${(value * 100).toFixed(2)}%`; // 假设 marginRatio 是小数形式 (e.g., 0.1234)
  };
  // 计算保证金率
  const calculateMarginRatio = (
    accountInfo: API.AccountInfoDto | null | undefined,
  ): number | null => {
    if (!accountInfo || accountInfo.currMargin === null || accountInfo.available === null) {
      return null;
    }
    const total = accountInfo.currMargin + accountInfo.available;
    if (total === 0) {
      return 0; // 避免除以零
    }
    return accountInfo.currMargin / total;
  };
  const marginRatio = calculateMarginRatio(accountInfo);

  return (
    <ProCard title="期货交易总览" extra={<RiseOutlined />} headerBordered>
      <Row gutter={[16, 16]}>
        {/* 账户概要卡片 */}
        <Col xs={24} lg={12}>
          <Card title="账户概要" bordered>
            <Row gutter={[16, 16]}>
              {/* --- 第一行 --- */}
              <Col span={12}>
                <Statistic
                  title="帐户权益"
                  value={accountInfo ? formatNumber(accountInfo.balance) : '--'}
                  precision={2}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="可用现金"
                  value={accountInfo ? formatNumber(accountInfo.available) : '--'}
                  precision={2}
                  prefix={<FundOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>

              {/* --- 第二行 --- */}
              <Col span={12}>
                <Statistic
                  title="已用保证金"
                  value={accountInfo ? formatNumber(accountInfo.currMargin) : '--'}
                  precision={2}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="保证金率"
                  value={formatPercentage(marginRatio)}
                  precision={2}
                  prefix={<PercentageOutlined />}
                  // valueStyle={{ color: '#faad14' }} // 可以根据需要设置颜色
                />
              </Col>

              {/* --- 第三行 --- */}
              {/* 对于非纯数字信息，可以继续使用 Statistic，但 value 变成字符串 */}
              <Col span={12}>
                <Statistic
                  title="交易客户端"
                  value={accountInfo?.sourceSystemCode ?? '--'} // 直接显示字符串
                  // prefix={<DesktopOutlined />} // 可以添加一个图标
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="更新时间"
                  value={
                    accountInfo?.updateTime
                      ? new Date(accountInfo.updateTime).toLocaleString()
                      : '--'
                  } // 格式化时间字符串
                  prefix={<SyncOutlined />}
                  valueStyle={{ fontSize: '16px' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 全局收益率曲线卡片 */}
        <Col xs={24} lg={12}>
          <Card title="总净值曲线" bordered>
            <ZoomableChart title="总净值曲线">
              <Line {...netLineConfig} data={netPnlData} />
            </ZoomableChart>
          </Card>
        </Col>
        {/* 收益率曲线卡片 */}
        <Col xs={24} lg={12}>
          <Card title="策略收益率曲线" bordered>
            <ZoomableChart title="策略收益率曲线">
              <Line {...lineConfig} data={pnlData} />
            </ZoomableChart>
          </Card>
        </Col>
        {/* 保证金率曲线卡片 */}
        <Col xs={24} lg={12}>
          <Card title="保证金率曲线" bordered>
            <ZoomableChart title="保证金率曲线">
              <Line {...marginRatioLineConfig} data={marginRatioData} />
            </ZoomableChart>
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
