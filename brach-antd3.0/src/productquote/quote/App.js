import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import QuoteFrom from './components/QuoteFrom';

import {Form, Select, Input, Button, Table, Modal, Progress,Row,Col } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	render() {
		const QuoteFromWarp = Form.create()(QuoteFrom);
		return (
			<div>
				<h3 className="page-title">全部产品报价</h3>
				<div className="tabel-wrap">
					<QuoteFromWarp />
				</div>
			</div>
		);
	}
}

export default App
