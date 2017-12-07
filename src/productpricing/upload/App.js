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
				
				{/* <div className="tabel-wrap g-mt0">
					<UploadFromWarp />
				</div> */}
				<div className="tabel-wrap">
					<UploadFromWarp2 />
				</div>

				{/* <div className="submit">
					<Row style={{'padding':'8px 0px'}}>
						<FormItem>
							<Button style={{padding:'2px 55px'}}
									type="primary"
									htmlType="submit"
							>
								提交
							</Button>
						</FormItem>
					</Row>
				</div> */}

			</div>
		);
	}
}

export default App
