import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import { Button, Spin, message } from 'antd';
import { getUrlParams,getOneUrlParams, getLoginAccount } from '../../../util/baseTool';

import MergeSuppliers from '../../../components/business/mergesuppliers/index';
import PersonSelector from '../../../components/business/personselector';
import CompanyShower from '../../../components/business/companyshower';
import FollowUpShower from '../../../components/business/followupshower';
import PersonListshower from '../../../components/business/personlistshower';
import CompanyBaseShower from '../../../components/business/companybaseshower';
import PlatformComponent from '../../../components/common/PlatformComponent';
import PublicModal from '../../../components/publicFollowUp'

import { fetchToHighSea,fetchSetContacts  } from '../../../components/common/publicrequest/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMainData,doChangeChargeMen} from '../../../components/common/supplierdetails/redux';
import {doFormAdd} from '../../../components/publicFollowUp/redux'
import {doQueryFollow} from '../../../components/business/followupshower/redux'

@connect(
	state => ({ supplierDetailMain: state.supplierDetailMain ,EditModal: state.EditModal,followupShower: state.followupShower}),
	dispatch => bindActionCreators({ fetchMainData,doChangeChargeMen,doFormAdd,doQueryFollow }, dispatch)
)

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isBtnExpand: false,  //按钮组默认收缩
			personSelectorVisible: false, //打开和关闭选择人组件
			mergeSuppliersVisible:false  //打开合并供应商入口
		}
        this.supplierId = getOneUrlParams('supplierId');
	}
	componentWillMount() {
		this.props.fetchMainData(this.supplierId);
	}
	handleOpenChoose = () => {
		this.setState({ personSelectorVisible: true });
	}
	handleChoosed = (ids, labels, actionInfo) => {
		this.setState({ personSelectorVisible: false });
		var supplierIds = this.supplierId;
		var responsibleSources = this.props.supplierDetailMain.data.supplier.userId;
		fetchSetContacts(supplierIds ,ids,labels,responsibleSources).then((res)=>{
		  if(res.data.code=='1'){
			message.success('分配负责人操作成功!');
			window.opener&&window.opener.location.reload()
			setTimeout(()=>{location.href=document.referrer;},1000)
		  }else{
			message.error('分配负责人操作失败!');
		  }
		}).catch((e)=>{
		  message.error('分配负责人操作失败!');
		})
	}
	handleFetchToHighSea = () => {
		var supplierId = this.supplierId;
		fetchToHighSea(supplierId).then((res) => {
			if (res.data.code == '1') {
				message.success('移入公海成功!');
				window.opener&&window.opener.location.reload()
				setTimeout(()=>{location.href=document.referrer;},1000)
			} else {
				message.error('移入公海失败!');
			}
		}).catch((e) => {
			message.error('移入公海失败!');
		})
	}
	handleAddToMe =()=>{
		var account =  getLoginAccount();
		  fetchSetContacts(this.supplierId ,account.userId,account.realName,'0').then((res)=>{
			if(res.data.code=='1'){
			  message.success('加入我的客户成功!');
			  window.opener&&window.opener.location.reload()
			  setTimeout(()=>{location.href=document.referrer;},1000)
			}else{
			  message.error('加入我的客户失败!');
			}
		  }).catch((e)=>{
			message.error('加入我的客户失败!');
		  })
	}
	showMoreBtn = () => {
		this.setState({ isBtnExpand: true });
	}
	turnToMidify =()=>{
		var supplierId = this.supplierId;
		var urlParams = getUrlParams();
		var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
		var systemId = urlParams['systemId']?urlParams['systemId']:'';
		location.href='/suppliermanage/modifysupplier/?supplierId='+supplierId+'&moduleId='+moduleId+'&systemId='+systemId;
	}
	handleMerged =(isSuccess)=>{
		this.setState({mergeSuppliersVisible:false});
		if(isSuccess){
			message.success('合并成功!');
		}else{
			message.error('合并失败!');
		}
	}
	handlePersonCancel =() =>{
		this.setState({ personSelectorVisible: false});
	}
	openMergedWidget =() =>{
		this.setState({mergeSuppliersVisible:true});
	}
	handleCancel =() =>{
		this.setState({mergeSuppliersVisible:false});
	}
	    
	addShowModal = (supplierId,companyName) => {
		this.props.doFormAdd({companyName,supplierId,followupType:2,modalType:'1'});
      }
	handleAddSuccess =()=>{
		var {query,pagination} = this.props.followupShower;
		this.props.doQueryFollow({query,pagination});
	}
	handleTurnToNewClue =()=>{
		location.href='/newClue/';
	}
	render() {
		var supplierId = this.supplierId;
		const { isBtnExpand } = this.state;
		const isExpandCompany = this.props.supplierDetailMain.isExpand;
		const isExpandClassName = isExpandCompany ? 'page-main clearfix right-extend-limit' : 'page-main clearfix';
		const btnClassName = isBtnExpand ? 'botton-wrap all-btns' : 'botton-wrap default-btns';
		const companyName = this.props.supplierDetailMain.data.companyName?this.props.supplierDetailMain.data.companyName:'';

		return (
			<div>
				<h3 className="page-title">供应商详情</h3>
				<div className={isExpandClassName} >
					<div className="left-wrap">
						<div className="top-wrap">
							<div className="base-wrap">
								<div className="base-info">
									<Spin spinning={this.props.supplierDetailMain.isfetching}>
										<CompanyBaseShower />
									</Spin>
									<div className='person-wrap'>
										<PersonListshower />
									</div>
								</div>
								<div className={btnClassName}>
									<div className='btns'>
										{/* 并入供应商有否有这个按钮需要在下一期中设置操作权限控制 */}
										<Button type="primary" className='normal' onClick={this.openMergedWidget}>并入供应商</Button>
										<Button type="primary" className='normal'  onClick={() => this.addShowModal(this.supplierId,companyName)}>跟进供应商</Button>
										<Button type="primary" className='normal' onClick={this.turnToMidify} >编辑供应商</Button>
										<Button type="primary" className='normal' onClick={this.handleOpenChoose}>分配负责人</Button>
										<Button type="primary" className='normal' onClick={this.handleAddToMe}>加入我的客户</Button>
										{/* <Button type="primary" className='normal'>供应商评分</Button>*/}
									</div>
									<Button className='more' onClick={() => this.showMoreBtn()}>更多</Button>
									<PersonSelector onChoosed={this.handleChoosed.bind(this)} title={'分配负责人'} visible={this.state.personSelectorVisible}
									onCancel ={this.handlePersonCancel.bind(this)}  />
									<MergeSuppliers onComfirm={this.handleMerged.bind(this)} 
									onCancel ={this.handleCancel.bind(this)} 
									supplierId={supplierId} 
									companyName={companyName}
									visible={this.state.mergeSuppliersVisible} />
									<PublicModal  onSuccess={this.handleAddSuccess.bind(this)}/>
								</div>
							</div>
							<div className="chart-wrap"></div>
						</div>
						<div className="bottom-wrap">
							<div className='tab'><span className='active'>跟进记录</span></div>
							<FollowUpShower />
						</div>
					</div>
					<div className="right-wrap">
						<div className="link-wrap">
							<Button type="primary" className='normal' onClick={this.handleTurnToNewClue}>新建供应商线索</Button>
						</div>
						<Spin spinning={this.props.supplierDetailMain.isfetching}>
							<CompanyShower isClueView={false}  />
						</Spin>
					</div>
				</div>
			</div>

		);
	}
}

export default App
