import React from 'react';

import { Form, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;


class QueryFrom extends React.Component {
	handleSubmit = (e) => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				//console.log('Received values of form: ', values);
				this.props.onQuery(values); //回调父方法
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Row gutter={24}>
					<Col span={18}>
						<FormItem {...formItemLayout} label="企业名称" style={{'fontSize':'16px'}} >
							{getFieldDecorator('companyName')(
								<Input />
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem>
							<Button type="primary" htmlType="submit" >查询</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default QueryFrom;