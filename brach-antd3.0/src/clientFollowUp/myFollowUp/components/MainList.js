import React from 'react';
import PropTypes from 'prop-types'
import {Pagination,Spin} from 'antd';
import axios from 'axios';
import MainCard from './MainCard.js';
import PublicModal from '../../../components/publicFollowUp'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  doQueryFollow ,doEditFollowInfo} from '../actions/index.js';
import {doFormEdit} from '../../../components/publicFollowUp/redux';

@connect(
    state => ({ MyFollowUP: state.MyFollowUP,EditModal: state.EditModal }),
    dispatch => bindActionCreators({  doQueryFollow,doEditFollowInfo,doFormEdit }, dispatch)
)
class MainTable extends React.Component {
  handlePageChange = (page, pageSize) => {  //点击分页控件调用  比如换页或者换pageSize
    let paginationObj =  this.props.MyFollowUP.pagination;
    paginationObj.current = page;
    paginationObj.pageSize = pageSize;
    this.props.doQueryFollow({query:this.props.MyFollowUP.query,pagination:paginationObj});
  }
  handleSizeChange= (current, size) =>{
    let paginationObj =  this.props.MyFollowUP.pagination;
    paginationObj.current = current;
    paginationObj.pageSize = size;
    this.props.doQueryFollow({query:this.props.MyFollowUP.query,pagination:paginationObj});
  }
  showModal = (key,id )=> {
    this.props.doFormEdit(key,id);
  }
  handleEditSucess = () =>{
    var {query,pagination} = this.props.MyFollowUP;
    this.props.doQueryFollow({query,pagination});
  }
  render() {
    const {cardData,pagination,isFetching} = this.props.MyFollowUP;
    return (
      <div  className="clearfix">
        <Spin spinning={isFetching} delay={1000}>
            <div>
              {cardData==null ?  <div></div> : cardData.map((o)=>{
                  return <MainCard  onEdit={this.showModal.bind(this)} data={o} key={o.id} />
              })}
              <PublicModal onSuccess={this.handleEditSucess.bind(this)}/>
            </div>
            <div className='pagination-wrap'>
              <Pagination current={pagination.current} total={pagination.total} 
              pageSize={pagination.pageSize}  showQuickJumper={true} showSizeChanger={true}  showTotal={total => `共 ${total} 条`}
              onChange={this.handlePageChange}
              onShowSizeChange={this.handleSizeChange}/>
            </div>
          </Spin>
      </div>
    );
  }
}


export default MainTable;