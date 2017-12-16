import React from 'react';
import { Form, Input, Row, Col, Select, Tag, Button, DatePicker,message,Radio,Checkbox,Modal } from 'antd';
import moment from 'moment';
import './layout.css';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const CheckableTag = Tag.CheckableTag;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {doReceiveSuccess,doReceiveFail,doEffectFlow,doCancelForm} from './redux';
  const  options = [ '日常联系','寄送样品','询报价','签订合同','配送交货','付款结束','售后服务','开票结算', ]
@connect(
	state =>  ({EditModal: state.EditModal}),
	dispatch => bindActionCreators({doReceiveSuccess,doReceiveFail,doEffectFlow,doCancelForm}, dispatch)
  )
class ModalForm extends React.Component {
	state = {
		selectedTags: [],
	  };
	
	  handleChange(tag, checked) {
		const { followUpFlag} = this.props.EditModal.pform;
		const nextSelectedTags = checked ?
				[...followUpFlag, tag] :
				followUpFlag.filter(t => t !== tag);
		this.props.EditModal.pform.followUpFlag = nextSelectedTags;
		this.setState({ selectedTags: nextSelectedTags });
	  }
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// var initdata=this.props.EditModal.selectedTags;
				var initdata=this.props.EditModal.pform.followUpFlag;
				values.followUpFlag= (initdata!=''&&initdata!=undefined)?initdata.join(',') : '';
				var url = this.props.url;
				var promise = this.props.doEffectFlow(url,{pform:values});
				promise.then((res)=>{
					if(res.data.code=='1'){
						message.success('提交成功');
						this.props.onSuccess();
					}else {
						message.success('提交失败');
					}
				}) 
			}
		});
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.EditModal.pform;
		let data ={};
			for(let key in form){  //过滤空字符串
				if(form[key] && form[key]!=''){
					data[key] = form[key];
				}
			}
			this.props.form.setFieldsValue(data);
		}
	
	handleCancel = () => {
		this.props.doCancelForm();
	  }
	 
	isNode = (rule,value, callback) => {
		const form = this.props.form;
		var type = form.getFieldValue('followupType');
		var name  = form.getFieldValue('followUpNode');
		if ((type==1)&&(!name || ''== form.getFieldValue('followUpNode'))) {
			callback('请选择跟进节点!');
		}else {
			callback();
		}
	}
	required = (rule,value, callback) => {
		const form = this.props.form;
		var name  = form.getFieldValue('followUpTheContent');
		if (!name || ''== form.getFieldValue('followUpTheContent')) {
			callback('请选择跟进内容!');
		}else  {
			callback();
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span:7 },
			wrapperCol: { span: 12 }
		};
		const formItemLayout0 = {  //form中的label和内容各自占用多少
			labelCol: { span:12 },
			wrapperCol: { span: 10}
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span:11},
			wrapperCol: { span: 13 }
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span:10 },
			wrapperCol: { span: 10 }
		};
		const formItemLayout3 = {  //form中的label和内容各自占用多少
			labelCol: { span: 3 },
			wrapperCol: { span: 21 }
		};
		const formItemLayout4 = {  //form中的label和内容各自占用多少
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		};
		const {pform} = this.props.EditModal;
		const selectedTags = this.state.selectedTags.length != 0 ? this.state.selectedTags:(this.props.EditModal.pform.followUpFlag!=undefined?this.props.EditModal.pform.followUpFlag:[]);
		const className = pform.followupType == 2 ?'editModal':'editModal xiansuo';
		const isMustName = selectedTags.length != 0 ? 'noMust' : 'must';
	
		return (
				<Form layout="horizontal" hideRequiredMark onSubmit={this.handleSubmit} className={className}>
				<Row gutter={16}>
					<Col  className="marginStyle">	
						{getFieldDecorator('supplierId')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('modalType')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('followupType')(
							<Input type="hidden" />
						)}
							{getFieldDecorator('id')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('companyName')(
							<Input type="hidden" />
						)}
						<FormItem label="客户名称" className="echo">
							{this.props.EditModal.pform.companyName}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem {...formItemLayout} label="联系人">
							{getFieldDecorator('contactPersonnel')(
								<Input />
							)}
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem {...formItemLayout0} label="主动联系方">
							{getFieldDecorator('activeContact',{
								rules: [{ required: true, message: '请选择主动联系方' }],
							})(
								<Select  style={{ width: '100%' }} placeholder="请选择" >
									<Option value="1">客户</Option>
									<Option value="2">自己</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					 <Col span={9}>
						<FormItem {...formItemLayout0} label="联络方式">
							{getFieldDecorator('contactWay',{
								rules: [{ required: true, message: '请选择联络方式' }],
							})(
								<Select  style={{ width: '100%' }} placeholder="请选择" >
									<Option value="1">电话</Option>
									<Option value="2">email</Option>
									<Option value="3">QQ</Option>
									<Option value="4">微信</Option>
									<Option value="5">上门拜访</Option>
									<Option value="6">客户来访</Option>
									<Option value="7">其它</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row> 
				<Row gutter={16}>
					<Col span={9}>
						<FormItem {...formItemLayout1} label="本次联络时间">
							{getFieldDecorator('thisContactTime',{
								rules: [{ required: true, message: '请选择本次联络时间' }],
							})(
								<DatePicker/>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row className='followup-flag'>
					<Col>
						<FormItem label="跟进标签" className="tagsWrap">
						{getFieldDecorator('followUpFlag')(
							<Input type="hidden" />
						)}
						{options.map((tag,index )=> (
										<CheckableTag
										key={index}
										checked={selectedTags.indexOf(tag) > -1}
										onChange={checked => this.handleChange(tag, checked)}
										>
											{tag}
										</CheckableTag>
										))}
						<div className={isMustName}>请选择跟进标签！</div>
						</FormItem>
					</Col>
				</Row>
				<Row className='followup-node'>
					<Col>
						<FormItem label="跟进节点" className="tagsWrap">
						{getFieldDecorator('followUpNode',{
							rules: [{validator: this.isNode}],
						})(
							 <RadioGroup  size="large">
								<RadioButton value="暂无兴趣">暂无兴趣</RadioButton>
								<RadioButton value="待联系">待联系</RadioButton>
								<RadioButton value="电话介绍">电话介绍</RadioButton>
								<RadioButton value="确定KP">确定KP</RadioButton>
								<RadioButton value="上门介绍">上门介绍</RadioButton>
								<RadioButton value="意向强烈">意向强烈</RadioButton>
								<RadioButton value="确定合作">确定合作</RadioButton>
								<RadioButton value="沟通合作">沟通合作</RadioButton>
							</RadioGroup> 
						)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...formItemLayout3} label="跟进内容" className="marginLeft">
							{getFieldDecorator('followUpTheContent',{
								rules: [{ validator: this.required}],
							})(
								<Input type="textarea" rows={2} />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<FormItem {...formItemLayout2} label="计划下次跟进时间">
							{getFieldDecorator('planNextContactTime')(
								<DatePicker />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...formItemLayout4} label="计划下次跟进内容">
							{getFieldDecorator('planNextContent')(
								<Input type="textarea" rows={2} />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<FormItem >
						<Button key="submit" type="primary" htmlType="submit"  size="large"  onClick={this.handleOk}>确认</Button>
						<Button key="back" size="large" style={{marginRight: 20}} onClick={this.handleCancel}>取消</Button>
					</FormItem>
				</Row>
				</Form>
	
		);
	}
}
export default ModalForm