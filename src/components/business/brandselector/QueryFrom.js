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
	componentWillMount(){
        // this.doInit(this.props);
    }
    componentWillReceiveProps(nextProps){
        // this.doInit(nextProps);
	}
	componentDidMount(){
		/**保存查询条件 */
		var form = this.props.query;
		let data ={};
		for(let key in form){  //过滤空字符串
			if(form[key]　&& form[key]!=''){
				data[key] = form[key];
			}
		}
		this.props.form.setFieldsValue(data);
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
					<Col span={20}>
						<FormItem>
							{getFieldDecorator('brandName', )(
								<Input placeholder="品牌名称" />
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