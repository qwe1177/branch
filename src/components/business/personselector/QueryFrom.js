import React from 'react';

import { Form, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;


class QueryFrom extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.onQuery(values); //回调父方法
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 9 },
			wrapperCol: { span: 15 },
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Row gutter={16}>
					<Col span={10}>
						<FormItem
							{...formItemLayout}
							label="部门"
						>
							{getFieldDecorator('deptName', )(
								<Input placeholder="请输入部门" />
							)}
						</FormItem>
					</Col>
					<Col span={10}>
						<FormItem
							{...formItemLayout}
							label="姓名"
						>
							{getFieldDecorator('name')(
								<Input placeholder="请输入姓名" />
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem>
							<Button type="primary" htmlType="submit">提交</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default QueryFrom;