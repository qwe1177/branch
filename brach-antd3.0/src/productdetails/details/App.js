import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
//import UploadFrom from './components/UploadFrom';
import DetailsFrom from './components/DetailsFrom';
//import DetailsFrom2 from './components/DetailsFrom2';

import {Form, Select, Input, Button, Table, Modal, Progress,Row,Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class App extends Component {
	render() {
		//const UploadFromWarp = Form.create()(UploadFrom);
		const DetailsFromWarp = Form.create()(DetailsFrom);
		// const DetailsFromWarp2= Form.create()(DetailsFrom2);
		return (
			<div>
				<h3 className="page-title">报价单详情</h3>
				<div className="tabel-wrap">
					<DetailsFromWarp />
				</div>
				{/* <div className="tabel-wrap">
					<DetailsFromWarp2 />
				</div> */}
			</div>
		);
	}
}


export default App
