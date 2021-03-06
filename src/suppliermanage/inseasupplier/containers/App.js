import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import QueryForm from '../components/QueryForm';
import MainTable from '../components/MainTable';

import { Form } from 'antd';



class App extends Component {

	render() {
		const WrappedQueryForm = Form.create()(QueryForm);
		return (
			<div>
				<h3 className="page-title">公海的供应商</h3>
				<div className='page-main'>
					<div className="query-wrap">
						<WrappedQueryForm />
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
