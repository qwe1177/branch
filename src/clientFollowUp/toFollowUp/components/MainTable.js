import React from 'react';
import PropTypes from 'prop-types'
import { Table,Button,Modal } from 'antd';
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
  showModal=(modelType)=>{
    this.setState({visible:true,showModal:modelType});
  } 
  handleOk=()=>{
    let {modelType} = this.state;
    if(modelType='removeplan'){
      this.setState({visible:false,modelType: ""});
      console.log(modelType)
    }else if(modelType='shiftout'){
      onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });
      }
      this.setState({visible:false,modelType: ""});
      console.log(modelType)
    }
  }
  handleCancel=()=>{
    this.setState({visible:false});
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
  render() {
  
    const columns = [{
      title: '企业名称',
      dataIndex: 'companyName',
      key:'companyName',
      render: (text, record) => (
        <a href={record.link1}>{text}</a>
      )
    } , {
      title: '计划内容',
      dataIndex: 'planContent',
      key:'planContent'
    }, {
      title: '计划完成日期',
      dataIndex: 'finishData',
      key:'finishData'
    }, {
      title: '剩余完成时间',
      dataIndex: 'timeLeft',
      key:'timeLeft'
    }, {
      title: '操作',
      dataIndex: 'option',
      key:'option',
      render: (text, record) => (
        <div className="tabel-extend-option">
            <a href={record.link2}>{text[0]}</a>
            <span onClick={() => this.showModal('shiftout')}>{text[1]}</span>
        </div>
      )
    }];

    const {tableData,pagination,isFetching,selectedList} =this.props.mainTableData; 
    const hasSelected = selectedList.length > 0;
    return (
      <div>
        <div className="tabel-extend-option title">
            <span onClick={this.handleRefresh}>刷新</span> 
            <button disabled={!hasSelected} onClick={() => this.showModal('removeplan')}>移除计划</button>
        </div>
        <Modal
          visible={this.state.visible}
          title="移除计划"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="yes" type="primary" size="large" onClick={this.handleOk}>
              确认
            </Button>,
          ]}
        >
          <p>确认将计划移出日程，移出后将不可恢复</p>
        </Modal>
       <Table 
          bordered
          columns={columns}
          rowKey={record => record.key}  //数据中已key为唯一标识
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