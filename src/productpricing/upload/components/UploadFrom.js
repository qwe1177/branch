import React from 'react';
import './UploadFrom.css';
import { Form, Select, Input, Button, Table, Modal, Row, Col } from 'antd';
import moment from 'moment'
import PropTypes from 'prop-types'
//import { initBasicDate } from '../../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BrandSelector from '../../../components/business/uploadinquire';
import BrandBuyers from '../../../components/business/uploadbuyers';
const FormItem = Form.Item;
const Option = Select.Option;
// @connect(
// 	state => ({ QueryBasicDate: state.QueryBasicDate}),
// 	dispatch => bindActionCreators({ initBasicDate }, dispatch)
// )

class UploadFrom extends React.Component {

	static propTypes = {
		queryform: PropTypes.object,  //查询条件
	}
	state = {
		brandSelectorVisible: false,
		brandBuyersVisible: false,
		BuyersList: {
			name: 0,
			id: 0,
		},
		supplierList: {
			supplierId: '', //供应商ID
			contactsId: '', //联系人ID
			contacts: '', //联系人名称
			contactsWay: '', //联系人手机
		}
	};
	componentDidMount() {
		//this.props.form.setFieldsValue({brandIds:'1,2',brandNames:'奥迪,阿迪达斯'});
		document.getElementById('choosesupplier').setAttribute('readonly', true);
	}
	componentWillMount() {
		//this.props.initBasicDate();
		// console.log(this.props.infobasic());
	}
	handleOpenbuyers = () => {
		this.setState({ brandBuyersVisible: true });
	}

	handleOpenChoose = () => {
		this.setState({ brandSelectorVisible: true });
	}

	handleChoosed = (company) => {
		var { supplierList } = this.state;
		supplierList.supplierId = company.supplierId;
		supplierList.contactsId = company.contactsId;
		supplierList.contacts = company.companyuser;
		supplierList.contactsWay = company.companyipone;
		this.setState({ supplierList });
		var contact = company.companyuser + "/" + company.companyipone;
		this.props.form.setFieldsValue({ choosesupplier: company.companyName, contact: contact })
		this.setState({ brandSelectorVisible: false });
	}

	handleBuyersChoosed = (company) => {
		var { BuyersList } = this.state;
		BuyersList.name = company.name,
			BuyersList.id = company.id,
			this.setState({ BuyersList });
		this.props.form.setFieldsValue({ purchaserName: company.name })
		this.setState({ brandBuyersVisible: false });
	}


	handleCancel = () => {
		this.setState({ brandSelectorVisible: false });
	}
	handleBuyser = () => {
		this.setState({ brandBuyersVisible: false });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 5 },
			wrapperCol: { span: 15 },
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
		};

		return (
			<div>
				<div className="audit-tit"><div className="g-fl">基础信息</div></div>
				<Form layout="horizontal" onSubmit={this.handleSubmit} className="pd20">
					<Row gutter={24} style={{ 'padding': '8px 0px' }}>
						<Col span={12}>
							<FormItem label="供应商名称"  {...formItemLayout} style={{ "width": "100%" }}>
								{getFieldDecorator('choosesupplier', {
									rules: [{ required: false, message: '请点击选择供应商' }],
								})(
									<Input placeholder="请点击选择供应商" onClick={this.handleOpenChoose} readOnly />
									)}
							</FormItem>
						</Col>

						<Col span={12}>
							<FormItem label="联系人信息"  {...formItemLayout} style={{ "width": "100%" }}>
								{getFieldDecorator('contact', {
									rules: [{ required: false, message: '联系人信息' }],
								})(
									<Input placeholder="" readOnly />
									)}
							</FormItem>
						</Col>
					</Row>
					<Row gutter={24} style={{ 'padding': '8px 0px' }}>
						<Col span={12}>
							<FormItem label="采购商名称"  {...formItemLayout} style={{ "width": "100%" }}>
								{getFieldDecorator('purchaserName', {
									rules: [{ required: false, message: '请点击选择采购商' }],
								})(
									<Input placeholder="请点击选择采购商" onClick={this.handleOpenbuyers} readOnly />
									)}
							</FormItem>
						</Col>
					</Row>

					<BrandSelector onChoosed={this.handleChoosed.bind(this)}
						visible={this.state.brandSelectorVisible}
						onCancel={this.handleCancel.bind(this)}
					/>

					<BrandBuyers onChoosed={this.handleBuyersChoosed.bind(this)}
						visible={this.state.brandBuyersVisible}
						onCancel={this.handleBuyser.bind(this)}
					/>

				</Form>
			</div>
		)
	}
}

export default UploadFrom;