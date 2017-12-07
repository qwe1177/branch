import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import QueryFrom from '../components/QueryFrom';
import MainTable from '../components/MainTable';

import { Form } from 'antd';



class App extends Component {

	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);
		return (
			<div>
				<h3 className="page-title">我的供应商</h3>
				<div className='page-main'>
					<div className="query-wrap">
						<WrappedQueryFrom />
					</div>
					<div className="tabel-wrap">
						<MainTable />
					</div>
				</div>
			</div>

		);
	}
}

export default App
