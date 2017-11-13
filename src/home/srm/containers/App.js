import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';



class App extends Component {
	render() {
		return (
			<div>
				<h3 className="page-title">我的桌面</h3>
				<div className='page-main'>
					<div className="top-wrap clearfix">
						<div className='card-item'>
							<div>
								线索总览
							</div>
						</div>
						<div className='card-item'>
							<div>
								供应商总览
							</div>
						</div>
						<div className='card-item'>
							<div>
								询报价总览
							</div></div>
					</div>
					<div className="bottom-wrap clearfix">
						<div className='list-item'><div>
							待办任务
							</div></div>
						<div className='list-item'><div>
							待跟进客户
							</div></div>
					</div>
				</div>
			</div>
		);
	}
}

export default App
