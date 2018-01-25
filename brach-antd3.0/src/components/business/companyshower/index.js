import React from 'react';
import * as config from '../../../util/connectConfig'
import { Icon } from 'antd';
import './layout.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toSwitchExtend } from '../../../components/common/supplierdetails/redux';

@connect(
    state => ({ supplierDetailMain: state.supplierDetailMain }),
    dispatch => bindActionCreators({ toSwitchExtend }, dispatch)
)
class CompanyShower extends React.Component {
    static propTypes = { //声明prop中属性变量
        isClueView: PropTypes.bool,  // 是为线索，否为供应商
    }
    static defaultProps = {
        isClueView: true
    }
    collapse = (e) => {
        this.props.toSwitchExtend();
    }
    extend = (e) => {
        this.props.toSwitchExtend();
    }
    render() {
        const { data, isExpand } = this.props.supplierDetailMain;
        const mainClassName = isExpand ? 'company-shower extend' : 'company-shower collapse';
        const idcards = data.supplierBusiness ? data.supplierBusiness.idcards ? data.supplierBusiness.idcards.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';
        const license = data.supplierBusiness ? data.supplierBusiness.license ? data.supplierBusiness.license.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';

        const qualification = data.supplierBusiness ? data.supplierBusiness.qualification ? data.supplierBusiness.qualification.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';

        const authorization = data.supplierBusiness ? data.supplierBusiness.authorization ? data.supplierBusiness.authorization.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';

        const undertaking = data.supplierBusiness ? data.supplierBusiness.undertaking ? data.supplierBusiness.undertaking.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';

        const workshop = data.supplierBusiness ? data.supplierBusiness.workshop ? data.supplierBusiness.workshop.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';
        
        const officespace = data.supplierBusiness ? data.supplierBusiness.officespace ? data.supplierBusiness.officespace.split('@').map((v, i, a) => (<a key={i} target="_blank" href={config.connect_img + v}>
            <img style={{ width: '100%' }} src={config.connect_img + '/' + v} /></a>)) : '' : '';

        return (

            <div className={mainClassName}>
                <div className='section-1'>
                    <div className='title-1'>企业信息</div>
                    {data.supplier.varietyName != '' && <div><span className='title-2'>经营品类</span><span className='content-1'>{data.supplier.varietyName}</span></div>}
                    {data.supplier.cscAccount != '' && <div><span className='title-2'>csc86账号</span><span className='content-1'>{data.supplier.cscAccount}</span></div>}
                    {data.supplier.buy5jAccount != '' && <div><span className='title-2'>buy5j账号</span><span className='content-1'>{data.supplier.buy5jAccount}</span></div>}
                    {data.supplier.source != '' && <div><span className='title-2'>来源</span><span className='content-1'>{data.supplier.source}</span></div>}
                    {(this.props.isClueView && data.clueLevel !== '') && <div><span className='title-2'>线索级别</span><span className='content-1'>{data.clueLevel}</span></div>}
                    {(!this.props.isClueView && data.partnership !== '') && <div><span className='title-2'>合作关系</span><span className='content-1'>{data.partnership}</span></div>}
                    {data.supplier.isAddSku != '' && <div><span className='title-2'>是否新增SKU</span><span className='content-1'>{data.supplier.isAddSku == '1' ? '是' : '否'}</span></div>}
                    {data.supplier.enterpriseType != '' && <div><span className='title-2'>企业性质</span><span className='content-1'>{data.supplier.enterpriseType}</span></div>}
                    {data.supplier.website != '' && <div><span className='title-2'>企业网址</span><span className='content-1'>{data.supplier.website}</span></div>}
                    {data.supplier.goods != '' && <div><span className='title-2'>优势产品</span><span className='content-1'>{data.supplier.goods}</span></div>}
                    {data.supplier.shopsite != '' && <div><span className='title-2'>旺铺地址</span><span className='content-1'>{data.supplier.shopsite}</span></div>}
                    {data.supplier.mainBrand != '' && <div><span className='title-2'>经营品牌</span><span className='content-1'>{data.supplier.mainBrand}</span></div>}
                    {data.supplier.mainBusiness != '' && <div><span className='title-2'>主营业务</span><span className='content-1'>{data.supplier.mainBusiness}</span></div>}
                    {data.supplier.remark != '' && <div><span className='title-2'>备注</span><span className='content-1'>{data.supplier.remark}</span></div>}
                </div>
                <div className='section-2'>
                    <div className='icon-wrap'>
                        <Icon type="down" onClick={this.extend} />
                        <Icon type="up" onClick={this.collapse} />
                    </div>
                    {(data.supplierBusiness != null && (data.supplierBusiness.creditNumber != '' || data.supplierBusiness.province != '' || data.supplierBusiness.city != ''
                        || data.supplierBusiness.deadline != '' || data.supplierBusiness.organization != '' || data.supplierBusiness.corporation != ''
                        || data.supplierBusiness.idcard != '' || data.supplierBusiness.idcards != '' || data.supplierBusiness.license != '')) ?
                        <div className='more-info'>
                            {data.supplierBusiness.creditNumber != '' && <div><span className='title-2'>营业执照注册号</span><span className='content-1'>{data.supplierBusiness.creditNumber}</span></div>}
                            {(data.supplierBusiness.province != '' && data.supplierBusiness.city !== '') && <div><span className='title-2'>营业执照注册地址</span>
                                <span className='content-1'>{data.supplierBusiness.province}{data.supplierBusiness.city}</span></div>}
                            {data.supplierBusiness.deadline != '' &&
                                <div><span className='title-2'>营业执照期限</span><span className='content-1'>{data.supplierBusiness.deadline}</span></div>}
                            {data.supplierBusiness.organization != '' &&
                                <div><span className='title-2'>登记机构</span><span className='content-1'>{data.supplierBusiness.organization}</span></div>}
                            {data.supplierBusiness.corporation != '' &&
                                <div><span className='title-2'>企业法人</span><span className='content-1'>{data.supplierBusiness.corporation}</span></div>}
                            {data.supplierBusiness.idcard != '' &&
                                <div><span className='title-2'>身份证号码</span><span className='content-1'>{data.supplierBusiness.idcard}</span></div>}

                            {data.supplierBusiness.idcards != '' &&
                                <div><span className='title-2'>法人身份证(复印件)</span>
                                    <span style={{ display: 'block' }} className='content-1'>{idcards}</span>
                                </div>
                            }
                            {data.supplierBusiness.license != '' &&
                                <div><span className='title-2'>营业执照(三证合一)</span>
                                    <span style={{ display: 'block' }} className='content-1'>{license}</span>
                                </div>
                            }
                        </div>
                        : null}
                </div>
                {(data.supplierBusiness != null && (data.supplierBusiness.qualification != '' || data.supplierBusiness.authorization != '' || data.supplierBusiness.undertaking != ''
                    || data.supplierBusiness.workshop != '')) ?
                    <div className='more-info'>
                        {(data.supplierBusiness.qualification != '') &&
                            <div><span className='title-2'>一般纳税人资质</span>
                                <span style={{ display: 'block' }} className='content-1'>{qualification}</span>
                            </div>
                        }
                        {(data.supplierBusiness.authorization != '') &&
                            <div><span className='title-2'>法人授权书/代理人授权书</span><span className='content-1'>{authorization}</span></div>
                        }
                        {(data.supplierBusiness.undertaking != '') &&
                            <div><span className='title-2'>廉洁承诺书</span><span className='content-1'>{undertaking}</span></div>
                        }
                        {(data.supplierBusiness.officespace != '') &&
                            <div><span className='title-2'>办公场所</span><span className='content-1'>{officespace}</span></div>
                        }
                        {(data.supplierBusiness.workshop != '') &&
                            <div><span className='title-2'>生成车间/仓库</span><span className='content-1'>{workshop}</span></div>
                        }
                    </div>
                    : null}
                {(data.supplier.oem != '' || data.supplier.manage != '' || data.supplier.model != ''
                    || data.supplier.regmoney != '' || data.supplier.employees != '' || data.supplier.turnover != ''
                    || data.supplier.introduce != '') ?
                    <div className='more-info'>
                        {data.supplier.oem != '' &&
                            <div><span className='title-2'>是否支持来料加工</span><span className='content-1'>{data.supplier.oem == '1' ? '是' : '否'}</span></div>
                        }
                        {data.supplier.manage != '' &&
                            <div><span className='title-2'>管理体系认证</span><span className='content-1'>{data.supplier.manage}</span></div>
                        }
                        {data.supplier.model != '' &&
                            <div><span className='title-2'>经营模式</span><span className='content-1'>{data.supplier.model}</span></div>
                        }
                        {data.supplier.regmoney != '' &&
                            <div><span className='title-2'>注册资本</span><span className='content-1'>{data.supplier.regmoney}</span></div>
                        }
                        {data.supplier.employees != '' &&
                            <div><span className='title-2'>员工人数</span><span className='content-1'>{data.supplier.employees}</span></div>
                        }
                        {data.supplier.turnover != '' &&
                            <div><span className='title-2'>年营业额</span><span>{data.supplier.turnover}</span></div>
                        }
                        {data.supplier.introduce != '' &&
                            <div><span className='title-2'>公司介绍</span><span>{data.supplier.introduce}</span></div>
                        }
                    </div> : null}
            </div>
        );
    }
}

export default CompanyShower;