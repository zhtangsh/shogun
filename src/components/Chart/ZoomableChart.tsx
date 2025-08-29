import { LineChartOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Row } from 'antd';
import React, { ReactNode, useState } from 'react';

interface ZoomableChartProps {
  title: string;
  children: ReactNode; // 渲染图表
  width?: number; // 模态框宽度
  chartWidth?: number;
  chartHeight?: number;
}

const ZoomableChart: React.FC<ZoomableChartProps> = ({
  title,
  children,
  width = 1500,
  chartWidth = 1400,
  chartHeight = 600,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Row>
        <Flex>
          <Button type="primary" shape="circle" icon={<LineChartOutlined />} onClick={showModal} />
        </Flex>
      </Row>
      <Row>{children}</Row>
      <Modal
        title={title}
        open={visible}
        onOk={hideModal}
        onCancel={hideModal}
        width={width}
        footer={null}
        destroyOnClose
        centered
      >
        {React.cloneElement(children as React.ReactElement, {
          width: chartWidth,
          height: chartHeight,
        })}
      </Modal>
    </>
  );
};

export default ZoomableChart;
