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
const plainOptions = ["全部",'客户', '商机', '线索'];
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doResetQuery,doFirstQueryFollow, doQueryFollow ,doEditFollowInfo} from '../actions/index.js';

@connect(
    state => ({ MyFollowUP: state.MyFollowUP }),
    dispatch => bindActionCreators({ doResetQuery,doFirstQueryFollow, doQueryFollow,doEditFollowInfo }, dispatch)
)

class QueryFrom extends React.Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}
		checkName = (rule, value, callback) => {
		const form = this.props.form;
		var name  = form.getFieldValue('companyName');
		if (!name || ''== form.getFieldValue('companyName')) {
			callback('企业名称必须填写!');
		} else {
			callback();
		}
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
		this.props.doResetQuery();  
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.MyFollowUP.query;
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
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
			};
			const checkItemLayoutFirst = { 
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
			};
		
      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
			<Row gutter={16}>
				<Col span={6}>
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
						{getFieldDecorator('followUpWay',{initialValue:'全部'})(
							<Select  style={{ width: '100%' }}  >
								<Option value="商机">商机</Option>
								<Option value="线索">线索</Option>
							</Select>
									)}
					</FormItem>
				</Col>
				<Col span={10}>
					<FormItem {...formItemLayout} label="计划完成日期">
						{getFieldDecorator('finishData',{initialValue:[moment(),moment()]})(
						<RangePicker />
						)}
					</FormItem>
				</Col>
			</Row>
			<Row gutter={16} className="followType">
							
				<Col span={16} style={{ textAlign: 'left' }}>
					<FormItem {...checkItemLayoutFirst} label="跟进类型">
						{getFieldDecorator('followTypeOther')(
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