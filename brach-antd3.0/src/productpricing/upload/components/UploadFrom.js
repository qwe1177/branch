import React, { Component } from 'react'
import './UploadFrom.css';
import axios from '../../../util/axios'
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import { connect_srm, crmnew_url } from '../../../util/connectConfig';

import Modalmodellist from '../../components/Modalmodellist'

import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    notification,
} from 'antd'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash';
import {
    tablemodelaction,
    modalmodelallaction,
} from '../../actions'
import BrandSelector from '../../../components/business/uploadinquire';
import BrandBuyers from '../../../components/business/uploadbuyers';
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
class UploadFrom2 extends React.Component {
    state = {
        catNamelist: [],
        selectedallKeys: [],
        brandSelectorVisible: false,
        brandBuyersVisible: false,
        BuyersList: {
            name: '',
            id: '',
        },
        supplierList: {
            supplierId: '', //供应商ID
            contactsId: '', //联系人ID
            contacts: '', //联系人名称
            contactsWay: '', //联系人手机
        }
    };


    componentDidMount() {
        //页面加载调用类目接口
        axios.get(connect_srm + '/queryCategoryList.do').then((res) => {
            var data = res.data.data;
            this.setState({ catNamelist: data });
        }).catch((e) => {
            this.setState({ isFetching: false });
            console.log('data error');
        });

        var supplierId = getUrlParams()['supplierId'];
        if(supplierId!=undefined) {
            var params = { supplierId:supplierId };
            axios.get(connect_srm + '/clue/getCompanyInfo.do', { params: params }).then((res) => {
                if(res.data.code=='1') {
                    const data = res.data.data;
                    var { supplierList } = this.state;
                    supplierList.supplierId = data.supplierId;
                    supplierList.contactsId = data.contactsId;
                    supplierList.contacts = data.contacts;
                    supplierList.contactsWay = data.contactsWay;
                    this.setState({ supplierList });
                    var contact = data.contacts!=''?data.contacts + "/" + data.contactsWay:'';
                    this.props.form.setFieldsValue({ companyName: data.companyName, contact: contact })
                }else {
                    message('请求失败');
                }
            }).catch((e) => {
                console.log('data error');
            });
          
        }
       
    }

