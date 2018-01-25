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
import { levelOptions } from '../../../util/options'
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
				let {query,pagination} = this.props.MyFollowUP;
				var newPagination = {...pagination }; //点击按钮重新查询时候重置查询第一页
				newPagination.current = 1;
				newPagination.pageSize = 10;
				this.props.doQueryFollow({query:values,pagination:newPagination});
			}
		});
	}
	handleReset = () => {
		this.props.form.resetFields(); 
	}
	
    render() {
		const { getFieldDecorator } = this.props.form;
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
			<Row gutter={16}>
				<Col span={6}>
					<FormItem  label="企业名称" style={{ width: '100%' }}>
						{getFieldDecorator('companyName')(
							<Input  style={{ width: '100px' }}  onBlur={this.handleConfirmBlur} />
						)}
					</FormItem>
				</Col>
				<Col span={6}>
					<FormItem label="跟进方式" style={{ width: '100%' }}>
						{getFieldDecorator('contactWay',{
							rules: [{validator: this.checkWay}],
						})(
							<Select  style={{ width: '100px' }} placeholder="请选择" >
								{levelOptions('跟进方式').splice(1,8).map(item => {
									return (
										<Option key={item.value} value={item.value}
										>
											{item.label}
										</Option>
									)
								})}
							</Select>
									)}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem label="计划完成日期" style={{ width: '100%' }}>
						{getFieldDecorator('finishData')(
						<RangePicker style={{ width: '200px' }} />
						)}
					</FormItem>
				</Col>
			</Row>
			<Row gutter={16} className="followType">			
				<Col span={14} style={{ textAlign: 'left' }}>
					<FormItem  label="跟进类型">
						{getFieldDecorator('followupType')(
							<CheckboxGroup options={plainOptions} />)}
					</FormItem>
				</Col>
				<Col span={10}>
					<Button size="large" type="primary" style={{ width: 100,marginRight: 30 }} htmlType="submit">查询</Button>
					<Button size="large" type="danger" style={{ width: 100 }} onClick={this.handleReset}>重置</Button>
				</Col>
			</Row>
		</Form>
      );
    }
  }
  export default QueryFrom;