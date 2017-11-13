import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Table, Form, Button, Icon ,message } from 'antd';
import './layout.css';
import ModalForm from './modalForm'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doFormEdit,doEffectFlow,doCancelForm} from './redux';

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
  dispatch => bindActionCreators({doFormEdit,doEffectFlow,doCancelForm}, dispatch)
)

class EditModal extends React.Component {
    // static propTypes = { //声明prop中属性变量
    //   requestId: PropTypes.string.isRequired //供应商,采购商id等，用于查选联系人
    // }
    
    // showModal = () => {
    //   this.props.doFormEdit();//模态框显示
    // }
    handleOk = () => {
      this.props.doEffectFlow();
    }
    handleCancel = () => {
      this.props.doCancelForm();
    }
    
    render() {
      const ModalFormWrapped = Form.create()(ModalForm);
      const {visible} = this.props.EditModal;
      const {title} = this.props.EditModal.pform;
      return (
        <div>
          {/* <Icon  type="edit" onClick={this.showModal} className="editStyle"></Icon>
          <span  onClick={this.showModal} className="addStyle ">
            添加跟进
          </span> */}
            <Modal visible={visible} title={title} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                <ModalFormWrapped/>
            </Modal>
        </div>
      );
    }
}

export default EditModal;