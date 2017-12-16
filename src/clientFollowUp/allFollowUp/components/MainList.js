import React from 'react';
import PropTypes from 'prop-types'
import {Pagination,Spin} from 'antd';
import axios from 'axios';
import MainCard from './MainCard.js';
import PublicModal from '../../../components/publicFollowUp/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  doQueryFollow} from '../actions/index.js';
import { doFormEdit } from '../../../components/publicFollowUp/redux';
@connect(
    state => ({ AllFollowUP: state.AllFollowUP, EditModal: state.EditModal }),
    dispatch => bindActionCreators({ doQueryFollow,doFormEdit }, dispatch)
)

 
class MainTable extends React.Component {
  static propTypes = {
  }
  handlePageChange = (page, pageSize) => {  //点击分页控件调用  比如换页或者换pageSize
    let paginationObj =  this.props.AllFollowUP.pagination;
    paginationObj.current = page;
    paginationObj.pageSize = pageSize;
    this.props.doQueryFollow({query:this.props.AllFollowUP.query,pagination:paginationObj});
  }
  handleSizeChange= (current, size) =>{
    let paginationObj =  this.props.AllFollowUP.pagination;
    paginationObj.current = current;
    paginationObj.pageSize = size;
    this.props.doQueryFollow({query:this.props.AllFollowUP.query,pagination:paginationObj});
  }
  componentWillMount(){
    // this.props.initSupplierTable();
  }
  showModal = (key, id) => {
    this.props.doFormEdit(key, id);
  }
  handleEditSucess = () => {
    var { query, pagination } = this.props.AllFollowUP;
    this.props.doQueryFollow({ query, pagination });
  }
  render() {
    const {list,pagination,isFetching} = this.props.AllFollowUP;
    return (
      <div >
        <Spin spinning={isFetching} delay={1000}>
            <div>
                  {list==null ?  <div></div> :list.map((o)=>{
                  return <MainCard onEdit={this.showModal.bind(this)}  data={o} key={o.id} />
              })}
            </div>
            <PublicModal onSuccess={this.handleEditSucess.bind(this)} />
            <div className='pagination-wrap'>
              <Pagination defaultCurrent={1} current={pagination.current} total={pagination.total} 
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