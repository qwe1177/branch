import React from 'react';

import { Form, Input, Row, Col, Button, Radio, DatePicker, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { connect_cas } from '../../util/connectConfig';
import { getLoginInfo } from '../../util/baseTool';
import axios from 'axios';

class EffectFrom extends React.Component {
	state = {
		confirmDirty: false
	}
	doEffect = (values) => {
		var loginInfo = getLoginInfo(); //从localstorage得到platformId,token 如果没有使用mock
		var token = loginInfo.token == '' ? 'a493cc4a4325b79fdb4ee9f73b2c29343607654af54e7f682e24eb7c8a6d27ec' : loginInfo.token; //用户和权限记录
		var params = { ...values, token: token };
		axios.get(connect_cas + '/api/user/resetPassword', { params: params }).then((res) => {
			if (res.data.code == '0') {
				// console.log(JSON.stringify(res.data.data.menu));
				message.success('修改成功');
				this.props.onSubmit();
			}else{
				message.error(res.data.msg);
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('newPassword')) {
			callback('两次输入密码不一致!');
		} else {
			callback();
		}
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				this.doEffect(values);
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 7 },
			wrapperCol: { span: 17 }
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} ref="test">
				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout} label="原密码">
							{getFieldDecorator('oldPassword', {
								rules: [{
									required: true, message: '请输入原密码!',
								}]
							})(
								<Input type='password' placeholder="请输入原密码" />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout} label="新密码">
							{getFieldDecorator('newPassword', {
								rules: [{
									required: true, message: '请输入新密码!',
								}]
							})(
								<Input type='password' placeholder="请输入新密码" />
								)}
						</FormItem>
					</Col>
				</Row>

				<Row >
					<Col span={24}>
						<FormItem {...formItemLayout} label="再次输入的新密码">
							{getFieldDecorator('newPasswordAgain', {
								rules: [{
									required: true, message: '再次输入的新密码!',
								}, {
									validator: this.checkPassword,
								}]
							})(
								<Input type='password' placeholder="再次输入的新密码" onBlur={this.handleConfirmBlur} />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row >
					<FormItem className="topwidget-submit">
						<Button type="primary" htmlType="submit" className='normal'>提交</Button>
					</FormItem>
				</Row>
			</Form >
		);
	}
}

export default EffectFrom;