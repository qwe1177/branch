import React from 'react';
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd';
import axios from '../../../util/axios'

import './List.css';

import { connect_cas,connect_srm} from '../../../util/connectConfig';
import { getLoginInfo,getUrlParams } from '../../../util/baseTool';


class MainTable extends React.Component {
  constructor(props, context) {
		super(props, context);
		this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 6
      },
      tableData: [],
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
    var moduleId = this.moduleId;
    this.setState({ isFetching: true });
    var pagination = this.state.pagination;
    if(query && query.pagination){
      pagination = {...pagination,...query.pagination};
    }
    var { pageSize ,current} = pagination;
    var params = {moduleId,pageSize,pageNo:current};
    axios.get(connect_srm + '/supplier/viewFollowupPlanList.do', { params: params}).then((res) => {
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
      return detailUrl.indexOf('?')==0? <span className="col-sql">{text}</span>:<a target="_blank" href={detailUrl} className="col-sql">{text}</a>;
  }
  render() {
    const columns = [{
      title: '客户名称',
      dataIndex: 'companyName',
      key: 'companyName',
      className:'align-center-column column-1',
      render: (text, record) => (
        this.getDetailUrl(record.followupType,record.type,record.supplierId,text)
      )
    }, {
      title: '计划内容',
      dataIndex: 'planNextContent',
      key: 'planNextContent',
      className:'align-center-column column-2',
      render: (text) => <span className="col-sql">{text}</span>
    }, {
      title: '剩余完成时间',
      dataIndex: 'planNextContactTime',
      key: 'planNextContactTime',
      className:'align-center-column column-3',
      render: (text) => <span className="col-sql">{text}</span>
    }];

    const { tableData, pagination, isFetching } = this.state;
    return (
      <div className='table-card-wrap'>
        <div className="card-title">跟进计划<span className='number-wrap'>(<span className='card-title-number'>{pagination.total}</span>)</span> <a href='/clientFollowUp/toFollowUp/' className='more-link'>more<Icon type="double-right" /></a>  </div>
        <Table  columns={columns}
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