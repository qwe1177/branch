import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import QueryForm from '../components/QueryForm';
import MainTable from '../components/MainTable';

import { Form } from 'antd';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOperateData} from '../../../components/common/power/redux';

@connect(
	state =>  ({power:state.power }),
	dispatch => bindActionCreators({getOperateData}, dispatch)
  )
  

class App extends Component {
	componentWillMount(){
		this.props.getOperateData();
	}
	render() {
		const WrappedQueryForm = Form.create()(QueryForm);
		return (
			<div>
				<h3 className="page-title">全部供应商</h3>
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
