import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Table, Form, Button, Icon ,message } from 'antd';

import './layout.css';
import EffectFrom from './EffectFrom';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doReceiveList,doPreEdit,doPreAdd,doEffectFlow,doCancelForm} from './redux';

/**
 * 
 * store中的数据
 * personList:array [{ 'key': 2, 'name': '张三1', phone: '12324523123' }]  员工基本信息
 * visible：boolean  编辑和添加modal是否可显
 * isFetching:boolean 编辑和添加的请求是否正在进行
 * pform:object {key: '',gender: '男',name:'李四'} 编辑或者修改的员工lform表单信息 不能用form,因为已经给双向绑定占用了
 * effectResult:boolean 提交结果
 * 
 */
@connect(
  state =>  ({personListShower: state.personListShower}),
  dispatch => bindActionCreators({doReceiveList,doPreEdit,doPreAdd,doEffectFlow,doCancelForm}, dispatch)
)

class PersonListshower extends React.Component {
    static propTypes = { //声明prop中属性变量
        requestId: PropTypes.string.isRequired //供应商,采购商id等，用于查选联系人
    }
    componentWillMount(){
        this.props.doReceiveList();
    }
    constructor(props) {
        super(props);
        this.state = {
            title:'新建联系人'
        }
    }
    handleCancel = () => {
        console.log('取消');
        this.props.doCancelForm();
    }
    effect =(o)=>{
        if(o){ //修改
            this.setState({title:"编辑联系人"});
            this.props.doPreEdit(o);
        }else{
            this.setState({title:"新建联系人"});
            this.props.doPreAdd();
        }
    }
    render() {
        const {title} = this.state
        const WrappedEffectFrom = Form.create()(EffectFrom);
        const {personList,visible} = this.props.personListShower;

        return (
            <div className='personlist-shower'>
                <div className='add-wrap' onClick={() => this.effect()} ><Icon type="plus-circle" className='add'   />新增联系人</div>
                <div className='list-wrap'> 
                    <div className='content-wrap'>
                    {personList.map((o, index) => {
                        return (
                        <div className='item' key={o.key} >
                        <div className='name-wrap'>{o.name}</div>
                            <div className='phone-wrap' onClick={() => this.effect(o)}>
                                <div className='phone-el'>{o.telephone}</div>
                                <Icon type="right" />
                            </div>
                       </div>)
                    })}
                    </div>
                </div>
                <Modal className='personlist-shower-modal' title={title} visible={visible} onCancel={this.handleCancel} footer={null} >
                    <WrappedEffectFrom />
                </Modal >
            </div>
        );
    }
}

export default PersonListshower;