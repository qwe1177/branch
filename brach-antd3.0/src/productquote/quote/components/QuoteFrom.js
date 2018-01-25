import React from 'react';
import './QuoteFrom.css';
import { Form, Select, Input, Button, Table, Modal, Row, Col, DatePicker, notification } from 'antd';
import moment from 'moment'
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import { connect_srm} from '../../../util/connectConfig';
import axios from '../../../util/axios'
import { render } from 'react-dom'
import Modalmodel from '../../components/Modalmodel'
import { connect } from 'react-redux'
import {
	tablemodelaction,
	modalmodelaction,
	modalmodelallaction
} from '../../actions'
import Modalmodellist from '../../components/Modalmodellist'
import { levelOptions } from '../../../util/options';
//axios.defaults.timeout = 30000;                        //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 

const renderContent = (value, row, index) => {
	const obj = {
		children: value,
		props: {},
	};
	return obj;
};
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
class QuoteFrom extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			usernamelist: [],
			isFetching: false,
			delids: '',
			parlist: {},
			selectedRowKeys: [],
			pagination: {
				showQuickJumper: false,
				showSizeChanger: true,
				total: 0,
				current: 1,
				pageSize: 10,
				showTotal: total => `共 ${total} 条`
			},
		};

		this.columns = [{
			title: '报价单编号',
			dataIndex: 'quotationId',
			className: 'column-money',
			render: (text, row, index) => {
				return (<a href='javascript:;' onClick={() => this.hrefdetails(row.quotationId)}>{text}</a>);
			},
		}, {
			title: '供应商名称',
			dataIndex: 'companyName',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '联系人信息',
			dataIndex: 'tel2',
			className: 'column-money',
			render: (text, row, index) => {
				return <span>{row.contacts}{row.contactsWay}</span>;
			},
		}, {
			title: '采购商名称',
			dataIndex: 'purchaseName',
			className: 'column-money',
			render: renderContent,
		}, {
			title: 'SKU数量',
			dataIndex: 'skuTotal',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '报价单',
			dataIndex: 'quotation',
			className: 'column-money',
			render: (text, row, index) => {
				return <span><a href='javascript:;' onClick={() => this.quotationuodown(row.quotationId)}>下载</a></span>;
			},
		}, {
			title: '上传者',
			dataIndex: 'userName',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '上传时间',
			dataIndex: 'createTime',
			className: 'column-money',
			render: renderContent,
		}, {
			title: '操作',
			dataIndex: 'Operation',
			className: 'column-money',
			render: (text, record, index) => {
				return (
					this.props.tablemodel.data.length > 0 ?
						(
							<div><a href='javascript:;' onClick={() => this.deleterow(record.quotationId)}>删除</a></div>
						) : null
				);
			}
		}];

		this.rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selectedallKeys: selectedRowKeys });
			},
		};

	}


	//页面加载前调用的函数(react生命周期);
	componentDidMount() {
		var { pagination, parlist } = this.state;
		var startDate = '';
		var endDate = '';
		var type = 'companyName'
		var ssUserId = ''
		var typeValue = ''
		var params = { type: type, startDate: startDate, endDate: endDate, ssUserId: ssUserId, typeValue: typeValue, pageNo: pagination.current, pageSize: pagination.pageSize };
		axios.get(connect_srm + '/quotation/viewQuotations.do', { params: params }).then((res) => {
			var data = res.data.data;
			if (res.data.code == 1) {
				this.setState({ pagination: { ...pagination, total: data.rowCount, pageSize: data.pageSize }, isFetching: false });
				this.props.dispatch(tablemodelaction({ data: data.quotations }));

				var paramsuuid = { pageNo: '' };
				axios.get(connect_srm + '/quotation/queryQuotationUploader.do', { params: paramsuuid }).then((res) => {

					let code = res.data.code;
					if (code == 1) {
						this.setState({ usernamelist: res.data.data });
					} else {
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
			} else if (res.data.code == 0) {
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);
			}
		})
		
	}
	

	restDefault = () => {
		this.setState({ usernamelist: [], isFetching: false, parlist: {}, pagination: { current: 1, total: 0, delids: '' } }); //重置数据
	}

	quotationuodown = (e) => {
		var token = getLoginInfo()['token'];

		window.location.href = connect_srm + '/quotation/exportQuotationData.do?token=' + token + '&quotationId=' + e;
	}

	hrefdetails = (quotationId) => {
		var systemId=this.GetQueryString('systemId');
		var moduleId=this.GetQueryString('moduleId');
		window.location.href = "/productdetails/details/index.html?systemId="+systemId+"&moduleId="+moduleId+"&quotationId="+quotationId;
	}

	GetQueryString = (name) => {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}

	//刷新列表信息
	subsellist = () => {
		var { parlist, pagination } = this.state;
			axios.get(connect_srm + '/quotation/viewQuotations.do', { params: parlist }).then((res) => {
				var data = res.data.data;
				//console.log(data);
				if (res.data.code == 1) {
					this.setState({ pagination: { ...pagination, total: data.rowCount }, isFetching: false });
					
					this.props.dispatch(tablemodelaction({ data: data.quotations }));
				} else if (res.data.code == 0) {
					const args = {
						message: '提示：',
						description: res.data.msg,
						duration: 3,
					};
					notification.open(args);
				}

			})
	}
	//单行删除
	ModalhandleOk = () => {
		const { delids } = this.state;
		var params = { quotationId: delids };
		axios.get(connect_srm + '/quotation/delQuotationById.do?', { params: params }).then((res) => {
			let code = res.data.code;
			if (code == 1) {

				this.props.dispatch(modalmodelaction({ visible: false }))
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);
				this.setState({ delids: '' });
			} else {
				this.props.dispatch(modalmodelaction({ visible: false }))
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);
				this.setState({ delids: '' });
			}
			this.subsellist();
		}).catch((e) => {
			this.setState({ isFetching: false });
			console.log('data error');
		});

	}
	// 删除单行报价单信息
	deleterow = (e) => {
		this.setState({ delids: e });
		this.props.dispatch(modalmodelaction({ visible: true }))
	}

	ModalhandleCancellist = (value) => () => {
        this.props.dispatch(modalmodelallaction({ [value]: false }))
	}
	
	//页面加载调用接口赋值option
	selectuserName = () => {
		const { usernamelist } = this.state;
		const categorysarr = usernamelist.map((v) => (
			<Option key={v['userId']}>{v['userName']}</Option>)
		)
		return categorysarr;
	}
	//多行删除
	ModalhandleallOk = () => {
		const { selectedallKeys } = this.state;
		var params = { quotationId: selectedallKeys.join() };
		axios.get(connect_srm + '/quotation/delQuotationById.do?', { params: params }).then((res) => {
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
	//多行删除弹窗
	deletelistall = () => {
		this.props.dispatch(modalmodelallaction({ visible: true }))
	}

	ModalhandleCancel = (value) => () => {
		this.props.dispatch(modalmodelaction({ [value]: false }))
	}

	handleTableChange = (pagi, filters, sorter) => {
		var { pagination, parlist } = this.state;
		parlist.pageNo = pagi.current;
		parlist.pageSize = pagi.pageSize;
		axios.get(connect_srm + '/quotation/viewQuotations.do', { params: parlist }).then((res) => {
			var data = res.data.data;
			if (res.data.code == 1) {
				this.setState({ pagination: { ...pagination, total: data.rowCount, current: pagi.current }, isFetching: false });

				this.props.dispatch(tablemodelaction({ data: data.quotations }));
			} else if (res.data.code == 0) {
				const args = {
					message: '提示：',
					description: res.data.msg,
					duration: 3,
				};
				notification.open(args);
			}

		})
	}

	//重置按钮
	handleReset= (e) => {
		this.props.form.setFieldsValue({ type: '企业名称',typeValue:'',ssUserId:'',startDate:'',endDate:'',createdate:''})
	}

	//查询按钮调用
	quoteSelect = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			var startDate = '';
			var endDate = '';
			var type = values.type;
			var ssUserId = values.ssUserId;
			var typeValue = values.typeValue;
			var { pagination, parlist } = this.state;
			if (!err) {

				if (type == "企业名称") {
					type = "companyName";
				} else if (type == "报价单编号") {
					type = "quotationId"
				} else {
					type = "contacts"
				}

				if (values.createdate && values.createdate.length > 0) {
					startDate = values.createdate[0].format("YYYY-MM-DD");
					endDate = values.createdate[1].format("YYYY-MM-DD");
				}

				var params = { type: type, startDate: startDate, endDate: endDate, ssUserId: ssUserId, typeValue: typeValue, pageNo: pagination.current, pageSize: pagination.pageSize };
				this.setState({ parlist: { type: type, startDate: startDate, endDate: endDate, ssUserId: ssUserId, typeValue: typeValue, pageNo: pagination.current, pageSize: pagination.pageSize } });
		
				axios.get(connect_srm + '/quotation/viewQuotations.do', { params: params }).then((res) => {
		
					var data = res.data.data;
					//console.log(data);
					if (res.data.code == 1) {
						this.setState({ pagination: { ...pagination, total: data.rowCount, pageSize: data.pageSize }, isFetching: false });

						this.props.dispatch(tablemodelaction({ data: data.quotations }));
					} else if (res.data.code == 0) {
						const args = {
							message: '提示：',
							description: res.data.msg,
							duration: 3,
						};
						notification.open(args);
					}

				})

			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		var { pagination, isFetching } = this.state;
		const columns = this.columns;
		const rowSelection = this.rowSelection;
		const { data } = this.props.tablemodel;

		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 5 },
			wrapperCol: { span: 12 },
		};
		const formItemLayout2 = {  //form中的label和内容各自占用多少
			labelCol: { span: 10 },
			wrapperCol: { span: 14 },
		};
		return (
			<div>
				<div>
					<Form layout="horizontal" className="pd10" onSubmit={this.quoteSelect}>
						<Row gutter={24} style={{ 'padding': '8px 0px' }}>
							<Col span={2} style={{ 'paddingLeft': '0px' }}>
								<FormItem >
									{getFieldDecorator('type', { initialValue: '企业名称' })(
										<Select style={{ width: '100%' }}  >
											 {levelOptions('产品报价').map(item => {
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
								<FormItem >
									{getFieldDecorator('typeValue')(
										<Input style={{ width: '100%' }} />
									)}
								</FormItem>
							</Col>
							<Col span={6}>
								<FormItem label="上传者"  {...formItemLayout} style={{ "width": "100%" }}>
									{getFieldDecorator('ssUserId')(
										<Select style={{ width: 150 }} placeholder="全部">
											{this.selectuserName()}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={7}>
								<FormItem {...formItemLayout} label="上传时间">
									{getFieldDecorator('createdate')(
										<RangePicker />
									)}
								</FormItem>
							</Col>
							<Col span={4}>
								<Button type="primary" htmlType="submit" >查询</Button>
								<Button type="ghost" className="resetButton" onClick={this.handleReset}>重置</Button>
							</Col>
						</Row>
						<Row gutter={24} style={{ 'padding': '8px 0px' }} className="skusum">
							<Col span={12}>
								SKU总数：<span>{this.state.pagination.total}</span>
							</Col>
						</Row>
					</Form>
				</div>
				<div className="bjed"></div>
				<div className="pd20">
					<div className="tit">
						<Button className="editable-delete-btn resetButton g-fl" type="primary"
							onClick={this.deletelistall}>删除</Button>
					</div>
					<Table columns={columns} onChange={this.handleTableChange} rowKey={record => record.quotationId} rowSelection={rowSelection} dataSource={data} bordered className="g-mt" pagination={pagination} loading={isFetching} />
				</div>
				<Modalmodel  {...{ ...this.props.modalmodel, ModalText: '确认删除吗？' }}
					onOk={this.ModalhandleOk} confirmLoading={this.props.modalmodel.confirmLoading}
					onCancel={this.ModalhandleCancel('visible')} />

				<Modalmodellist  {...{ ...this.props.modalmodelall, ModalText: '确认全部删除吗？' }}
                            onOk={this.ModalhandleallOk} confirmLoading={this.props.modalmodelall.confirmLoading}
                            onCancel={this.ModalhandleCancellist('visible')} />	

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
})(QuoteFrom));