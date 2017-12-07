import React from 'react';
import PropTypes from 'prop-types'

import moment from 'moment'

import './QueryFrom.css';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

import BrandSelector from '../../../components/business/brandselector';
import CategorySelector from '../../../components/business/categoryselector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData } from '../actions';


@connect(
	state => ({ mainQueryData: state.mainQueryData, mainTableData: state.mainTableData }),
	dispatch => bindActionCreators({ initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData }, dispatch)
)

class QueryFrom extends React.Component {
	state = {
		brandSelectorVisible: false,
		categorySelectorVisible: false
	}
	componentWillMount() {
		// this.props.initQueryFrom();
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.mainQueryData.queryform;
		let data = {};
		for (let key in form) {  //过滤空字符串
			if (form[key] 　&& form[key] != '') {
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
			createdate: [moment().subtract(7, "days"), moment()]
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
		this.props.form.setFieldsValue({ brandNames: labels, brandIds: ids });
		this.setState({ brandSelectorVisible: false });
	}
	handleCancel = () => {
		this.setState({ brandSelectorVisible: false });
	}
	handleChoosedForCategory = (ids, labels) => {
		this.props.form.setFieldsValue({ selltypeNames: labels, selltypeIds: ids });
		this.setState({ categorySelectorVisible: false });
	}
	handleCancelForCategory = () => {
		this.setState({ categorySelectorVisible: false });
	}
	getLastSelectBrand = () => {
		var labelstr = this.props.form.getFieldValue('mainBrandNames');
		var idstr = this.props.form.getFieldValue('mainBrand');
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
			labelCol: { span: 7 },
			wrapperCol: { span: 17 },
		};
		const checkItemLayoutFirst = {
			labelCol: { span: 2 },
			wrapperCol: { span: 22 },
		};

		const options = [
			{ label: '有跟进记录', value: 'followupRecords' },
			{ label: '有上传产品', value: 'hasUpload' },
			{ label: '有询价单', value: 'hasSheet' },
			{ label: '能开专票', value: 'hasTicket' }
		  ];
		const choosedKeys = this.getLastSelectBrand();
		const choosedKeys1 = this.getLastSelectCategory();
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Row gutter={16}>
					<Col span={3}>
						{getFieldDecorator('isPass')(
							<Input type='hidden' />
						)}
						{getFieldDecorator('markToDistinguish')(
							<Input type='hidden' />
						)}
						<FormItem >
							{getFieldDecorator('compNameOrAddressOrMobile', { initialValue: 'companyName' })(
								<Select style={{ width: '100%' }}  >
									<Option value="companyName">企业名称</Option>
									<Option value="address">企业地址</Option>
									<Option value="mobile">手机</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={2}>
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
									<Option value="">全部</Option>
									<Option value="一星">一星</Option>
									<Option value="二星">二星</Option>
									<Option value="三星">三星</Option>
									<Option value="四星">四星</Option>
									<Option value="五星">五星</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem {...formItemLayout} label="客户来源" >
							{getFieldDecorator('source', { initialValue: '' })(
								<Select style={{ width: '100%' }}  >
									<Option value="">全部</Option>
									<Option value="自行开发">自行开发</Option>
									<Option value="来电咨询">来电咨询</Option>
									<Option value="网络推广">网络推广</Option>
									<Option value="CSC86">CSC86</Option>
									<Option value="buy5j">buy5j</Option>
									<Option value="网络爬取">网络爬取</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem {...formItemLayout} label="客户类型" >
							{getFieldDecorator('enterpriseType', { initialValue: '' })(
								<Select style={{ width: '100%' }} >
									<Option value="">全部</Option>
									<Option value="一级代理商">一级代理商</Option>
									<Option value="厂家">厂家</Option>
									<Option value="经销商">经销商</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						{getFieldDecorator('varietyNameId')(
							<Input type='hidden' />
						)}
						<FormItem {...formItemLayout} label="主营类目"  >
							{getFieldDecorator('varietyNameNames')(
								<Input onClick={this.handleOpenChooseForCategory}  readOnly />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={5}>
						{getFieldDecorator('mainBrand')(
							<Input type='hidden' />
						)}
						<FormItem {...formItemLayout} label="主营品牌"  >
							{getFieldDecorator('mainBrandNames')(
								<Input onClick={this.handleOpenChoose} readOnly />
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem {...formItemLayout} label="客户区域">
							{getFieldDecorator('areaType', { initialValue: '' })(
								<Select style={{ width: 120 }}  >
									<Option value="全部">全部</Option>
									<Option value="城内商户">城内商户</Option>
									<Option value="城外商户">城外商户</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem {...formItemLayout} label="合作关系" >
							{getFieldDecorator('partnership', { initialValue: '' })(
								<Select style={{ width: 120 }} >
									<Option value="">全部</Option>
									<Option value="战略合作">战略合作</Option>
									<Option value="友好合作">友好合作</Option>
									<Option value="普通合作">普通合作</Option>
									<Option value="终止合作">终止合作</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem {...formItemLayout1} label="创建日期" >
							{getFieldDecorator('createdate')(
								<RangePicker />
							)}
						</FormItem>
					</Col>
					<Col span={2} className='right-wrap'>
						<span className="rangeButton" onClick={this.changeToToday}>今天</span>
						&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16} style={{ textAlign: 'left' }}>
						<FormItem {...checkItemLayoutFirst} label="其他条件">
							{getFieldDecorator('other')(
								<CheckboxGroup options={options} />
							)}
						</FormItem>
					</Col>
					<Col span={8} className='right-wrap'>
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

export default QueryFrom;