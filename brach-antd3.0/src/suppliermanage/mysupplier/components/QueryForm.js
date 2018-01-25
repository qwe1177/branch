import React from 'react';
import PropTypes from 'prop-types'

import moment from 'moment'

import './QueryForm.css';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

import BrandSelector from '../../../components/business/brandselector';
import CategorySelector from '../../../components/business/categoryselector';
import { levelOptions } from '../../../util/options';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData } from '../actions';


@connect(
	state => ({ mainQueryData: state.mainQueryData, mainTableData: state.mainTableData }),
	dispatch => bindActionCreators({ initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData }, dispatch)
)

class QueryForm extends React.Component {
	state = {
		brandSelectorVisible: false,
		categorySelectorVisible: false
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.mainQueryData.queryform;
		let data = {};
		for (let key in form) {  //过滤空字符串
			if (form[key] && form[key] != '') {
				data[key] = form[key];
			}
		}
		this.props.form.setFieldsValue(data);
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
	checkName = (rule, value, callback) => {
		const form = this.props.form;
		var name = form.getFieldValue('name');
		if (!name || '' == name) {
			callback('企业名称必须填写!');
		} else {
			callback();
		}
	}
	changeToLastSeven = () => {
		this.props.form.setFieldsValue({
			createdate: [moment().subtract(6, "days"), moment()]
		});
	}
	changeToToday = () => {
		this.props.form.setFieldsValue({
			createdate: [moment(), moment()]
		});
	}
	handleOpenChoose = () => {
		this.setState({ brandSelectorVisible: true });
	}
	handleOpenChooseForCategory = () => {
		this.setState({ categorySelectorVisible: true });
	}
	handleChoosed = (ids, labels) => {
		// this.props.form.setFieldsValue({ brandNames: labels, brandIds: ids });
		this.props.form.setFieldsValue({ mainBrandNames: labels, mainBrandId: ids });
		this.setState({ brandSelectorVisible: false });
	}
	handleCancel = () => {
		this.setState({ brandSelectorVisible: false });
	}
	handleChoosedForCategory = (ids, labels) => {
		// this.props.form.setFieldsValue({ selltypeNames: labels, selltypeIds: ids });
		this.props.form.setFieldsValue({ varietyNameNames: labels, varietyNameId: ids });
		this.setState({ categorySelectorVisible: false });
	}
	handleCancelForCategory = () => {
		this.setState({ categorySelectorVisible: false });
	}
	getLastSelectBrand = () => {
		var labelstr = this.props.form.getFieldValue('mainBrandNames');
		var idstr = this.props.form.getFieldValue('mainBrandId');
		return { labelstr, idstr }
	}
	getLastSelectCategory = () => {
		var idstr = this.props.form.getFieldValue('varietyNameId');
		return idstr;
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 9 },
			wrapperCol: { span: 15 },
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span: 9 },
			wrapperCol: { span: 13 },
		};
		const checkItemLayoutFirst = {
			labelCol: { span: 2 },
			wrapperCol: { span: 22 },
		};

		const choosedKeys = this.getLastSelectBrand();
		const choosedKeys1 = this.getLastSelectCategory();
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} className='query-form'>
				<Row gutter={16}>
					<Col span={2}>
						<FormItem >
							{getFieldDecorator('compNameOrAddressOrMobile', { initialValue: 'companyName' })(
								<Select style={{ width: 85 }} >
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
							{getFieldDecorator('compNameOrAddressOrMobileValue')(
								<Input style={{ width: '100%' }} />
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem {...formItemLayout} label="客户级别">
							{getFieldDecorator('level', { initialValue: '' })(
								<Select style={{ width: '100%' }}  >
									{levelOptions('客户级别').map(item => {
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
					<Col span={4}>
						<FormItem {...formItemLayout} label="来源" >
							{getFieldDecorator('source', { initialValue: '' })(
								<Select style={{ width: '100%' }}  >
									{levelOptions('来源').map(item => {
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
					<Col span={4}>
						<FormItem {...formItemLayout} label="企业性质" >
							{getFieldDecorator('enterpriseType', { initialValue: '' })(
								<Select style={{ width: '100%' }} >
									{levelOptions('企业性质').map(item => {
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
						{getFieldDecorator('varietyNameId')(
							<Input type='hidden' />
						)}
						<FormItem {...formItemLayout} label="主营类目"  >
							{getFieldDecorator('varietyNameNames')(
								<Input onClick={this.handleOpenChooseForCategory} readOnly />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={4}>
						{getFieldDecorator('mainBrandId')(
							<Input type='hidden' />
						)}
						<FormItem label="主营品牌"  >
							{getFieldDecorator('mainBrandNames')(
								<Input onClick={this.handleOpenChoose} readOnly style={{ "width": "80px" }} />
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem {...formItemLayout1} label="客户区域">
							{getFieldDecorator('areaType', { initialValue: '' })(
								<Select style={{ width: 85 }}>
									{levelOptions('客户区域').map(item => {
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
					<Col span={4}>
						<FormItem {...formItemLayout1} label="合作关系" >
							{getFieldDecorator('partnership', { initialValue: '' })(
								<Select style={{ width: 85 }}>
									{levelOptions('合作关系').map(item => {
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
					<Col span={2}>
					<FormItem >
						{getFieldDecorator('createOrResponsibleTime', {
							rules: [{ required: false, message: '请选择' }],
							initialValue: 'createTime'
						})(
							<Select placeholder="请选择" style={{ width: 85 }} size="large">
								{levelOptions('时间').map(item => {
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
					<Col span={10}>
					<FormItem >
						{getFieldDecorator('createdate')(
							<RangePicker style={{ width: 240 }} size="large" />
						)}
						&nbsp;<span className="rangeButton" onClick={this.changeToToday}>今天</span>&nbsp;
						<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12} style={{ textAlign: 'left' }}>
						<FormItem label="其他条件">
							{getFieldDecorator('other')(
								<CheckboxGroup options={levelOptions('供应商列表其他查询条件')} />
							)}
						</FormItem>
					</Col>
					<Col span={12} className='right-wrap'>
						<Button type="primary" htmlType="submit">查询</Button>
						<Button type="ghost" className="resetButton" onClick={this.handleReset}>重置</Button>
					</Col>
				</Row>
				<BrandSelector onChoosed={this.handleChoosed.bind(this)}
					visible={this.state.brandSelectorVisible}
					choosedKeys={choosedKeys}
					onCancel={this.handleCancel.bind(this)}
				/>
				<CategorySelector onChoosed={this.handleChoosedForCategory.bind(this)}
					choosedKeys={choosedKeys1}
					visible={this.state.categorySelectorVisible}
					onCancel={this.handleCancelForCategory.bind(this)}
				/>
			</Form>
		);
	}
}

export default QueryForm;