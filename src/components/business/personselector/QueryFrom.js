import React from 'react';

import { Form, Input, Row, Col, Button, TreeSelect } from 'antd';
const FormItem = Form.Item;
import { connect_cas } from '../../../util/connectConfig';
import { getLoginInfo } from '../../../util/baseTool';
import axios from 'axios';
import PropTypes from 'prop-types'

class QueryFrom extends React.Component {
	static propTypes = { //声明prop中属性变量
        onQuery: PropTypes.func.isRequired, 
        query:PropTypes.object.isRequired,
        treeData: PropTypes.array.isRequired
    }
	state={
		value: undefined,
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.onQuery(values); //回调父方法
			}
		});
	}
	onChange = (value) => {
		this.setState({ value });
		this.props.form.setFieldsValue({'departmentId':value});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.query.departmentId){
			this.setState({ value:nextProps.query.departmentId});
		}
		
    }
	componentDidMount() {
		var data ={};
		for(let key in this.props.query){
			data[key] = this.props.query[key];
		}
		if(data.departmentId || data.realName ){
			this.props.form.setFieldsValue(data);
		}
	}

	render() {
		const {treeData} = this.props;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 9 },
			wrapperCol: { span: 15 }
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Row gutter={16}>
					<Col span={12}>
						<FormItem {...formItemLayout1} label="部门" >
							{getFieldDecorator('departmentId', )(
								<Input  type='hidden' />
							)}

							<TreeSelect
									style={{ width: '100%' }}
									value={this.state.value}
									dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
									treeData={treeData}
									placeholder="请选择部门"
									treeDefaultExpandAll
									onChange={this.onChange}
								/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							{...formItemLayout}
							label="姓名"
						>
							{getFieldDecorator('realName')(
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