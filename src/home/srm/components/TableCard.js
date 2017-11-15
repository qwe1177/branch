import React from 'react';
import PropTypes from 'prop-types'
import { Table,Icon } from 'antd';


import './List.css';

import { connect_url } from '../../../util/connectConfig';




class MainTable extends React.Component {
//   static propTypes = {
//     tableData: PropTypes.array, //查询结果(表格数据)
//     isFetching: PropTypes.bool, //是否正在查询中
//     pagination:PropTypes.object //表格中的分页
//   }
  state={
    pagination:{
        total: 2,
        current: 1,
        pageSize: 6
    },
    tableData:[],
    isFetching:false
  }
  componentWillMount(){
    // this.props.initSupplierTable();  
    this.queryData();
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let {queryform} =  this.props.mainQueryData;
    let paginationObj =  this.props.mainTableData.pagination;
    paginationObj.current = pagination.current;
    paginationObj.pageSize = pagination.pageSize;
    // this.props.queryTableData({queryform:queryform,pagination:paginationObj});
  }
  queryData=()=>{
    const dataSource = [{
        key: '1',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '3天24小时'
      }, {
        key: '2',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '2天22小时'
      }, {
        key: '3',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '2天22小时'
      }, {
        key: '4',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '2天22小时'
      }, {
        key: '5',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '1天22小时'
      }, {
        key: '6',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '2天22小时'
      }, {
        key: '7',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '2天22小时'
      }, {
        key: '8',
        name: '深圳华南城网科技有限公司',
        content: '跟进报价内容，上一笔10万的单价，无法提取',
        restTime: '9天22小时'
      }];
      this.setState({tableData:dataSource})
    // axios.get(connect_url + '/buyer/allbuyer/query', { params: params }).then((res)=>{

    // }).catch((e)=>{

    // });
  }
  render() {
    const columns = [{
      title: '客户名称',
      dataIndex: 'name',
      key:'name'
    }, {
      title: '计划内容',
      dataIndex: 'content',
      key:'content'
    }, {
      title: '剩余完成时间',
      dataIndex: 'restTime',
      key:'restTime'
    }];

    const {tableData,pagination,isFetching} =this.state; 
    return (
      <div  className='table-card-wrap'>
        <div className="card-title">跟进计划(<span className='card-title-number'>22</span>) <a href='#' className='more-link'>more<Icon type="double-right" /></a>  </div>
        <Table bordered columns={columns}
          rowKey={record => record.key}  //数据中已key为唯一标识
          dataSource={tableData}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}


export default MainTable;