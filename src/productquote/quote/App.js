import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import QuoteFrom from './components/QuoteFrom';
import QuoteFrom2 from './components/QuoteFrom2';

import {Form, Select, Input, Button, Table, Modal, Progress,Row,Col } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

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
		const QuoteFromWarp = Form.create()(QuoteFrom);
		const QuoteFromWarp2= Form.create()(QuoteFrom2);
		return (
			<div className="main">
				<h3 className="page-title">全部产品报价</h3>
				
				<div className="tabel-wrap">
					<QuoteFromWarp />
				</div>
				<div className="tabel-wrap">
					<QuoteFromWarp2 />
				</div>
			</div>
		);
	}
}

export default App