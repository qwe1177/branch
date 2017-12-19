import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';
import TableCard from '../components/TableCard';
import ListCard from '../components/ListCard';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getOperateData,getCurrentData,getFieldData} from '../../../components/common/power/redux';


@connect(
	state => ({ power: state.power }),
	dispatch => bindActionCreators({ getOperateData,getCurrentData,getFieldData}, dispatch)
)

class App extends Component {
	componentWillMount() {
		this.props.getOperateData();/**操作权限 */
		this.props.getCurrentData();/**数据权限 */
		this.props.getFieldData();/**字段权限 */
	}
	render() {
		return (
			<div className='home-page'>
				<h3 className="page-title">我的桌面</h3>
				<div className='page-main'>
					<div className="top-wrap clearfix">
						<div className='card-item'>
							<Card1/>
						</div>
						<div className='card-item'>
							<Card2/>
						</div>
						<div className='card-item'>
							<Card3 />
						</div>
					</div>
					<div className="bottom-wrap clearfix">
						<div className='list-item'>
							<ListCard />
						</div>
						<div className='list-item'>
							<TableCard />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App
