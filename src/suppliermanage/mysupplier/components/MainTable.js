import React from 'react';
import PropTypes from 'prop-types'
import { Table, message, Modal, Form } from 'antd';

import './MainTable.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryTableData, initSupplierTable, setQueryFrom, doChangeMainCheck } from '../actions';
import { connect_srm, connect_cas } from '../../../util/connectConfig';
import { getLoginInfo, getUrlParams, getLoginAccount, getOneUrlParams } from '../../../util/baseTool';
import axios from 'axios';
import EffectForm from './EffectForm';

import { fetchToHighSea, fetchSetContacts } from '../../../components/common/publicrequest/index';

import PersonSelector from '../../../components/business/personselector';


@connect(
  state => ({ mainQueryData: state.mainQueryData, mainTableData: state.mainTableData }),
  dispatch => bindActionCreators({ queryTableData, setQueryFrom, doChangeMainCheck }, dispatch)
)


class MainTable extends React.Component {
  state = {
    personSelectorVisible: false,  //是否显示选择人
    cooperationModalVisible: false, //修改合作关系弹框显示
    actionInfo: {},  //选择人之后的操作内容{name:'加入',data:[supplierId:xxx,other...]}
    confirmVisible: false,  //弹出确认框
    confirmTarget: { action: 'moveToHighSeas', data: [] }, //弹出框对应的事物类型
    confirmContent: '是否将此供应商移入到公海?' //弹出框内容
  }
  componentWillMount() {
    this.queryWithDefault();
  }
  queryWithDefault = () => {
    var { queryform } = this.props.mainQueryData;
    var { pagination } = this.props.mainTableData;
    this.props.queryTableData({ queryform: queryform, pagination: pagination });
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let { queryform } = this.props.mainQueryData;
    this.props.queryTableData({ queryform: queryform, pagination: pagination });
  }
  rowSelection = {  //table中的checkbox调用
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.props.doChangeMainCheck({ selectedList: selectedRows });
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  }
  handleRefresh = () => {
    let { isFetching } = this.props.mainTableData;
    if (!isFetching) {
      this.queryWithDefault();
    }
  }
  handleOpenChoose = () => {
    var selectedList = this.props.mainTableData.selectedList;
    if (selectedList.length == 0) {
      message.warning('请选择要分配的供应商');
    } else {
      this.setState({ personSelectorVisible: true, actionInfo: { name: '分配', data: selectedList } });
    }
  }
  handlePersonCancel = () => {
    this.setState({ personSelectorVisible: false });
  }
  handleRowClick = (record, index, event) => {
    var className = event.target.getAttribute("class");
    if (className.indexOf('js-out') == -1 && className.indexOf('js-in') == -1) {
      return;
    }
    if (className.indexOf('js-out') != -1) { //分配
      this.setState({ personSelectorVisible: true, actionInfo: { name: '分配', data: [record] } });
    } else { //移入
      this.openConfirmModal({ confirmTarget: { action: 'moveToHighSeas', data: record.supplierId } });
    }
  }
  mutiFetchToHighSea = () => {
    var selectedList = this.props.mainTableData.selectedList;
    var supplierIds = selectedList.map((o) => o.supplierId).toString();
    this.doFetchToHighSea(supplierIds);
  }

