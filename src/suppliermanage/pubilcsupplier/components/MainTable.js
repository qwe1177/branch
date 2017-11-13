import React from 'react';
import PropTypes from 'prop-types'
import { Table } from 'antd';

import './MainTable.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {queryTableData,initSupplierTable,setQueryFrom,doChangeMainCheck} from '../actions';


@connect(
  state =>  ({mainQueryData: state.mainQueryData,mainTableData:state.mainTableData}),
  dispatch => bindActionCreators({queryTableData,initSupplierTable,setQueryFrom,doChangeMainCheck}, dispatch)
)


class MainTable extends React.Component {
  static propTypes = {
    tableData: PropTypes.array, //查询结果(表格数据)
    isFetching: PropTypes.bool, //是否正在查询中
    selectedList:PropTypes.array, //表格中选择多选状态
    pagination:PropTypes.object //表格中的分页
  }
  componentWillMount(){
    this.props.initSupplierTable();
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let {queryform} =  this.props.mainQueryData;
    let paginationObj =  this.props.mainTableData.pagination;
    paginationObj.current = pagination.current;
    paginationObj.pageSize = pagination.pageSize;
    this.props.queryTableData({queryform:queryform,pagination:paginationObj});
  }
  rowSelection = {  //table中的checkbox调用
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.props.doChangeMainCheck({selectedList:selectedRowKeys});
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  }
  handleRefresh = ()=>{
    let {pagination,isFetching} = this.props.mainTableData;
    let {queryform} =  this.props.mainQueryData;
    if(!isFetching){
      pagination.current = 1;  //刷新重置为查询第1页
      this.props.queryTableData({queryform:queryform,pagination:pagination});
    }
  }
  handleOpenChoose = ()=>{
    // let {selectedList} = this.props.mainTableData;
    this.props.onChoose(true);
  }
  handleRowClick =(record, index, event)=>{
    console.log(event.target);
    var className = event.target.getAttribute("class");
    if(className.indexOf('js-addus')==-1){
        return;
    }
    console.log('加入我的操作');
    console.log(record);
    //发送异步请求加入我的请求，之后重新发送请求数据，序列数据
  }
  render() {
    const columns = [{
      title: '企业名称',
      dataIndex: 'companyName',
      key:'companyName',
      render: (text, record) => (
        <a href={record.link}>{text}</a>
      )
    }, {
      title: '来源',
      dataIndex: 'source',
      key:'source'
    }, {
      title: '级别',
      dataIndex: 'level',
      key:'level'
    }, {
      title: '企业性质',
      dataIndex: 'type',
      key:'type'
    }, {
      title: '主营类目',
      dataIndex: 'industry',
      key:'industry'
    }, {
      title: '主营品牌',
      dataIndex: 'brand',
      key:'brand'
    }, {
      title: '联系人信息',
      dataIndex: 'contacts',
      key:'contacts'
    }, {
      title: '成交采纳次数',
      dataIndex: 'numbers',
      key:'numbers'
    }, {
      title: '成交金额',
      dataIndex: 'amount',
      key:'amount'
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key:'createDate'
    }, {
      title: '负责人/操作',
      dataIndex: 'option',
      render: (text, record) => {
        if( record.toperson){  //如已经选择人的直接显示人的名称
          return record.toperson;
        }else{
          return <a href='javascript:;' className='js-addus'>加入我的</a>  //数据中有checked表示选中
        }
      },
      key:'option'
    }];

    const {tableData,pagination,isFetching} =this.props.mainTableData; 
    return (
      <div>
        <div className="tabel-extend-option"><span onClick={this.handleRefresh}>刷新</span>  <span onClick={this.handleOpenChoose}>分配联系人</span>  </div>
        <Table bordered columns={columns}
          rowKey={record => record.key}  //数据中已key为唯一标识
          dataSource={tableData}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection}
          onRowClick = {this.handleRowClick}
        />
      </div>
    );
  }
}


export default MainTable;