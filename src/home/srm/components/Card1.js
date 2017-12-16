import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import { Spin } from 'antd';
import axios from '../../../util/axios'


import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import { getModuleIdByUrl } from '../../../components/common/publicrequest/index';




const defaultState = {
  "changeWeekClueMyTotal": 0,
  "changeWeekClueTheHighSeasTotal": 0,
  "changeWeekClueTotal": 0,
  "changeWeekClueUnderlingTotal": 0,
  "clueMyTotal": 0,
  "clueTheHighSeasTotal": 0,
  "clueTotal": 0,
  "clueUnderlingTotal": 0,
  "weekClueMyTotal": 0,
  "weekClueTheHighSeasTotal": 0,
  "weekClueTotal": 0,
  "weekClueUnderlingTotal": 0
}

export default class Card1 extends React.Component {
  componentWillMount() {
    this.queryData();
  }
  state = {
    cardData: defaultState,
    isFetching: false
  }
  queryData = () => {
    var urlParams = getUrlParams();
    var moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
    this.setState({ isFetching: true });
    var params = { moduleId };
    axios.get(connect_srm + '/clue/viewSupplierClueTotal.do', { params: params, timeout: 20000 }).then((res) => {
      if (res.data.code == '1') {
        this.setState({ cardData: res.data.data, isFetching: false });
      } else {
        this.setState({ isFetching: false });
      }
    }).catch((e) => {
      console.log(e);
      this.setState({ isFetching: false });
    });
  }

  render() {
    const d = this.state.cardData;
    return (
      <div className="briefly-card">
        <Spin spinning={this.state.isFetching}>
          <h1 className='header'>线索总览</h1>
          <div className='row clearfix'>
            <div className='column-2'><div className='title'>我的线索</div>
              <div className='count'><a href='/myClue/'>{d.clueMyTotal}</a></div>
              <div className='modify-info'>本周新增加{d.weekClueMyTotal}条,转化{d.changeWeekClueMyTotal}条</div></div>
            <div className='column-2'><div className='title'>下属线索</div>
              <div className='count'>{d.clueUnderlingTotal}</div>
              <div className='modify-info'>本周新增加{d.weekClueUnderlingTotal}条,转化{d.changeWeekClueUnderlingTotal}条</div></div>
          </div>
          <div className='row clearfix'>
            <div className='column-2'><div className='title'>公海线索</div>
              <div className='count'>{d.clueTheHighSeasTotal}</div>
              <div className='modify-info'>本周新增加{d.weekClueTheHighSeasTotal}条,转化{d.changeWeekClueTheHighSeasTotal}条</div></div>
            <div className='column-2'><div className='title'>全部线索</div>
              <div className='count'>{d.clueTotal}</div>
              <div className='modify-info'>本周新增加{d.weekClueTotal}条,转化{d.changeWeekClueTotal}条</div></div>
          </div>
        </Spin>
      </div>
    );
  }
}


