import React from 'react';
import PropTypes from 'prop-types'
import {Pagination} from 'antd';
import axios from 'axios';
import MainCard from './MainCard.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doFirstQueryFollow, doQueryFollow ,doEditFollowInfo} from '../actions/index.js';

@connect(
    state => ({ MyFollowUP: state.MyFollowUP }),
    dispatch => bindActionCreators({ doFirstQueryFollow, doQueryFollow,doEditFollowInfo }, dispatch)
)

 
class MainTable extends React.Component {
  static propTypes = {
  }
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
  componentWillMount(){
    // this.props.initSupplierTable();
  }
  render() {
    const {list,pagination} = this.props.MyFollowUP;
    return (
      <div  className="clearfix">
          <div>
            {list.map((o)=>{
                return <MainCard data={o} key={o.key} />
            })}
          
          </div>
          <div className='pagination-wrap'>
            <Pagination defaultCurrent={1} current={pagination.current} total={pagination.total} 
            pageSize={pagination.pageSize}  showQuickJumper={true} showSizeChanger={true}  showTotal={total => `共 ${total} 条`}
            onChange={this.handlePageChange}
            onShowSizeChange={this.handleSizeChange}/>
          </div>
      </div>
    );
  }
}


export default MainTable;