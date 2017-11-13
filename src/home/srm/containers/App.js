import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import Card1 from  '../components/Card1';

const mockCard1Data ={
	wode:{count:2411935,add:5,turn:4},
	xiashu:{count:2411935,add:5,turn:4},
	gonghai:{count:2411935,add:5,turn:4},
	quanbu:{count:2411935,add:5,turn:4}
}


class App extends Component {
	render() {
		return (
			<div className='home-page'>
				<h3 className="page-title">我的桌面</h3>
				<div className='page-main'>
					<div className="top-wrap clearfix">
						<div className='card-item'>
							<Card1 data={mockCard1Data} />
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