  doFetchToHighSea = (supplierIds, messageHeader) => {
    fetchToHighSea(supplierIds).then((res) => {
      if (res.data.code == '1') {
        message.success('移入成功!');
        this.queryWithDefault();
      } else {
        message.error('移入失败!');
      }
    }).catch((e) => {
      message.error('移入失败!');
    })
  }
  handleChoosed = (ids, labels, actionInfo) => {
    this.setState({ personSelectorVisible: false }); //form重绘需要重置
    var messageHeader = actionInfo.name;
    var supplierIds = actionInfo.data.map((o) => o.supplierId).toString();
    var responsibleSources = actionInfo.data.map((o) => o.userId).toString();
    fetchSetContacts(supplierIds, ids, labels, responsibleSources).then((res) => {
      if (res.data.code == '1') {
        message.success(messageHeader + '成功!');
        this.queryWithDefault();
      } else {
        message.error(messageHeader + '失败!');
      }
    }).catch((e) => {
      message.error(messageHeader + '失败!');
    })
  }
  handleCooperationModalCancel = () => {
    this.setState({ cooperationModalVisible: false });
  }
  handleOpenCooperationModal = () => {
    var selectedList = this.props.mainTableData.selectedList;
    if (selectedList.length == 0) {
      message.warning('请选择要修改合作关系的供应商');
    } else {
      this.setState({ cooperationModalVisible: true });
    }
  }
  handleChangeCooperationModal = (partnership) => {
    this.setState({ cooperationModalVisible: false });
    var token = getLoginInfo()['token'];  //获取token　登录用
    var moduleId = getOneUrlParams('moduleId'); //使用moduleId验证权限
    var selectedList = this.props.mainTableData.selectedList;
    var supplierId = selectedList.map(o => o.supplierId).toString();
    axios.get(connect_srm + '/management/editSupplierPartnership.do', { params: { supplierId, partnership, token, moduleId }, timeout: 20000 }).then((res) => {
      if (res.data.code == '1') {
        this.queryWithDefault();
        message.success('修改成功!');
      } else {
        message.error('修改失败!');
      }
    }).catch((e) => {
      message.error('修改失败!');
    });
  }
  handleConfirmOk = () => {
    this.setState({ confirmVisible: false });
    var action = this.state.confirmTarget.action;
    if (action == 'moveToHighSeas') { //单个移入公海
      var supplierId = this.state.confirmTarget.data;
      this.doFetchToHighSea(supplierId);
    } else if (action == 'mutiMoveToHighSeas') { //多个移入公海
      this.mutiFetchToHighSea();
    }
  }
  handleConfirmCancel = () => {
    this.setState({ confirmVisible: false });
  }
  openConfirmModal = (param) => {
    var nextState = { confirmVisible: true };
    if (param) {
      var { confirmContent, confirmTarget } = param;
      if (confirmContent) {
        nextState['confirmContent'] = confirmContent;
      }
      if (confirmTarget) {
        nextState['confirmTarget'] = confirmTarget;
      }
    }
    this.setState(nextState);
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
    return detailUrl == '' ? text : <a href={detailUrl + '?systemId=' + systemId + '&moduleId=' + moduleId + '&supplierId=' + supplierId}>{text}</a>;
  }
  handleClickMoveToSea = () => {
    if (this.props.mainTableData.selectedList.length === 0) {
      message.warning('请选择要移入公海的供应商');
      return;
    }
    this.openConfirmModal({
      confirmTarget: { action: 'mutiMoveToHighSeas' },
      confirmContent: '是否将选中的供应商移入到公海?'
    })
  }
  render() {

    const columns = [{
      title: '企业名称',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => {
        return this.getDetailUrl(record.type, record.supplierId, text)
      }
    }, {
      title: '来源',
      dataIndex: 'source',
      key: 'source'
    }
      // , {
      //   title: '级别',
      //   dataIndex: 'clueLevel',
      //   key: 'clueLevel'
      // }
      , {
      title: '企业性质',
      dataIndex: 'enterpriseType',
      key: 'enterpriseType'
    }, {
      title: '主营类目',
      dataIndex: 'varietyName',
      key: 'varietyName'
    }, {
      title: '主营品牌',
      dataIndex: 'mainBrand',
      key: 'mainBrand'
    }, {
      title: '联系人信息',
      dataIndex: 'contacts',
      key: 'contacts',
      render: (text, record) => (
        <div>
          <div>{record.fullname}</div>
          <div>{record.mobile}</div>
        </div>
      )
    }, {
      title: '创建时间',
      dataIndex: 'createTime2',
      key: 'createTime2'
    }, {
      title: '负责时间',
      dataIndex: 'responsibleTime',
      key: 'responsibleTime'
    }, {
      title: '操作',
      dataIndex: 'option',
      render: (text, record) => {
        return <span className='table-options-wrap'>
          <a href='javascript:;' className='js-out'>分配</a>
          <a href='javascript:;' className='last-link js-in'>移入</a></span>  //数据中有checked表示选中
      },
      key: 'option'
    }];
    const { tableData, pagination, isFetching } = this.props.mainTableData;
    const WrappedEffectForm = Form.create()(EffectForm);
    return (
      <div className='main-table'>
        <div className="tabel-extend-option"><span onClick={this.handleRefresh} className='refresh'>刷新列表</span>
          <span onClick={this.handleClickMoveToSea}>移入公海</span>
          <span onClick={this.handleOpenChoose}>分配负责人</span>
          <span onClick={this.handleOpenCooperationModal}>修改合作关系</span>
        </div>
        <Table bordered columns={columns}
          rowKey={record => record.supplierId}
          dataSource={tableData}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection}
          onRowClick={this.handleRowClick}
        />
        <Modal visible={this.state.confirmVisible}
          onOk={this.handleConfirmOk} onCancel={this.handleConfirmCancel}
        >
          <p>{this.state.confirmContent}</p>
        </Modal>
        <Modal title='修改合作关系' visible={this.state.cooperationModalVisible} onCancel={this.handleCooperationModalCancel} footer={null} >
          <WrappedEffectForm onChoosed={this.handleChangeCooperationModal} />
        </Modal >
        <PersonSelector onChoosed={this.handleChoosed.bind(this)}
          onCancel={this.handlePersonCancel.bind(this)}
          visible={this.state.personSelectorVisible}
          actionInfo={this.state.actionInfo} />
      </div>
    );
  }
}


export default MainTable;