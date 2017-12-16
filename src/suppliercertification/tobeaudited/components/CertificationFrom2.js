import React from 'react';
import './CertificationFrom.css';
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


class CertificationFrom2 extends React.Component {
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

  render() {
    let urlParams = getUrlParams();
    let moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
    let systemId = urlParams['systemId'] ? urlParams['systemId'] : '';
    let hasPowerForDetail = isEntryVisableByName('列表查询', this.props.power.operate);//获取是否有进入详情页权限
    let detailUrl = '/allClueDetail/?moduleUrl='+location.pathname;
    let auditeUrl = '/suppliercertification/audit/?moduleId='+moduleId+'&systemId='+systemId;
    const columns = [
      {
        title: '企业名称',
        key: 'companyName',
        dataIndex: 'companyName',
        className: 'column-money',
        render: (text, record) => {
          return <a href={detailUrl + '&supplierId=' + record.supplierId} target='_blank'>{text}</a>
        }
      },
      {
        title: '申请时间',
        key: 'createTime',
        dataIndex: 'createTime',
        className: 'column-money'
      },
      {
        title: '备注',
        key: 'note',
        dataIndex: 'note',
        className: 'column-money'
      },
      {
        title: '申请人',
        key: 'realName',
        dataIndex: 'realName',
        className: 'column-money'
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        className: 'column-money',
        render: (text, record) => {
          return <span><a href={auditeUrl + '&supplierId=' + record.supplierId}>审核</a></span>;
        }
      }
    ];
    const { tableData, pagination, isFetching } = this.props.mainTableData;
    return (
      <div className="pd20">
        <div className="tit"><div className="g-fl"><a href="javascript:;" onClick={this.handleRefresh}>刷新</a></div></div>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          rowKey={record => record.id}
          loading={isFetching}
          className="g-mt"
        />
      </div>
    )
  }
}

export default CertificationFrom2;