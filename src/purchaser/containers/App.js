import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    tablemodelaction3,
    fetchPosts,
    fetchcitysPosts
} from '../actions'
import Modalmodel  from '../components/Modalmodel'
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
    message
} from 'antd'
import 'antd/dist/antd.css'
import '../css/css.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import axios from 'axios'
const RangePicker = DatePicker.RangePicker;


class UserForm extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: (<div><em style={{color:'#ff0000',marginRight:'5px'}}>*</em>姓名</div>),
            dataIndex: 'name',
            render: this.addinputdata,
            width: 80,
        }, {
            title: '性别',
            className: 'column-money',
            dataIndex: 'sex',
            render: this.addselectdata,
            width: 60,
        }, {
            title: (<div><em style={{color:'#ff0000',marginRight:'5px'}}>*</em>手机</div>),
            dataIndex: 'phone',
            render: this.addinputdata,
            width: 105,
        },
            {
                title: '固话',
                dataIndex: 'tel',
                render: this.addinputdata,
            },
            {
                title: '职位',
                dataIndex: 'profession',
                render: this.addinputdata,
            },
            {
                title: '生日',
                dataIndex: 'Birthday',
                render: this.addinputdata,

            },
            {
                title: '邮箱',
                dataIndex: 'email',
                render: this.addinputdata,
            },
            {
                title: '传真',
                dataIndex: 'fax',
                render: this.addinputdata,
            },
            {
                title: '旺旺',
                dataIndex: 'wangwang',
                render: this.addinputdata,
            },
            {
                title: 'QQ',
                dataIndex: 'QQ',
                render: this.addinputdata,
            },
            {
                title: '微信',
                dataIndex: 'weixin',
                render: this.addinputdata,
            },
            {
                title: '备注',
                dataIndex: 'mark',
                render: this.addinputdata,
            },
            {
                title: '操作',
                width: 60,
                dataIndex: 'Operation',
                render: (text, record, index) => {
                    return (
                        this.props.tablemodel.data.length > 1 ?
                            (
                                <div><a onClick={this.Modalshow(index)}>{text}</a>
                                </div>) : null
                    );
                },
            }];

        this.columns2 = [{
            title: '序号',
            dataIndex: 'No',
            width: 50,
            render: text=>text,
        }, {
            title: '品牌名称',
            className: 'column-money',
            dataIndex: 'BrandName',
            width: 160,
            render: this.addinputdata,
        }, {
            title: '品牌类型',
            dataIndex: 'BrandType',
            render: this.addinputdata,
            width: 160,
        },
            {
                title: '授权书',
                dataIndex: 'powerofAttorney',
                render: this.adduploaddata,
                width: 160,
            },
            {
                title: '注册证',
                dataIndex: 'registCard',
                render: this.adduploaddata,
                width: 160,
            },
            {
                title: '认证报告',
                dataIndex: 'AuditReports',
                render: this.adduploaddata,
                width: 160,

            },
            {
                title: '其他资料',
                dataIndex: 'OtherInformation',
                render: this.adduploaddata,
                width: 160,
            },
            {
                title: '操作',
                width: 60,
                dataIndex: 'Operation',
                render: (text, record, index) => {
                    return (
                        this.props.tablemodel2.data2.length > 1 ?
                            (
                                <div><a onClick={this.Modalshow2(index)}>{text}</a>
                                </div>) : null
                    );
                },
            }];

        this.cttextcolumns = [{
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '冲突内容',
            dataIndex: 'content',
        }, {
            title: '操作',
            dataIndex: 'Operation',
        }];


    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const reg = /jpeg|jpg|png|gif/;
        const isimgtype = reg.test(file.type);
        if (!isimgtype) {
            message.error('上传图片类型不符合！');
        }
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
            message.error('图片大小超过4M！');
        }
        return isimgtype && isLt4M;
    }


    uploadhandleChange = (name)=>(info) => {
        if (info.file.status === 'uploading') {
            this.getBase64(info.file.originFileObj, imageUrl => this.props.dispatch(baseInfoForm({
                [name]: {
                    name: name,
                    value: imageUrl
                }
            })));
        }
    }

    hasErrors = (fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);


    addinputdata = ({name, message, placeholder = '', required = false, type = 'string'}) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: required, message: message, type: type}],
        })(
            <Input placeholder={placeholder} style={{width:'100%'}}/>
        )}
    </FormItem>)

    addselectdata = ({name, message, placeholder = ''}) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: false, message: message}],
        })(
            <Select style={{ width: 50 }} placeholder="请选择">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>
        )}
    </FormItem>)

    adduploaddata = ({name, message, placeholder = '', num = 1}) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: false, message: message}],
            onChange: this.uploadonChange,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
        })(
            <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                {this.uploadicon(name, num)}
            </Upload>
        )}
    </FormItem>)


    handleAdd = () => {
        const {count, data} = this.props.tablemodel;
        const newData = {
            key: count + '',
            name: {name: 'name' + count, message: '请输入姓名', placeholder: '姓名', required: true},
            sex: {name: 'sex' + count, message: '请选择性别', placeholder: '性别',},
            phone: {name: 'phone' + count, message: '请输入手机', placeholder: '手机', required: true},
            tel: {name: 'tel' + count, message: '请输入固话', placeholder: '固话',},
            profession: {name: 'profession' + count, message: '请输入职位', placeholder: '职位',},
            Birthday: {name: 'Birthday' + count, message: '请输入生日', placeholder: '生日',},
            email: {name: 'email' + count, message: '请输入邮箱', placeholder: '邮箱', required: false, type: 'email',},
            fax: {name: 'fax' + count, message: '请输入传真', placeholder: '传真',},
            wangwang: {name: 'wangwang' + count, message: '请输入旺旺', placeholder: '旺旺',},
            QQ: {name: 'QQ' + count, message: '请输入QQ', placeholder: 'QQ',},
            weixin: {name: 'weixin' + count, message: '请输入微信', placeholder: '微信',},
            mark: {name: 'mark' + count, message: '请输入备注', placeholder: '备注',},
            Operation: '删除',
        };

        this.props.dispatch(tablemodelaction({data: [...data, newData], count: count + 1,}))
    }

    handleAdd2 = () => {
        const {count, data2} = this.props.tablemodel2;
        const newData = {
            key: count + '',
            No: count + '',
            BrandName: {name: 'BrandName' + count, message: '请输入品牌名称', placeholder: '品牌名称',},
            BrandType: {name: 'BrandType' + count, message: '请输入品牌类型', placeholder: '品牌类型',},
            powerofAttorney: {name: 'powerofAttorney' + count, message: '请上传授权书', placeholder: '授权书',},
            registCard: {name: 'registCard' + count, message: '请上传注册证', placeholder: '注册证',},
            AuditReports: {name: 'AuditReports' + count, message: '请上传认证报告', placeholder: '认证报告',},
            OtherInformation: {name: 'OtherInformation' + count, message: '请上传其他资料', placeholder: '其他资料',},
            Operation: '删除',
        };

        this.props.dispatch(tablemodelaction2({data2: [...data2, newData], count: count + 1,}))
    }


    Modalshow = (index)=>()=> {
        this.props.dispatch(modalmodelaction({visible: true,}))
        this.props.dispatch(tablemodelaction({delkey: index,}))
    }
    Modalshow2 = (index)=>()=> {
        this.props.dispatch(modalmodelaction({visible2: true,}))
        this.props.dispatch(tablemodelaction2({delkey2: index,}))
    }
    ModalhandleOk = ()=> {
        const data = [...this.props.tablemodel.data];
        const delkey = this.props.tablemodel.delkey;
        data.splice(delkey, 1);
        this.props.dispatch(modalmodelaction({ModalText: '删除中···', confirmLoading: true,}))
        setTimeout(() => {
            this.props.dispatch(tablemodelaction({data: data,}));
            this.props.dispatch(modalmodelaction({
                visible: false,
                confirmLoading: false,
            }));

        }, 1000);
    }

    ModalhandleOk2 = ()=> {
        const data2 = [...this.props.tablemodel2.data2];
        const delkey2 = this.props.tablemodel2.delkey2;
        data2.splice(delkey2, 1);
        this.props.dispatch(modalmodelaction({ModalText: '删除中···', confirmLoading: true,}))
        setTimeout(() => {
            this.props.dispatch(tablemodelaction2({data2: data2,}));
            this.props.dispatch(modalmodelaction({
                visible2: false,
                confirmLoading: false,
            }));

        }, 1000);
    }
    ModalhandleCancel = (value) =>()=> {
        this.props.dispatch(modalmodelaction({[value]: false}))
    }


    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.dispatch(baseInfoForm({name: {name: name, value: value}}))
    }

    handleChange = (name = 'name')=>(value) => {
        this.props.dispatch(baseInfoForm({[name]: {name: name, value: value}}))
    }


    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }


    componentDidMount() {

        const {dispatch} = this.props
        dispatch(fetchPosts('categoryChild'))
        dispatch(fetchcitysPosts({name: 'province', value: '', returnName: 'provinces'}))
    }


    componentDidUpdate(nextProps, nextState) {

    }

    ajaxpost = false
    isajaxpost = true

    handleSubmit = (e) => {
        e.preventDefault();
        this.ajaxpost = true
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    jcbuttion = () => {
        this.ajaxpost = true
        this.props.form.validateFieldsAndScroll(['CompanyName'], {force: true},
            (err) => {
                if (err) {
                    return false;
                }
            },
        );

    }


    timechange = (time, timeString)=> {
        this.props.dispatch(baseInfoForm({'rangeTime': timeString}));

    }

    CompanyNamehandle = (rule, value, callback) => {
        const userNameres1 = /^[^\s]+$/g, userNameres2 = /.{20,}/g;
        if (!userNameres1.test(value)) {
            this.ajaxpost = false;
            callback('请输入企业名称')
        } else if (userNameres2.test(value)) {
            this.ajaxpost = false;
            callback('企业名称不能超过20个字符')
        } else if (this.ajaxpost) {
            this.props.dispatch(baseInfoForm({jsbutton: true}))
            axios.get('http://localhost:3333/testApi/js', {
                params: {
                    username: value
                }
            }).then(response => {
                if (response.status == 200) {
                    this.isajaxpost = false
                    if (response.data.usernameState == -1) {

                        this.props.dispatch(modalmodelaction({jsbuttionVisible: true,}))
                        this.props.dispatch(tablemodelaction3({
                            data3: response.data.data,
                            count: response.data.data.length
                        }))
                        callback()
                    }
                } else {
                    callback()
                }
                this.props.dispatch(baseInfoForm({jsbutton: false}))
                this.ajaxpost = false;

            })
        } else if (this.isajaxpost) {
            callback('企业名称还未检测！')
        } else {
            callback()
        }
    }


    bindinghandle = (rule, value, callback) => {
        const reg = /^\s*$/g;
        if (!reg.test(value)) {
            axios.get('http://localhost:3333/testApi/binding', {
                params: {
                    username: value
                }
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.error == -1) {
                        callback('账户名不存在')
                    } else if (response.data.error == -2) {
                        callback('该账户名已被其它企业绑定')
                    }
                } else {
                    callback()
                }
            })
        } else {
            callback()
        }

    }


    normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }


    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}], onChange: this.timechange,
    }

    handlePreview = (file) => {

        this.props.dispatch(modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        }));

    }


    handleCancel2 = () => this.props.dispatch(modalmodelaction({previewVisible: false,}))

    handleCancel3 = () => this.props.dispatch(modalmodelaction({jsbuttionVisible: false,}))


    uploadsprops2 = {
        name: 'file',
        listType: 'picture',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        action: '//jsonplaceholder.typicode.com/posts/',
    }


    uploadonChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            message.success(`${info.file.name} 图片上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 图片上传失败.`);
        }
    }

    provincehandle = (name, returnName)=>(value)=> {
        this.props.dispatch(fetchcitysPosts({name, value: value['key'], returnName}))
    }

    companyIntroductionHandle = (n, v)=>(e)=> {
        const {value} = e.target;
        const len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            n.style.color = "#ff0000";
            return false;
        }
        n.style.color = ''
        n.innerHTML = len + `/${v}`
    }


    uploadIcon = (<Icon type="plus" className="avatar-uploader-trigger"
                        style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>)

    uploadicon = (id, num, ic = this.uploadIcon)=>
        this.props.Infos[id] && this.props.Infos[id].value && this.props.Infos[id].value.length >= num ? null : ic


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;


        const {data} = this.props.tablemodel;
        const {data2} = this.props.tablemodel2;
        const columns = this.columns;
        const columns2 = this.columns2;

        const {
            categoryChild, jsbutton, province, provinces, city, citys, county, countys, town, towns, registAddressCitys
        } = this.props.Infos;
        const categorysarr = categoryChild ? categoryChild.map((v, i, a)=>(
            <Option key={v['value']}>{v['name']}</Option>)) : []
        const provincesarr = provinces ? provinces.map((v, i, a)=>(<Option key={v['value']}>{v['name']}</Option>)) : []
        const citysarr = citys ? citys.map((v, i, a)=>(<Option key={v['value']}>{v['name']}</Option>)) : []
        const countysarr = countys ? countys.map((v, i, a)=>(<Option key={v['value']}>{v['name']}</Option>)) : []
        const townsarr = towns ? towns.map((v, i, a)=>(<Option key={v['value']}>{v['name']}</Option>)) : []
        const registAddressCitysarr = registAddressCitys ? registAddressCitys.map((v, i, a)=>(
            <Option key={v['value']}>{v['name']}</Option>)) : []
        const provinceText = province ? province.value ? province.value.label + ' ' : '' : '';
        const cityText = city ? city.value ? city.value.label + ' ' : '' : '';
        const countyText = county ? county.value ? county.value.label + ' ' : '' : '';
        const townText = town ? town.value ? town.value.label + ' ' : '' : '';
        const addressText = provinceText + cityText + countyText + townText


        const cttext = <div>
            <p style={{textAlign:'left',padding:'10px 0px'}}>
                您添加的线索可能与以下{this.props.tablemodel3.count}个企业的资料冲突,请确认是否继续添加</p>
            <Table
                columns={this.cttextcolumns}
                pagination={false}
                dataSource={this.props.tablemodel3.data3}
                bordered
            />
            <p><Button type="primary" style={{marginTop:'20px'}} onClick={this.handleCancel3}>确认添加</Button></p>
        </div>
        return (
            <div className="newCluewk">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="newCluewk">
                        <div className="newCluenk">
                            <div className="title">基础资料</div>
                            <div className="content">

                                <Row style={{'padding':'8px 0px'}}>

                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem   {...{...this.formItemLayout, ...{wrapperCol: {span: 19}}}}
                                            label="企业名称" style={{"width":"100%"}}

                                        >
                                            {getFieldDecorator('CompanyName', {
                                                rules: [{
                                                    validator: this.CompanyNamehandle
                                                }], initialValue: '',
                                            })(
                                                <Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />}
                                                       placeholder="请输入企业名称" name="companyName"
                                                       style={{"width":"320px","marginRight":"5px"}}/>
                                            )}
                                            <Button type="primary" onClick={this.jcbuttion}
                                                    disabled={jsbutton}>检测</Button>
                                            <Modalmodel  {...{
                                                ...this.props.modalmodel,
                                                visible: this.props.modalmodel.jsbuttionVisible,
                                                title: '冲突提示',
                                                width: '650px',
                                                style: {'maxWidth': '100%'},
                                            }}
                                                ModalText={cttext} footer={null} onCancel={this.handleCancel3}/>
                                        </FormItem>


                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="经营品类"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >


                                            {getFieldDecorator('category', {
                                                rules: [{
                                                    required: false, message: '点击选择经营的类目', type: 'array',
                                                }], initialValue: [],
                                            })(
                                                <Select
                                                    mode="multiple"

                                                    placeholder="点击选择经营的类目"
                                                    onChange={this.handleChange}
                                                    style={{ width: '100%' }}
                                                >

                                                    {categorysarr}
                                                </Select>
                                            )}

                                        </FormItem>


                                    </Col>
                                </Row>
                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <Col span={5}>
                                            <div
                                                style={{display:'block',verticalAlign:'middle',textAlign:'right',lineHeight:'29px',paddingRight:'10px',color:'rgba(0, 0, 0, 0.85)'}}>
                                                绑定账号 :
                                            </div>
                                        </Col>
                                        <Col span={19}>
                                            <Col span={12}>
                                                <FormItem>
                                                    <Button type="primary">csc86</Button>
                                                    {getFieldDecorator('BindingAccount1', {
                                                        rules: [{
                                                            validator: this.bindinghandle
                                                        }], initialValue: '', validateTrigger: 'onBlur'
                                                    })(
                                                        <Input placeholder="输入账号"
                                                               style={{'width':'120px','margin':'0px 5px'}}/>
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={12}>
                                                <FormItem>
                                                    <Button type="primary">buy5j</Button>
                                                    {getFieldDecorator('BindingAccount2', {
                                                        rules: [{
                                                            validator: this.bindinghandle
                                                        }], initialValue: '', validateTrigger: 'onBlur'
                                                    })(
                                                        <Input placeholder="输入账号"
                                                               style={{'width':'120px','margin':'0px 5px'}}/>
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Col>

                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="来源"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('sourceSelect', {
                                                rules: [{required: false, message: '请选择来源'}],
                                            })(
                                                <Select style={{ width: 240 }} placeholder="请选择来源">
                                                    <Option value="kfai1">自行开发1</Option>
                                                    <Option value="kaifa2">自行开发2</Option>
                                                </Select>
                                            )}


                                        </FormItem>

                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="线索级别"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('levelSelect', {
                                                rules: [{required: false, message: '请选择'}],
                                            })(
                                                <Select style={{ width: 240 }} placeholder="请选择">
                                                    <Option value="级别1">级别一</Option>
                                                    <Option value="级别2">级别二</Option>
                                                </Select>
                                            )}


                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="是否新增SKU"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('orSku', {
                                                rules: [{required: false, message: '请选择'}],

                                            })(
                                                <RadioGroup name="orSku">
                                                    <Radio value={1}>是</Radio>
                                                    <Radio value={2}>否</Radio>
                                                </RadioGroup>
                                            )}

                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="企业性质"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('propertySelect', {
                                                rules: [{required: false, message: '请选择'}],
                                            })(
                                                <Select style={{ width: 240 }} placeholder="请选择">
                                                    <Option value="性质一">性质一</Option>
                                                    <Option value="性质二">性质二</Option>
                                                </Select>
                                            )}


                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="企业网址"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('Website', {
                                                rules: [{required: false, message: '请输入网址'}],
                                            })(
                                                <Input placeholder="请输入网址" id="success"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="优势产品"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('Advantage', {
                                                rules: [{required: false, message: '请填写优势产品'}],
                                            })(
                                                <Input placeholder="请填写优势产品"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="旺铺地址"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('shopSite', {
                                                rules: [{required: false, message: '请填写旺铺地址'}],
                                            })(
                                                <Input placeholder="请填写旺铺地址"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="经营品牌"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('brand', {
                                                rules: [{
                                                    required: false, message: '点击选择经营的类目', type: 'array',
                                                }], initialValue: [],
                                            })(
                                                <Select
                                                    mode="multiple"

                                                    placeholder="点击选择经营的类目"
                                                    onChange={this.handleChange}
                                                    style={{ width: '100%' }}
                                                >
                                                    {categorysarr}
                                                </Select>
                                            )}


                                        </FormItem>

                                        <FormItem
                                            label="联系地址"  {...this.formItemLayout}
                                            style={{"width":"100%",'marginTop':'5px'}}
                                        >

                                            {getFieldDecorator('orOut', {
                                                rules: [{required: false, message: '请选择'}],
                                                onChange: this.onChange, initialValue: 2,
                                            })(
                                                <RadioGroup onChange={this.onChange}>
                                                    <Radio value={1}>城内</Radio>
                                                    <Radio value={2}>城外</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label=""  {...{
                                            ...this.formItemLayout, ...{
                                                wrapperCol: {
                                                    span: 19,
                                                    offset: 5
                                                }
                                            }
                                        }} style={{"width":"100%",'marginTop':'5px'}} colon={false}
                                        >
                                            {getFieldDecorator('province', {
                                                rules: [{required: false, message: '请选择省'}],
                                            })(
                                                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                                                        placeholder="请选择省"
                                                        onChange={this.provincehandle('province','citys')}>
                                                    {provincesarr}
                                                </Select>
                                            )}

                                            {getFieldDecorator('city', {
                                                rules: [{required: false, message: '请选择市'}],
                                            })(
                                                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                                                        placeholder="请选择市"
                                                        onChange={this.provincehandle('city','countys')}>
                                                    {citysarr}
                                                </Select>
                                            )}

                                            {getFieldDecorator('county', {
                                                rules: [{required: false, message: '请选择镇'}],
                                            })(
                                                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                                                        placeholder="请选择镇"
                                                        onChange={this.provincehandle('county','towns')}>
                                                    {countysarr}
                                                </Select>
                                            )}

                                            {getFieldDecorator('town', {
                                                rules: [{required: false, message: '请选择县'}],
                                            })(
                                                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                                                        placeholder="请选择县">
                                                    {townsarr}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label=""  {...{
                                            ...this.formItemLayout, ...{
                                                wrapperCol: {
                                                    span: 19,
                                                    offset: 5
                                                }
                                            }
                                        }} style={{"width":"100%",'marginTop':'10px'}} colon={false}
                                        >
                                            {getFieldDecorator('address', {
                                                rules: [{required: false, message: '详细地址'}],
                                            })(
                                                <Input addonBefore={addressText} placeholder="详细地址（注意：只填写路、门号等详细地址）"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>

                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="主营业务"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('business', {
                                                rules: [{required: false, message: '请填写主营业务(50个字符)'}],
                                                onChange: this.companyIntroductionHandle(this.numb1, 50)
                                            })(
                                                <div style={{position:'relative'}}>
                                                    <Input type="textarea" rows={3} placeholder="请填写主营业务(50个字符)"/>
                                                    <p style={{position:'relative',position: 'absolute',bottom: '0px',right: '0px',paddingRight:'10px'}}
                                                       ref={(node) => {this.numb1 = node}}>0/50</p>
                                                </div>
                                            )}

                                        </FormItem>

                                        <FormItem
                                            label="备注"  {...this.formItemLayout}
                                            style={{"width":"100%",'marginTop':'15px'}}
                                        >
                                            {getFieldDecorator('remark', {
                                                rules: [{required: false, message: '请填写备注(50个字符)'}],
                                                onChange: this.companyIntroductionHandle(this.numb2, 50)
                                            })(
                                                <div style={{position:'relative'}}>
                                                    <Input type="textarea" rows={3} placeholder="请填写备注(50个字符)"/>
                                                    <p style={{position:'relative',position: 'absolute',bottom: '0px',right: '0px',paddingRight:'10px'}}
                                                       ref={(node) => {this.numb2 = node}}>0/50</p>
                                                </div>
                                            )}

                                        </FormItem>

                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="newCluenk">
                            <div className="title">联系人资料（手机或固话至少填写一项）</div>
                            <div className="content">
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={false}
                                    bordered
                                    footer={() =><div style={{textAlign:'center'}}><Button className="editable-add-btn" onClick={this.handleAdd}>+添加联系人</Button></div>}
                                />

                                <Modalmodel  {...{...this.props.modalmodel, ModalText: '确认删除吗？'}}
                                    onOk={this.ModalhandleOk} confirmLoading={this.props.modalmodel.confirmLoading}
                                    onCancel={this.ModalhandleCancel('visible')}/>
                            </div>
                        </div>
                        <div className="newCluenk">
                            <div className="title">营业品控资料</div>
                            <div className="content">
                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="营业执照注册号"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('registNumber', {
                                                rules: [{required: false, message: '请输入营业执照注册号'}],
                                            })(
                                                <Input placeholder="营业执照注册号"/>
                                            )}


                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="营业执照注册地"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('registAddressProvince', {
                                                rules: [{required: false, message: '请选择省'}],
                                            })(
                                                <Select labelInValue style={{"width":"45%","marginRight":"5px"}}
                                                        placeholder="请选择省"
                                                        onChange={this.provincehandle('province','registAddressCitys')}>
                                                    {provincesarr}
                                                </Select>
                                            )}

                                            {getFieldDecorator('registAddressCity', {
                                                rules: [{required: false, message: '请选择市'}],
                                            })(
                                                <Select labelInValue style={{"width":"45%","marginRight":"5px"}}
                                                        placeholder="请选择市">
                                                    {registAddressCitysarr}
                                                </Select>
                                            )}

                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="营业执照期限"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('range-time', this.rangeConfig)(
                                                <RangePicker style={{"width":"65%"}}/>
                                            )}


                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="登记机构"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('RegistAgencies', {
                                                rules: [{required: false, message: '请输入登记机构'}],
                                            })(
                                                <Input placeholder="登记机构"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="企业法人"  {...{...this.formItemLayout, ...{wrapperCol: {span: 19}}}}
                                            style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('legalPerson', {
                                                rules: [{required: false, message: '请输入企业法人'}],
                                            })(
                                                <Input placeholder="企业法人"
                                                       style={{width:'65%','marginRight':'10px'}}/>
                                            )}
                                            {getFieldDecorator('orwomen', {
                                                rules: [{required: false, message: '请选择'}],
                                            })(
                                                <RadioGroup name="orwomen">
                                                    <Radio value={1}>先生</Radio>
                                                    <Radio value={2}>女士</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>

                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="身份证号"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('IdCard', {
                                                rules: [{required: false, message: '请输入身份证号'}],
                                            })(
                                                <Input placeholder="身份证号"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="法人身份证"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('registIdCard', {
                                                rules: [{required: false, message: '请上传法人身份证'}],
                                                onChange: this.uploadonChange,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                    <Icon type="plus" className="avatar-uploader-trigger"
                                                          style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                                                </Upload>
                                            )}

                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="营业执照"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('BusinessLicense', {
                                                rules: [{required: false, message: '请上传'}],
                                                onChange: this.uploadonChange,
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                    {this.uploadicon('BusinessLicense', 1)}
                                                </Upload>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="一般人纳税资质"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('payAptitudes', {
                                                rules: [{required: false, message: '请上传'}],
                                                onChange: this.uploadonChange,
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                    {this.uploadicon('payAptitudes', 1)}
                                                </Upload>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="法人授权书/代理人授权书"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('powerAttorney', {
                                                rules: [{required: false, message: '请上传'}],
                                                onChange: this.uploadonChange,
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                    {this.uploadicon('powerAttorney', 1)}
                                                </Upload>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="廉洁承诺书"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('Undertaking', {
                                                rules: [{required: false, message: '请上传'}],
                                                onChange: this.uploadonChange,
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                    {this.uploadicon('Undertaking', 1)}
                                                </Upload>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="办公场所"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('Office', {
                                                rules: [{required: false, message: '请上传'}],
                                                onChange: this.uploadonChange,
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                    {this.uploadicon('Office', 3)}
                                                </Upload>
                                            )}

                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="生产车间/仓库"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('Workshop', {
                                                rules: [{required: false, message: '请上传'}],
                                                onChange: this.uploadonChange,
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
                                                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}
                                                                                multiple={true}>
                                                    {this.uploadicon('Workshop', 3)}
                                                </Upload>
                                            )}

                                            <Modalmodel  {...{
                                                ...this.props.modalmodel,
                                                visible: this.props.modalmodel.previewVisible,
                                                title: '',
                                                width: '650px',
                                                style: {'maxWidth': '100%'}
                                            }} footer={null} onCancel={this.handleCancel2}
                                               ModalText={(<img alt='example' style={{ 'maxWidth': '100%' }} src={this.props.modalmodel.previewImage} />)}/>
                                        </FormItem>
                                    </Col>

                                </Row>
                            </div>
                        </div>
                        <div className="newCluenk">
                            <div className="title">经营品牌</div>
                            <div className="content">

                                <Table
                                    columns={columns2}
                                    pagination={false}
                                    dataSource={data2}
                                    bordered
                                    footer={() =><div style={{textAlign:'center'}}><Button className="editable-add-btn" onClick={this.handleAdd2}>+添加经营品牌</Button></div>}
                                />

                                <Modalmodel  {...{
                                    ...this.props.modalmodel,
                                    visible: this.props.modalmodel.visible2,
                                    ModalText: '确认删除吗?',
                                }}
                                    onOk={this.ModalhandleOk2} confirmLoading={this.props.modalmodel.confirmLoading}
                                    onCancel={this.ModalhandleCancel('visible2')}/>
                            </div>
                        </div>
                        <div className="newCluenk" style={{marginBottom: '0px'}}>
                            <div className="title">企业规模</div>
                            <div className="content">

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="支持来料加工"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >

                                            {getFieldDecorator('processing', {
                                                rules: [{required: false, message: '请选择'}],
                                                onChange: this.onChange,
                                            })(
                                                <RadioGroup>
                                                    <Radio value={1}>支持</Radio>
                                                    <Radio value={2}>不支持</Radio>
                                                </RadioGroup>
                                            )}

                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="管理体系认证"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('ManagementSystem', {
                                                rules: [{required: false, message: '请选择'}],

                                            })(
                                                <Select style={{ width: 240 }}
                                                        placeholder="请选择">
                                                    <Option value="管理体系认证1">管理体系认证1</Option>
                                                    <Option value="管理体系认证2">管理体系认证2</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="经营模式"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('BusinessModel', {
                                                rules: [{required: false, message: '请选择'}],

                                            })(
                                                <Select style={{ width: 240 }}
                                                        placeholder="请选择">
                                                    <Option value="经营模式1">经营模式1</Option>
                                                    <Option value="经营模式2">经营模式2</Option>
                                                </Select>
                                            )}

                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="注册资本"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('registeredCapital', {
                                                rules: [{required: false, message: '请选择'}],

                                            })(
                                                <Select style={{ width: 240 }}
                                                        placeholder="请选择">
                                                    <Option value="注册资本1">注册资本1</Option>
                                                    <Option value="注册资本2">注册资本2</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="员工数量"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('employeesNumber', {
                                                rules: [{required: false, message: '请选择'}],

                                            })(
                                                <Select style={{ width: 240 }}
                                                        placeholder="请选择">
                                                    <Option value="员工数量1">员工数量</Option>
                                                    <Option value="员工数量2">员工数量</Option>
                                                </Select>
                                            )}

                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="年营业额"  {...this.formItemLayout} style={{"width":"100%"}}
                                        >
                                            {getFieldDecorator('Turnover', {
                                                rules: [{required: false, message: '请选择'}],

                                            })(
                                                <Select style={{ width: 240 }}
                                                        placeholder="请选择">
                                                    <Option value="年营业额1">年营业额</Option>
                                                    <Option value="年营业额">年营业额</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row style={{'padding':'8px 0px'}}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem
                                            label="公司介绍"  {...this.formItemLayout}
                                            style={{"width":"100%",'marginTop':'0px'}}
                                        >
                                            {getFieldDecorator('companyIntroduction', {
                                                rules: [{required: false, message: '请填写公司介绍'}],
                                                onChange: this.companyIntroductionHandle(this.numb3, 100)
                                            })(
                                                <div style={{position:'relative'}}>
                                                    <Input type="textarea" rows={3} placeholder="请填写公司介绍"/>
                                                    <p style={{position:'relative',position: 'absolute',bottom: '0px',right: '0px',paddingRight:'10px'}}
                                                       ref={(node) => {this.numb3 = node}}>0/100</p>
                                                </div>
                                            )}

                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                    </div>
                    <div className="submit">
                        <Row style={{'padding':'8px 0px'}}>
                            <FormItem>
                                <Button style={{padding:'2px 55px'}}
                                        type="primary"
                                        htmlType="submit"
                                        disabled={this.hasErrors(getFieldsError())}
                                >
                                    提交
                                </Button>
                            </FormItem>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect((state) => {
    return {...state}
})(Form.create({
    mapPropsToFields(props) {
        return props.Infos
    },
    onFieldsChange(props, fields) {
        props.dispatch(baseInfoForm(fields))

    },
})(UserForm));

