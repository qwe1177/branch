import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import RefuseFrom from '../components/RefuseFrom';
import RefuseFrom2 from '../components/RefuseFrom2';

import { Form } from 'antd';

class App extends Component {
	render() {
		const RefuseWrap = Form.create()(RefuseFrom);
		return (
			<div className='supplierrefuse'>
				<h3 className="page-title">品控拒绝</h3>

				<div className="query-wrap">
					<RefuseWrap />
				</div>
				<div className="tabel-wrap">
					<RefuseFrom2 />
				</div>
			</div>
		);
	}
}

export default App
