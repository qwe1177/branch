import React from 'react';

import { Form, Input, Row, Col, Button, TreeSelect } from 'antd';
const FormItem = Form.Item;
import { connect_cas } from '../../../util/connectConfig';
import { getLoginInfo } from '../../../util/baseTool';
import axios from 'axios';

class QueryFrom extends React.Component {
	state={
		treeData:[],
		value: undefined,
		query:{}
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
	getTree = (list, parentId)=>{
		var formatTree = (items, parentId) =>{
			let result = [];
			if (!items[parentId]) {
				return result;
			}
			for (let t of items[parentId]) {
				t.children = formatTree(items, t.key)
				result.push(t);
			}
		  return result;
		};

		list = list.map((o)=>{
			return  {label:o.departmentName,key:o.departmentId,value:o.departmentId,parent_id:o.pid};
		})

		var items= {};
		// 获取每个节点的直属子节点，*记住是直属，不是所有子节点
		for (let i = 0; i < list.length; i++) {
			 let key = list[i].parent_id;
			 if (items[key]) {
				 items[key].push(list[i]);
			 } else {
				 items[key] = [];
				 items[key].push(list[i]);
			 }
		 }
		 return formatTree(items, parentId);
	}
	// componentDidMount() {
	// 	this.queryData();
	// }
	componentWillMount() {
		console.log('componentWillMount');
		this.queryData();
	}
	componentWillReceiveProps(nextProps){
		console.log('componentWillReceiveProps');
		// console.log(nextProps);
		// var query = {...this.state.query,...nextProps.query};
		// this.setState({'query':query});
		// if(nextProps.query.departmentId){
		// 	this.setState({ value:nextProps.query.departmentId});
		// }
    }
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		// let form = this.props.mainQueryData.queryform;
		// let data = {};
		// for (let key in form) {  //过滤空字符串
		// 	if (form[key] 　&& form[key] != '') {
		// 		data[key] = form[key];
		// 	}
		// }
		// this.props.form.setFieldsValue(data);
		// var a = this.props.form.getFieldValue('departmentId');
		// console.log(this.props.query); //{name: "departmentId", value: "453e2cb118e03aeeae5fa8fe99809dc9"}
		
		console.log('componentDidMount');
		console.log(this.props.query);
		// console.log(this.props.query);
		var data ={};
		for(let key in this.props.query){
			data[key] = this.props.query[key];
		}
		console.log(this.props.query);
		if(data.departmentId || data.realName ){
			console.log(data);
			this.props.form.setFieldsValue(data);
		}
		if(data.departmentId){
			this.setState({ value:data.departmentId});
		}
	}
	queryData =()=>{
		var token = getLoginInfo()['token'];  //获取token　登录用
		axios.get(connect_cas + '/api/user/getAllDepartment', { params: {token:token} }).then((res) => {
			if(res.data.code=='0'){
				var d  = res.data.data;
				var treeData =this.getTree(d,'');
				// console.log(treeData);
				this.setState({treeData})
			}
		}).catch((e) => {
		  console.log(e);
		});
	}
	render() {
		const {treeData} = this.state;
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
								<Input placeholder="请选择部门" type='hidden' />
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