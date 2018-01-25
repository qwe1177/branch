import React, { Component } from 'react';
import Leftwidget from '../../components/leftwidget';
import TopWidget from '../../components/topwidget';
import TopTab from '../../components/toptab';
import { connect } from 'react-redux';
// import 'antd/dist/antd.css' //引入了antd自动引入了样式，加入后重复引入
import '../../public/css/layout.css';
import PlatformComponent from '../../components/common/PlatformComponent';
import { setLoginInfo } from '../../util/baseTool';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
class App extends PlatformComponent {
	constructor(props, context) {
		super(props, context);
		setLoginInfo();

	}
	componentWillMount() {
		this.getMenuData();
		this.getLoginAcct();
	}
	render() {
		const { isExpand, platformMenu ,loginAcct} = this.state;
		const mainClassName = isExpand ? 'crm_inx' : 'crm_inx collapse2';
		return (
			<LocaleProvider locale={zhCN}>
			<div className={mainClassName}>
				<div className="g-fl lfwh"><Leftwidget data={platformMenu} /></div>
				<div className="g-fl rgwh">
					<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
						<div style={{ width: '100%' }}><TopWidget onTransform={this.handleExpandOrCollapse.bind(this)} data = {loginAcct} /></div>
						<div style={{ width: '100%' }}><TopTab data={platformMenu}  /></div>
						<div className="main">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
			</LocaleProvider>
		);
	}
}


export default App
