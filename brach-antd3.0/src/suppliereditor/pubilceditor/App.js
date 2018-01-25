import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import EvalFrom from './components/EvalFrom';
import EvalFrom2 from './components/EvalFrom2';
import EvalFrom3 from './components/EvalFrom3';
import EvalFrom4 from './components/EvalFrom4';

import {Form, Select, Input, Button, Table, Modal, Progress } from 'antd';
const Option = Select.Option;


const myPagination = {
	showQuickJumper: true,
	showSizeChanger: true,
	total: 1,
	showTotal: total => `共 ${total} 条`
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true, //弹层数据加载
			modalvisible:true,//弹层显示隐藏
			selectedRows:[] //
		};
	}
	componentDidMount() {
		var _this = this;
		
	}
	handlemodalOk = () => {
		this.setState({ modalvisible: false });
	}
	handlemodalCancel = () => {
		this.setState({ modalvisible: false });
	}
	onMyRowClick =(record, index, event) =>{
		this.setState({ modalvisible: true });
	}
	render() {
		
		const onMyRowClick  = this.onMyRowClick;
		const {loading,modalvisible } = this.state;
		const WrappedEvalFrom = Form.create()(EvalFrom);
		const WrappedEvalFrom2= Form.create()(EvalFrom2);
		const WrappedEvalFrom3= Form.create()(EvalFrom3);
		const WrappedEvalFrom4= Form.create()(EvalFrom4);
		return (
			<div className="main">
				<h3 className="page-title">供应商评分编辑</h3>
				
				<div className="query-wrap oflowen">
					<div className="g-fl">
					<Progress type="circle" percent={85} format={percent => `${percent} 分`} />
					</div>
					<div className="evalscore g-fl">
						综合评级：<img src={require('./img/icon-1.png')} /><img src={require('./img/icon-1.png')} /><img src={require('./img/icon-1.png')} /><img src={require('./img/icon-1.png')} /><img src={require('./img/noticon-1.png')} />
					</div>
					
				</div>

				<div className="tabel-wrap">
					{<WrappedEvalFrom />}
				</div> 

				<div className="tabel-wrap">
					{<WrappedEvalFrom2 />}
				</div> 
				<div className="tabel-wrap">
					{<WrappedEvalFrom3 />}
				</div> 
				<div className="tabel-wrap">
					{<WrappedEvalFrom4 />}
				</div>
			</div>
		);
	}
}

export default App
