import React from 'react';
import PropTypes from 'prop-types'
import { Table } from 'antd';

import './MainTable.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {queryTableData,initSupplierTable,setQueryFrom,doChangeMainCheck} from '../actions';
import { connect_srm,connect_cas  } from '../../../util/connectConfig';
import { getUrlParams} from '../../../util/baseTool';
import axios from 'axios';

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
      // pagination.current = 1;  //刷新重置为查询第1页
      this.props.queryTableData({queryform:queryform,pagination:pagination});
    }
  }
  handleOpenChoose = ()=>{
    this.props.onChoose(true);
  }
  handleRowClick =(record, index, event)=>{
    var className = event.target.getAttribute("class");
    if(className.indexOf('js-addus')==-1){
        return;
    }
    console.log('加入我的操作');
    var params ={};
    params['supplierId'] = record.supplierId;
    axios.get(connect_srm + '/clue/addtoUs.do', { params: params }).then((res) => {
      this.handleRefresh();
    }).catch((e) => {
      console.log(e);
      this.handleRefresh();
    });
  }
  render() {
    var urlParams = getUrlParams();
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
    var systemId = urlParams['systemId']?urlParams['systemId']:'';
    var detailUrl ='/suppliermanage/allsupplierdetail/?systemId'+systemId+'&moduleId='+moduleId;

    const columns = [{
      title: '企业名称',
      dataIndex: 'companyName',
      key:'companyName',
      render: (text, record) => (
        <a href={detailUrl+'&supplierId='+record.supplierId}>{text}</a>
      )
    }, {
      title: '来源',
      dataIndex: 'source',
      key:'source'
    }, {
      title: '级别',
      dataIndex: 'clueLevel',
      key:'clueLevel'
    }, {
      title: '企业性质',
      dataIndex: 'enterpriseType',
      key:'enterpriseType'
    }, {
      title: '主营类目',
      dataIndex: 'varietyName',
      key:'varietyName'
    }, {
      title: '主营品牌',
      dataIndex: 'mainBrand',
      key:'mainBrand'
    }, {
      title: '联系人信息',
      dataIndex: 'fullname',
      key:'fullname'
    },{
      title: '创建时间',
      dataIndex: 'reateTime1',
      key:'reateTime1'
    }, {
      title: '负责人/操作',
      dataIndex: 'option',
      render: (text, record) => {
        if( record.option){  //如已经选择人的直接显示人的名称
          return record.option;
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
          rowKey={record => record.supplierId}  
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