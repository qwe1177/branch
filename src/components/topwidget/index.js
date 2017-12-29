import React from 'react'
import './layout.css';
import {Menu, Dropdown, Icon, Form, Modal, message,Button} from 'antd';
import 'antd/dist/antd.css';
import {connect_cas} from '../../util/connectConfig';
import {getLoginInfo, setLoginInfo} from '../../util/baseTool';
import axios from 'axios';
import EffectFrom from './EffectFrom';

class TopWidget extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        visible: false
    }
    handleCancel = () => {
        this.setState({visible: false});
    }
    handleSubmit = () => {
        this.setState({visible: false});
    }
    preUpdatePwd = () => {
        this.setState({visible: true});
    }
    stop = (e)=> {
        message.error('此功能暂未开放');
        e.preventDefault();
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key='updatepwd'>
                    <a href="javascript:;" onClick={(e) => this.preUpdatePwd()}>修改密码</a>
                </Menu.Item>
                <Menu.Item key='loginout'>
                    <a href="http://admin.csc86.com/login/index.html">退出</a>
                </Menu.Item>
            </Menu>
        );
        const WrappedEffectFrom = Form.create()(EffectFrom);
        const {visible} = this.state;
        const loginAcct = this.props.data;
        const realName = loginAcct.realName ? loginAcct.realName : '默认用户';

        return (
            <div className="topwidget">
                <div className="toplf">
                    <div className="icft20 "><Icon title="收缩" type="menu-fold" className="anticon anticon-menu-fold"
                                                   onClick={() => this.props.onTransform()}/></div>
                    <div className="icft20 "><Icon title="此功能暂未开放" type="calculator"
                                                   className="anticon anticon-menu-fold"/></div>
                    <div className="icft20 cur"><Icon title="此功能暂未开放" type="message"
                                                      className="anticon anticon-message "/>
                        <div className="ico">5</div>
                    </div>
                </div>

                <div className="topgt">
                    <div className="crm-flrt pd-r20 top_user">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                {realName} <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>

                    <div className="crm-flrt pd-r20 top_user">
                        <img src={require('./img/an13.jpg')} height="40" width="40"/>
                    </div>

                        <section className="code-box-demo crm-wh300 crm-flrt pd-r20">
            <span className="ant-input-search ant-input-affix-wrapper ">
                <Form onSubmit={this.stop}>
              <input type="text" placeholder="搜索" className="ant-input"/>
              <span className="ant-input-suffix">
                {/*<i className="anticon anticon-search ant-input-search-icon"></i>*/}
                  <Button htmlType="submit"  icon="search"  style={{border:'none', background:'none',fontSize:'14px',padding:'0px'}}/>
              </span>
                     </Form>
            </span>
                        </section>

                    <div className="curs">
                    </div>

                </div>
                <Modal className='topwidget-modal' title='修改密码' visible={visible} onCancel={this.handleCancel}
                       footer={null}>
                    <WrappedEffectFrom onSubmit={this.handleSubmit}/>
                </Modal >
            </div>
        );
    }
}
export default TopWidget