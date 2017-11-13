import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'


export default class Card1 extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <div className="briefly-card">
        <h1 className='header'>线索总览</h1>
        <div>
          <div><div className='title'>我的线索</div><div className='count'>24111935</div><div className='modify-info'>本周新增加5跳,转化4条</div></div>
          <div><span className='title'>下属线索</span><span className='count'>24111935</span><span className='modify-info'>本周新增加5跳,转化4条</span></div>
        </div>
        <div>
          <div><span className='title'>公海线索</span><span className='count'>24111935</span><span className='modify-info'>本周新增加5跳,转化4条</span></div>
          <div><span className='title'>全部线索</span><span className='count'>24111935</span><span className='modify-info'>本周新增加5跳,转化4条</span></div>
        </div>
      </div>
    );
  }
}


