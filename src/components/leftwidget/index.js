import React from 'react'
import PropTypes from 'prop-types'
import './layout.css';
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash'
import querystring  from 'querystring';
import url from 'url';

import { getUrlParams ,getLoginInfo} from '../../util/baseTool';
const SubMenu = Menu.SubMenu;


class Sider extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired, //菜单原始数据必须的
  }
  state = {
    openKeys: [],
    selectedKeys: [],
    data: []
  };
  onOpenChange = (openKeys) => {
    this.setState({ openKeys });
  }
  onSelect = (item, key, selectedKeys) => {
    this.setState({ selectedKeys });
  }
  setDatafromProp = (data) => {
    if (!data || data.length == 0) {
      return;
    }
    var urlParams = getUrlParams(location.href);
    var systemId = urlParams['systemId'] ? urlParams['systemId'] : '', moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
    var targetData = this.getTargetMenuData(data, systemId, 0); //第3个参数,表示默认打开第几个菜单
    var d = this.getMenuOpenAndSelected(targetData, moduleId); //获取展开的的选中的菜单key
    this.setState({ openKeys: d.openKeys, selectedKeys: d.selectedKeys, data: targetData });
  }
  componentWillMount() {
    this.setDatafromProp(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    this.setDatafromProp(nextProps.data);
  }
  getTargetMenuByUrl =(data)=>{
    var isMatched = false;
    var targetData = [];
    var pathname = location.pathname;
    for(var o of data){
      var son = o.son;
      if(son && son.length>0){
        for(var item of son){
          var son2 = item.son;
          if(son2 && son2.length>0){
            for(var childItem of son2){
              if(url.parse(childItem.url).pathname ==pathname){   
                  isMatched = true;
                  break;
              }
            }
          }else{
            if(url.parse(item.url).pathname ==pathname){   
                isMatched = true;
                break;
            }
          }
        }
      }
      if(isMatched){
        targetData = son;
        break;
      }
    }
    return targetData;
  }
  //从所有菜单数据中提取需要的左侧菜单数据
  getTargetMenuData = (data, systemId, index) => {
    var targetData = [];
    if (systemId == '') {
      targetData = this.getTargetMenuByUrl(data);
      if(targetData.length==0){ //通过url未匹配到
        targetData = data[index].son;//登录后进入首页默认拿第一个menu的数据
      }
    } else {
      for (let o of data) {
        if (o.systemId == systemId) {
          targetData = o.son;
          break;
        }
      }
    }
    return targetData;
  }
  //获取导航菜单的展开值和选中值
  getMenuOpenAndSelected = (targetData, moduleId) => {
    if (!targetData || targetData.length == 0) {
      return { openKeys: [], selectedKeys: [] };
    }
    var getFirst = (targetData) => {
      var openKey = targetData[0].moduleId;
      var selectedKey = '';
      if (targetData[0].son.length > 0) { //有二级菜单
        selectedKey = targetData[0].son[0].moduleId;
      } else {
        selectedKey = targetData[0].moduleId;
      }
      return { openKeys: [openKey], selectedKeys: [selectedKey] };
    }

    var openKeys = [], selectedKeys = [];
    var isMatched = false;
    var pathname = location.pathname;
    if (moduleId == '') {  //未传入moduleId的时候
      // var obj = getFirst(targetData);
      // openKeys = obj.openKeys, selectedKeys = obj.selectedKeys;
      for(var o of targetData){
        var son = o.son;
        if(son && son.length>0){
          for(var item of son){
            if(url.parse(item.url).pathname ==pathname){   
                openKeys.push(o.moduleId);
                selectedKeys.push(item.moduleId);
                isMatched = true;
                break;
            }
          }
        }
        if(isMatched){
          break;
        }
      }
    } else {
      for (let o of targetData) {
        var son = o.son;
        if (son && son.length > 0) { //有二级菜单
          for (let p of son) {  //左侧链接点击去可以匹配到子菜单
            if (p.moduleId == moduleId) {
              openKeys.push(o.moduleId);
              selectedKeys.push(p.moduleId);
              isMatched = true;
              break;
            }
          }
        } else {  //无二级菜单
          if (o.moduleId == moduleId) {
            selectedKeys.push(o.moduleId);
            isMatched = true;
          }
        }
        if (isMatched) {
          break;
        }
      }

      if (!isMatched) {
        var obj = getFirst(targetData);
        openKeys = obj.openKeys, selectedKeys = obj.selectedKeys;
      }
    }
    return { openKeys: openKeys, selectedKeys: selectedKeys };
  }
  joinUrl = (o) => {
    var params = _.pick(o, ['systemId', 'moduleId']);
    return o.url + '?' + querystring.stringify(params);
  }
  renderChildMenu = () => {
    var addChild = (o) => {
      var r = o.son.map((p) => {
        return <Menu.Item key={p.moduleId}><a href={this.joinUrl(p)}>{p.name}</a></Menu.Item>
      })
      return r;
    }
    var result = this.state.data.map((o) => {
      var className = o.className == '' ? 'pdl5' : 'pdl5 ' + o.className;
      var title = o.son.length == 0 ? <a className={className} href={this.joinUrl(o)}>{o.name}</a> : <span className={className} href={this.joinUrl(o)}>{o.name}</span>;
      if (o.son.length == 0) {
        return <Menu.Item key={o.moduleId}>{title}</Menu.Item>
      } else {
        return <SubMenu key={o.moduleId} title={title}>
          {addChild(o)}
        </SubMenu>
      }
    })
    return result;
  }
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
        style={{ width: 240 }}
      >
        {this.renderChildMenu()}
      </Menu>
    );
  }
}

class LeftWidget extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired, //菜单原始数据必须的
  }
  render() {
    const crmUrl = 'http://admin.csc86.com/main/system.html?platformId=50fdd217ed620e74f673b7ce724bae5e&token='+getLoginInfo()['token'];
    return (
      <div className="leftwidget">
        <div className="leftlogo">
          <span className="sp1"><img src={require('./img/logo.png')} /></span>
          <span className="sp2">SRM</span>
        </div>
        <div className="switch">
          <div className='system'>奇智SRM系统</div><div className='switch-wrap'><a href={crmUrl} target='_blank' className='switch-icon'>CRM</a></div>
        </div>
        <div>
          <Sider data={this.props.data} />
        </div>
      </div>
    )
  }
}

export default LeftWidget