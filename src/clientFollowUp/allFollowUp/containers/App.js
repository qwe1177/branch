import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import '../../../public/css/layout.css';
import vueAxios from 'axios';

import QueryFrom from '../components/QueryFrom';
import MainList from '../components/MainList';
import Department from '../components/department'
import { Form,Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doQueryFollow } from '../actions/index.js';

@connect(
    state => ({ AllFollowUP: state.AllFollowUP }),
    dispatch => bindActionCreators({ doQueryFollow }, dispatch)
)
class App extends Component {
	constructor(props) {
        super(props);
    }
	componentWillMount() {
		var queryParams =  this.props.AllFollowUP;
        queryParams = _.pick(queryParams,['query','pagination']);
		this.props.doQueryFollow(queryParams)
    }
	render() {
		const WrappedQueryFrom = Form.create()(QueryFrom);
		return (
			<div>
						<h3 className="page-title">全部跟进</h3>
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
