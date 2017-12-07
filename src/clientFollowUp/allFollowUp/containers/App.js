import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import '../../../public/css/layout.css';
import vueAxios from 'axios';

import QueryFrom from '../components/QueryFrom';
import MainList from '../components/MainList';
import Department from '../components/department'
import { Form,Button } from 'antd';

class App extends Component {

	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);
		return (
			<div>
						<h3 className="page-title">下属的跟进</h3>
						<div className="query-wrap">
								<WrappedQueryFrom />
						</div>
						<div className="content">	
								<div className="statistics">
									<Department/>
								</div>  							
								<div className="card-wrap">
									<MainList/>
								</div>					
						</div>
					</div>
		);
	}
}

export default App
