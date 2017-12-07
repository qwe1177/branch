import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import './QueryFrom.css';
import { Form, Input, Icon, Select, Row, Col, Checkbox, Button ,DatePicker } from 'antd';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const dateFormat = 'YYYY/MM/DD';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doResetQuery,doAnnotate, doQueryFollow } from '../actions/index.js';

@connect(
    state => ({ AllFollowUP: state.AllFollowUP }),
    dispatch => bindActionCreators({ doResetQuery,doAnnotate, doQueryFollow }, dispatch)
)

class QueryFrom extends React.Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}
	// 	checkName = (rule, value, callback) => {
	// 	const form = this.props.form;
	// 	var name  = form.getFieldValue('companyName');
	// 	if (!name || ''== form.getFieldValue('companyName')) {
	// 		callback('企业名称必须填写!');
	// 	} else {
	// 		callback();
	// 	}
	// }
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.doQueryFollow({query:values,pagination:this.props.AllFollowUP.pagination});
			}
		});
	}
	handleReset = () => {
		this.props.form.resetFields();
		const {query,pagination } = this.props.AllFollowUP;  
		this.props.doResetQuery();  
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.AllFollowUP.query;
		let data ={};
		for(let key in form){  //过滤空字符串
			if(form[key]!=''){
				data[key] = form[key]; 
			}
		}
		this.props.form.setFieldsValue(data);
	}
	changeToLastSeven = () => {
		this.props.form.setFieldsValue({
			finishData: [moment().subtract(7, "days"), moment()]
		});
	}
	changeToToday = () => {
		this.props.form.setFieldsValue({
			finishData: [moment(), moment()]
		});
	}
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {  //form中的label和内容各自占用多少
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
			};
			const checkItemLayoutFirst = { 
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
			};
		const plainOptions = [
				{label: '供应商', value: '2'},
				{label: '线索', value: '1'},
			];
      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
			<Row gutter={16}>
				<Col span={4}>
					<FormItem {...formItemLayout} label="企业名称">
						{getFieldDecorator('companyName', {
							rules: [{validator: this.checkName}],
						})(
							<Input  style={{ width: '100%' }}  onBlur={this.handleConfirmBlur} />
						)}
					</FormItem>
				</Col>
				<Col span={6}>
					<FormItem {...formItemLayout} label="跟进方式">
						{getFieldDecorator('contactWay')(
							<Select  style={{ width: '100%' }} placeholder="请选择">
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
				<Col span={9}>
					<FormItem {...formItemLayout} label="计划完成日期">
						{getFieldDecorator('finishData')(
						<RangePicker />
						)}
					</FormItem>
				</Col>
				<Col span={4} >
						<span className="rangeButton" onClick={this.changeToToday}>今天</span>
						&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
				</Col>
			</Row>
			<Row gutter={16} className="followType">
							
				<Col span={12} style={{ textAlign: 'left' }}>
					<FormItem {...checkItemLayoutFirst} label="跟进类型">
						{getFieldDecorator('followupType')(
							<CheckboxGroup options={plainOptions} />
						)}
					</FormItem>
				</Col>
				<Col span={6} offset={6}>
					<Button size="large" type="primary" style={{ width: 100,marginRight: 30 }} htmlType="submit">查询</Button>
					<Button size="large" type="danger" style={{ width: 100 }} onClick={this.handleReset}>重置</Button>
				</Col>
			</Row>
		</Form>
      );
    }
  }
  export default QueryFrom;