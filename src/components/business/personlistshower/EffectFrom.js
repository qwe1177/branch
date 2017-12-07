import React from 'react';
import {getOneUrlParams} from '../../../util/baseTool';
import { Form, Input, Row, Col, Button, Radio, DatePicker,message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {doPreEdit, doPreAdd, doEffectFlow, doCancelForm,fetchListData } from './redux';

@connect(
	state => ({ personListShower: state.personListShower }),
	dispatch => bindActionCreators({ doPreEdit, doPreAdd, doEffectFlow, doCancelForm,fetchListData }, dispatch)
)


class EffectFrom extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.doEffectFlow(values).then((res)=>{
					if(res.data.code=='1'){
						var supplierId = getOneUrlParams('supplierId');
						this.props.fetchListData(supplierId);
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
			if(form[key] && form[key]!=''){
				data[key] = form[key];
			}
		}
		this.props.form.setFieldsValue(data);
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 7 },
			wrapperCol: { span: 17 }
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span: 3 },
			wrapperCol: { span: 21 }
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} ref="test">
				<Row >
					<Col span={12}>
						{getFieldDecorator('id')(
							<Input type="hidden" />
						)}
						<FormItem {...formItemLayout} label="姓名">
							{getFieldDecorator('fullname', {
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
									<Radio value='男'>先生</Radio>
									<Radio value='女'>女士</Radio>
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
							{getFieldDecorator('position')(
								<Input placeholder="请输入职位" />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<FormItem {...formItemLayout} label="手机">
							{getFieldDecorator('mobile', {
								rules: [{
								required: true, message: '请输入手机!',
								}]})(
								<Input placeholder="请输入手机" />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
					<FormItem {...formItemLayout} label="固话" className="personlist-shower-right-label">
							{getFieldDecorator('telephone')(
								<Input placeholder="请输入手机" />
							)}
						</FormItem>
						
					</Col>
				</Row>
				<Row >
					<Col span={12}>
					<FormItem {...formItemLayout} label="邮箱" >
							{getFieldDecorator('email')(
								<Input placeholder="请输入邮箱" />
							)}
						</FormItem>
						
					</Col>
					<Col span={12}>
					<FormItem {...formItemLayout} label="旺旺" className="personlist-shower-right-label">
							{getFieldDecorator('wangwang')(
								<Input placeholder="请输入旺旺" />
							)}
						</FormItem>
						
					</Col>
				</Row>
				<Row >
					<Col span={12}>
					<FormItem {...formItemLayout} label="传真" >
							{getFieldDecorator('fax')(
								<Input placeholder="请输入传真" />
							)}
						</FormItem>
						
					</Col>
					<Col span={12}>
					<FormItem {...formItemLayout} label="微信" className="personlist-shower-right-label">
							{getFieldDecorator('weixin')(
								<Input placeholder="请输入微信号" />
							)}
						</FormItem>
						
					</Col>
				</Row>
				<Row >
					<Col span={12}>
					<FormItem {...formItemLayout} label="QQ">
					{getFieldDecorator('qq')(
						<Input placeholder="请输入QQ号" />
					)}
				</FormItem>
					</Col>
					
				</Row>
				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout1} label="备注">
							{getFieldDecorator('remark')(
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