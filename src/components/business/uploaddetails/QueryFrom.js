import React from 'react';
import './layout.css';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import {
	tablemodelaction,
	modalmodelaction
} from '../../../productdetails/action'

const FormItem = Form.Item
const Option = Select.Option
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../../../util/axios'
import { connect_srm } from '../../../util/connectConfig';
@connect(
	state => ({ detailsmodalmodel: state.detailsmodalmodel }),
)

class QueryFrom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			catNamelist: [],
		};
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		axios.get(connect_srm + '/queryCategoryList.do').then((res) => {
			var data = res.data.data;
			this.setState({ catNamelist: data });

		}).catch((e) => {
			this.setState({ isFetching: false });
			console.log('data error');
		});

		let form = this.props.detailsmodalmodel.data;
		var d1 = _.pick(form, ['id','quotationId', 'pName', 'brand', 'categoryName', 'specCode', 'unit', 'price', 'taux', 'minQuantity','invoice', 'deliveryTime', 'payWay']);
		d1 = _.omitBy(d1, _.isUndefined);
		this.props.form.setFieldsValue(d1);

	}

	handleSubmit = (e) => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				//console.log('Received values of form: ', values);
				//this.props.onQuery(values); //回调父方法
			}
		});
	}
	selectcatName = () => {
		const { catNamelist } = this.state;
		const categorysarr = catNamelist.map((v) => (
			<Option key={v['cid']}>{v['c_name']}</Option>)
		)
		return categorysarr;

	}

	detailsupdateSubmit=(e)=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			var params = { quotationId:values.quotationId,skuId:values.id,pName:values.pName,brand:values.brand,categoryName:values.categoryName,specCode:values.specCode,specParams:values.specParams,unit:values.unit,minQuantity:values.minQuantity,price:values.price,taux:values.taux,invoice:values.invoice,deliveryTime:values.deliveryTime,payWay:values.payWay};
			axios.get(connect_srm + '/quotation/editQuotationSkuById.do', {params: params }).then((res) => {
				if(res.data.code=="0")
				{
					this.props.onCancel('true',res.data.msg);
				}else{
					this.props.onCancel('false',res.data.msg);
				}
			}).catch((e) => {
				this.setState({ isFetching: false });
				console.log('data error');
			});
		});
	}
	closefrom=()=>{
		this.props.onclose('false');
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};

		return (
			<Form layout="horizontal" onSubmit={this.detailsupdateSubmit} className="pd20">
				<Row gutter={24} style={{ 'padding': '8px 0px' }}>
					<Col span={12}>
						{getFieldDecorator('id')(
							<Input type="hidden" />
						)}
						{getFieldDecorator('quotationId')(
							<Input type="hidden" />
						)}

						<FormItem label="规格编码"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('specCode', {
								rules: [{ required: false, message: '请输入规格编码' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>

					<Col span={12}>
						<FormItem label="最小起订量"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('minQuantity', {
								rules: [{ required: false, message: '请输入品牌' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>
				</Row>

				<Row gutter={24} style={{ 'padding': '8px 0px' }}>
					<Col span={12}>
						{getFieldDecorator('id')(
							<Input type="hidden" />
						)}
						<FormItem label="名称"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('pName', {
								rules: [{ required: false, message: '请输入名称' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>

					<Col span={12}>
						<FormItem label="品牌"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('brand', {
								rules: [{ required: false, message: '请输入品牌' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>
				</Row>

				<Row gutter={24} style={{ 'padding': '8px 0px' }}>
					<Col span={12}>
						<FormItem label="所属类目"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('categoryName', {
								rules: [{ required: false, message: '请选择所属类目' }],
							})(
								<Select  placeholder="请选择">
									{this.selectcatName()}
								</Select>
								)}
						</FormItem>
					</Col>

					<Col span={12}>
						<FormItem label="规格型号"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('specParams', {
								rules: [{ required: false, message: '规格型号' }],
							})(
								<Input placeholder="" />
								)}
						</FormItem>
					</Col>
				</Row>

				<Row gutter={24} style={{ 'padding': '8px 0px' }}>
					<Col span={12}>
						<FormItem label="单位"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('unit', {
								rules: [{ required: false, message: '' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>

					<Col span={12}>
						<FormItem label="进价(元)"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('price', {
								rules: [{ required: false, message: '' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>
				</Row>

				<Row gutter={24} style={{ 'padding': '8px 0px' }}>
					<Col span={12}>
						<FormItem label="税点"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('taux', {
								rules: [{ required: false, message: '' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>

					<Col span={12}>
						<FormItem label="发票类型"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('invoice', {
								rules: [{ required: false, message: '' }],
							})(
								<Select  placeholder="请选择">
									<Option value="普票">普票</Option>
									<Option value="专票">专票</Option>
								</Select>
								)}
						</FormItem>
					</Col>
				</Row>

				<Row gutter={24} style={{ 'padding': '8px 0px' }}>
					<Col span={12}>
						<FormItem label="交期"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('deliveryTime', {
								rules: [{ required: false, message: '' }],
							})(
								<Input />
								)}
						</FormItem>
					</Col>

					<Col span={12}>
						<FormItem label="付款方式"  {...formItemLayout} style={{ "width": "100%" }}>
							{getFieldDecorator('payWay', {
								rules: [{ required: false, message: '' }],
							})(
								<Select  placeholder="请选择">
									<Option value="线上付款">线上付款</Option>
									<Option value="线下转账">线下转账</Option>
								</Select>
								)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					
				</Row>	
				<Row>
				<Col span={16}>
				</Col>
					<Col span={8}>
						<Button type="ghost" className="resetButton" onClick={this.closefrom}>取消</Button>
						&nbsp;&nbsp;
						<Button type="primary" htmlType="submit" >确认</Button>
					</Col>
				</Row>				
			</Form>
		);
	}
}

export default QueryFrom;