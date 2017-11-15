import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'



export default class Card1 extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render() {
    const d = this.props.data;
    return (
      <div className="briefly-card">
        <h1 className='header'>线索总览</h1>
        <div className='row clearfix'>
          <div className='column-2'><div className='title'>我的线索</div>
          <div className='count'>{d.wode.count}</div>
          <div className='modify-info'>本周新增加{d.wode.add}条,转化{d.wode.turn}条</div></div>
          <div className='column-2'><div className='title'>下属线索</div>
          <div className='count'>{d.xiashu.count}</div>
          <div className='modify-info'>本周新增加{d.xiashu.add}条,转化{d.xiashu.turn}条</div></div>
        </div>
        <div className='row clearfix'>
          <div className='column-2'><div className='title'>公海线索</div>
          <div className='count'>{d.gonghai.count}</div>
          <div className='modify-info'>本周新增加{d.gonghai.add}条,转化{d.gonghai.turn}条</div></div>
          <div className='column-2'><div className='title'>全部线索</div>
          <div className='count'>{d.quanbu.count}</div>
          <div className='modify-info'>本周新增加{d.quanbu.add}条,转化{d.quanbu.turn}条</div></div>
        </div>
      </div>
    );
  }
}


