import React from 'react';
import './RankFrom.css';
import { Table } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryTableData, initSupplierTable, setQueryFrom, doChangeMainCheck } from '../actions';
import { connect_srm, connect_cas } from '../../../util/connectConfig';
import { getUrlParams, getLoginAccount, isEntryVisableByName } from '../../../util/baseTool';
import axios from 'axios';

import { fetchToHighSea, fetchSetContacts } from '../../../components/common/publicrequest/index';

import PersonSelector from '../../../components/business/personselector';

@connect(
  state => ({ mainQueryData: state.mainQueryData, mainTableData: state.mainTableData, power: state.power }),
  dispatch => bindActionCreators({ queryTableData, setQueryFrom, doChangeMainCheck }, dispatch)
)

class RankFrom2 extends React.Component {
  componentWillMount() {
    this.queryWithDefault();
  }
  queryWithDefault = () => {
    var { queryform } = this.props.mainQueryData;
    var { pagination } = this.props.mainTableData;
    this.props.queryTableData({ queryform: queryform, pagination: pagination });
  }
  handleRefresh = () => {
    let { isFetching } = this.props.mainTableData;
    if (!isFetching) {
      this.queryWithDefault();
    }
  }

  getDetailUrl = (type, supplierId, text) => {
    var urlParams = getUrlParams();
    var moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
    var systemId = urlParams['systemId'] ? urlParams['systemId'] : '';
    var detailUrl = '';
    if (type == 'my') {
      detailUrl = '/suppliermanage/mysupplierdetail/';
    } else if (type == 'theHighSeas') {
      detailUrl = '/suppliermanage/inseasupplierdetail/';
    } else if (type == 'underling') {
      detailUrl = '/suppliermanage/underlingsupplierdetail/';
    }

    return detailUrl == '' ? text : <a href={detailUrl + '?systemId=' + systemId + '&moduleId=' + moduleId + '&supplierId=' + supplierId} target='_blank'>{text}</a>;
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let { queryform } = this.props.mainQueryData;
    this.props.queryTableData({ queryform: queryform, pagination: pagination });
  }
  render() {

    let urlParams = getUrlParams();
    let moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
    let systemId = urlParams['systemId'] ? urlParams['systemId'] : '';
    let viewUrl = '/suppliercertification/supplierlook/?moduleId=' + moduleId + '&systemId=' + systemId;
    let updateUrl = '/suppliercertification/updateinfo/?moduleId=' + moduleId + '&systemId=' + systemId;
    const columns = [
      {
        title: '企业名称',
        dataIndex: 'companyName',
        className: 'column-money',
        render: (text, record) => {
          return this.getDetailUrl(record.type, record.supplierId, text)
        }
      },
      {
        title: '申请时间',
        dataIndex: 'createTime',
        className: 'column-money'
      },
      {
        title: '审核通过时间',
        dataIndex: 'updateTime',
        className: 'column-money'
      },
      {
        title: '备注',
        dataIndex: 'note',
        className: 'column-money'
      },
      {
        title: '申请人',
        dataIndex: 'realName',
        className: 'column-money'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        className: 'column-money',
        render: (text, record) => {
          return <span className='table-options-wrap'>
            <a href={viewUrl + '&supplierId=' + record.supplierId} className='js-out'>查看</a>
            <a href={updateUrl + '&supplierId=' + record.supplierId} className='last-link js-in'>更新资料</a>
          </span>;
        }
      }
    ];

    const data = [
      {
        key: '1',
        realName: 'John Brown',
        companyName: '深圳市华南城网络科技有限公司',
        tel: '注册资本>1亿，计5分；注册资本>5000万，计4分；注册资本>2000万，计3分；注册资本>1000万，计2分；注册资本>500万，计1分；注册资本<500万，计',
        remark: '请审批',
        address: 'New York No. 1 Lake Park',
        dsafdsf: '查看',
        createTime: '17/08/22 14:00'
      }, {
        key: '2',
        realName: 'Jim Green',
        tel: '0571-22098333',
        remark: '请尽快审批',
        companyName: '深圳市华南城网络科技有限公司',
        address: 'London No. 1 Lake Park',
        dsafdsf: '查看',
        createTime: '17/08/22 14:00'
      }, {
        key: '3',
        realName: 'Joe Black',
        companyName: '深圳市华南城网络科技有限公司',
        tel: '0575-22098909',
        remark: '请尽快审核',
        address: 'Sidney No. 1 Lake Park',
        dsafdsf: '查看',
        createTime: '17/08/22 14:00'
      }, {
        key: '4',
        realName: 'Jim Red',
        companyName: '深圳市华南城网络科技有限公司',
        tel: '0575-22098909',
        remark: '重要客户，请尽快审批',
        address: 'London No. 2 Lake Park',
        dsafdsf: '查看',
        createTime: '17/08/22 14:00'
      }, {
        key: '5',
        realName: 'Jake White',
        companyName: '深圳市华南城网络科技有限公司',
        tel: '0575-22098909',
        remark: '',
        address: 'Dublin No. 2 Lake Park',
        dsafdsf: '查看',
        createTime: '17/08/22 14:00'
      }
    ];
    const { tableData, pagination, isFetching } = this.props.mainTableData;
    console.log(pagination)
    return (
      <div className="pd20">
        <div className="tit"><div className="g-fl"><a href="javascript:;" onClick={this.handleRefresh}>刷新</a></div></div>
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={this.handleTableChange}
          pagination={pagination}
          loading={isFetching}
          rowKey={record => record.id}
          bordered
          className="g-mt"
        />
      </div>
    )
  }
}

export default RankFrom2;