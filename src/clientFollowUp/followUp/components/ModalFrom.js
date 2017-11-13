import React from 'react';
import { Button,Modal } from 'antd';


class ModalFrom extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <span  onClick={this.showModal}  className="edit-follow" icon="edit"></span>
        <Modal title="移除计划"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
        >
          <p>确认将计划移出日程，移除后将不可恢复</p>
        </Modal>
      </div>
    );
  }
}

export default ModalFrom