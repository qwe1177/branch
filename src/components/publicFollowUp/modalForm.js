import React from 'react';
import { Form, Input, Row, Col, Select, Tag, Button, DatePicker,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {doFormEdit,doEffectFlow,doCancelForm} from './redux';

@connect(
	state =>  ({EditModal: state.EditModal}),
	dispatch => bindActionCreators({doFormEdit,doEffectFlow,doCancelForm}, dispatch)
  )


class ModalForm extends React.Component {
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				// this.props.onQuery(values); //回调父方法
				var promise = this.props.doEffectFlow(values);
				promise.then((res)=>{
					if(res.data.result){
						message.success('提交成功');
					}else{
						message.error('提交失败');
					}
				}).catch((e)=>{
					message.error('提交失败');
				})
			}
		});
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
			let form = this.props.EditModal.pform;
			let data ={};
			for(let key in form){  //过滤空字符串
				if(form[key]!=''){
					data[key] = form[key];
				}
			}
			this.props.form.setFieldsValue(data);
		}
	
	handleCancel = () => {
		this.props.doCancelForm();
	  }
	
	render() {
		
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span:10 },
			wrapperCol: { span: 12 }
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span:9 },
			wrapperCol: { span: 11 }
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const formItemLayout3 = {  //form中的label和内容各自占用多少
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		};
		let tags = this.props.EditModal.pform.followUpFlag;
		let sole = this.props.EditModal.pform.key;
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} className="editModal">
				<Row gutter={16}>
					<Col span={10} className="marginStyle">	
						{getFieldDecorator('key')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('type')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('title')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('clientName')(
							<Input type="hidden" />
						)}
						<FormItem label="客户名称" className="echo">
							{this.props.EditModal.pform.clientName}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={6}>
						<FormItem {...formItemLayout} label="联系人">
							{getFieldDecorator('contacts')(
								<Input placeholder="请输入联系人" />
							)}
						</FormItem>
					</Col>
					<Col span={9}>
						<FormItem {...formItemLayout} label="主动联系方">
							{getFieldDecorator('initiative',{initialValue:'客户'})(
								<Select  style={{ width: '100%' }}  >
									<Option value="我方">我方</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={9}>
						<FormItem {...formItemLayout} label="联络方式">
							{getFieldDecorator('contactWay',{initialValue:'电话'})(
								<Select  style={{ width: '100%' }}  >
									<Option value="座机">座机</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={13}>
						<FormItem {...formItemLayout1} label="本次联络时间">
							{getFieldDecorator('thisTime', )(
								<DatePicker />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						{getFieldDecorator('followUpFlag')(
								<Input type="hidden" />
						)}
						<FormItem label="跟进节点" className="tagsWrap">
							{tags.map((o)=> {
								if(sole == 1) {
									if(o.status == 'past') {
										return(
										<Tag key={o.key} color="#e4e3e3">{o.label}</Tag>
										) 
									}else if(o.status == 'now') {
										return(
										<Tag key={o.key} color="#6393bf">{o.label}</Tag>
										) 
									}else {
										return(
										<Tag key={o.key}>{o.label}</Tag>
										) 
									}
									
								}else {
									if(o.checked == 'true') {
										return(
											<Tag key={o.key} color="#6393bf">{o.label}</Tag>
										) 
									}else {
										return(
										<Tag key={o.key}>{o.label}</Tag>
										) 
									}
								}
								
	 						})}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...formItemLayout2} label="跟进内容" className="marginLeft">
							{getFieldDecorator('followUpContent')(
								<Input placeholder="跟进内容" type="textarea" rows={2} />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16}>
						<FormItem {...formItemLayout1} label="计划下次跟进时间">
							{getFieldDecorator('nextTime', )(
								<DatePicker />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...formItemLayout3} label="计划下次跟进内容">
							{getFieldDecorator('nextContent')(
								<Input placeholder="计划下次跟进内容" type="textarea" rows={2} />
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

export default ModalForm;