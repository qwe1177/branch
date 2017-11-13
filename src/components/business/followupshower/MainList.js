import React from 'react';
import PropTypes from 'prop-types'
import {Pagination} from 'antd';
import MainCard from './MainCard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow ,doModifiyFollowInfo} from './redux';

@connect(
    state => ({ followupShower: state.followupShower }),
    dispatch => bindActionCreators({ doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow,doModifiyFollowInfo }, dispatch)
)

 
class MainTable extends React.Component {
  static propTypes = {

  }
  handlePageChange = (page, pageSize) => {  //点击分页控件调用  比如换页或者换pageSize
    let paginationObj =  this.props.followupShower.pagination;
    paginationObj.current = page;
    paginationObj.pageSize = pageSize;
    this.props.doQueryFollow({query:this.props.followupShower.query,pagination:paginationObj});
  }
  handleSizeChange= (current, size) =>{
    let paginationObj =  this.props.followupShower.pagination;
    paginationObj.current = current;
    paginationObj.pageSize = size;
    this.props.doQueryFollow({query:this.props.followupShower.query,pagination:paginationObj});
  }
  componentWillMount(){
    // this.props.initSupplierTable();
  }
 
  render() {
    const {list,pagination} = this.props.followupShower;
    return (
      <div>
        <div className='card-wrap'>
        {list.map((o)=>{
            return <MainCard data={o} key={o.key} />
        })}
        
        </div>
        <div className='pagination-wrap'>
        <Pagination defaultCurrent={1} current={pagination.current} total={pagination.total} 
        pageSize={pagination.pageSize}  showQuickJumper={true} showSizeChanger={true}  showTotal={total => `共 ${total} 条`}
        onChange={this.handlePageChange}
        onShowSizeChange={this.handleSizeChange}
         />
          </div>
      </div>
    );
  }
}


export default MainTable;