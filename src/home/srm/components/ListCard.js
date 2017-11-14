import React from 'react'
import PropTypes from 'prop-types'
import './List.css'
import { Icon, Button, Spin,Pagination } from 'antd';


export default class ListCard extends React.Component {
  // static propTypes = {
  //   data: PropTypes.object.isRequired
  // }
  // constructor(props) {
  //   super(props);
  // }
  state = {
    pagination: {
      total: 2,
      current: 1,
      pageSize: 5
    },
    listData: [],
    isFetching: false
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let { queryform } = this.props.mainQueryData;
    let paginationObj = this.props.mainTableData.pagination;
    paginationObj.current = pagination.current;
    paginationObj.pageSize = pagination.pageSize;
    // this.props.queryTableData({queryform:queryform,pagination:paginationObj});
  }
  render() {
    const { listData, pagination, isFetching } = this.state;
    return (
      <div className='list-card-wrap'>
        <div className="card-title">待办任务(<span className='card-title-number'>22</span>) <a href='#' className='more-link'>more<Icon type="double-right" /></a>  </div>
        <Spin spinning={this.state.isFetching}>
          <div className=''>
            <div className='item-info'>
              <div>可以设置一个提醒，让你不会错过任何任务，管理您的TO DO列表</div>
              <div><div>来源:学习的事情</div><div>优先级:<span className='tag'>总要通知</span></div></div>
            </div>
            <div className='progress-wrap'>
              <div><span className='nowarning'>剩余时间</span></div>
              <div><Button>添加进度</Button></div>
            </div>
          </div>
        </Spin>
        <Pagination defaultCurrent={1} total={50} onChange={this.handleTableChange} />
      </div>
    );
  }
}


