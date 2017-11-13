import React from 'react';
import PropTypes from 'prop-types'

import moment from 'moment'

import './QueryFrom.css';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const checkListFirst = ['上传产品', '有跟进记录', '询价单', '能开专票'];
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData } from '../actions';


@connect(
	state => ({ mainQueryData: state.mainQueryData, mainTableData: state.mainTableData }),
	dispatch => bindActionCreators({ initQueryFrom, setQueryFrom, resetQueryFrom, requestSupplier, queryTableData }, dispatch)
)

class QueryFrom extends React.Component {
	static propTypes = {
		queryform: PropTypes.object  //查询条件
	}
	state = {
		checkListFirst: checkListFirst
	}
	componentWillMount() {
		this.props.initQueryFrom();
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form= this.props.mainQueryData.queryform;
		let data ={};
		for(let key in form){  //过滤空字符串
			if(form[key]　&& form[key]!=''){
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
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 9 },
			wrapperCol: { span: 15 },
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
		};
		const checkItemLayoutFirst = {
			labelCol: { span: 2 },
			wrapperCol: { span: 22 },
		};

		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<Row gutter={16}>
					<Col span={3}>
						<FormItem >
							{getFieldDecorator('prefix', { initialValue: '企业名称' })(
								<Select style={{ width: '100%' }}  >
									<Option value="企业名称">企业名称</Option>
									<Option value="企业地址">企业地址</Option>
									<Option value="手机">手机</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={2}>
						<FormItem >
							{getFieldDecorator('name', {
								rules: [{
									required: true, message: '请输入内容!',
								}
									// ,{validator: this.checkName}
								],
							})(
								<Input style={{ width: '100%' }} />
								)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem {...formItemLayout} label="客户级别">
							{getFieldDecorator('level', { initialValue: '全部' })(
								<Select style={{ width: '100%' }}  >
									<Option value="全部">全部</Option>
									<Option value="一星">一星</Option>
									<Option value="二星">二星</Option>
									<Option value="三星">三星</Option>
									<Option value="四星">四星</Option>
									<Option value="五星">五星</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem {...formItemLayout} label="客户来源" >
							{getFieldDecorator('source', { initialValue: '全部' })(
								<Select style={{ width: '100%' }}  >
									<Option value="全部">全部</Option>
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
						<FormItem {...formItemLayout2} label="客户类型" >
							{getFieldDecorator('type', { initialValue: '全部' })(
								<Select style={{ width: '100%' }} >
									<Option value="全部">全部</Option>
									<Option value="一级代理商">一级代理商</Option>
									<Option value="厂家">厂家</Option>
									<Option value="经销商">经销商</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...checkItemLayoutFirst} label="主营类目"  >
							{getFieldDecorator('selltype', { initialValue: '劳保产品' })(
								<Select mode='multiple' style={{ width: '100%' }}  >
									<Option value="劳保产品">劳保产品</Option>
									<Option value="五金产品">五金产品</Option>
									<Option value="内衣裤袜">内衣裤袜</Option>
									<Option value="服饰配件">服饰配件</Option>
									<Option value="腕表眼镜">腕表眼镜</Option>
									<Option value="箱包">箱包</Option>
									<Option value="男鞋">男鞋</Option>
									<Option value="女鞋">女鞋</Option>
									<Option value="男装">男装</Option>
									<Option value="女装">女装</Option>
									<Option value="全屋定制">全屋定制</Option>
									<Option value="家居建材">家居建材</Option>
									<Option value="住宅家具">住宅家具</Option>
									<Option value="家居饰品">家居饰品</Option>
									<Option value="布艺家饰">布艺家饰</Option>
									<Option value="床上用品">床上用品</Option>
									<Option value="乐器/吉他/钢琴/配件">乐器/吉他/钢琴/配件</Option>
									<Option value="书籍杂志">书籍杂志</Option>
									<Option value="鲜花园艺">鲜花园艺</Option>
									<Option value="成人用品">成人用品</Option>
									<Option value="珠宝黄金">珠宝黄金</Option>
									<Option value="宠物用品">宠物用品</Option>
									<Option value="收纳整理">收纳整理</Option>
									<Option value="居家日用">居家日用</Option>
									<Option value="洗护纸品">洗护纸品</Option>
									<Option value="家庭清洁">家庭清洁</Option>
									<Option value="厨房用品">厨房用品</Option>
									<Option value="彩妆/香水/美妆工具">彩妆/香水/美妆工具</Option>
									<Option value="美容护肤/精油">美容护肤/精油</Option>
									<Option value="母婴玩具">母婴玩具</Option>
									<Option value="食品饮料">食品饮料</Option>
									<Option value="3C数码配件">3C数码配件</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...checkItemLayoutFirst} label="主营品牌"  >
							{getFieldDecorator('brand')(
								<Select mode='multiple' style={{ width: '100%' }}  >
									<Option value="奥迪">奥迪</Option>
									<Option value="阿迪达斯">阿迪达斯</Option>
									<Option value="安利">安利</Option>
									<Option value="阿尔卑斯">阿尔卑斯</Option>
									<Option value="本田">本田</Option>
									<Option value="波士顿">波士顿</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={5}>
						<FormItem {...formItemLayout} label="客户区域">
							{getFieldDecorator('eara', { initialValue: '城内商家' })(
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
							{getFieldDecorator('relationship', { initialValue: '战略合作' })(
								<Select style={{ width: 120 }} >
									<Option value="战略合作">战略合作</Option>
									<Option value="战略合作">战略合作</Option>
									<Option value="友好合作">友好合作</Option>
									<Option value="普通合作">普通合作</Option>
									<Option value="终止合作">终止合作</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem {...formItemLayout} label="创建日期">
							{getFieldDecorator('createdate')(
								<RangePicker />
							)}
						</FormItem>
					</Col>
					<Col span={3}>
						<span className="rangeButton" onClick={this.changeToToday}>今天</span>
						&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16} style={{ textAlign: 'left' }}>
						<FormItem {...checkItemLayoutFirst} label="其他条件">
							{getFieldDecorator('other')(
								<CheckboxGroup options={this.state.checkListFirst} />
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<Button type="primary" htmlType="submit">查询</Button>
						<Button type="ghost" className="resetButton" onClick={this.handleReset}>重置</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default QueryFrom;