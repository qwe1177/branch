import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import './App.css';
import QueryFrom from './components/QueryFrom';
import MainTable from './components/MainTable';

import { Form,Button } from 'antd';



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
		var _this = this;

	}
	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);
		return (
			<div className="main">
				<h3 className="page-title">待跟进</h3>
				<div className="content">
				<div className="left-content">
					<div className="query-wrap">
						<WrappedQueryFrom />
					</div>
					<div className="tabel-wrap">
						<MainTable />
					</div>
				</div>
				<div className="statistics">
					<div>
						<Button size="large" type="primary" style={{ width: 236 }}>添加跟进</Button>
					</div>
				</div>  
				</div>
			</div>
		);
	}
}

export default App
