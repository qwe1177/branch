import React from 'react';

import { Form, Input, Row, Col, Button, Radio, DatePicker,message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doReceiveList, doPreEdit, doPreAdd, doEffectFlow, doCancelForm } from './redux';

@connect(
	state => ({ personListShower: state.personListShower }),
	dispatch => bindActionCreators({ doReceiveList, doPreEdit, doPreAdd, doEffectFlow, doCancelForm }, dispatch)
)


class EffectFrom extends React.Component {
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
		let form = this.props.personListShower.pform;
		let data ={};
		for(let key in form){  //过滤空字符串
			if(form[key]!=''){
				data[key] = form[key];
			}
		}
		this.props.form.setFieldsValue(data);
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 8 },
			wrapperCol: { span: 16 }
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span: 3 },
			wrapperCol: { span: 21 }
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} ref="test">
				<Row >
					<Col span={12}>
						{getFieldDecorator('key')(
							<Input type="hidden" />
						)}
						<FormItem {...formItemLayout} label="姓名">
							{getFieldDecorator('name', {
								rules: [{
								required: true, message: '请输入姓名!',
								}]})(
								<Input placeholder="请输入姓名" />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem {...formItemLayout} label="性别" className="personlist-shower-right-label">
							{getFieldDecorator('gender')(
								<RadioGroup>
									<Radio value='men'>先生</Radio>
									<Radio value='women'>女士</Radio>
								</RadioGroup>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<Col span={12}>
						<FormItem {...formItemLayout} label="生日">
							{getFieldDecorator('birthday', )(
								<DatePicker />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem {...formItemLayout} label="职位" className="personlist-shower-right-label">
							{getFieldDecorator('job')(
								<Input placeholder="请输入职位" />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem {...formItemLayout} label="手机/固话">
							{getFieldDecorator('telephone', {
								rules: [{
								required: true, message: '请输入手机/固话!',
								}]})(
								<Input placeholder="请输入手机/固话" />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem {...formItemLayout} label="邮箱" className="personlist-shower-right-label">
							{getFieldDecorator('email')(
								<Input placeholder="请输入邮箱" />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<Col span={12}>
						<FormItem {...formItemLayout} label="旺旺">
							{getFieldDecorator('wangwang')(
								<Input placeholder="请输入旺旺" />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem {...formItemLayout} label="传真" className="personlist-shower-right-label">
							{getFieldDecorator('fax')(
								<Input placeholder="请输入传真" />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<Col span={12}>
						<FormItem {...formItemLayout} label="微信">
							{getFieldDecorator('wechart')(
								<Input placeholder="请输入微信号" />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem {...formItemLayout} label="QQ" className="personlist-shower-right-label">
							{getFieldDecorator('qq')(
								<Input placeholder="请输入QQ号" />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout1} label="备注">
							{getFieldDecorator('remarks')(
								<Input placeholder="请输入备注" type="textarea" rows={2} />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<FormItem className="personlist-shower-submit">
						<Button type="primary" htmlType="submit" className='normal'>提交</Button>
					</FormItem>
				</Row>
			</Form>
		);
	}
}

export default EffectFrom;