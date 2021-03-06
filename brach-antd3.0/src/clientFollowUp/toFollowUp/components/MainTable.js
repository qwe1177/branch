import React from 'react';
import axios from 'axios';
import { connect_srm ,connect_wwwsrm} from '../../../util/connectConfig';
import { getUrlParams} from '../../../util/baseTool.js';
import PropTypes from 'prop-types'
import { Table,Button,Modal,message } from 'antd';
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
  state={
    modelType: "",
    visible: false,
    selectedRowKeys: [],
  }
  showModal=(key)=>{
    this.setState({visible:true,key:key});
  } 
  handleOk=(selectedRowKeys)=>{
    let {key} = this.state;
    let _this = this;
    console.log(key)
    axios.get(connect_srm+ '/supplier/delSupplierFollowupRecords.do',{
      params: {
        ids:  key.length > 0  ?  key.join(',') : key ,
      } 
    })
    .then(function (response) {
      _this.setState({visible:false});
      let {pagination,isFetching} = _this.props.mainTableData;
      let {queryform} =  _this.props.mainQueryData;
      _this.props.queryTableData({queryform,pagination})
      message.success('移除成功!');
    })
    .catch(function (error) {
      console.log(error);
    });
    this.props.doChangeMainCheck({selectedList:selectedRowKeys});
  }
  handleCancel=()=>{
    this.setState({visible:false});
  }
  
  componentWillMount(){
    this.props.initSupplierTable();
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let { queryform } =  this.props.mainQueryData;
    this.props.queryTableData({queryform,pagination});
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
      this.props.queryTableData({queryform,pagination});
    }
  }
  getDetailUrl =(followupType,type,supplierId,text)=>{
    var urlParams = getUrlParams();
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
    var systemId = urlParams['systemId']?urlParams['systemId']:'';
    var detailUrl ='';
    if(followupType == '2') {
        if(type=='my'){
          detailUrl ='/suppliermanage/mysupplierdetail/';
        }else if(type=='theHighSeas'){
          detailUrl ='/suppliermanage/inseasupplierdetail/';
        }else if(type=='underling'){
          detailUrl ='/suppliermanage/underlingsupplierdetail/';
        }
      }else {
        if(type=='my'){
          detailUrl ='/myClueDetail/';
        }else if(type=='theHighSeas'){
          detailUrl ='/publicClueDetail/';
        }else if(type=='underling'){
          detailUrl ='/underlingClueDetail/';
        }
      }
      detailUrl +='?systemId='+systemId+'&moduleId='+moduleId+'&supplierId='+supplierId;
      return detailUrl.indexOf('?')==0? <span>{text}</span>:<a target="_blank" href={detailUrl}>{text}</a>;
  }
  render() {
    const columns = [{
      title: '企业名称',
      dataIndex: 'companyName',
      key:'companyName',
      render: (text,record) => (
        this.getDetailUrl(record.followupType,record.type,record.supplierId,text)
      )
    } , {
      title: '计划内容',
      dataIndex: 'planNextContent',
      key:'planNextContent'
    }, {
      title: '计划完成日期',
      dataIndex: 'planNextContactTime',
      key:'planNextContactTime'
    },  {
      title: '操作',
      dataIndex: 'option',
      key:'option',
      render: (text, record) => (
        <div className="tabel-extend-option">
            <span onClick={(key) => this.showModal(record.id)}>移除</span>
            {this.getDetailUrl(record.followupType,record.type,record.supplierId,'去跟进')}
        </div>
      )
    }];

    const {tableData,pagination,isFetching,selectedList} =this.props.mainTableData; 
    const hasSelected = selectedList.length > 0;
    return (
      <div>
        <div className="tabel-extend-option title">
            <span onClick={this.handleRefresh}>刷新</span> 
            <button disabled={!hasSelected} onClick={() => this.showModal(selectedList)}>移除计划</button>
        </div>
        <Modal
          visible={this.state.visible}
          title="移除计划"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="danger" onClick={this.handleCancel}>
            取消
          </Button>,
            <Button  key="submit" type="primary" onClick={this.handleOk}>
              确认
            </Button>,
          ]}
        >
          <p>确认将计划移出日程，移出后将不可恢复</p>
        </Modal>
       <Table 
          bordered
          columns={columns}
          rowKey={record => record.id}  //数据中已key为唯一标识
          dataSource={tableData}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection}
        />
      </div>
    );
  }
}


export default MainTable;