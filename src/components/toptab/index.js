import React from 'react'
import PropTypes from 'prop-types'
import './layout.css';
import { Menu, Dropdown, Icon } from 'antd';
import _ from 'lodash'
import 'antd/dist/antd.css';
var querystring = require('querystring');
import axios from 'axios';

import { connect_cas } from '../../util/connectConfig';
import { getUrlParams } from '../../util/baseTool';

class TopTab extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired, //菜单原始数据必须的
  }
  constructor(props) {
    super(props);
  }
  getTabData =()=>{
    var data = this.props.data;
    if(!data || data.length==0){
      return [];
    }
    var urlParams = getUrlParams(location.href);
    var systemId = urlParams['systemId'] ? urlParams['systemId'] : '';
    var hasSystemId =false;
    var menu = data.map((o) => {
      var temp =_.omit(o, ['son']);
      if(temp.systemId ==systemId){ 
        temp['actived'] = true;
        hasSystemId = true;
      }
      return temp;
    });
    if(!hasSystemId){ //如果没有systemId匹配，默认第一个选中
      // var index = 1 //默认打开第几个tab
      var index = 0 //默认打开第几个tab
      menu[index]['actived'] = true;
    }
    return menu;
  }
  joinUrl = (o) => {
    var params = _.pick(o, ['systemId', 'moduleId']);
    return o.url + '?' + querystring.stringify(params);
  }
  render() {
    return (
      <div className="toptaball">
        <ul>
          {this.getTabData().map((o) => {
            var className = o.actived?'actived':'';
            return <li key={o.systemId} className={className} >
              <a href={this.joinUrl(o)} className={o.className}>{o.name}</a>
            </li>
          })}
        </ul>
      </div>
    );
  }
}



export default TopTab