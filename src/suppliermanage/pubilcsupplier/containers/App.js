import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import QueryFrom from '../components/QueryFrom';
import MainTable from '../components/MainTable';
import PersonSelector from '../../../components/business/personselector';

import { Form } from 'antd';



class App extends Component {
	state = { personSelectorVisible: false }
	handleOpenChoose = () => {
		this.setState({ personSelectorVisible: true });
	}
	handleChoosed = (checkedList) => {
		console.log('选择的人');
		console.log(checkedList);
	}
	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);

		return (

			<div>
				<h3 className="page-title">全部供应商</h3>
				<div className='page-main'>
					<div className="query-wrap">
						<WrappedQueryFrom />
					</div>
					<div className="tabel-wrap">
						<MainTable onChoose={this.handleOpenChoose.bind(this)} />
					</div>
				</div>
				<PersonSelector onChoosed={this.handleChoosed} title={'分配负责人'} visible={this.state.personSelectorVisible} />
			</div>

		);
	}
}

export default App
