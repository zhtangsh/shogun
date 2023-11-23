import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

type DynamicHeaderTableProps = {
  header?: any;
  data?: any;
  onChange?: (a: any, b: any, sort: any) => void;
  rowKey?: (v: any) => string;
  page?: any;
};
const DynamicHeaderTable: React.FC<DynamicHeaderTableProps> = (props) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.header) setColumns(props.header);
  }, [props.header]);

  useEffect(() => {
    if (props.data) setData(props.data);
  }, [props.data]);

  return (
    <>
      <Table
        bordered={true}
        rowKey={props.rowKey}
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
        pagination={props.page}
        onChange={props.onChange}
      />
    </>
  );
};

export default DynamicHeaderTable;
