import React from 'react';
import { Form, Input, Row, Col, Select, Tag, Button, DatePicker, message, Radio, Checkbox, Modal } from 'antd';
import moment from 'moment';
import './layout.css';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const CheckableTag = Tag.CheckableTag;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doReceiveSuccess, doReceiveFail, doEffectFlow, doCancelForm } from './redux';
import { levelOptions } from '../../util/options'
const options = ['日常联系', '寄送样品', '询报价', '签订合同', '配送交货', '付款结算', '售后服务', '开具发票',]
@connect(
	state => ({ EditModal: state.EditModal }),
	dispatch => bindActionCreators({ doReceiveSuccess, doReceiveFail, doEffectFlow, doCancelForm }, dispatch)
)
class ModalForm extends React.Component {
	state = {
		selectedTags: [],
		numb1: { len: 0, color: '' },
		numb2: { len: 0, color: '' },
		isSelectTag: true,
		startValue: null,
		endValue: null,
		endOpen: false,
	};

	handleChange(tag, checked) {
		const followUpFlag = this.props.EditModal.pform.followUpFlag != undefined && this.props.EditModal.pform.followUpFlag != '' ? this.props.EditModal.pform.followUpFlag : [];
		const nextSelectedTags = checked ?
			[...followUpFlag, tag] :
			followUpFlag.filter(t => t !== tag);
		this.props.EditModal.pform.followUpFlag = nextSelectedTags;
		this.setState({ selectedTags: nextSelectedTags });
		console.log(nextSelectedTags)
		if (nextSelectedTags.length == 0) {
			this.setState({ isSelectTag: false });
		} else {
			this.setState({ isSelectTag: true });
		}

	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { followupType, followUpFlag } = this.props.EditModal.pform;
			if (followupType == 2 && followUpFlag == '') {
				this.setState({ isSelectTag: false });
			} else if (!err) {
				var initdata = this.props.EditModal.pform.followUpFlag;
				if (initdata)
					values.followUpFlag = (initdata != '' && initdata != undefined) ? initdata.join(',') : '';
				var url = this.props.url;
				var promise = this.props.doEffectFlow(url, { pform: values });
				promise.then((res) => {
					if (res.data.code == '1') {
						message.success('提交成功');
						this.props.onSuccess();
					} else {
						message.success('提交失败');
					}
				})
			}
		});
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		let form = this.props.EditModal.pform;
		let data = {};
		for (let key in form) {  //过滤空字符串
			if (form[key] && form[key] != '') {
				data[key] = form[key];
			}
		}
		this.props.form.setFieldsValue(data);
		if (this.props.EditModal.pform.modalType == '2') {
			this.setState({
				numb1: { len: data.followUpTheContent.length, color: '' },
				numb2: { len: (data.planNextContent == undefined ? 0 : data.planNextContent.length), color: '' },
			})
		}
	}

	handleCancel = () => {
		this.props.doCancelForm();
	}

	isNode = (rule, value, callback) => {
		const form = this.props.form;
		var type = form.getFieldValue('followupType');
		var name = form.getFieldValue('followUpNode');
		if ((type == 1) && (!name || '' == form.getFieldValue('followUpNode'))) {
			callback('请选择跟进节点');
		} else {
			callback();
		}
	}
	required = (rule, value, callback) => {
		const form = this.props.form;
		var name = form.getFieldValue('followUpTheContent');
		if (!name || '' == form.getFieldValue('followUpTheContent')) {
			callback('请填写跟进内容');
		} else {
			callback();
		}
	}
	companyIntroductionHandle = (n, v) => (e) => {
		const { value } = e.target;
		var len = value.length
		const reg = new RegExp('(.{' + v + '}).*', 'g');
		var color = ''
		if (len > v) {
			e.target.value = e.target.value.replace(reg, '$1');
			len = v
			color = "#ff0000";
		}
		this.setState({ [n]: { len: len, color: color } })
	}
	// 日期
	disabledStartDate = (startValue) => {
		let value = this.props.form.getFieldValue('planNextContactTime');
		const endValue = this.state.endValue == null ? value : this.state.endValue;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	}

	disabledEndDate = (endValue) => {
		let value = this.props.form.getFieldValue('thisContactTime');
		const startValue = this.state.startValue == null ? value : this.state.startValue;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	}

	onChange = (field, value) => {
		this.setState({
			[field]: value,
		});
	}

	onStartChange = (value) => {
		this.onChange('startValue', value);
	}

	onEndChange = (value) => {
		this.onChange('endValue', value);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 7 },
			wrapperCol: { span: 12 }
		};
		const formItemLayout0 = {  //form中的label和内容各自占用多少
			labelCol: { span: 12 },
			wrapperCol: { span: 10 }
		};
		const formItemLayout1 = {  //form中的label和内容各自占用多少
			labelCol: { span: 11 },
			wrapperCol: { span: 13 }
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 10 },
			wrapperCol: { span: 10 }
		};
		const formItemLayout3 = {  //form中的label和内容各自占用多少
			labelCol: { span: 3 },
			wrapperCol: { span: 21 }
		};
		const formItemLayout4 = {  //form中的label和内容各自占用多少
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		};
		const { followupType, followUpFlag } = this.props.EditModal.pform;
		const selectedTags = this.state.selectedTags.length != 0 ? this.state.selectedTags : (followUpFlag != undefined && followUpFlag != '' ? followUpFlag : []);
		const className = followupType == 2 ? 'editModal' : 'editModal xiansuo';
		const isMustName = this.state.isSelectTag == true ? 'noMust' : 'must';
		return (
			<Form layout="horizontal" hideRequiredMark onSubmit={this.handleSubmit} className={className}>
				<Row gutter={16}>
					<Col className="marginStyle">
						{getFieldDecorator('supplierId')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('modalType')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('followupType')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('id')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('companyName')(
							<Input type="hidden" />
						)}
						<FormItem label="客户名称" className="echo">
							{this.props.EditModal.pform.companyName}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<FormItem {...formItemLayout} label="联系人">
							{getFieldDecorator('contactPersonnel', {
								rules: [{ required: true, message: '请填写联系人' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem {...formItemLayout0} label="主动联络方">
							{getFieldDecorator('activeContact', {
								rules: [{ required: true, message: '请选择主动联系方' }],
							})(
								<Select style={{ width: '100%' }} placeholder="请选择" >
									{levelOptions('主动联络方').map(item => {
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
					<Col span={9}>
						<FormItem {...formItemLayout0} label="联络方式">
							{getFieldDecorator('contactWay', {
								rules: [{ required: true, message: '请选择联络方式' }],
							})(
								<Select style={{ width: '100%' }} placeholder="请选择" >
									{levelOptions('联络方式').map(item => {
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
				</Row>
				<Row gutter={16}>
					<Col span={9}>
						<FormItem {...formItemLayout1} label="本次联络时间">
							{getFieldDecorator('thisContactTime', {
								rules: [{ required: true, message: '请选择本次联络时间' }],
							})(
								<DatePicker
									disabledDate={this.disabledStartDate}
									showTime={{ format: 'HH:mm' }}
									format="YYYY-MM-DD HH:mm"
									onChange={this.onStartChange} />
								)}
						</FormItem>
					</Col>
				</Row>
				<Row className='followup-flag'>
					<Col>
						<FormItem label="跟进标签" className="tagsWrap">
							{getFieldDecorator('followUpFlag')(
								<Input type="hidden" />
							)}
							{options.map((tag, index) => (
								<CheckableTag
									key={index}
									checked={selectedTags.indexOf(tag) > -1}
									onChange={checked => this.handleChange(tag, checked)}
								>
									{tag}
								</CheckableTag>
							))}
							<div className={isMustName}>请选择跟进标签</div>
						</FormItem>
					</Col>
				</Row>
				<Row className='followup-node'>
					<Col>
						<FormItem label="跟进节点" className="tagsWrap">
							{getFieldDecorator('followUpNode', {
								rules: [{ validator: this.isNode }],
							})(
								<RadioGroup size="large">
									<RadioButton value="暂无兴趣">暂无兴趣</RadioButton>
									<RadioButton value="待联系">待联系</RadioButton>
									<RadioButton value="电话介绍">电话介绍</RadioButton>
									<RadioButton value="确定KP">确定KP</RadioButton>
									<RadioButton value="上门介绍">上门介绍</RadioButton>
									<RadioButton value="意向强烈">意向强烈</RadioButton>
									<RadioButton value="确定合作">确定合作</RadioButton>
									<RadioButton value="沟通合作">沟通合作</RadioButton>
								</RadioGroup>
								)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...formItemLayout3} label="跟进内容" className="marginLeft">
							{getFieldDecorator('followUpTheContent', {
								rules: [{ validator: this.required }],
								onChange: this.companyIntroductionHandle('numb1', 200)
							})(
								<Input type="textarea" rows={3} />
								)}
							<p style={{
								position: 'relative',
								position: 'absolute',
								bottom: '0px',
								right: '0px',
								paddingRight: '10px',
								color: this.state.numb1.color,
							}}
							>{this.state.numb1.len}/200</p>
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<FormItem {...formItemLayout2} label="计划下次跟进时间">
							{getFieldDecorator('planNextContactTime')(
								<DatePicker
									disabledDate={this.disabledEndDate}
									showTime={{ format: 'HH:mm' }}
									format="YYYY-MM-DD HH:mm"
									onChange={this.onEndChange} />
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<FormItem {...formItemLayout4} label="计划下次跟进内容">
							{getFieldDecorator('planNextContent', {
								rules: [{ required: false, message: '请填写计划下次跟进内容(100个字符)' }],
								onChange: this.companyIntroductionHandle('numb2', 100)
							})(
								<Input type="textarea" rows={3} />
								)}
							<p style={{
								position: 'relative',
								position: 'absolute',
								bottom: '0px',
								right: '0px',
								paddingRight: '10px',
								color: this.state.numb2.color,
							}}
							>{this.state.numb2.len}/100</p>
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<FormItem >
						<Button key="submit" type="primary" size="default" htmlType="submit" onClick={this.handleOk}>确认</Button>
						<Button key="back" type="danger" size="default" style={{ marginRight: 20 }} onClick={this.handleCancel}>取消</Button>
					</FormItem>
				</Row>
			</Form>

		);
	}
}
export default ModalForm