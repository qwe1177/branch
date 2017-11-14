import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../../public/css/layout.css';
import './App.css';
import vueAxios from 'axios';
import QueryFrom from '../components/QueryFrom';
import MainTable from '../components/MainTable';
import Leftwidget from '../../../components/leftwidget';
import TopWidget from '../../../components/topwidget';
import TopTab from '../../../components/toptab';
import { Form,Button } from 'antd';

class App extends Component {
	state = {
		isExpand:true
	}
	handleExpandOrCollapse =()=>{
		var {isExpand} = this.state;
		var to = !isExpand;
		this.setState({isExpand:to});
	}
	handleChangeMainCheck=(o)=>{
		console.log(o);
		console.log(o);
	}
	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);
		const {isExpand} = this.state;
		const mainClassName =isExpand?'crm_inx':'crm_inx collapse';
		return (
			<div className={mainClassName}>
				<div className="g-fl lfwh"><Leftwidget /></div>
				<div className="g-fl rgwh">
					<div><TopWidget onTransform={this.handleExpandOrCollapse} /></div>
					<div><TopTab /></div>
					<div className="main">
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
					
					</div>
				</div>
			</div>
		);
	}
}

export default App
