import React from 'react';
import './DetailsFrom.css';
import { Form, Select, Input, Button, Table, Modal, Row, Col, DatePicker, notification } from 'antd';
import moment from 'moment'
import { connect_srm } from '../../../util/connectConfig';
import axios from '../../../util/axios'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import {
	tablemodelaction,
	modalmodelaction,
	modalmodelallaction
} from '../../actions'

import BrandSelector from '../../../components/business/uploaddetails';
import Modalmodellist from '../../components/Modalmodellist'

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

const renderContent = (value, row, index) => {
	const obj = {
		children: value,
		props: {},
	};
	return obj;
};

class DetailsFrom extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quotationId: '',
			selectedallKeys: [],
			parlist:{},
			brandSelectorVisible: false,
			quotation: {
				quotationId: '',//报价单编号
				companyName: '',//供应商
				contacts: '',//联系人
				contactsWay: '',//联系人电话
				userName: ''//上传者
			}
		};

		this.rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selectedallKeys: selectedRowKeys });
			},
		}

		this.columns = [{
			title: '规格编码',
			dataIndex: 'specCode',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '名称',
			dataIndex: 'pName',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '品牌',
			dataIndex: 'brand',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '类目',
			dataIndex: 'categoryName',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '规格型号',
			dataIndex: 'specParams',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '单位',
			dataIndex: 'unit',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '最小起订量',
			dataIndex: 'minQuantity',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '进价',
			dataIndex: 'price',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '税点',
			dataIndex: 'taux',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '发票类型',
			dataIndex: 'invoice',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '交期',
			dataIndex: 'deliveryTime',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '付款方式',
			dataIndex: 'payWay',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '最新编辑时间',
			dataIndex: 'updateTime',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '操作',
			dataIndex: 'Operation',
			className: 'column-money',
			render: (text, row, index) => {
				return <span><a href="javascript:;" onClick={() => this.uploaddetails(row)} >修改</a></span>;
			},
		}];
	}
	//页面加载之前调用URL地址的quotationId
	componentDidMount() {
		axios.get(connect_srm + '/queryCategoryList.do').then((res) => {
			var catNamelist = res.data.data;
			//const map = new Map();

			// catNamelist.forEach((o)=>{
			// 	map.set(o.cid, o.c_name)
			// })
			var quotationId = this.GetQueryString('quotationId');
			var { quotation, parlist} = this.state;
			this.setState({ quotationId: quotationId,parlist: { type:'',typeValue:'',quotationId:quotationId}});

			var params = { type: '', typeVale: '', quotationId: quotationId };
			//this.setState({ parlist: { type: type, typeValue: typeValue, quotationId: quotationId} });
			axios.get(connect_srm + '/quotation/viewQuotationSku.do', { params: params }).then((res) => {
				var data = res.data.data;
				if (res.data.code == 1) {
					//console.log(res.data.data);
					// const result = data.quotationSkus.map((v, index) => {
					// 	v.categoryName = map.get(parseInt(v.categoryName));
					// 	return v;
					// });

					this.setState({ quotation: { ...quotation, quotationId: data.quotation.quotationId, companyName: data.quotation.companyName, contacts: data.quotation.contacts, contactsWay: data.quotation.contactsWay, userName: data.quotation.userName, } })
					this.props.dispatch(tablemodelaction({ data:res.data.data.quotationSkus}));

				} else if (res.data.code == 0) {
					const args = {
						message: '提示：',
						description: res.data.msg,
						duration: 3,
					};
					notification.open(args);
				}

			}).catch((e) => {
				this.setState({ isFetching: false });
				console.log('data error');
			});

		}).catch((e) => {
			this.setState({ isFetching: false });
			console.log('data error');
		});

	}

	//获取URL参数
	GetQueryString = (name) => {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}


	 //批量删除
	 handledeleteall = () => {
		const { selectedallKeys, quotationId } = this.state;
		if(selectedallKeys==null ||selectedallKeys=="")
		{
			const args = {
				message: '提示：',
				description: '请选择需要删除的选择项',
				duration: 3,
			};
			notification.open(args);
		}else{
			this.props.dispatch(modalmodelallaction({ visible: true }))
		}
	}
	
	ModalhandleCancellist = (value) => () => {
        this.props.dispatch(modalmodelallaction({ [value]: false }))
	}
	
	ModalhandleallOk = () => {
		const { selectedallKeys, quotationId } = this.state;
		var params = { quotationId: quotationId, skuIds: selectedallKeys.join() };
		axios.get(connect_srm + '/quotation/delQuotationSkuByIds.do?', { params: params }).then((res) => {
			let code = res.data.code;
			if (code == 1) {
				this.props.dispatch(modalmodelallaction({ visible: false }))
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);

			} else {
				this.props.dispatch(modalmodelallaction({ visible: false }))
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);
			}
			this.subsellist();
		}).catch((e) => {
			this.setState({ isFetching: false });
			console.log('data error');
		});

	}
	
	//刷新列表信息
	subsellist = () => {
		var { pagination, parlist } = this.state;
		var params = parlist;
		console.log(params);
		axios.get(connect_srm + '/quotation/viewQuotationSku.do', { params: params }).then((res) => {
			console.log(res);
			var data = res.data.data;
			if (res.data.code == 1) {

				this.props.dispatch(tablemodelaction({ data: data.quotationSkus }));

			} else if (res.data.code == 0) {
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);
			}

		}).catch((e) => {
			this.setState({ isFetching: false });
			console.log('data error');
		});
	}

	//删除
	// handdel = () => {
	// 	const { selectedallKeys, quotationId } = this.state;
	// 	var params = { quotationId: quotationId, skuIds: selectedallKeys.join() };
	// 	axios.get(connect_srm + '/quotation/delQuotationSkuByIds.do?', { params: params }).then((res) => {
	// 		let code = res.data.code;
	// 		if (code == 1) {
	// 			const args = {
	// 				message: '提示：',
	// 				description: res.data.msg,
	// 				duration: 3,
	// 			};
	// 			notification.open(args);

	// 		} else {
	// 			const args = {
	// 				message: '提示：',
	// 				description: res.data.msg,
	// 				duration: 3,
	// 			};
	// 			notification.open(args);
	// 		}

	// 		// setTimeout(() => {
	// 		// 	location.reload();
	// 		// }, 1000);

	// 	}).catch((e) => {
	// 		this.setState({ isFetching: false });
	// 		console.log('data error');
	// 	});
	// }


	uploaddetails = (e) => {
		
		this.props.dispatch(modalmodelaction({ data: e }));

		this.setState({ brandSelectorVisible: true });
	}
	//查询列表
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			var { quotationId } = this.state;
			var typeValue = values.typeValue;
			if (typeValue == undefined || typeValue == null) {
				typeValue = "";
			}
			var type = values.type;
			if (type == "全部") {
				type = "";
			} else if (type == "规格型号") {
				type = "specParams";
			} else if (type == "规格编码") {
				type = "specCode";
			} else if (type == "名称") {
				type = "pName";;
			} else if (type == "品牌") {
				type = "brand";
			}
			var params = { type: type, typeValue: typeValue, quotationId: quotationId };
			this.setState({ parlist: { type: type, typeValue: typeValue, quotationId: quotationId} });
			axios.get(connect_srm + '/quotation/viewQuotationSku.do', { params: params }).then((res) => {

				var data = res.data.data;
				if (res.data.code == 1) {
					this.props.dispatch(tablemodelaction({ data: data.quotationSkus }));

				} else if (res.data.code == 0) {
					const args = {
						message: '提示：',
						description: res.data.msg,
						duration: 3,
					};
					notification.open(args);
				}

			}).catch((e) => {
				this.setState({ isFetching: false });
				console.log('data error');
			});

		});
	}

	handleChoosed = (bool, msg) => {
		if (bool == 'true') {
			this.setState({ brandSelectorVisible: false });

			const args = {
				message: '提示：',
				description: msg,
				duration: 2,
			};
			notification.open(args);

		} else {
			this.setState({ brandSelectorVisible: false });
			const args = {
				message: '提示：',
				description: msg,
				duration: 2,
			};
			notification.open(args);

		}
		setTimeout(() => {
			location.reload();
		}, 2000);
	}

	handleCancel = () => {
		this.setState({ brandSelectorVisible: false });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 5 },
			wrapperCol: { span: 15 },
		};
		var { quotation } = this.state;

		const { data } = this.props.tablemodel;
		const rowSelection = this.rowSelection;
		const columns = this.columns;
		return (
			<div>
				<div>
					<Form layout="horizontal" onSubmit={this.handleSubmit} className="pd20">
						<Row gutter={24} style={{ 'padding': '8px 0px', 'margin': '0px' }}>
							<Col span={4} style={{ 'paddingLeft': '0px' }}>
								<FormItem >
									{getFieldDecorator('type', { initialValue: '全部' })(
										<Select style={{ width: '100%' }}  >
											<Option value="规格型号">规格型号</Option>
											<Option value="规格编码">规格编码</Option>
											<Option value="名称">名称</Option>
											<Option value="品牌">品牌</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem >
									{getFieldDecorator('typeValue')(
										<Input style={{ width: '100%' }} />
									)}
								</FormItem>
							</Col>
							<Col span={7}>
							</Col>
							<Col span={5}>
								<Button type="primary" htmlType="submit" >查询</Button>
								<Button type="ghost" className="resetButton" onClick={this.handleReset}>重置</Button>
							</Col>
						</Row>
					</Form>
				</div>
				<div className="bjed"></div>
				<Row gutter={24} style={{ 'padding': '8px 30px', 'margin': '0px' }}>
					<Col span={5} style={{ 'padding': '3px 0px', 'margin': '0px' }}>报价单编号：<span>{this.state.quotation.quotationId}</span></Col>
					<Col span={5} style={{ 'padding': '3px 0px', 'margin': '0px' }}>供应商：<span>{this.state.quotation.companyName}</span></Col>
					<Col span={5} style={{ 'padding': '3px 0px', 'margin': '0px' }}>联系人：<span>{this.state.quotation.contacts}</span></Col>
					<Col span={5} style={{ 'padding': '3px 0px', 'margin': '0px' }}>联系电话：<span>{this.state.quotation.contactsWay}</span> </Col>
					<Col span={4} style={{ 'padding': '3px 0px', 'margin': '0px' }}>上传者：<span>{this.state.quotation.userName}</span> </Col>
				</Row>
				<div className="bjed"></div>

				<div className="pd20">
					<div className="tit"><div className="g-fl">商品信息</div></div>
					<Table columns={columns} dataSource={data} rowKey={record => record.id} bordered className="g-mt" rowSelection={rowSelection}
						footer={() => <div>
							<Button className="editable-add-btn" type="primary" onClick={this.handledeleteall}>删除</Button>
						</div>}
					/>

					<BrandSelector onChoosed={this.handleChoosed.bind(this)}
						visible={this.state.brandSelectorVisible}
						onCancel={this.handleCancel.bind(this)}
					/>


					<Modalmodellist  {...{ ...this.props.modalmodelall, ModalText: '确认全部删除吗？' }}
                            onOk={this.ModalhandleallOk} confirmLoading={this.props.modalmodelall.confirmLoading}
                            onCancel={this.ModalhandleCancellist('visible')} />

				</div>

			</div>
		)
	}
}

export default connect((state) => {
	return { ...state }
})(Form.create({
	mapPropsToFields(props) {
		return props.Infos
	},
	onFieldsChange(props, fields) {
		props.dispatch(baseInfoForm(fields))

	},
})(DetailsFrom));