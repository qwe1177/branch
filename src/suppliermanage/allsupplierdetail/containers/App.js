import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import { Button } from 'antd';


import PersonSelector from '../../../components/business/personselector';
import CompanyShower from '../../../components/business/companyshower';
import FollowUpShower from '../../../components/business/followupshower';
import PersonListshower from '../../../components/business/personlistshower';
import CompanyBaseShower from '../../../components/business/companybaseshower';
import PlatformComponent from '../../../components/common/PlatformComponent';



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { doInit, doChangeExtend, doReceiveData } from '../../../components/business/companyshower/redux';


@connect(
	state => ({ companyShower: state.companyShower })
	// dispatch => bindActionCreators({ doInit, doChangeExtend, doReceiveData }, dispatch)
)

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isBtnExpand: false,  //按钮组默认收缩
			allbtns: [{ link: 'a', label: '跟进供应商' }, { link: 'a', label: '编辑供应商' },
			{ link: 'a', label: '分配负责人' }, { link: 'a', label: '加入我的客户' }, { link: 'a', label: '并入客户' }, { link: 'a', label: '移入公海' },
			{ link: 'a', label: '修改客户评分' }, { link: 'a', label: '新建客户' }]
		}
	}
	showMoreBtn = () => {
		this.setState({ isBtnExpand: true });
	}
	render() {
		const { isBtnExpand } = this.state;
		const isExpandCompany = this.props.companyShower.isExpand;
		const isExpandClassName = isExpandCompany ? 'page-main clearfix right-extend-limit' : 'page-main clearfix';
		const btnClassName = isBtnExpand ? 'botton-wrap all-btns' : 'botton-wrap default-btns';
		return (
			<div>
				<h3 className="page-title">供应商详情</h3>
				<div className={isExpandClassName} >
					<div className="left-wrap">
						<div className="top-wrap">
							<div className="base-wrap">
								<div className="base-info">
									<CompanyBaseShower />
									<div className="title-2">联系人</div>
									<div className='person-wrap'>
										<PersonListshower requestId={'1'} />
									</div>
								</div>
								<div className={btnClassName}>
									<div className='btns'>
										{this.state.allbtns.map((o, index) => {
											return <Button key={index} type="primary" className='normal'>{o.label}</Button>
										})}

									</div>
									<Button className='more' onClick={() => this.showMoreBtn()}>更多</Button>
								</div>
							</div>
							<div className="chart-wrap"></div>
						</div>
						<div className="bottom-wrap">
							<div className='tab'><span className='active'>跟进记录</span></div>
							<FollowUpShower requestId={'1'} />
						</div>
					</div>
					<div className="right-wrap">
						<div className="link-wrap">
							<Button type="primary" className='normal'>新建供应商线索</Button>
						</div>
						<CompanyShower requestId={'1'} />
					</div>
				</div>
			</div>

		);
	}
}

export default App
