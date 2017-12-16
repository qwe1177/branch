import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../../public/css/layout.css';
import './App.css';
import vueAxios from 'axios';
import QueryFrom from '../components/QueryFrom';
import MainTable from '../components/MainTable';
import { Form } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {queryTableData} from '../actions';

@connect(
  state =>  ({mainQueryData: state.mainQueryData,mainTableData:state.mainTableData}),
  dispatch => bindActionCreators({queryTableData}, dispatch)
)
class App extends Component {
	constructor(props) {
        super(props);
    }
    componentWillMount() {
        let {pagination} = this.props.mainTableData;
		let {queryform} =  this.props.mainQueryData;
		this.props.queryTableData({queryform:queryform,pagination:pagination})
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
							跟进统计
						</div>
					</div>  
				</div>
			</div>
		);
	}
}

export default App
