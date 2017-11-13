import React from 'react';
import PropTypes from 'prop-types'



import 'antd/dist/antd.css';
import { Form,Modal} from 'antd';

import './layout.css';
import EffectFrom from './EffectFrom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doReceiveData, doPreModifiy, doPreModifiyCanel } from './redux';

/**
 * 
 * store中的数据
 * baseData:object {key: '',gender: '男',name:'李四'}  企业基本信息
 * visible：boolean  编辑modal是否可显
 * 
 */
@connect(
    state => ({ companyBaseShower: state.companyBaseShower }),
    dispatch => bindActionCreators({ doReceiveData, doPreModifiy, doPreModifiyCanel }, dispatch)
)
class CompanyBaseShower extends React.Component {
    static propTypes = { //声明prop中属性变量

    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.doReceiveData();
    }
    handleCancel=()=>{
        this.props.doPreModifiyCanel();
    }
    handleOpenModal = () => {
        console.log("修改")
        this.props.doPreModifiy();
    }

    render() {
        const { data, visible } = this.props.companyBaseShower;
        const WrappedEffectFrom = Form.create()(EffectFrom);
        return (
            <div className='company-base-shower'>
                <div className="title-1"><span className='company-name' title={data.name}>{data.name}</span><span className="company-tag"  onClick={() => this.handleOpenModal()} >{data.relation}</span></div>
                <div className="title-2">联系地址</div>
                <div className="content-1">{data.address}</div>
                <Modal title='修改合作关系' visible={visible} onCancel={this.handleCancel} footer={null} >
                    <WrappedEffectFrom />
                </Modal >
            </div>
        );
    }
}

export default CompanyBaseShower;