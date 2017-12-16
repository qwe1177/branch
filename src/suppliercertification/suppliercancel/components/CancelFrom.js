import React from 'react';
import './CancelFrom.css';
import { Form, Select, Input, Button, Table, Modal, Row, Col, DatePicker } from 'antd';
import moment from 'moment'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData } from '../actions';
import { levelOptions } from '../../../util/options';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

@connect(
	state => ({ mainQueryData: state.mainQueryData, mainTableData: state.mainTableData }),
	dispatch => bindActionCreators({ initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData }, dispatch)
)

class CancelFrom extends React.Component {
	changeToLastSeven = () => {
		this.props.form.setFieldsValue({
			applicationDate: [moment().subtract(7, "days"), moment()]
		});
	}
	changeToToday = () => {
		this.props.form.setFieldsValue({
			applicationDate: [moment(), moment()]
		});
	}
	changeToLastSeven1 = () => {
		this.props.form.setFieldsValue({
			cancelDate: [moment().subtract(7, "days"), moment()]
		});
	}
	changeToToday1 = () => {
		this.props.form.setFieldsValue({
			cancelDate: [moment(), moment()]
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		let { queryform } = this.props.mainQueryData;
		let { pagination, isFetching } = this.props.mainTableData;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if (!isFetching) {
					console.log('Received values of form: ', values);
					var newPagination = { current: 1, ...pagination }; //点击按钮重新查询时候重置查询第一页
					this.props.setQueryFrom({ queryform: values });
					this.props.queryTableData({ queryform: values, pagination: newPagination });
				}
			}
		});
	}
	handleReset = () => {
		this.props.form.resetFields();
		const { queryform, pagination } = this.props.mainQueryData;
		this.props.resetQueryFrom();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} >
				<Row gutter={16}>
					<Col span={3}>
						<FormItem >
							{getFieldDecorator('companyNameOrMobile', { initialValue: 'companyName' })(
								<Select style={{ width: '100%' }}  >
									{levelOptions('企业名称').map(item => {
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
					<Col span={5}>
						<FormItem >
							{getFieldDecorator('name', {
								rules: [{ validator: this.checkName }],
							})(
								<Input style={{ width: '100%' }} placeholder="深圳华南城网科技有限公司" maxLength="30" />
								)}
						</FormItem>
					</Col>
					<Col span={2}>
					</Col>
					<Col span={6}>
						<FormItem {...formItemLayout} label="申请时间">
							{getFieldDecorator('applicationDate')(
								<RangePicker />
							)}
						</FormItem>
					</Col>
					<Col span={3}>
						<span className="rangeButton" onClick={this.changeToToday}>今天</span>
						&nbsp;&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
					</Col>
				</Row>
				<Row gutter={16} className="g-mt">
					<Col span={8}>
						<FormItem {...formItemLayout} label="审核取消时间">
							{getFieldDecorator('cancelDate')(
								<RangePicker />
							)}
						</FormItem>
					</Col>
					<Col span={3}>
						<span className="rangeButton" onClick={this.changeToToday1}>今天</span>
						&nbsp;&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven1}>近7天</span>
					</Col>
					<Col span={4} className="g-rt">
						<Button type="primary" size="large" htmlType="submit">查询</Button>
						<Button type="ghost" size="large" className="resetButton" onClick={this.handleReset}>重置</Button>
					</Col>

				</Row>
			</Form>
		)
	}
}

export default CancelFrom;