    constructor(props) {
        super(props);
        this.columns = [{
            title: '规格编码',
            dataIndex: 'specCode',
            className: 'column-money required',
            render: this.addinputdata,
        }, {
            title: '名称',
            dataIndex: 'pName',
            className: 'column-money required',
            render: this.addinputdata
        }, {
            title: '品牌',
            dataIndex: 'brand',
            className: 'column-money required',
            render: this.addinputdata
        }, {
            title: '所属类目',
            dataIndex: 'categoryName',
            className: 'column-money',
            render: this.categoryNamelist
        }, {
            title: '规格型号',
            dataIndex: 'specParams',
            className: 'column-money',
            render: this.addinputdata
        }, {
            title: '单位',
            dataIndex: 'unit',
            className: 'column-money',
            render: this.addinputdata
        }, {
            title: '最小起订量',
            dataIndex: 'minQuantity',
            className: 'column-money',
            render: this.addinputdata
        }, {
            title: '进价(元)',
            dataIndex: 'price',
            className: 'column-money required',
            render: this.addinputdata
        }, {
            title: '税点',
            dataIndex: 'taux',
            className: 'column-money',
            render: this.addinputdata
        }, {
            title: '发票',
            dataIndex: 'invoice',
            className: 'column-money',
            render: this.addselectdata
        }, {
            title: '交期',
            dataIndex: 'deliveryTime',
            className: 'column-money widthmonery',
            render: this.addinputdata
        }, {
            title: '付款方式',
            dataIndex: 'payWay',
            className: 'column-money',
            render: this.addpayWaydata
        }, {
            title: '操作',
            dataIndex: 'Operation',
            className: 'column-money',
            width: 50,
            render: (text, record, index) => {
                return (
                    this.props.tablemodel.data.length > 0 ?
                        (
                            <div><a href='javascript:;' onClick={() => this.deleterow(index)}>{text}</a>
                            </div>) : null
                );
            },
        }]


        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                const { selectedallKeys } = this.state
                //console.log(selectedRowKeys);
                this.setState({ selectedallKeys: selectedRowKeys });
            },
        };

    };

    beforeUpload(file) {
        const reg = /(xls$)|(xlsx$)/;
        const isimgtype = reg.test(file.name);
        if (!isimgtype) {
            message.error('上传文件类型不符合！');
        }
        const isLt4M = file.size / 1024 / 1024 < 8;
        if (!isLt4M) {
            message.error('图片大小超过8M！');
        }
        return isimgtype && isLt4M;
    }

    uploads = {
        name: 'file',
        action: `${connect_srm}/quotation/uploadExcelQuotation.do?token=${getLoginInfo()['token']}`,
        onChange: (info) => {
            const status = info.file.status;
            if (status !== 'uploading') {
                //console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                if (info.file.response.code == 1) {
                    var respdata = info.file.response.data;
                    const { count, data } = this.props.tablemodel;
                    var respdatas = respdata.map((v) => {
                        var d1 = _.pick(v, ['id', 'specCode', 'pName', 'brand', 'categoryName', 'specParams', 'unit', 'minQuantity', 'price', 'taux', 'invoice', 'deliveryTime', 'payWay']);
                        d1 = _.omitBy(d1, _.isUndefined);
                        return d1;
                    })

                    var newrespList = respdatas.map((v,index) => {
                        return ({
                            id: count + index + '',
                            specCode: {
                                name: `specCode` + (count + index + ''),
                                initialValue: v.specCode,
                                message: '请输入规格编码',
                                placeholder: '请输入规格编码',
                                required: true
                            },
                            pName: {
                                name: `pName` + (count + index + ''),
                                initialValue: v.pName,
                                message: '请输入名称',
                                placeholder: '请输入名称',
                            },
                            brand: {
                                name: `brand` + (count + index + ''),
                                initialValue: v.brand,
                                message: '请输入品牌',
                                placeholder: '请输入品牌',
                                required: true
                            },
                            categoryName: {
                                name: `categoryName` + (count + index + ''),
                                initialValue: v.categoryName,
                                message: '请选择所属类目',
                                placeholder: '请选择所属类目',
                            },
                            specParams: {
                                name: `specParams` + (count + index + ''),
                                initialValue: v.specParams,
                                message: '请输入规格型号',
                                placeholder: '请输入规格型号',
                            },
                            unit: {
                                name: `unit` + (count + index + ''),
                                initialValue: v.unit,
                                message: '请输入单位',
                                placeholder: '请输入单位',
                            },
                            minQuantity: {
                                name: `minQuantity` + (count + index + ''),
                                initialValue: v.minQuantity,
                                message: '请输入最小起订量',
                                placeholder: '请输入最小起订量',
                            },
                            price: {
                                name: `price` + (count + index + ''),
                                initialValue: v.price,
                                message: '请输入进价(元)',
                                placeholder: '请输入进价(元)',
                            },
                            taux: {
                                name: `taux` + (count + index + ''),
                                initialValue: v.taux,
                                message: '请输入税点',
                                placeholder: '请输入税点',
                            },
                            invoice: {
                                name: `invoice` + (count + index + ''),
                                initialValue: v.invoice,
                                message: '请选择发票',
                                placeholder: '请选择发票',
                            },
                            deliveryTime: {
                                name: `deliveryTime` + (count + index + ''),
                                initialValue: v.deliveryTime,
                                message: '请输入交期',
                                placeholder: '请输入交期',
                            },
                            payWay: {
                                name: `payWay` + (count + index + ''),
                                initialValue: v.payWay,
                                message: '请输入付款方式',
                                placeholder: '请输入付款方式',
                            },
                            Operation: '删除',

                        });

                    });
                    this.props.dispatch(tablemodelaction({ data: [...data, ...newrespList], count: parseInt(newrespList[newrespList.length-1].id)+ 1, }))
                } else {

                    if (info.file.response.msg =='' || info.file.response.msg == undefined) {
                        const args = {
                            message: '提示：',
                            description: '上传文件错误',
                            duration: 3,
                        };
                        notification.open(args);
                        //message.error(`${info.file.name} file upload failed.`);
                    } else {
                        const args = {
                            message: '提示：',
                            description: info.file.response.msg,
                            duration: 3,
                        };
                        notification.open(args);
                    }
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
    //添加一行数据：
    handleAdd = () => {
        const { count, data } = this.props.tablemodel;
        const newData = {
            id: count + '',
            specCode: { name: 'specCode' + count, message: '请输入规格编码', placeholder: '请输入规格编码', required: true },
            pName: { name: 'pName' + count, message: '请输入名称', placeholder: '请输入名称', required: true },
            brand: { name: 'brand' + count, message: '请输入品牌', placeholder: '请输入品牌', required: true },
            categoryName: { name: 'categoryName' + count, message: '请选择所属类目', placeholder: '请选择所属类目', required: false, },
            specParams: { name: 'specParams' + count, message: '请输入规格型号', placeholder: '请输入规格型号', required: false, },
            unit: { name: 'unit' + count, message: '请输入单位', placeholder: '请输入单位', required: false, },
            minQuantity: { name: 'minQuantity' + count, message: '请输入最小起订量', placeholder: '请输入最小起订量', required: false, },
            price: { name: 'price' + count, message: '请输入进价(元)', placeholder: '请输入进价(元)', required: true, },
            taux: { name: 'taux' + count, message: '请输入税点', placeholder: '请输入税点', required: false, },
            invoice: { name: 'invoice' + count, message: '请选择发票类型', placeholder: '请选择发票类型', required: false, },
            deliveryTime: { name: 'deliveryTime' + count, message: '请输入交期', placeholder: '请输入交期', required: false, },
            payWay: { name: 'payWay' + count, message: '请选择付款方式', placeholder: '请选择付款方式', required: false, },
            Operation: '删除',
        };
        this.props.dispatch(tablemodelaction({ data: [...data, newData], count: count + 1, }))
    }

    //发票选择方法:
    addselectdata = ({ name, message, placeholder = '', initialValue = undefined }) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{ required: false, message: message }], initialValue: initialValue
        })(
            <Select style={{ width: 80 }} placeholder="请选择">
                <Option value="普票">普票</Option>
                <Option value="专票">专票</Option>
            </Select>
            )}

    </FormItem>)

    //付款方式方法：
    addpayWaydata = ({ name, message, placeholder = '', initialValue = undefined }) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{ required: false, message: message }], initialValue: initialValue
        })(
            <Select style={{ width: 80 }} placeholder="请选择">
                <Option value="线上付款">线上付款</Option>
                <Option value="线下转账">线下转账</Option>
            </Select>
            )}
    </FormItem>)


    ModalhandleCancellist = (value) => () => {
        this.props.dispatch(modalmodelallaction({ [value]: false }))
    }
    //类目选择
    categoryNamelist = ({ name, message, placeholder = '', initialValue = undefined }) => (
        <FormItem>
            {this.props.form.getFieldDecorator(name, {
                rules: [{ required: false, message: message }], initialValue: initialValue
            })(
                <Select style={{ width: 80 }} placeholder="请选择">
                    {this.selectcatName()}
                </Select>
                )}
        </FormItem>
    )

    selectcatName() {
        const { catNamelist } = this.state;
        var res = [];
        var json = {};
        catNamelist.forEach((o)=>{
            if(!json[o['c_name']]){
                res.push(o);
                json[o['c_name']] = 1;
            }
        });

        const categorysarr = res.map((v,index) => (
            <Option key={index} value={v['c_name']}>{v['c_name']}</Option>)

        )
        return categorysarr;
    }

    //批量删除确认
    ModalhandleallOk = () => {
        const { selectedallKeys } = this.state;
        const data = [...this.props.tablemodel.data];
        var set = new Set(selectedallKeys);
        const del = data.filter((v) => {
            if (!set.has(v.id)) {
                return v;
            }
        });
        this.props.dispatch(tablemodelaction({ data: del }));
        this.props.dispatch(modalmodelallaction({ visible: false }))
    }

    //批量删除
    handledeleteall = () => {
        this.props.dispatch(modalmodelallaction({ visible: true }))
    }
    //单条删除
    deleterow = (index) => {
        const data = [...this.props.tablemodel.data];
        const delkey = index;
        data.splice(delkey, 1);
        this.props.dispatch(tablemodelaction({ data: data }));
    }

    //上传表单
    //下载excel表单
    excelbtn = () => {
        var token = getLoginInfo()['token'];
        //var urlParams = getUrlParams();
        //var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        window.location.href = connect_srm + '/quotation/downloadQuotationTemplate.do?token=' + token;
    }
    addinputdata = ({ name, message, placeholder = '', initialValue = '', required = false, type = 'string' }) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{ required: required, message: message, type: type }], initialValue: initialValue
        })(
            <Input placeholder={placeholder} style={{ width: '100%' }} />
            )}
    </FormItem>)

    //Start
    handleCancel = () => {
        this.setState({ brandSelectorVisible: false });
    }
    handleBuyser = () => {
        this.setState({ brandBuyersVisible: false });
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
        var contact = company.companyuser!=''?company.companyuser + "/" + company.companyipone:'';
        this.props.form.setFieldsValue({ companyName: company.companyName, contact: contact })
        this.setState({ brandSelectorVisible: false });
    }

    handleBuyersChoosed = (company) => {
        var { BuyersList } = this.state;
        if(company!=undefined) {
            BuyersList.name = company.name,
            BuyersList.id = company.id,
            this.setState({ BuyersList });
        }
        this.props.form.setFieldsValue({ purchaserName: (company!=undefined?company.name:'') })
        this.setState({ brandBuyersVisible: false });
    }

    objToarrsort = (obj) => {
        var arr = [], arr2 = [], newarr;
        for (let i in obj) {
            if (i.match(/\d+$/g)) {
                arr.push([i, obj[i]]);
            } else {
                arr2.push([i, obj[i]]);
            }
        }

        arr.sort((a, b) => a[0].match(/\d+$/g).join('') * 1 - b[0].match(/\d+$/g).join('') * 1)
        newarr = [...arr, ...arr2]
        return newarr;
    }

    objTodata = (obj) => {
        const arr = []
        for (let o in obj) {
            if (obj[o]) {
                arr.push(o + '=' + obj[o])
            }
        }
        return arr.join('&')
    }

    hrefhost = () => {
        window.location.reload();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                const params = {}
                const newarrobj = this.objToarrsort(values);
     
                const newarrobjlen = newarrobj.length;
                var { supplierList, BuyersList } = this.state;
                for (let i = 0; i < newarrobjlen; i++) {

                    const re = /\d+$/g;
                    const arr0 = newarrobj[i][0]
                    const arr1 = newarrobj[i][1]
                    if (re.test(arr0)) {
                        const key = arr0.replace(/(.*?)\d+/, '$1')

                        if (Reflect.has(params, key)) {
                            params[key].push(arr1)
                        } else {
                            params[key] = []
                            params[key].push(arr1)
                        }

                    } else {
                        params[arr0] = arr1
                    }
                }

               
                const newparams = {}
                for (let o in params) {
                        if (params[o]) {
                            newparams[o] = params[o]
                        
                    }
                }
          
                newparams.contactsId = supplierList.contactsId;
                newparams.contacts = supplierList.contacts;
                newparams.contactsWay = supplierList.contactsWay;
                newparams.supplierId = supplierList.supplierId;
                newparams.purchaseId = BuyersList.id;
                newparams.purchaseName = BuyersList.name;
                const data = this.objTodata(newparams)
                axios.post(connect_srm + '/quotation/addQuotationSku.do', data).then((res) => {
                    if (res.data.code == 1) {
                        const args = {
                            message: '提示：',
                            description: res.data.msg,
                            duration: 3,
                        };

                        notification.open(args);
                        setTimeout(() => {
                            this.hrefhost();
                        }, 3000);

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
        const { data } = this.props.tablemodel;
        const columns = this.columns;
        const rowSelection = this.rowSelection;
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
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <div className="pd20">
                        <div className="audit-tit"><div className="g-fl">基础信息</div></div>
                        <Row gutter={24} style={{ 'padding': '8px 0px' }}>
                            <Col span={12}>
                                <FormItem label="供应商名称"  {...formItemLayout} style={{ "width": "100%" }}>
                                    {getFieldDecorator('companyName', {
                                        rules: [{ required: true, message: '请点击选择供应商' }],
                                    })(
                                        <Input placeholder="请点击选择供应商" onClick={this.handleOpenChoose} readOnly />
                                        )}
                                </FormItem>
                            </Col>

                            <Col span={12}>
                                <FormItem label="联系人信息"  {...formItemLayout} style={{ "width": "100%" }}>
                                    {getFieldDecorator('contact', {
                                        rules: [{ required: true, message: '请联系人信息' }],
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

                    </div>
                    <div className="bjed"></div>
                    <div className="pd20">
                        <div className="tit">
                            <div className="g-fl">商品信息</div>
                        </div>
                        <Table columns={columns} rowKey={record => record.id} dataSource={data} pagination={false} bordered className="g-mt"
                            rowSelection={rowSelection}
                            footer={() => <div style={{ textAlign: 'center' }}>

                                <Button className="editable-add-btn" onClick={this.handleAdd}>+添加一条商品</Button></div>} />
                        <div className="com_ishdh">
                            <Button className="editable-delete-btn resetButton g-fl" type="primary"
                                onClick={this.handledeleteall}>删除</Button>
                            <Upload {...this.uploads} className="g-fl" beforeUpload={this.beforeUpload} showUploadList={false} >
                                <Button className="editable-listall-btn resetButton">批量上传</Button>
                            </Upload>
                            <span className="editable-excel-btn resetButton g-fl"><a href="javascript:;"
                                onClick={this.excelbtn}>下载Excel模板</a> （必须按模板格式并且文件大小不得超过8M）</span>
                        </div>

                        <Modalmodellist  {...{ ...this.props.modalmodelall, ModalText: '确认全部删除吗？' }}
                            onOk={this.ModalhandleallOk} confirmLoading={this.props.modalmodelall.confirmLoading}
                            onCancel={this.ModalhandleCancellist('visible')} />
                    </div>

                    <div className="submit left-margin-30">
                        <Row style={{ 'padding': '8px 0px' }}>
                            <FormItem>
                                <Button style={{ padding: '2px 55px' }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    提交
                </Button>
                            </FormItem>
                        </Row>
                    </div>
                </Form>
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
})(UploadFrom2));
