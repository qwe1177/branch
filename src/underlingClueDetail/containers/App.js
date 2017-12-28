import React, {Component} from 'react';
import './App.css';
import axios from '../../util/axios'
import * as config  from '../../util/connectConfig'
import 'antd/dist/antd.css';
import {Button, Spin, message, Icon, Modal, Form, Col, Row} from 'antd';
import {getUrlParams, getOneUrlParams, getLoginAccount} from '../../util/baseTool';

import MergeSuppliers from '../../components/business/mergesuppliers/index';
import PersonSelector from '../../components/business/personselector';
import CompanyShower from '../../components/business/companyshower';
import FollowUpShower from '../../components/business/followupshower/index2';
import PersonListshower from '../../components/business/personlistshower/index2';
import CompanyBaseShower from '../../components/business/companybaseshower/index2';
import PlatformComponent from '../../components/common/PlatformComponent';
import PublicModal from '../../components/publicFollowUp'

import EffectFrom from '../../components/business/companybaseshower/EffectFrom2'

import {fetchToHighSea, fetchSetContacts} from '../../components/common/publicrequest/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    fetchMainData,
    fetchMainData2,
    doChangeChargeMen,
    toOpenUpdateXSJB,
    toCloseUpdateXSJB,
    QXPK,
    QRTJ,
    QXADDMY,
    QRADDMY,
    PKreset,
    QRYRGH,
    QXYRGH,
    QRADDMYHANDLE
} from '../../components/common/supplierdetails/redux';
import {doFormAdd} from '../../components/publicFollowUp/redux'
import {doQueryFollow} from '../../components/business/followupshower/redux'

