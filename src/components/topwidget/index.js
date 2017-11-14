import React from 'react'
import './layout.css';
import { Menu, Dropdown, Icon, Form, Modal } from 'antd';
import 'antd/dist/antd.css';
import { connect_cas } from '../../util/connectConfig';
import { getLoginInfo, setLoginInfo } from '../../util/baseTool';
import axios from 'axios';
import EffectFrom from './EffectFrom';

class TopWidget extends React.Component {
  constructor(props, context) {
    super(props, context);
    setLoginInfo();
  }
  state = {
    userInfo: {
      realName: 'SRM默认用户',
      userPhoto: require('./img/an13.jpg')
    },
    visible: false
  }
  // 从sass系统api中用户信息
  componentWillMount() {
    var loginInfo = getLoginInfo(); //从localstorage得到platformId,token 如果没有使用mock
    var platformId = loginInfo.platformId == '' ? '757a6c1798f39e8c02ebe249f4bea326' : loginInfo.platformId;//srm默认的platformId
    var token = loginInfo.token == '' ? '47a7e78d3446cc69212c93b201a727ab272dd04a379d17fc4d686f2e5bce989a' : loginInfo.token; //用户和权限记录
    axios.get(connect_cas + '/api/login/chack', { params: { token: token } }).then((res) => {
      if (res.data.code == '0') {
        this.setState({ userInfo: Object.assign(this.state.userInfo, { realName: res.data.data.realName }) });
      }
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleSubmit = () => {
    this.setState({ visible: false });
  }
  preUpdatePwd = () => {
    this.setState({ visible: true });
  }
  render() {

    const menu = (
      <Menu>
        <Menu.Item key='updatepwd'>
          <a href="javascript:;" onClick={(e) => this.preUpdatePwd()}>修改密码</a>
        </Menu.Item>
        <Menu.Item key='loginout'>
          <a href="http://admin.csc86.com/login/index.html" >退出</a>
        </Menu.Item>
      </Menu>
    );
    const WrappedEffectFrom = Form.create()(EffectFrom);
    const { visible } = this.state;

    return (
      <div className="topwidget">
        <div className="toplf">
          <div className="icft20 "><Icon type="menu-fold" className="anticon anticon-menu-fold" onClick={() => this.props.onTransform()} /></div>
          <div className="icft20 "><Icon type="calculator" className="anticon anticon-menu-fold" /></div>
          <div className="icft20 cur"><Icon type="message" className="anticon anticon-message " />
            <div className="ico">5</div>
          </div>
        </div>

        <div className="topgt">
          <div className="crm-flrt pd-r20 top_user">
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                {this.state.userInfo.realName} <Icon type="down" />
              </a>
            </Dropdown>
          </div>

          <div className="crm-flrt pd-r20 top_user">
            <img src={this.state.userInfo.userPhoto} height="40" width="40" />
          </div>
          <section className="code-box-demo crm-wh300 crm-flrt pd-r20">
            <span className="ant-input-search ant-input-affix-wrapper ">
              <input type="text" placeholder="搜索" className="ant-input" />
              <span className="ant-input-suffix">
                <i className="anticon anticon-search ant-input-search-icon" ></i>
              </span>
            </span>
          </section>

          <div className="curs">
          </div>

        </div>
        <Modal className='topwidget-modal' title='修改密码' visible={visible} onCancel={this.handleCancel} footer={null} >
          <WrappedEffectFrom onSubmit={this.handleSubmit} />
        </Modal >
      </div>
    );
  }
}
export default TopWidget