import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import './QueryFrom.css';
import { Form, Input, Icon, Select, Row, Col, Checkbox, Button ,DatePicker } from 'antd';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
	{label: '供应商', value: '2'},
	{label: '线索', value: '1'},
];
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doResetQuery, doQueryFollow ,doEditFollowInfo} from '../actions/index.js';

@connect(
    state => ({ MyFollowUP: state.MyFollowUP }),
    dispatch => bindActionCreators({ doResetQuery, doQueryFollow,doEditFollowInfo }, dispatch)
)

class QueryFrom extends React.Component {
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.MyFollowUP.query;
		form = _.pick(form,['companyName','contactWay','finishData','followupType']);
		let data ={};
		for(let key in form){  //过滤空字符串
			if(form[key]!=''){
				data[key] = form[key]; 
			}
		}
		this.props.form.setFieldsValue(data);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.doQueryFollow({query:values,pagination:this.props.MyFollowUP.pagination});
			}
		});
	}
	handleReset = () => {
		this.props.form.resetFields();
		const {query,pagination } = this.props.MyFollowUP;  
		this.props.doQueryFollow();  
	}
	
    render() {
      	const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
				labelCol: { span: 7 },
				wrapperCol: { span: 17},
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 11 },
			wrapperCol: { span: 13},
		};
		const checkItemLayoutFirst = { 
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		};
	 
		

      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
			<Row gutter={16}>
				<Col span={8}>
					<FormItem {...formItemLayout1} label="企业名称">
						{getFieldDecorator('companyName')(
							<Input  style={{ width: '100%' }}  onBlur={this.handleConfirmBlur} />
						)}
					</FormItem>
				</Col>
				<Col span={6}>
					<FormItem {...formItemLayout2} label="跟进方式">
						{getFieldDecorator('contactWay',{
							rules: [{validator: this.checkWay}],
						})(
							<Select  style={{ width: '100%' }} placeholder="请选择" >
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
				<Col span={10}>
					<FormItem {...formItemLayout} label="计划完成日期">
						{getFieldDecorator('finishData')(
						<RangePicker />
						)}
					</FormItem>
				</Col>
			</Row>
			<Row gutter={16} className="followType">			
				<Col span={14} style={{ textAlign: 'left' }}>
					<FormItem {...checkItemLayoutFirst} label="跟进类型">
						{getFieldDecorator('followupType')(
							<CheckboxGroup options={plainOptions} />)}
					</FormItem>
				</Col>
				<Col span={8}>
					<Button size="large" type="primary" style={{ width: 100,marginRight: 30 }} htmlType="submit">查询</Button>
					<Button size="large" type="danger" style={{ width: 100 }} onClick={this.handleReset}>重置</Button>
				</Col>
			</Row>
		</Form>
      );
    }
  }
  export default QueryFrom;