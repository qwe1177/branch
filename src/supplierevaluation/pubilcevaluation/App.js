import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import EvalFrom from './components/EvalFrom';
import EvalFrom2 from './components/EvalFrom2';
import EvalFrom3 from './components/EvalFrom3';
import {Form, Select, Input, Button, Table, Modal, Progress } from 'antd';
const Option = Select.Option;


const myPagination = {
	showQuickJumper: true,
	showSizeChanger: true,
	total: 1,
	showTotal: total => `共 ${total} 条`
};


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true, //弹层数据加载
			modalvisible:true,//弹层显示隐藏
			selectedRows:[] //
		};
	}
	componentDidMount() {
		var _this = this;
		
	}
	handlemodalOk = () => {
		this.setState({ modalvisible: false });
	}
	handlemodalCancel = () => {
		this.setState({ modalvisible: false });
	}
	onMyRowClick =(record, index, event) =>{
		this.setState({ modalvisible: true });
	}
	render() {
		
		const onMyRowClick  = this.onMyRowClick;
		const {loading,modalvisible } = this.state;
		const WrappedEvalFrom = Form.create()(EvalFrom);
		const WrappedEvalFrom2 = Form.create()(EvalFrom2);
		const WrappedEvalFrom3 = Form.create()(EvalFrom3);
		return (
			<div className="main">
				<h3 className="page-title">供应商评分设置</h3>
				
				<div className="query-wrap ">
					<div className="tit">信用评级总分=加分项-减分项</div>
					<div className="gyspjktit">
						<ul>
						<li>供应商信用评级</li>
						<li className="ls">
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
						</li>
						<li className="ls">
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
						</li>
						<li className="ls">
						<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
						</li>
						<li className="ls">
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							</li>
						<li className="ls">
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
							<img src={require('./img/iconzs-1.png')} />
						</li>
						<li>信用评分</li>
						<li className="ls">85分以上</li>
						<li className="ls">75分以上</li>
						<li className="ls">65分以上</li>
						<li className="ls">55分以上</li>
						<li className="ls">45分以上</li>
						</ul>
					</div>
				</div>

				<div className="tabel-wrap">
					{<WrappedEvalFrom />}
				</div> 

				<div className="tabel-wrap">
					{<WrappedEvalFrom2 />}
				</div> 

				<div className="tabel-wrap">
					{<WrappedEvalFrom3 />}
				</div> 

				
			</div>
		);
	}
}

export default App
