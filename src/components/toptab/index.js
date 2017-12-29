import React from 'react'
import PropTypes from 'prop-types'
import './layout.css';
import { Menu, Dropdown, Icon } from 'antd';
import _ from 'lodash'
import 'antd/dist/antd.css';
import querystring  from 'querystring';
import url from 'url';

import { connect_cas } from '../../util/connectConfig';
import { getUrlParams,getOneUrlParams } from '../../util/baseTool';
import menuobj from '../../util/menuConfig';

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
    var pathname = location.pathname;
    var isMatched = false;
    var systemId = getOneUrlParams('systemId');
    
    if(systemId==''){//没有传入systemId,使用url匹配
      for(var o of data){
        var son = o.son;
        if(son && son.length>0){
          for(var item of son){
            var son2 = item.son;
            if(son2 && son2.length>0){
              for(var childItem of son2){
                if(url.parse(childItem.url).pathname ==pathname||url.parse(childItem.url).pathname==menuobj[pathname]){
                    isMatched = true;
                    break;
                }
              }
            }else{
              if(url.parse(item.url).pathname ==pathname||url.parse(item.url).pathname==menuobj[pathname]){
                  isMatched = true;
                  break;
              }
            }
          }
        }
        if(isMatched){
          o['actived'] = true;
          break;
        }
      }
    }else{          //一些非菜单页面需要用systemId匹配
      for(var o of data){
        if(o.systemId ==systemId){ 
          o['actived'] = true;
          isMatched = true;
          break;
        }
      }
    }
    
    if(!isMatched){
      data[0]['actived'] = true; //都没有匹配的时候默认选中第一个
    }
    return data;
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