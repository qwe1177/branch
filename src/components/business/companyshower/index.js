import React from 'react';
import PropTypes from 'prop-types'



import 'antd/dist/antd.css';
import { Icon } from 'antd';


import './layout.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { doInit, doChangeExtend, doReceiveData } from './redux';
import {toSwitchExtend} from  '../../../components/common/supplierdetails/redux';

/**
 * 
 * store中的数据
 * data:object { 'key': 2, 'name': '张三1', phone: '12324523123' }  企业基本信息
 * isExpand boolean是否展开
 * 
 */
@connect(
    state => ({ supplierDetailMain: state.supplierDetailMain }),
    dispatch => bindActionCreators({ toSwitchExtend }, dispatch)
)
class CompanyShower extends React.Component {
    static propTypes = { //声明prop中属性变量

    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // this.props.doReceiveData();
    }
    collapse = (e) => {
        this.props.toSwitchExtend();
    }
    extend = (e) => {
        this.props.toSwitchExtend();
    }
    render() {
        const { data, isExpand } = this.props.supplierDetailMain;
        // const { data, isExpand } = this.props.companyShower;
        const mainClassName = isExpand ? 'company-shower extend' : 'company-shower collapse';
        return (

            <div className={mainClassName}>
                <div className='section-1'>
                    <div className='title-1'>企业信息</div>
                    <div><span className='title-2'>csc86账号</span><span className='content-1'>{data.supplier.cscAccount}</span></div>
                    <div><span className='title-2'>buy5j账号</span><span className='content-1'>{data.supplier.buy5jAccount}</span></div>
                    <div><span className='title-2'>规模</span><span className='content-1'></span></div>
                    <div><span className='title-2'>采购商性质</span><span className='content-1'>{data.supplier.enterpriseType}</span></div>
                    <div><span className='title-2'>级别</span><span className='content-1'>{data.supplier.clueLevel}</span></div>
                    <div><span className='title-2'>来源</span><span className='content-1'>{data.supplier.source}</span></div>
                    <div><span className='title-2'>采购类目</span><span className='content-1'>{data.supplier.varietyName}</span></div>
                    <div><span className='title-2'>采购类目补充</span><span className='content-1'></span></div>
                    <div><span className='title-2'>所属行业</span><span className='content-1'>{data.supplier.manage}</span></div>
                    <div><span className='title-2'>联系地址</span><span className='content-1'>{data.supplier.address}</span></div>
                    <div><span className='title-2'>资质文件</span>
                    {/* <span className='content-1' dangerouslySetInnerHTML={{ __html: data.zzwenjian }}></span> */}
                    </div>
                    <div><span className='title-2'>企业网址</span><span className='content-1'>{data.supplier.website}</span></div>
                    <div><span className='title-2'>旺铺网址</span><span className='content-1'>{data.supplier.shopsite}</span></div>
                    <div><span className='title-2'>主营业务</span><span className='content-1'>{data.supplier.mainBusiness}</span></div>
                    <div><span className='title-2'>备注</span><span className='content-1'>{data.supplier.remark}</span></div>
                </div>
                <div className='section-2'>
                    <div className='icon-wrap'>
                        <Icon type="down" onClick={this.extend} />
                        <Icon type="up" onClick={this.collapse} />
                    </div>
                    <div className='more-info'>
                        <div><span className='title-2'>营业执照注册号</span><span className='content-1'>{data.supplierBusiness.creditNumber}</span></div>
                        <div><span className='title-2'>营业执照注册地址</span><span className='content-1'>{data.supplierBusiness.province}{data.supplierBusiness.city}</span></div>
                        <div><span className='title-2'>营业执照期限</span><span className='content-1'>{data.supplierBusiness.deadline}</span></div>
                        <div><span className='title-2'>登记机构</span><span className='content-1'>{data.supplierBusiness.organization}</span></div>
                        <div><span className='title-2'>企业法人</span><span className='content-1'>{data.supplierBusiness.corporation}</span></div>
                        <div><span className='title-2'>身份证号码</span><span className='content-1'>{data.supplierBusiness.idcard}</span></div>
                        <div><span className='title-2'>法人省份证(复印件)</span>
                            <span className='content-1' dangerouslySetInnerHTML={{ __html: data.supplierBusiness.idcards }}></span>
                        </div>
                        <div><span className='title-2'>营业执照(三证合一)</span>
                            <span className='content-1' dangerouslySetInnerHTML={{ __html: data.supplierBusiness.license }}></span>
                        </div>
                    </div>
                </div>
                <div className='more-info'>
                    <div><span className='title-2'>一般纳税人资质</span><span className='content-1'>{data.supplierBusiness.qualification}</span></div>
                    <div><span className='title-2'>法人授权书/代理人授权书</span><span className='content-1'>{data.supplierBusiness.authorization}</span></div>
                    <div><span className='title-2'>廉洁承诺书</span><span className='content-1'>{data.supplierBusiness.undertaking}</span></div>
                    <div><span className='title-2'>生成车间/仓库</span><span className='content-1'>{data.supplierBusiness.workshop}</span></div>
                    <div><span className='title-2'>授权品牌/自有品牌</span><span className='content-1'></span></div>
                    <div><span className='title-2'>品牌授权书</span><span className='content-1'></span></div>
                    <div><span className='title-2'>自有品牌注册/商标注册书</span><span className='content-1'></span></div>
                    <div><span className='title-2'>产品说明书</span><span className='content-1'></span></div>

                    <div><span className='title-2'>报价单及库存</span><span className='content-1'></span></div>
                    <div><span className='title-2'>生成工艺流程</span><span className='content-1'></span></div>
                    <div><span className='title-2'>国家标准或国际标准认证</span><span className='content-1'></span></div>
                    <div><span className='title-2'>第三方认证报告</span><span className='content-1'></span></div>
                    <div><span className='title-2'>产品销售许可证</span><span className='content-1'></span></div>
                    <div><span className='title-2'>售后服务保证书</span><span className='content-1'></span></div>
                    <div><span className='title-2'>合同</span>
                    {/* <span className='content-1' dangerouslySetInnerHTML={{ __html: data.hetong }}></span> */}
                    </div>
                </div>
                <div className='more-info'>
                    <div><span className='title-2'>是否支持来料加工</span><span className='content-1'>{data.supplier.oem}</span></div>
                    <div><span className='title-2'>管理体系认证</span><span className='content-1'>{data.supplier.manage}</span></div>
                    <div><span className='title-2'>经营模式</span><span className='content-1'>{data.supplier.model}</span></div>
                    <div><span className='title-2'>注册时间年份</span><span className='content-1'></span></div>
                    <div><span className='title-2'>注册资本</span><span className='content-1'>{data.supplier.regmoney}</span></div>
                    <div><span className='title-2'>员工人数</span><span className='content-1'>{data.supplier.employees}</span></div>
                    <div><span className='title-2'>年营业额</span>
                        <span>{data.supplier.turnover}</span>
                    </div>
                    <div><span className='title-2'>公司介绍</span>
                        <span>{data.supplier.introduce}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyShower;