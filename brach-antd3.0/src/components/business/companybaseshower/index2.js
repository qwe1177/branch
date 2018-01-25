import React from 'react';
import PropTypes from 'prop-types'



import { Form,Modal} from 'antd';

import './layout.css';
import EffectFrom from './EffectFrom2';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toOpenUpdateTag,toCloseUpdateTag} from  '../../../components/common/supplierdetails/redux';
// import { doReceiveData, doPreModifiy, doPreModifiyCanel } from './redux';

/**
 * 
 * store中的数据
 * baseData:object {key: '',gender: '男',name:'李四'}  企业基本信息
 * visible：boolean  编辑modal是否可显
 * 
 */
@connect(
    state => ({ supplierDetailMain: state.supplierDetailMain }),
    dispatch => bindActionCreators({ toOpenUpdateTag,toCloseUpdateTag }, dispatch)
)
class CompanyBaseShower extends React.Component {
    static propTypes = { //声明prop中属性变量

    }
    handleCancel=()=>{
        this.props.toCloseUpdateTag();
    }
    handleOpenModal = () => {
        this.props.toOpenUpdateTag();
    }

    render() {
        const { data, editTagVisible } = this.props.supplierDetailMain;
        const WrappedEffectFrom = Form.create()(EffectFrom);
        const tag =data.partnership?<span className="company-tag">{data.partnership}</span>:'';
        return (
            <div className='company-base-shower'>
                <div className="title-1" ><span className='company-name' title={data.companyName}>{data.companyName}</span></div>
                <div className="title-2">联系地址</div>
                <div className="content-1">{data.address}</div>
                <Modal title='修改线索级别' visible={editTagVisible} onCancel={this.handleCancel} footer={null} >
                    <WrappedEffectFrom />
                </Modal >
            </div>
        );
    }
}

export default CompanyBaseShower;