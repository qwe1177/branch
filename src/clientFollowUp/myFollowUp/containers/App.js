import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import '../../../public/css/layout.css';
import vueAxios from 'axios';

import QueryFrom from '../components/QueryFrom';
import MainList from '../components/MainList';

import AddModal from '../components/AddModal'
import { Form,Button } from 'antd';
class App extends Component {
	static propTypes = { //声明prop中属性变量
		
			}
	constructor(props) {
		super(props);
		this.state = {
			type:1,
		};
	}
 typehandle=(value)=>{
	 if(value){
		 this.setState({type:1,})
	 }else{
		 this.setState({type:2,})
	 }
 }
	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);
		return (
			<div>
				<h3 className="page-title">我的跟进</h3>
				<div className="content">
					<div className="left-content">
						<div className="query-wrap">
							<WrappedQueryFrom />
						</div>
						<div className="card-wrap">
							<MainList type={this.state.type} typehandle={this.typehandle}/>
						</div>
					</div>
					<div className="statistics">
						<AddModal type={this.state.type} typehandle={this.typehandle}/>
					</div>  
				</div>
			</div>
		);
	}
}

export default App
