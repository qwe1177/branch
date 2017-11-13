import React, {Component} from 'react';
import { connect_cas } from '../../util/connectConfig';
import { getUrlParams,getLoginInfo } from '../../util/baseTool';
import axios from 'axios';
import data from './mock';

export default class PlatformComponent extends Component {
  constructor(props,context) {
    super(props,context);
    this.state={
      platformMenu :[],  //菜单数据
      isExpand: true //左侧是否收缩
    }
  }
  /**
   * 展开收缩左侧菜单
   */

	handleExpandOrCollapse =()=>{
		this.setState({isExpand:!this.state.isExpand});
	}


  /**
   * 获取左侧菜单和顶部菜单的原始数据 
   */
  getMenuData=()=>{
    this.setState({ platformMenu:data }); //默认设置mock数据为了开发
    var loginInfo = getLoginInfo(); //从localstorage得到platformId,token 如果没有使用mock
    var platformId = loginInfo.platformId==''?'757a6c1798f39e8c02ebe249f4bea326':loginInfo.platformId;//srm默认的platformId
    var token = loginInfo.token==''?'47a7e78d3446cc69212c93b201a727ab272dd04a379d17fc4d686f2e5bce989a':loginInfo.token; //用户和权限记录
    axios.get(connect_cas + '/api/menu/getPlatformMenu', { params: { platformId: platformId, token: token } }).then((res) => {
        if (res.data.code == '0') {
          // console.log(JSON.stringify(res.data.data.menu));
          // this.setState({platformMenu:res.data.data.menu});
        }
      });
  }
  //如果是登录后跳当前页面，写入登录信息
  setLoginInfo=()=>{
    var params = getUrlParams(location.href);
    if(params.platformId && params.token){
      if (window.localStorage) {
          localStorage.setItem("srm", JSON.stringify({platformId:params.platformId}));	 //保存platformId在crm的key值下面
          localStorage.setItem("loginToken", params.token);  //保存登录token
      } else {
          //Cookie.write("menuTitle", arrDisplay);	
      }
    }
  }

}
