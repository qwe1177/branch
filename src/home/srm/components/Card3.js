import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export default class Card3 extends React.Component {
  render() {
    return (
      <div className="briefly-card">
        <h1 className='header'>询报价总览</h1>
        <div style={{padding:'0 12px'}}>
          后续功能建设中...
        </div>
        {/* <div className='row clearfix'>
          <div className='column-2'><div className='title'>我的询价</div><div className='count'>24111935</div><div className='modify-info'>本周新增加5条,转化4条</div></div>
          <div className='column-2'><div className='title'>下属的询价</div><div className='count'>24111935</div><div className='modify-info'>本周新增加5条,转化4条</div></div>
        </div>
        <div className='row clearfix'>
          <div className='column-3'><div className='title'>询价总笔数</div><div className='count-1'>9</div></div>
          <div className='column-3'><div className='title'>成交总笔数</div><div className='count-1'>22</div></div>
          <div className='column-3'><div className='title'>成交总金额</div><div className='count-1'>109</div></div>
        </div> */}
      </div>
    );
  }
}