import React, { Component } from 'react';
import Leftwidget from '../../components/leftwidget';
import TopWidget from '../../components/topwidget';
import TopTab from '../../components/toptab';
import { connect } from 'react-redux';
//import './App.css';
import '../../public/css/layout.css';
import PlatformComponent from '../../components/common/PlatformComponent';

// @connect(
// 	state => ({ companyShower: state.companyShower, }),
// )

class App extends PlatformComponent {
	constructor(props,context) {
		super(props,context);
		// var extendState = {
		// 	isBtnExpand:false,  //按钮组默认收缩
		// 	allbtns:[{link:'a',label:'跟进供应商'},{link:'a',label:'编辑供应商'},
		// 		{link:'a',label:'分配负责人'},{link:'a',label:'加入我的客户'},{link:'a',label:'并入客户'},{link:'a',label:'移入公海'},
		// 		{link:'a',label:'修改客户评分'},{link:'a',label:'新建客户'}]
		// }
		// //如果要附加其他的state使用这个,附加选择人的组件的显示状态
		// this.state=Object.assign(this.state,extendState);
		this.setLoginInfo();

	}
	componentWillMount(){
		this.getMenuData();
	}


	render() {
		const { isExpand,platformMenu} = this.state;
		const mainClassName = isExpand ? 'crm_inx' : 'crm_inx collapse';
		// const isExpandCompany = this.props.companyShower.isExpand;
		// const isExpandClassName = isExpandCompany ? 'page-main clearfix right-extend-limit' : 'page-main clearfix';
		// const btnClassName =  isBtnExpand?'botton-wrap all-btns':'botton-wrap default-btns';

		return (
			<div className={mainClassName}>
				<div className="g-fl lfwh"><Leftwidget data={platformMenu} /></div>
				<div className="g-fl rgwh">
					<div style={{height:'100%',display:'flex',flexDirection:'column'}}>
					<div style={{width:'100%'}}><TopWidget onTransform={this.handleExpandOrCollapse.bind(this)} /></div>
					<div style={{width:'100%'}}><TopTab data={platformMenu} /></div>
					<div className="main">
						{this.props.children}
					</div>
					</div>
				</div>
			</div>
		);
	}
}


export default App
