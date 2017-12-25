import React from 'react';
import PropTypes from 'prop-types'
import {Pagination,Spin} from 'antd';
import axios from 'axios';
import MainCard from './MainCard.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doQueryFollow} from '../actions/index.js';

@connect(
    state => ({ FollowUP: state.FollowUP }),
    dispatch => bindActionCreators({doQueryFollow }, dispatch)
)

 
class MainTable extends React.Component {
  static propTypes = {
  }
  handlePageChange = (page, pageSize) => {  //点击分页控件调用  比如换页或者换pageSize
    let paginationObj =  this.props.FollowUP.pagination;
    paginationObj.current = page;
    paginationObj.pageSize = pageSize;
    this.props.doQueryFollow({query:this.props.FollowUP.query,userList:this.props.FollowUP.userList,pagination:paginationObj});
  }
  handleSizeChange= (current, size) =>{
    let paginationObj =  this.props.FollowUP.pagination;
    paginationObj.current = current;
    paginationObj.pageSize = size;
    this.props.doQueryFollow({query:this.props.FollowUP.query,userList:this.props.FollowUP.userList,pagination:paginationObj});
  }
  componentWillMount(){
    // this.props.initSupplierTable();
  }
  render() {
    const {list,pagination,isFetching} = this.props.FollowUP;
    return (
      <div >
         <Spin spinning={isFetching} delay={1000}>
            <div>
                  {list==null ?  <div></div> : list.map((o)=>{
                  return <MainCard   data={o} key={o.id} />
              })}
            </div>
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