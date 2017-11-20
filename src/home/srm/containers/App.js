import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';
import TableCard from '../components/TableCard';
import ListCard from '../components/ListCard';
import axios from 'axios';

import { connect_cas } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';

const mockCard3Data = {
	wode: { count: 534, add: 5, turn: 4 },
	xiashu: { count: 345, add: 5, turn: 4 },
	xunjia: { count: 10},
	chengjiaobishu: { count: 20 },
	chengjiaojine: { count: 209675 }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getOperateData,getCurrentData,getFieldData} from '../../../components/common/power/redux';


@connect(
	state => ({ power: state.power }),
	dispatch => bindActionCreators({ getOperateData,getCurrentData,getFieldData}, dispatch)
)

class App extends Component {
	componentWillMount() {
		// this.queryData();
		var token = getLoginInfo()['token'];  //获取token　登录用
		var urlParams = getUrlParams();
		var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
		this.props.getOperateData(token,moduleId);/**操作权限 */
		this.props.getCurrentData(token,moduleId);/**数据权限 */
		this.props.getFieldData(token,moduleId);/**字段权限 */
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
							<Card3 data={mockCard3Data} />
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
