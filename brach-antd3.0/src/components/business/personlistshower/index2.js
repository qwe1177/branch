import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Table, Form, Button, Icon ,message ,Spin} from 'antd';

import './layout.css';
import EffectForm from './EffectForm';
import { getOneUrlParams,getLoginAccount} from '../../../util/baseTool';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doPreEdit,doPreAdd,doEffectFlow,doCancelForm,fetchListData} from './redux';

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
  dispatch => bindActionCreators({doPreEdit,doPreAdd,doEffectFlow,doCancelForm,fetchListData}, dispatch)
)

class PersonListshower extends React.Component {
    static propTypes = { //声明prop中属性变量
    }
    componentWillMount(){
        // this.props.doReceiveList();
        var supplierId = getOneUrlParams('supplierId');
		this.props.fetchListData(supplierId);
    }
    constructor(props) {
        super(props);
        this.state = {
            title:'新建联系人'
        }
    }
    handleCancel = () => {
        this.props.doCancelForm();
    }
    effect =(o)=>{
        const selfarr=['my','underling']
        const self= this.props.self;
        const orself = selfarr.some(v=>v==self)
        if(!orself){
            return false
        }
        if(o){ //修改
            this.setState({title:"编辑联系人"});
            this.props.doPreEdit(o.id);
        }else{
            this.setState({title:"新建联系人"});
            this.props.doPreAdd();
        }
    }
    render() {
        const selfarr=['my','underling']
        const {title} = this.state
        const WrappedEffectForm = Form.create()(EffectForm);
       const self= this.props.self;
        const orself = selfarr.some(v=>v==self)
        const {personList,visible} = this.props.personListShower;
        const mainClassName = personList.length>5?'content-wrap hasScroll':'content-wrap';
        return (
            <div className='personlist-shower'>
                <div className='personlist-label'>联系人</div>
                {orself?<div className='add-wrap' onClick={() => this.effect()} ><Icon type="plus-circle" className='add'   />新增联系人</div>:''}
                <div className='list-wrap'> 
 <div className="nk">
                    <Spin spinning={this.props.personListShower.islistFetching}>
                    <div className='content-wrap'>
                        {personList.map((o, index) => {
                            return (
                            <div className='item' key={o.id} >
                            <div className='name-wrap'>{o.fullname}</div>
                                <div className='phone-wrap' onClick={() => this.effect(o)}>
                                    <div className='phone-el'>{o.mobile}</div>
                                    {orself?<Icon type="double-right" />:''}
                                </div>
                        </div>)
                        })}
                    </div>
                    </Spin>
                </div>
				</div>
                <Modal className='personlist-shower-modal' title={title} visible={visible} onCancel={this.handleCancel} footer={null} >
                    <Spin spinning={this.props.personListShower.isFetching} >
                    <WrappedEffectForm />
                    </Spin>
                </Modal >
            </div>
        );
    }
}

export default PersonListshower;