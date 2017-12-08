import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
//import UploadFrom from './components/UploadFrom';
import UploadFrom2 from './components/UploadFrom2';

import {Form, Select, Input, Button, Table, Modal, Progress,Row,Col } from 'antd';
const FormItem = Form.Item;
class App extends Component {
	render() {
		//const UploadFromWarp = Form.create()(UploadFrom);
		const UploadFromWarp2= Form.create()(UploadFrom2);
		return (
			<div>
				<h3 className="page-title">上传产品报价</h3>
				<div className="tabel-wrap">
					<UploadFromWarp2 />
				</div>
			</div>
		);
	}
}

export default App
