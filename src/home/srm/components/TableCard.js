import React from 'react';
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd';
import axios from '../../../util/axios'

import './List.css';

import { connect_cas,connect_srm} from '../../../util/connectConfig';
import { getLoginInfo,getUrlParams } from '../../../util/baseTool';


const mock = [
  {
    "id": 12,
    "planNextContactTime": '2017/11/23',
    "planNextContent": "计划下次跟进内容666",
    "supplierName": "广东省深圳市华南城网科技有限"
  }
];

class MainTable extends React.Component {
  constructor(props, context) {
		super(props, context);
		this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 6
      },
      tableData: mock,
      isFetching: false
    }
    var urlParams = getUrlParams();
    this.moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
    this.systemId = urlParams['systemId']?urlParams['systemId']:'';
	}
  componentWillMount() {
    this.queryData();
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    this.queryData({pagination});
  }
  queryData = (query) => {
    var moduleId = getUrlParams()['moduleId']?getUrlParams()['moduleId']:''; //获取moduleId;　权限用
    this.setState({ isFetching: true });
    var pagination = this.state.pagination;
    if(query && query.pagination){
      pagination = {...pagination,...query.pagination};
    }
    var { pageSize ,current} = pagination;
    var params = {moduleId,pageSize,pageNo:current};
    axios.get(connect_srm + '/supplier/viewFollowupPlanList.do', { params: params ,timeout:20000}).then((res) => {
      if (res.data.code == '1') {
        var newPagination = { ...pagination, total: res.data.data.rowCount };
        this.setState({ tableData: res.data.data.supplierFollowupPlanList, pagination: newPagination, isFetching: false });
      } else {
        this.setState({ isFetching: false });
      }
    }).catch((e) => {
      console.log(e);
      this.setState({ isFetching: false });
    });
  }
  buildUrl =(text,record)=>{
    var url = '';
    if(record.followupType==1){
      url = '/suppliermanage/cuedetail/?systemId'+this.systemId+'&moduleId='+this.moduleId+'&moduleUrl=/suppliermanage/allsupplierdetail/';
    }else{
      url = '/suppliermanage/allsupplierdetail/?systemId'+this.systemId+'&moduleId='+this.moduleId+'&moduleUrl=/suppliermanage/allsupplierdetail/';
    }
    url +='&supplierId='+record.supplierId;
    return <a href={url}>{text}</a>
  }
  render() {
    const columns = [{
      title: '客户名称',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => (
        this.buildUrl(text, record)
      )
    }, {
      title: '计划内容',
      dataIndex: 'planNextContent',
      key: 'planNextContent'
    }, {
      title: '剩余完成时间',
      dataIndex: 'planNextContactTime',
      key: 'planNextContactTime'
    }];

    const { tableData, pagination, isFetching } = this.state;
    return (
      <div className='table-card-wrap'>
        <div className="card-title">跟进计划(<span className='card-title-number'>{pagination.total}</span>) <a href='/clientFollowUp/toFollowUp/' className='more-link'>more<Icon type="double-right" /></a>  </div>
        <Table bordered columns={columns}
          rowKey={record => record.id}  //数据中已key为唯一标识
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