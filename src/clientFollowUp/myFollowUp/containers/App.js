import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import '../../../public/css/layout.css';
import vueAxios from 'axios';

import QueryFrom from '../components/QueryFrom';
import MainList from '../components/MainList';
import FollowUpCount from '../components/followUpCount'
import Leftwidget from '../../../components/leftwidget';
import TopWidget from '../../../components/topwidget';
import TopTab from '../../../components/toptab';
import { Form,Button } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doFirstQueryFollow, doQueryFollow ,doEditFollowInfo} from '../actions/index.js';

@connect(
    state => ({ myFollowUp: state.myFollowUp }),
    dispatch => bindActionCreators({ doFirstQueryFollow, doQueryFollow,doEditFollowInfo }, dispatch)
)
class App extends Component {
	static propTypes = { //声明prop中属性变量
		
			}
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	state = {
		isExpand:true
	}
	componentDidMount() {
		this.props.doFirstQueryFollow();

	}
	handleExpandOrCollapse =()=>{
		var {isExpand} = this.state;
		var to = !isExpand;
		this.setState({isExpand:to});
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
							<FollowUpCount/>
						</div>  
						</div>
				</div>
				</div>
			</div>
		);
	}
}

export default App
