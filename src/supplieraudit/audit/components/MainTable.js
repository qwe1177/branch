import React from 'react';

import { Table } from 'antd';
// import reqwest from 'reqwest';
import axios from 'axios';

import {connect_local} from '../../../util/connectConfig';

const columns = [{
	title: '企业名称',
  dataIndex: 'companyName',
  key:'companyName'
}, {
	title: '来源',
  dataIndex: 'source',
  key:'source'
}, {
	title: '级别',
  dataIndex: 'level',
  key:'level'
}, {
	title: '类型',
  dataIndex: 'type',
  key:'type'
}, {
	title: '行业',
  dataIndex: 'industry',
  key:'industry'
}, {
	title: '采购类目',
  dataIndex: 'cgcategory',
  key:'cgcategory'
}, {
	title: '标签',
  dataIndex: 'tag',
  key:'tag'
}, {
	title: '联系人信息',
  dataIndex: 'contacts',
  key:'contacts'
}, {
	title: '跟进次数',
  dataIndex: 'gjcount',
  key:'gjcount'
}, {
	title: '创建时间',
  dataIndex: 'createDate',
  key:'createDate'
}, {
	title: '负责人/操作',
	dataIndex: 'option',
  render: text => <a href="javascript:;"  >{text}</a>,
  key:'option'
}];
class MainTable extends React.Component {
  state = {
    data: [],
    pagination: {
      showQuickJumper: true,
      showSizeChanger: true,
      total: 1,
      showTotal: total => `共 ${total} 条`},
    loading: false,
    selectedRows:[] //选中的行
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRows: selectedRowKeys});
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  };
  onMyRowClick =(record, index, event) =>{  //操作表格某一行的操作，通过event可以判断是那个触发
		console.log(index);
		this.setState({ modalvisible: true });
	}
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });    
    axios.get(connect_local+'/buyer/allbuyer/query',{params:{results: 10,...params}}).then((res)=>{
      // console.log(res.data.data);
      const pagination = { ...this.state.pagination };
        pagination.total = 2;
        this.setState({
          loading: false,
          data: res.data.data,
          pagination,
        });
    }).catch((e)=>{
      this.setState({loading:false});
      console.error(e);
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.key}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        rowSelection={this.rowSelection}
        onRowClick={this.onMyRowClick} 
      />
    );
  }
}


export default MainTable;