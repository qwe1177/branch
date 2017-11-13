import React from 'react'
import PropTypes from 'prop-types'
import './layout.css';
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash'
var querystring = require('querystring');
import axios from 'axios';

import { getUrlParams } from '../../util/baseTool';
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
  setDatafromProp = (data)=>{
    if(!data || data.length==0){
      return;
    }
    var urlParams = getUrlParams(location.href);
    var systemId = urlParams['systemId'] ? urlParams['systemId'] : '', moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
    var targetData = this.getTargetData(data, systemId, 1); //第3个参数mock使用,表示默认打开第几个菜单
    var d = this.getDefault(targetData, moduleId); //获取展开的的选中的菜单key
    this.setState({ openKeys: d.openKeys, selectedKeys: d.selectedKeys, data: targetData });
  }
  componentWillMount(){
    this.setDatafromProp(this.props.data);
  }
  componentWillReceiveProps(nextProps){
    this.setDatafromProp(nextProps.data);
  }
  //从所有菜单数据中提取需要的左侧菜单数据
  getTargetData = (data, systemId, index) => {
    var targetData = [];
    if (index) {
      targetData = data[index].son;//默认使用供应商模拟数据
    } else {
      if (systemId == '') {
        targetData = data[0].son;//登录后进入首页默认拿第一个menu的数据
      } else {
        for (let o of data) {
          if (o.systemId == systemId) {
            targetData = o.son;
            break;
          }
        }
      }
    }
    return targetData;
  }
  //获取导航菜单的展开值和选中值
  getDefault = (targetData, moduleId) => {
    if(!targetData || targetData.length==0){
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
    if (moduleId == '') {  //登录后进入首页默认拿第一个menu的第一个model,默认打开第一个menu
      var obj = getFirst(targetData);
      openKeys = obj.openKeys, selectedKeys = obj.selectedKeys;
    } else {
      var isSearched = false;
      for (let o of targetData) {
        var son = o.son;
        if(son && son.length>0){
          for (let p of son) {  //左侧链接点击去可以匹配到子菜单
            if (p.moduleId == moduleId) {
              openKeys.push(o.moduleId);
              selectedKeys.push(p.moduleId);
              isSearched = true;
              break;
            }
          }
        }else{
          if (o.moduleId == moduleId) {
            if(son && son.length>0){  //点击顶部tab进入，取不到具体子菜单，取第一个
              openKeys.push(o.moduleId);
              selectedKeys.push(son[0].moduleId);
            }else{  //如首页类似的无子页面，只设置select
              selectedKeys.push(o.moduleId);
            }
            isSearched = true;
          }
        }
        if (isSearched) {
          break;
        }
      }

      if (!isSearched) {
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
      if(o.son.length== 0){
        return <Menu.Item key={o.moduleId}>{title}</Menu.Item>
      }else{
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
    return (
      <div className="crmleftall">
        <div className="leftlogo">
          <span className="sp1"><img src={require('./img/logo.png')} /></span>
          <span className="sp2">CRM</span>
        </div>
        <div className="leftuser">
        </div>
        <div>
          <Sider data={this.props.data}/>
        </div>
      </div>
    )
  }
}

export default LeftWidget