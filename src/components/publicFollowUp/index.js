import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Form } from 'antd';
import './layout.css';
import ModalForm from './modalForm'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doFormAdd,doFormEdit,doEffectFlow,doCancelForm} from './redux';

/**
 * store中的数据
 * visible：boolean  编辑和添加modal是否可显
 * isFetching:boolean 编辑和添加的请求是否正在进行
 * pform:object 
 * effectResult:boolean 提交结果
 * 
 */
@connect(
  state =>  ({EditModal: state.EditModal}),
  dispatch => bindActionCreators({doEffectFlow,doCancelForm}, dispatch),
)

class PublicModal extends React.Component {
    handleCancel = () => {
      this.props.doCancelForm();
    }
    render() {
      const ModalFormWrapped = Form.create()(ModalForm);
      const {visible,isFetching} = this.props.EditModal;
      var type = this.props.type;
      var modalType = this.props.modalType; 
      var title = modalType != '2' ? '添加跟进' : '编辑跟进';
      var url = modalType != '2' ? 'http://10.10.10.29:9407/v1/supplier/saveSupplierFollowupRecords.do' : 'http://10.10.10.29:9407/v1/supplier/updateSupplierFollowupById.do';
      return (
        <div>
            <Modal visible={visible} title={title} loading={isFetching} onOk={this.handleOk} onCancel={this.handleCancel} width = {'650px'} footer={null}>
                <ModalFormWrapped modalType = {modalType} type = {type} url = {url} />
            </Modal>
        </div>
      );
    }
}

export default PublicModal;