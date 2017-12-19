import React from 'react'
import PropTypes from 'prop-types'
import './List.css'
import { Icon, Button, Spin, Pagination } from 'antd';


export default class ListCard extends React.Component {
  state = {
    pagination: {
      total: 2,
      current: 1,
      pageSize: 5
    },
    listData: [],
    isFetching: false
  }
  componentWillMount(){
    this.queryData();
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize

  }
  queryData = () => {
    const dataSource = [{
      key: '1',
      message: '可以设置一个提醒，让你不会错过任何任务，管理您的TO DO列表',
      source: '学习的事情',
      priority: '总要通知',
      limitTime: '3天24小时',
      isOvertime: false,
      important:true
    }, {
      key: '2',
      message: '可以设置一个提醒，让你不会错过任何任务，管理您的TO DO列表',
      source: '学习的事情',
      priority: '总要通知',
      limitTime: '3天24小时',
      isOvertime: false
    }, {
      key: '3',
      message: '可以设置一个提醒，让你不会错过任何任务，管理您的TO DO列表',
      source: '学习的事情',
      priority: '总要通知',
      limitTime: '3天24小时',
      isOvertime: false
    }
    , {
      key: '4',
      message: '可以设置一个提醒，让你不会错过任何任务，管理您的TO DO列表',
      source: '学习的事情',
      priority: '总要通知',
      limitTime: '超时24小时',
      isOvertime: true
    }
  ];
    this.setState({ listData: dataSource })

  }
  render() {
    const { listData, pagination, isFetching } = this.state;
    return (
      <div className='list-card-wrap'>
        <div className="card-title">待办任务-α<span className='number-wrap'>(<span className='card-title-number'>22</span>)</span> <a href='#' className='more-link'>more<Icon type="double-right" /></a>  </div>
        <Spin spinning={this.state.isFetching}>
          <div className='alignment-wrap'>

            {listData.map((o)=>{
              return <div className='one-item clearfix' key={o.key}>
              <div className='item-info'>
                <div className='row-1 item-message'>{o.message}</div>
                <div className='row-2 clearfix'><div className='column-2'>来源：{o.source}</div><div className='column-2'>优先级：<span className={o.important?'important-tag':'normal-tag'}>{o.priority}</span></div></div>
              </div>
              <div className='progress-wrap'>
                <div className='row-1'><span className={o.isOvertime?'limit-time warning':'limit-time nowarning'}>{o.isOvertime?o.limitTime:'剩余时间:'+o.limitTime}</span></div>
                <div className='row-2 btn-wrap'><Button type="primary">添加进度</Button></div>
              </div>
            </div>
            })}
          <div className='pagination-wrap'>
          <Pagination defaultCurrent={1} total={50} pageSize={4} onChange={this.handleTableChange} />
        </div>
          </div>
        </Spin>
        
      </div>
    );
  }
}


