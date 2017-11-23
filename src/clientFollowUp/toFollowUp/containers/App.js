import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../../public/css/layout.css';
import './App.css';
import vueAxios from 'axios';
import QueryFrom from '../components/QueryFrom';
import MainTable from '../components/MainTable';
import PersonSelector from '../../../components/business/personselector';
import { Form,Button } from 'antd';

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
			<div >
				<h3 className="page-title">跟进计划</h3>
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
				<PersonSelector onChoosed={this.handleChoosed} title={'分配负责人'} visible={this.state.personSelectorVisible} />
				
			</div>
		);
	}
}

export default App