@connect(
    state => ({
        supplierDetailMain: state.supplierDetailMain,
        EditModal: state.EditModal,
        followupShower: state.followupShower,
        editXSJBVisible: state.editXSJBVisible
    }),
    dispatch => bindActionCreators({
        fetchMainData,
        fetchMainData2,
        doChangeChargeMen,
        doFormAdd,
        doQueryFollow,
        toOpenUpdateXSJB,
        toCloseUpdateXSJB,
        QXPK,
        QRTJ,
        QXADDMY,
        QRADDMY,
        PKreset,
        QRADDMYHANDLE,
        QRYRGH,
        QXYRGH,
    }, dispatch)
)

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isBtnExpand: false,  //按钮组默认收缩
            personSelectorVisible: false, //打开和关闭选择人组件
            mergeSuppliersVisible: false  //打开合并供应商入口
        }
        this.supplierId = getOneUrlParams('supplierId');
    }

    componentWillMount() {
        this.props.fetchMainData2(this.supplierId);
    }

    handleOpenChoose = () => {
        this.setState({personSelectorVisible: true});
    }
    handleChoosed = (ids, labels, actionInfo) => {
        this.setState({personSelectorVisible: false});
        var supplierIds = this.supplierId;
        var responsibleSources = this.props.supplierDetailMain.data.supplier.userId;
        fetchSetContacts(supplierIds, ids, labels, responsibleSources).then((res)=> {
            if (res.data.code == '1') {
                message.success('分配负责人操作成功!');
                this.props.doChangeChargeMen(); //分配成功后不显示分配负责人按钮
            } else {
                message.error('分配负责人操作失败!');
            }
        }).catch((e)=> {
            message.error('分配负责人操作失败!');
        })
    }

    pkmodal = ()=> {
        this.props.QRTJ();
    }
    qxpkhandle = ()=> {
        this.props.QXPK();
    }
    qrtjhandle = ()=> {

        const supplierId = this.props.supplierDetailMain.data.supplierId;
        const responsibleSources = this.props.supplierDetailMain.data.supplier.userId;
        axios.get(`${config.connect_srm}/clue/editCancelQualityControl.do`, {
            params: {
                supplierId: supplierId,
                responsibleSources: responsibleSources,
                responsibleUserId: getLoginAccount()['userId'],
                responsiblRealName: getLoginAccount()['realName'],
            }
        }).then(response => {
            if (response.status == 200) {
                if (response.data.code == 1) {
                    message.success(`${response.data.msg}`);
                    this.props.QXPK();
                    this.props.PKreset();
                } else {
                    message.error(`${response.data.msg}`);
                }
            } else {
                message.error(`${response.data.msg}`);
            }
        }).catch(e=> {
            console.log(e);
        })
    }
    ADDMYmodal = ()=> {
        this.props.QRADDMY();
    }
    qxADDMYhandle = ()=> {
        this.props.QXADDMY();
    }
    QRYRGHhandle = ()=> {
        var supplierId = this.supplierId;
        fetchToHighSea(supplierId).then((res) => {
            if (res.data.code == '1') {
                message.success('移入公海成功!');
                this.props.QXYRGH();
                window.opener && window.opener.location.reload()
                setTimeout(()=> {
                    location.href = document.referrer;
                }, 1000)
                //location.href=`/publicClueDetail/?supplierId=${supplierId}`
            } else {
                message.error('移入公海失败!');
            }
        }).catch((e) => {
            message.error('移入公海失败!');
        })
    }
    QXYRGHhandle = ()=> {
        this.props.QXYRGH();
    }

    qrADDMYhandle = ()=> {

        axios.get(`${config.connect_srm}/clue/editPersonLiable.do`, {
            params: {
                supplierId: this.props.supplierDetailMain.data.supplierId,
                responsibleSources: this.props.supplierDetailMain.data.supplier.userId,
                responsibleUserId: getLoginAccount()['userId'],
                responsiblRealName: getLoginAccount()['realName'],
            }
        }).then(response => {
            if (response.status == 200) {
                if (response.data.code == 1) {
                    message.success(`${response.data.msg}`);
                    this.props.QRADDMYHANDLE()
                    window.opener && window.opener.location.reload()
                    setTimeout(()=> {
                        location.href = document.referrer;
                    }, 1000)
                    //setTimeout(()=>{location.href=`/myClueDetail/?supplierId=${this.props.supplierDetailMain.data.supplierId}`},1000)
                } else {
                    message.error(`${response.data.msg}`);
                }
            } else {
                message.error(`${response.data.msg}`);
            }
        }).catch(e=> {
            console.log(e);
        })
    }
    XSJBhandleCancel = ()=> {
        this.props.toCloseUpdateXSJB();
    }
    XSJBhandleOpenModal = () => {
        this.props.toOpenUpdateXSJB();
    }

    handleFetchToHighSea = () => {
        this.props.QRYRGH();
    }
    showMoreBtn = () => {
        this.setState({isBtnExpand: true});
    }
    turnToMidify = ()=> {
        var supplierId = this.supplierId;
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
        location.href = '/suppliermanage/modifysupplier/?supplierId=' + supplierId + '&moduleId=' + moduleId + '&moduleUrl=';
    }
    tourl = (url, type = 1)=>()=> {
        const supplierId = this.supplierId;
        const urlParams = getUrlParams();
        const systemId = urlParams['systemId'] ? urlParams['systemId'] : '';
        const moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
        location.href = type ? `${url}?supplierId=${supplierId}&moduleId=${moduleId}&systemId=${systemId}` : `${url}?moduleId=${moduleId}&systemId=${systemId}`;
    }
    handleMerged = (isSuccess)=> {
        this.setState({mergeSuppliersVisible: false});
        if (isSuccess) {
            message.success('合并成功!');
        } else {
            message.error('合并失败!');
        }
    }
    handlePersonCancel = () => {
        this.setState({personSelectorVisible: false});
    }
    openMergedWidget = () => {
        this.setState({mergeSuppliersVisible: true});
    }
    handleCancel = () => {
        this.setState({mergeSuppliersVisible: false});
    }

    addShowModal = (key, value, type) => {
        this.props.doFormAdd({supplierId: key, companyName: value, followupType: type, modalType: '1'});
    }
    handleAddSuccess = ()=> {
        var {query, pagination} = this.props.followupShower;
        this.props.doQueryFollow({query, pagination});
    }

    render() {
        var supplierId = this.supplierId;
        const {isBtnExpand} = this.state;
        const isExpandCompany = this.props.supplierDetailMain.isExpand;
        const isExpandClassName = isExpandCompany ? 'page-main clearfix right-extend-limit' : 'page-main clearfix';
        const btnClassName = isBtnExpand ? 'botton-wrap all-btns' : 'botton-wrap default-btns';
        const companyName = this.props.supplierDetailMain.data.companyName ? this.props.supplierDetailMain.data.companyName : '';
        let ismy = false;
        let isunderling = false;
        let theHighSeas = false;
        let isother = false;
        switch (this.props.supplierDetailMain.data.self) {
            case 'my':
                ismy = true;
                break;
            case 'underling':
                ismy = true;
                isunderling = true;
                break;
            case 'other':
                isother = true;
                break;
            case 'theHighSeas':
                theHighSeas = true;
                break;

        }

        let ispkval = '';
        switch (this.props.supplierDetailMain.data.qualityControlId) {
            case '0':
            case '4':
                ispkval = <Button type="primary" className='normal' onClick={this.tourl('/qualitycontrol/retosubmit/')}>提交品控</Button>;
                break;
            case '1':
                ispkval = <Button type="primary" className='normal' onClick={this.pkmodal}>取消品控</Button>;
                break;
            case '3':
                ispkval = <Button type="primary" className='normal' onClick={this.tourl('/qualitycontrol/tosubmit/')}>重新提交品控</Button>;
                break;
        }

        const WrappedEffectFrom = Form.create()(EffectFrom);
        const oreidtarr = ['品控驳回', '品控审查中']
        const clueLevel = this.props.supplierDetailMain.data.clueLevel
        const oreidt = ismy && !oreidtarr.some(v=>v == clueLevel)
        const icon = oreidt ? <Icon type="edit" onClick={this.XSJBhandleOpenModal}/> : ''
        return (
            <div>
                <h3 className="page-title">下属线索详情</h3>
                <div className={isExpandClassName}>
                    <div className="left-wrap">
                        <div className="top-wrap">
                            <div className="base-wrap">
                                <div className="base-info">
                                    <Spin spinning={this.props.supplierDetailMain.isfetching}>
                                        <CompanyBaseShower />
                                    </Spin>

                                    <div className='person-wrap'>
                                        <PersonListshower self={this.props.supplierDetailMain.data.self}/>
                                    </div>
                                </div>
                                <div className={btnClassName}>
                                    <div className='btns'>
                                        {/* 并入供应商有否有这个按钮需要在下一期中设置操作权限控制 */}
                                        {ismy ? <Button type="primary" className='normal'
                                                        onClick={(key, value, type) => this.addShowModal(this.supplierId, companyName, 1)}>新增跟进线索</Button> : ''}
                                        {ismy ? ispkval : ''}
                                        {ismy ?
                                            <Button type="primary" className='normal' onClick={this.handleOpenChoose}>分配负责人</Button> : ''}
                                        {theHighSeas ? <Button type="primary" className='normal'
                                                               onClick={this.ADDMYmodal}>加入我的线索</Button> : ''}
                                        {isunderling ?
                                            <Button type="primary" className='normal' onClick={this.openMergedWidget}>并入线索</Button> : ''}
                                        {ismy ? <Button type="primary" className='normal'
                                                        onClick={this.handleFetchToHighSea}>移入公海</Button> : ''}
                                        {ismy ? <Button type="primary" className='normal'
                                                        onClick={this.tourl('/productpricing/upload/')}>上传产品报价</Button> : ''}

                                        {/* <Button type="primary" className='normal'>供应商评分</Button>
                                         <Button type="primary" className='normal'>供应商统计</Button> */}
                                        <Modal title='提示' visible={this.props.supplierDetailMain.PKVisible}
                                               onCancel={this.qxpkhandle} onOk={this.qrtjhandle}>
                                            <p>{this.props.supplierDetailMain.PKcontent}</p>
                                        </Modal >
                                        <Modal title='提示' visible={this.props.supplierDetailMain.addmyVisible}
                                               onCancel={this.qxADDMYhandle} onOk={this.qrADDMYhandle}>
                                            <p>{this.props.supplierDetailMain.ADDMYcontent}</p>
                                        </Modal >
                                        <Modal title='提示' visible={this.props.supplierDetailMain.yrghVisible}
                                               onCancel={this.QXYRGHhandle} onOk={this.QRYRGHhandle}>
                                            <p>{this.props.supplierDetailMain.yrghcontent}</p>
                                        </Modal >
                                    </div>
                                    <Button className='more' onClick={() => this.showMoreBtn()}>更多</Button>
                                    <PersonSelector onChoosed={this.handleChoosed.bind(this)} 
                                                    visible={this.state.personSelectorVisible}
                                                    onCancel={this.handlePersonCancel.bind(this)}/>
                                    <MergeSuppliers onComfirm={this.handleMerged.bind(this)}
                                                    onCancel={this.handleCancel.bind(this)}
                                                    supplierId={supplierId}
                                                    companyName={companyName}
                                                    visible={this.state.mergeSuppliersVisible}/>
                                    <PublicModal onSuccess={this.handleAddSuccess.bind(this)}/>
                                </div>
                            </div>
                            <div className="chart-wrap">
                                <div className="xsjb">
                                    <p className="p1">线索级别</p>
                                    <p className="p2"><span
                                        className="s1">{this.props.supplierDetailMain.data.clueLevel ? this.props.supplierDetailMain.data.clueLevel : '暂无'}</span><span
                                        className="s2">{icon}</span></p>
                                    <Modal title='修改线索级别' visible={this.props.supplierDetailMain.editXSJBVisible}
                                           onCancel={this.XSJBhandleCancel} footer={null}>
                                        <WrappedEffectFrom />
                                    </Modal >
                                </div>
                            </div>
                        </div>
                        <div className="bottom-wrap">
                            <div className='tab'><span className='active'>跟进记录</span></div>
                            <FollowUpShower />
                        </div>
                    </div>
                    <div className="right-wrap">
                        <div className="link-wrap">
                            <Row>
                                <Col span={12} style={{paddingRight: '5px'}}><Button type="primary" className='normal'
                                                                                     onClick={this.tourl('/newClue/', 0)}>新建线索</Button></Col>
                                <Col span={12} style={{paddingLeft: '5px'}}><Button type="primary" className='normal'
                                                                                    onClick={this.tourl('/editClue/')}>编辑线索</Button></Col>
                            </Row>
                        </div>
                        <Spin spinning={this.props.supplierDetailMain.isfetching}>
                            <CompanyShower  />
                        </Spin>
                    </div>
                </div>
            </div>

        );
    }
}

export default App
