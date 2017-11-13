import React, { Component } from 'react';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import './App.css';
import QueryFrom from './components/QueryFrom';
import MainCard from './components/MainCard'
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
				<h3 className="page-title">我的跟进</h3>
        <div className="content">
          <div className="left-content">
            <div className="query-wrap">
                <WrappedQueryFrom />
              </div>

              <div className="card-wrap">
                <MainCard/>
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
