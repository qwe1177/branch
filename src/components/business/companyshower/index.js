import React from 'react';
import PropTypes from 'prop-types'



import 'antd/dist/antd.css';
import { Icon } from 'antd';


import './layout.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doInit, doChangeExtend, doReceiveData } from './redux';

/**
 * 
 * store中的数据
 * data:object { 'key': 2, 'name': '张三1', phone: '12324523123' }  企业基本信息
 * isExpand boolean是否展开
 * 
 */
@connect(
    state => ({ companyShower: state.companyShower }),
    dispatch => bindActionCreators({ doInit, doChangeExtend, doReceiveData }, dispatch)
)
class CompanyShower extends React.Component {
    static propTypes = { //声明prop中属性变量

    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.doReceiveData();
    }
    collapse = (e) => {
        this.props.doChangeExtend(false);
    }
    extend = (e) => {
        this.props.doChangeExtend(true);
    }
    render() {
        const { data, isExpand } = this.props.companyShower;
        const mainClassName = isExpand ? 'company-shower extend' : 'company-shower collapse';
        return (

            <div className={mainClassName}>
                <div className='section-1'>
                    <div className='title-1'>企业信息</div>
                    <div><span className='title-2'>csc86账号</span><span className='content-1'>{data.csc86acount}</span></div>
                    <div><span className='title-2'>buy5j账号</span><span className='content-1'>{data.buywujincont}</span></div>
                    <div><span className='title-2'>规模</span><span className='content-1'>{data.guimo}</span></div>
                    <div><span className='title-2'>采购商性质</span><span className='content-1'>{data.caigousxingzhi}</span></div>
                    <div><span className='title-2'>级别</span><span className='content-1'>{data.jibei}</span></div>
                    <div><span className='title-2'>来源</span><span className='content-1'>{data.laiyuan}</span></div>
                    <div><span className='title-2'>采购类目</span><span className='content-1'>{data.caigouleimu}</span></div>
                    <div><span className='title-2'>采购类目补充</span><span className='content-1'>{data.caigouleimubuchong}</span></div>
                    <div><span className='title-2'>所属行业</span><span className='content-1'>{data.suoshuhangye}</span></div>
                    <div><span className='title-2'>联系地址</span><span className='content-1'>{data.lianxifangshi}</span></div>
                    <div><span className='title-2'>资质文件</span><span className='content-1' dangerouslySetInnerHTML={{ __html: data.zzwenjian }}></span></div>
                    <div><span className='title-2'>企业网址</span><span className='content-1'>{data.qiyewangzhi}</span></div>
                    <div><span className='title-2'>旺铺网址</span><span className='content-1'>{data.wangpudizhi}</span></div>
                    <div><span className='title-2'>主营业务</span><span className='content-1'>{data.zhuyinyewu}</span></div>
                    <div><span className='title-2'>备注</span><span className='content-1'>{data.beizhu}</span></div>
                </div>
                <div className='section-2'>
                    <div className='icon-wrap'>
                        <Icon type="down" onClick={this.extend} />
                        <Icon type="up" onClick={this.collapse} />
                    </div>
                    <div className='more-info'>
                        <div><span className='title-2'>营业执照注册号</span><span className='content-1'>{data.yingyezhizhaobeizhuhao}</span></div>
                        <div><span className='title-2'>营业执照注册地址</span><span className='content-1'>{data.yingyezhizhaodizhi}</span></div>
                        <div><span className='title-2'>营业执照期限</span><span className='content-1'>{data.yingyezhiqixian}</span></div>
                        <div><span className='title-2'>登记机构</span><span className='content-1'>{data.dengjijigou}</span></div>
                        <div><span className='title-2'>企业法人</span><span className='content-1'>{data.qiyefaren}</span></div>
                        <div><span className='title-2'>省份证号码</span><span className='content-1'>{data.shengfenzheng}</span></div>
                        <div><span className='title-2'>法人省份证(复印件)</span>
                            <span className='content-1' dangerouslySetInnerHTML={{ __html: data.fanrenshengfenzheng }}></span>
                        </div>
                        <div><span className='title-2'>营业执照(三证合一)</span>
                            <span className='content-1' dangerouslySetInnerHTML={{ __html: data.yingyezhizhao }}></span>
                        </div>
                    </div>
                </div>
                <div className='more-info'>
                    <div><span className='title-2'>一般纳税人资质</span><span className='content-1'>{data.yibanlaishui}</span></div>
                    <div><span className='title-2'>法人授权书/代理人授权书</span><span className='content-1'>{data.fanrenshouquan}</span></div>
                    <div><span className='title-2'>廉洁承诺书</span><span className='content-1'>{data.lianjiechengnuo}</span></div>
                    <div><span className='title-2'>生成车间/仓库</span><span className='content-1'>{data.shengchengchejian}</span></div>
                    <div><span className='title-2'>授权品牌/自有品牌</span><span className='content-1'>{data.shouquanpingpa}</span></div>
                    <div><span className='title-2'>品牌授权书</span><span className='content-1'>{data.pingpaishouquan}</span></div>
                    <div><span className='title-2'>自有品牌注册/商标注册书</span><span className='content-1'>{data.ziyoupingpai}</span></div>
                    <div><span className='title-2'>产品说明书</span><span className='content-1'>{data.chanpinshuoming}</span></div>

                    <div><span className='title-2'>报价单及库存</span><span className='content-1'>{data.baojiandan}</span></div>
                    <div><span className='title-2'>生成工艺流程</span><span className='content-1'>{data.chengchenggongyi}</span></div>
                    <div><span className='title-2'>国家标准或国际标准认证</span><span className='content-1'>{data.guojiabiaozhun}</span></div>
                    <div><span className='title-2'>第三方认证报告</span><span className='content-1'>{data.disanfang}</span></div>
                    <div><span className='title-2'>产品销售许可证</span><span className='content-1'>{data.chanpingxiaoshou}</span></div>
                    <div><span className='title-2'>售后服务保证书</span><span className='content-1'>{data.shouhoufuwu}</span></div>
                    <div><span className='title-2'>合同</span><span className='content-1' dangerouslySetInnerHTML={{ __html: data.hetong }}></span></div>
                </div>
                <div className='more-info'>
                    <div><span className='title-2'>是否支持来料加工</span><span className='content-1'>{data.shifouzhichi}</span></div>
                    <div><span className='title-2'>管理体系认证</span><span className='content-1'>{data.guanlitixi}</span></div>
                    <div><span className='title-2'>经营模式</span><span className='content-1'>{data.jinyingmoshi}</span></div>
                    <div><span className='title-2'>注册时间年份</span><span className='content-1'>{data.zhucheshijiannianfen}</span></div>
                    <div><span className='title-2'>注册资本</span><span className='content-1'>{data.zhuchezhiben}</span></div>
                    <div><span className='title-2'>员工人数</span><span className='content-1'>{data.yuangongrenshu}</span></div>
                    <div><span className='title-2'>年营业额</span>
                        <span>{data.mianyingyee}</span>
                    </div>
                    <div><span className='title-2'>公司介绍</span>
                        <span>{data.gongsijieshao}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyShower;