import React from 'react';
import PropTypes from 'prop-types'
import { Pagination,Modal,message } from 'antd';
import MainCard from './MainCard.js';
import PublicModal from '../../publicFollowUp/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow, doModifiyFollowInfo } from './redux';
import { doFormEdit } from '../../publicFollowUp/redux';
import { connect_srm } from '../../../util/connectConfig';
import axios from '../../../util/axios';


@connect(
  state => ({ followupShower: state.followupShower, EditModal: state.EditModal }),
  dispatch => bindActionCreators({ doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow, doModifiyFollowInfo, doFormEdit }, dispatch)
)


class MainTable extends React.Component {
  state = {
    confirmVisible: false,  //弹出确认框
    confirmTarget: {action:'removeMess',data:[]}, //弹出框对应的事物类型
    confirmContent: '是否确认删除您的回复?' //弹出框内容
  }
  handlePageChange = (page, pageSize) => {  //点击分页控件调用  比如换页或者换pageSize
    let paginationObj = this.props.followupShower.pagination;
    paginationObj.current = page;
    paginationObj.pageSize = pageSize;
    this.props.doQueryFollow({ query: this.props.followupShower.query, pagination: paginationObj });
  }
  handleSizeChange = (current, size) => {
    let paginationObj = this.props.followupShower.pagination;
    paginationObj.current = current;
    paginationObj.pageSize = size;
    this.props.doQueryFollow({ query: this.props.followupShower.query, pagination: paginationObj });
  }

  showModal = (key, id) => {
    this.props.doFormEdit(key, id);
  }
  handleEditSucess = () => {
    var { query, pagination } = this.props.followupShower;
    this.props.doQueryFollow({ query, pagination });
  }
  handleConfirmOk =() =>{
		this.setState({ confirmVisible: false });
		var action =this.state.confirmTarget.action;
		if(action=='removeMess'){ //删除回复
      var {followUpId, commentId} =this.state.confirmTarget.data;
			this.removeOneMess(followUpId, commentId);
		}
	}
  handleConfirmCancel = () => {
    this.setState({ confirmVisible: false });
  }
  openConfirmModal =(param) =>{
		var nextState ={ confirmVisible: true };
		if(param){
			var {confirmContent,confirmTarget} = param;
			if(confirmContent){
				nextState['confirmContent'] =confirmContent;
			}
			if(confirmTarget){
				nextState['confirmTarget'] =confirmTarget;
			}
		}
		this.setState(nextState);
  }
  removeOneMess = (followUpId, commentId) => {
    axios.get(connect_srm + '/supplier/delSupplierFollowupPostil.do', { params: {id:commentId}}).then((res)=>{
        if(res.data.code=='1'){
            this.props.doDeleteFollowMessage(followUpId, commentId);
            message.success("删除成功!");
        }else{
            message.error(res.data.msg);
        }
    }).catch((e)=>{
        message.error(e.message);
    });
  }
  render() {
    const { list, pagination } = this.props.followupShower;
    return (
      <div>
        <div className='card-wrap'>
          {list.map((o) => {
            return <MainCard onEdit={this.showModal.bind(this)} data={o} key={o.id} onBeforeDelComment={this.openConfirmModal} />
          })}
          <PublicModal onSuccess={this.handleEditSucess.bind(this)} />
          <Modal visible={this.state.confirmVisible}
          onOk={this.handleConfirmOk} onCancel={this.handleConfirmCancel}
        >
          <p>{this.state.confirmContent}</p>
        </Modal>
        </div>
        <div className='pagination-wrap'>
          <Pagination defaultCurrent={1} current={pagination.current} total={pagination.total}
            pageSize={pagination.pageSize} showQuickJumper={true} showSizeChanger={true} showTotal={total => `共 ${total} 条`}
            onChange={this.handlePageChange}
            onShowSizeChange={this.handleSizeChange}
          />
        </div>
      </div>
    );
  }
}


export default MainTable;