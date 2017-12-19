import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../../public/css/layout.css';
import './App.css';
import QueryFrom from '../components/QueryFrom';
import MainList from '../components/MainList';
import AddModal from '../components/AddModal'
import { Form,Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doQueryFollow } from '../actions/index.js';

@connect(
    state => ({ MyFollowUP: state.MyFollowUP }),
    dispatch => bindActionCreators({doQueryFollow}, dispatch)
)
class App extends Component {
	constructor(props) {
        super(props);
    }
    componentWillMount() {
		var queryParams =  this.props.MyFollowUP;
        queryParams = _.pick(queryParams,['query','pagination']);
		this.props.doQueryFollow(queryParams)
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
							<MainList/>
						</div>
					</div>
					<div className="statistics">
						<AddModal/>
						<div className="statistics-text">跟进统计</div>
					</div>  
				</div>
			</div>
		);
	}
}

export default App
