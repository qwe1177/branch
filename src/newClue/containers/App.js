import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel  from '../components/Modalmodel'
import * as config  from '../../util/connectConfig'


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
} from 'antd'
import 'antd/dist/antd.css'
import '../css/css.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import axios from 'axios'
const RangePicker = DatePicker.RangePicker;
axios.defaults.timeout = 30000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头

import CategorySelector from '../../components/business/categoryselector';
import BrandSelector from '../../components/business/brandselector';


class UserForm extends Component {

    constructor(props) {
        super(props);

        this.columns = [{
            title: (<div><em style={{color:'#ff0000',marginRight:'5px'}}>*</em>姓名</div>),
            dataIndex: 'fullname',
            render: this.addinputdata,
            width: 115,
        }, {
            title: '性别',
            className: 'column-money',
            dataIndex: 'gender',
            render: this.addselectdata,
            width: 115,
        }, {
            title: (<div><em style={{color:'#ff0000',marginRight:'5px'}}>*</em>手机</div>),
            dataIndex: 'mobile',
            render: this.addinputdata,
            width: 115,
        },
            {
                title: '固话',
                dataIndex: 'telephone',
                render: this.addinputdata,
                width: 125,
            },
            {
                title: '职位',
                dataIndex: 'position',
                render: this.addinputdata,
                width: 115,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                render: this.addbirthday,
                width: 115,

            },
            {
                title: '邮箱',
                dataIndex: 'email',
                render: this.addinputdata,
                width: 115,
            },
            {
                title: '传真',
                dataIndex: 'fax',
                render: this.addinputdata,
                width: 125,
            },
            {
                title: '旺旺',
                dataIndex: 'wangwang',
                render: this.addinputdata,
                width: 125,
            },
            {
                title: 'QQ',
                dataIndex: 'qq',
                render: this.addinputdata,
                width: 115,
            },
            {
                title: '微信',
                dataIndex: 'weixin',
                render: this.addinputdata,
                width: 115,
            },
            {
                title: '备注',
                dataIndex: 'remark',
                render: this.addinputdata,
            },
            {
                title: '操作',
                width: 60,
                dataIndex: 'del',
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
            dataIndex: 'brankName',
            width: 160,
            render: this.addinputdata,
        }, {
            title: '品牌类型',
            dataIndex: 'brankType',
            render: this.addinputdata,
            width: 160,
        },
            {
                title: '授权书',
                dataIndex: 'authorizations',
                render: this.adduploaddata,
                width: 160,
            },
            {
                title: '注册证',
                dataIndex: 'registrations',
                render: this.adduploaddata,
                width: 160,
            },
            {
                title: '认证报告',
                dataIndex: 'certifications',
                render: this.adduploaddata,
                width: 160,

            },
            {
                title: '其他资料',
                dataIndex: 'otherAptitudes',
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
            dataIndex: 'companyName',
        }, {
            title: '类型',
            dataIndex: 'conflictType',
        }, {
            title: '冲突内容',
            dataIndex: 'conflict',
        }, {
            title: '操作',
            dataIndex: 'Operation',
            render: v=>'查看',
        }];


    }

    handleOpenChoose = () => {
        this.setState({brandSelectorVisible: true});
    }
    handleOpenChooseForCategory = () => {
        this.setState({categorySelectorVisible: true});
    }
    handleChoosed = (ids, labels) => {
        this.props.form.setFieldsValue({mainBrand: labels, mainBrandId: ids});
        this.setState({brandSelectorVisible: false});
    }
    handleCancel = () => {
        this.setState({brandSelectorVisible: false});
    }
    handleChoosedForCategory = (ids, labels) => {
        this.props.form.setFieldsValue({varietyName: labels, varietyId: ids});
        this.setState({categorySelectorVisible: false});
    }
    handleCancelForCategory = () => {
        this.setState({categorySelectorVisible: false});
    }
    getLastSelectBrand = () => {
        var labelstr = this.props.form.getFieldValue('mainBrand');
        var idstr = this.props.form.getFieldValue('mainBrandId');
        return {labelstr, idstr}
    }
    getLastSelectCategory = () => {
        var idstr = this.props.form.getFieldValue('varietyId');
        return idstr;
    }


    state = {
        brandSelectorVisible: false,
        categorySelectorVisible: false
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

    telphonevalid = (rule, value, callback)=> {
        const reg = /^1\d{10}$/;
        if (!reg.test(value)) {
            callback('请输入正确的手机号码')
        } else {
            callback()
        }
    }


    uploadhandleChange = (name)=>(info) => {
        if (info.file.status === 'uploading') {
            this.getBase64(info.file.originFileObj, imageUrl => this.props.baseInfoForm({
                [name]: {
                    name: name,
                    value: imageUrl
                }
            }));
        }
    }

    hasErrors = (fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);


    addinputdata = ({name, message, placeholder = '', required = false, type = 'string',}) => (
        <FormItem style={{width:'100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type}, {
                    validator: name == 'mobile1' ? this.telphonevalid : null,
                }],
            })(
                <Input placeholder={placeholder} style={{width:'100%'}}/>
            )}
        </FormItem>)

    addbirthday = ({name, message, placeholder = '',}) => (<FormItem style={{width:'100%'}} {...{
        ...this.formItemLayout, ...{
            wrapperCol: {
                span: 24,
            }
        }
    }}>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: false, message: message,}],
        })(
            <DatePicker placeholder={placeholder} style={{width:'100%'}}/>
        )}
    </FormItem>)


    addselectdata = ({name, message, placeholder = ''}) => (<FormItem style={{width:'100%'}} {...{
        ...this.formItemLayout, ...{
            wrapperCol: {
                span: 24,
            }
        }
    }}>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: false, message: message}],
        })(
            <Select style={{ width: '100%'}} placeholder="请选择">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>
        )}
    </FormItem>)

    adduploaddata = ({name, message, placeholder = '', num = 1}) => {
        const newname = name.replace(/(.*?)s(\d+)$/g, '$1$2')
        return (<FormItem style={{width:'100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}],
                onChange: this.uploadonChange(newname),
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
            })(
                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                    {this.uploadicon(name, num)}
                </Upload>
            )}
            {this.props.form.getFieldDecorator(newname)(
                <Input type='hidden'/>
            )}

        </FormItem>)
    }


    handleAdd = () => {
        const {count, data} = this.props.tablemodel;
        const newData = {
            key: count + '',
            fullname: {name: 'fullname' + count, message: '请输入姓名', placeholder: '姓名', required: true},
            gender: {name: 'gender' + count, message: '请选择性别', placeholder: '性别',},
            mobile: {name: 'mobile' + count, message: '请输入手机', placeholder: '手机', required: true},
            telephone: {name: 'telephone' + count, message: '请输入固话', placeholder: '固话',},
            position: {name: 'position' + count, message: '请输入职位', placeholder: '职位',},
            birthday: {name: 'birthday' + count, message: '请输入生日', placeholder: '生日',},
            email: {name: 'email' + count, message: '请输入邮箱', placeholder: '邮箱', required: false, type: 'email',},
            fax: {name: 'fax' + count, message: '请输入传真', placeholder: '传真',},
            wangwang: {name: 'wangwang' + count, message: '请输入旺旺', placeholder: '旺旺',},
            qq: {name: 'qq' + count, message: '请输入QQ', placeholder: 'QQ',},
            weixin: {name: 'weixin' + count, message: '请输入微信', placeholder: '微信',},
            remark: {name: 'remark' + count, message: '请输入备注', placeholder: '备注',},
            del: '删除',
        };

        this.props.tablemodelaction({data: [...data, newData], count: count + 1,})
    }

    handleAdd2 = () => {
        const {count, data2} = this.props.tablemodel2;
        const newData = {
            key: count + '',
            No: count + '',
            brankName: {name: 'brankName' + count, message: '请输入品牌名称', placeholder: '品牌名称',},
            brankType: {name: 'brankType' + count, message: '请输入品牌类型', placeholder: '品牌类型',},
            authorizations: {name: 'authorizations' + count, message: '请上传授权书', placeholder: '授权书',},
            registrations: {name: 'registrations' + count, message: '请上传注册证', placeholder: '注册证',},
            certifications: {name: 'certifications' + count, message: '请上传认证报告', placeholder: '认证报告',},
            otherAptitudes: {name: 'otherAptitudes' + count, message: '请上传其他资料', placeholder: '其他资料',},
            Operation: '删除',
        };

        this.props.tablemodelaction2({data2: [...data2, newData], count: count + 1,})
    }


    Modalshow = (index)=>()=> {
        this.props.modalmodelaction({visible: true,})
        this.props.tablemodelaction({delkey: index,})
    }
    Modalshow2 = (index)=>()=> {
        this.props.modalmodelaction({visible2: true,})
        this.props.tablemodelaction2({delkey2: index,})
    }
    ModalhandleOk = ()=> {
        const data = [...this.props.tablemodel.data];
        const delkey = this.props.tablemodel.delkey;
        data.splice(delkey, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction({data: data,});
            this.props.modalmodelaction({
                visible: false,
                confirmLoading: false,
            });

        }, 500);
    }

    ModalhandleOk2 = ()=> {
        const data2 = [...this.props.tablemodel2.data2];
        const delkey2 = this.props.tablemodel2.delkey2;
        data2.splice(delkey2, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction2({data2: data2,});
            this.props.modalmodelaction({
                visible2: false,
                confirmLoading: false,
            });

        }, 500);
    }
    ModalhandleCancel = (value) =>()=> {
        this.props.modalmodelaction({[value]: false})
    }


    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.baseInfoForm({name: {name: name, value: value}})
    }

    handleChange = (value) => {
        //this.props.baseInfoForm({[name]: {name: name, value: value}})
        console.log(value)
    }


    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }

    formItemLayout2 = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }


    componentDidMount() {

        //this.props.fetchPosts('categoryChild')
        this.props.fetchzonesPosts({
            url: `${config.connect_srm}/clue/getZone.do`,
            name: 'id',
            value: '',
            returnName: 'provinces'
        })
        this.props.fetchzonesPosts({
            url: `${config.connect_srm}/clue/getArea.do`,
            name: 'id',
            value: '',
            returnName: 'Hareas'
        })
    }


    componentDidUpdate(nextProps, nextState) {

    }

    ajaxpost = false
    isajaxpost = true


    objToarrsort = (obj)=> {
        let arr = [], arr2 = [], newarr;
        for (let i in obj) {
            if (i.match(/\d+/g)) {
                arr.push([i, obj[i]]);
            } else {
                arr2.push([i, obj[i]]);
            }
        }

        arr.sort((a, b)=> {
            a[0].match(/\d+/g).join('') - b[0].match(/\d+/g).join('')
        })
        newarr = [...arr, ...arr2]
        return newarr;
    }

    objTodata = (obj)=> {
        const arr = []
        for (let o in obj) {
            if (obj[o]) {
                arr.push(o + '=' + obj[o])
            }
        }
        return arr.join('&')
    }

    handleSubmit = (e) => {
        typeof e=='object'&&e.preventDefault();
        console.log(e)
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {

                const params = {}
                console.log(values)
                const newarrobj = this.objToarrsort(values)
                const newarrobjlen = newarrobj.length

                for (let i = 0; i < newarrobjlen; i++) {

                    const re = /\d+$/g;
                    const arr0 = newarrobj[i][0]
                    const arr1 = newarrobj[i][1]
                    if (re.test(arr0)) {
                        const key = arr0.replace(/(.*)\d+/, '$1')
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
                    if (typeof params[o] === 'object') {
                        if (params[o].constructor === Array) {
                            if (o == 'deadline') {
                                newparams[o] = params[o].map(v=>v?v.format("YYYY-MM-DD"):'').join(',')
                            }
                            if (o == 'birthday') {
                                newparams[o] = params[o].map(v=>v?v.format("YYYY-MM-DD"):'').join(',')
                            }
                            if (typeof params[o][0] != 'object') {
                                newparams[o] = params[o].join(',')
                            }
                        } else {
                            newparams[o] = params[o].label
                        }
                    } else {
                        if (params[o]) {
                            newparams[o] = params[o]
                        }
                    }
                }
                typeof e=='string'&&(()=>newparams[e]='ok')()
                const data = this.objTodata(newparams)
                axios.post(`${config.connect_srm}/clue/addSupplierClue.do`, data)
                    .then(response=>{
                        const code= response.data.code
                        if(code==2){
                            this.props.modalmodelaction({submitVisible: true,})
                            this.props.tablemodelaction4({
                                data4: response.data.data,
                                count: response.data.data.length
                            })
                        }else if(code==0){
                            message.error(`${response.data.msg}`);
                        }else if(code==1){
                            message.success(`${response.data.msg}`);
                        }
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            }
        });
    }


    jcbuttion = () => {
        this.ajaxpost = true
        this.props.form.validateFieldsAndScroll(['companyName'], {force: true},
            (err) => {
                if (err) {
                    return false;
                }
            },
        );

    }


    CompanyNamehandle = (rule, value, callback) => {
        const userNameres1 = /^[^\s]+$/g, userNameres2 = /.{20,}/g;
        this.isajaxpost = true;
        if (!userNameres1.test(value)) {
            this.ajaxpost = false;
            callback('请输入企业名称')
        } else if (userNameres2.test(value)) {
            this.ajaxpost = false;
            callback('企业名称不能超过20个字符')
        } else if (this.ajaxpost) {
            this.props.baseInfoForm({jsbutton: true})
            axios.get(`${config.connect_srm}/clue/checkCompanyName.do`, {
                params: {
                    companyName: value
                }
            }).then(response => {
                if (response.status == 200) {
                    this.isajaxpost = false
                    if (response.data.code == 2) {

                        this.props.modalmodelaction({jsbuttionVisible: true,})
                        this.props.tablemodelaction3({
                            data3: response.data.data,
                            count: response.data.data.length
                        })
                        callback()
                    } else if (response.data.code == 0) {
                        callback(response.data.msg)
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
                this.props.baseInfoForm({jsbutton: false})
                this.ajaxpost = false;

            })
        } else if (this.isajaxpost) {
            callback('企业名称还未检测！')
        } else {
            callback()
        }
    }


    bindinghandle = (name) => (rule, value, callback) => {
        const reg = /^\s*$/g;
        if (!reg.test(value)) {
            axios.get(`${config.connect_srm}/clue/checkAccount.do`, {
                params: {
                    [name]: value
                }
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.code == 0) {
                        callback(response.data.msg)
                    } else if (response.data.code == 1) {
                        callback()
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


    handlePreview = (file) => {

        this.props.modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        });

    }


    handleCancel2 = (visible) =>() => this.props.modalmodelaction({[visible]: false,})

    handleOk2 = (visible) =>() => {
        console.log(visible)
        this.props.modalmodelaction({[visible]: false,});
        this.handleSubmit('submitOk')
    }


    uploadsprops2 = {
        name: 'Filedata',
        listType: 'picture',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        accept: 'image/*',
        action: `${config.connect_img}/upload?type=approveLicensePic`,
    }


    uploadonChange = (name)=>(info)=> {
        const status = info.file.status;
        const response = info.file.response;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            const key = this.props.form.getFieldValue([name])
            if (key) {
                this.props.form.setFieldsValue({[name]: key + '@' + response.key});
            } else {
                this.props.form.setFieldsValue({[name]: response.key});
            }

            message.success(`${info.file.name} 图片上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 图片上传失败.`);
        }
    }

    provincehandle = (name, returnName)=>(value)=> {
        console.log(value)
        const url = this.props.Infos.orOut.value == 2 ? `${config.connect_srm}/clue/getZone.do` : `${config.connect_srm}/clue/getArea.do`
        this.props.fetchzonesPosts({url, name, value: value['key'], returnName})
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
            categoryChild, jsbutton, provincebase, provinces, citybase, citys, countybase, countys, townbase, towns, Harea, Hareas, Hvenue, Hvenues, Hfloor, Hfloors, Hdistrict, Hdistricts, registAddressCitys
        } = this.props.Infos;
        const categorysarr = categoryChild ? categoryChild.map((v, i, a)=>(
            <Option key={v['cid']}>{v['c_name']}</Option>)) : []
        const provincesarr = provinces ? provinces.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []
        const citysarr = citys ? citys.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []
        const countysarr = countys ? countys.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []
        const townsarr = towns ? towns.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []

        const Hareasarr = Hareas ? Hareas.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []
        const Hvenuesarr = Hvenues ? Hvenues.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []
        const Hfloorsarr = Hfloors ? Hfloors.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []
        const Hdistrictsarr = Hdistricts ? Hdistricts.map((v, i, a)=>(<Option key={v['id']}>{v['name']}</Option>)) : []

        const registAddressCitysarr = registAddressCitys ? registAddressCitys.map((v, i, a)=>(
            <Option key={v['id']}>{v['name']}</Option>)) : []
        const provinceText = provincebase ? provincebase.value ? provincebase.value.label + ' ' : '' : '';
        const cityText = citybase ? citybase.value ? citybase.value.label + ' ' : '' : '';
        const countyText = countybase ? countybase.value ? countybase.value.label + ' ' : '' : '';
        const townText = townbase ? townbase.value ? townbase.value.label + ' ' : '' : '';

        const HareaText = Harea ? Harea.value ? Harea.value.label + ' ' : '' : '';
        const HvenueText = Hvenue ? Hvenue.value ? Hvenue.value.label + ' ' : '' : '';
        const HfloorText = Hfloor ? Hfloor.value ? Hfloor.value.label + ' ' : '' : '';
        const HdistrictText = Hdistrict ? Hdistrict.value ? Hdistrict.value.label + ' ' : '' : '';

        const orOutval = this.props.Infos.orOut.value

        const addressText1 = provinceText + cityText + countyText + townText
        const addressText2 = HareaText + HvenueText + HfloorText + HdistrictText
        const addressText = orOutval == 2 ? addressText1 : addressText2


        const choosedKeys1 = this.getLastSelectCategory();
        const choosedKeys = this.getLastSelectBrand();

        const ssqx = orOutval == 2 ? (<FormItem
            label=""  {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 19,
                    offset: 5
                }
            }
        }} style={{"width":"100%",'marginTop':'5px'}} colon={false}
        >
            {getFieldDecorator('provincebase', {
                rules: [{required: false, message: '请选择省'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择省"
                        onChange={this.provincehandle('id','citys')}>
                    {provincesarr}
                </Select>
            )}

            {getFieldDecorator('citybase', {
                rules: [{required: false, message: '请选择市'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择市"
                        onChange={this.provincehandle('id','countys')}>
                    {citysarr}
                </Select>
            )}

            {getFieldDecorator('countybase', {
                rules: [{required: false, message: '请选择镇'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择镇"
                        onChange={this.provincehandle('id','towns')}>
                    {countysarr}
                </Select>
            )}

            {getFieldDecorator('townbase', {
                rules: [{required: false, message: '请选择县'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择县">
                    {townsarr}
                </Select>
            )}
        </FormItem>) : (<FormItem
            label=""  {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 19,
                    offset: 5
                }
            }
        }} style={{"width":"100%",'marginTop':'5px'}} colon={false}
        >
            {getFieldDecorator('Harea', {
                rules: [{required: false, message: '请选择市'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择市"
                        onChange={this.provincehandle('cityId','Hvenues')}>
                    {Hareasarr}
                </Select>
            )}

            {getFieldDecorator('Hvenue', {
                rules: [{required: false, message: '请选择广场'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择广场"
                        onChange={this.provincehandle('venueId','Hfloors')}>
                    {Hvenuesarr}
                </Select>
            )}

            {getFieldDecorator('Hfloor', {
                rules: [{required: false, message: '请选择楼层'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择楼层"
                        onChange={this.provincehandle('floorId','Hdistricts')}>
                    {Hfloorsarr}
                </Select>
            )}

            {getFieldDecorator('Hdistrict', {
                rules: [{required: false, message: '请选择区号'}],
            })(
                <Select labelInValue style={{"width":"23%","marginRight":"5px"}}
                        placeholder="请选择区号">
                    {Hdistrictsarr}
                </Select>
            )}
        </FormItem>)

        const cttext = <div>
            <p style={{textAlign:'left',padding:'10px 0px'}}>
                您添加的线索可能与以下{this.props.tablemodel3.count}个企业的资料冲突,请确认是否继续添加</p>
            <Table
                columns={this.cttextcolumns}
                pagination={false}
                dataSource={this.props.tablemodel3.data3}
                bordered
            />
            <p><Button type="primary" style={{marginTop:'20px'}} onClick={this.handleCancel2('jsbuttionVisible')}>确认添加</Button></p>
        </div>

        const ct2text = <div>
            <p style={{textAlign:'left',padding:'10px 0px'}}>
                您添加的线索可能与以下{this.props.tablemodel4.count}个企业的资料冲突,请确认是否继续添加</p>
            <Table
                columns={this.cttextcolumns}
                pagination={false}
                dataSource={this.props.tablemodel4.data4}
                bordered
            />

        </div>

        return (
            <div className="newClue">
                <h2>新建供应商线索</h2>
                <div className="newCluewk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="newCluewk">
                            <div className="newCluenk">
                                <div className="title">基础资料</div>
                                <div className="content">

                                    <Row style={{'padding':'8px 0px'}}>

                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <Col span={5}>
                                                <div
                                                    style={{display:'block',verticalAlign:'middle',textAlign:'right',lineHeight:'29px',fontSize:'12px',paddingRight:'10px',color:'rgba(0, 0, 0, 0.85)'}}>
                                                    <em style={{color:'#ff0000',marginRight:'5px'}}>*</em>企业名称 :
                                                </div>
                                            </Col>
                                            <Col span={19}>

                                                <Col span={20} style={{paddingRight:'5px'}}>
                                                    <FormItem hasFeedback
                                                              label=""  {...this.formItemLayout2}
                                                              style={{"width":"100%"}}
                                                    >
                                                        {getFieldDecorator('companyName', {
                                                            rules: [{
                                                                validator: this.CompanyNamehandle
                                                            }], initialValue: '',
                                                        })(
                                                            <Input
                                                                prefix={<Icon type="idcard" style={{ fontSize: 13 }} />}
                                                                placeholder="请输入企业名称"
                                                                style={{"width":"100%",}}/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={4}>
                                                    <Button type="primary" onClick={this.jcbuttion} size="large"
                                                            style={{width: '100%'}}
                                                            disabled={jsbutton}>检测</Button>
                                                    <Modalmodel  {...{
                                                        ...this.props.modalmodel,
                                                        visible: this.props.modalmodel.jsbuttionVisible,
                                                        title: '冲突提示',
                                                        width: '650px',
                                                        style: {'maxWidth': '100%'},
                                                    }}
                                                        ModalText={cttext} footer={null} onCancel={this.handleCancel2('jsbuttionVisible')}/>
                                                </Col>

                                            </Col>


                                        </Col>


                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="经营品类"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('varietyName')(
                                                    <Input onClick={this.handleOpenChooseForCategory} readOnly
                                                           placeholder="点击选择经营类目"/>
                                                )}

                                                {getFieldDecorator('varietyId')(
                                                    <Input type='hidden'/>
                                                )}

                                            </FormItem>
                                            <CategorySelector onChoosed={this.handleChoosedForCategory}
                                                              choosedKeys={choosedKeys1}
                                                              visible={this.state.categorySelectorVisible}
                                                              onCancel={this.handleCancelForCategory}
                                            />

                                        </Col>
                                    </Row>
                                    <Row style={{'padding':'8px 0px'}}>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <Col span={5}>
                                                <div
                                                    style={{display:'block',verticalAlign:'middle',textAlign:'right',lineHeight:'29px',fontSize:'12px',paddingRight:'10px',color:'rgba(0, 0, 0, 0.85)'}}>
                                                    绑定账号 :
                                                </div>
                                            </Col>
                                            <Col span={19}>
                                                <Col span={12}>
                                                    <Col span={8} style={{paddingRight:'5px'}}>
                                                        <Button type="primary" style={{width:'100%'}}
                                                                size="large">csc86</Button>
                                                    </Col>
                                                    <Col span={16} style={{paddingRight:'5px'}}>
                                                        <FormItem {...this.formItemLayout2} style={{"width":"100%"}}
                                                                                            hasFeedback>

                                                            {getFieldDecorator('cscAccount', {
                                                                rules: [{
                                                                    validator: this.bindinghandle('cscAccount')
                                                                }], initialValue: '', validateTrigger: 'onBlur'
                                                            })(
                                                                <Input placeholder="输入账号"
                                                                       style={{'width':'100%',}}/>
                                                            )}
                                                        </FormItem>
                                                    </Col>

                                                </Col>
                                                <Col span={12}>
                                                    <Col span={8} style={{paddingRight:'5px'}}>
                                                        <Button type="primary" style={{width:'100%'}}
                                                                size="large">buy5j</Button>
                                                    </Col>
                                                    <Col span={16}>
                                                        <FormItem  {...this.formItemLayout2} style={{"width":"100%"}}
                                                                                             hasFeedback>

                                                            {getFieldDecorator('buy5jUserId', {
                                                                rules: [{
                                                                    validator: this.bindinghandle('jdAccount')
                                                                }], initialValue: '', validateTrigger: 'onBlur'
                                                            })(
                                                                <Input placeholder="输入账号"
                                                                       style={{'width':'100%',}}/>
                                                            )}
                                                        </FormItem>
                                                    </Col>

                                                </Col>
                                            </Col>

                                        </Col>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="来源"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('source', {
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
                                                {getFieldDecorator('clueLevel', {
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

                                                {getFieldDecorator('isAddSku', {
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
                                                {getFieldDecorator('enterpriseType', {
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
                                                {getFieldDecorator('website', {
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
                                                {getFieldDecorator('goods', {
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
                                                {getFieldDecorator('shopsite', {
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
                                                {/*{getFieldDecorator('mainBrand', {
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
                                                 )}*/}

                                                {getFieldDecorator('mainBrandId')(
                                                    <Input type='hidden'/>
                                                )}
                                                {getFieldDecorator('mainBrand')(
                                                    <Input onClick={this.handleOpenChoose} readOnly
                                                           placeholder="点击选择经营品牌"/>
                                                )}

                                            </FormItem>
                                            <BrandSelector onChoosed={this.handleChoosed}
                                                           visible={this.state.brandSelectorVisible}
                                                           choosedKeys={choosedKeys}
                                                           onCancel={this.handleCancel}
                                            />

                                            <FormItem
                                                label="联系地址"  {...this.formItemLayout}
                                                style={{"width":"100%",'marginTop':'5px'}}
                                            >

                                                {getFieldDecorator('orOut', {
                                                    rules: [{required: false, message: '请选择'}],
                                                })(
                                                    <RadioGroup>
                                                        <Radio value={1}>城内</Radio>
                                                        <Radio value={2}>城外</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                            {ssqx}
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

                                                {getFieldDecorator('mainBusiness', {
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
                                                {getFieldDecorator('remarkbase', {
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
                                                {getFieldDecorator('creditNumber', {
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

                                                {getFieldDecorator('province', {
                                                    rules: [{required: false, message: '请选择省'}],
                                                })(
                                                    <Select labelInValue style={{"width":"45%","marginRight":"5px"}}
                                                            placeholder="请选择省"
                                                            onChange={this.provincehandle('id','registAddressCitys')}>
                                                        {provincesarr}
                                                    </Select>
                                                )}

                                                {getFieldDecorator('city', {
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

                                                {getFieldDecorator('deadline', {
                                                    rules: [{type: 'array', required: false, message: '请选择'}],
                                                })(
                                                    <RangePicker style={{"width":"65%"}}/>
                                                )}


                                            </FormItem>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="登记机构"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >
                                                {getFieldDecorator('organization', {
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
                                                {getFieldDecorator('corporation', {
                                                    rules: [{required: false, message: '请输入企业法人'}],
                                                })(
                                                    <Input placeholder="企业法人"
                                                           style={{width:'65%','marginRight':'10px'}}/>
                                                )}
                                                {getFieldDecorator('corporationGender', {
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
                                                {getFieldDecorator('idcard', {
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
                                                    onChange: this.uploadonChange('idcards'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                        {this.uploadicon('registIdCard', 2)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('idcards')(
                                                    <Input type='hidden'/>
                                                )}

                                            </FormItem>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="营业执照"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('BusinessLicense', {
                                                    rules: [{required: false, message: '请上传'}],
                                                    onChange: this.uploadonChange('license'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                        {this.uploadicon('BusinessLicense', 1)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('license')(
                                                    <Input type='hidden'/>
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
                                                    onChange: this.uploadonChange('qualification'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                        {this.uploadicon('payAptitudes', 1)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('qualification')(
                                                    <Input type='hidden'/>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="法人授权书/代理人授权书"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('powerAttorney', {
                                                    rules: [{required: false, message: '请上传'}],
                                                    onChange: this.uploadonChange('authorizationBus'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                        {this.uploadicon('powerAttorney', 1)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('authorizationBus')(
                                                    <Input type='hidden'/>
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
                                                    onChange: this.uploadonChange('undertaking'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                        {this.uploadicon('Undertaking', 1)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('undertaking')(
                                                    <Input type='hidden'/>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="办公场所"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('Office', {
                                                    rules: [{required: false, message: '请上传'}],
                                                    onChange: this.uploadonChange('officespace'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                                        {this.uploadicon('Office', 3)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('officespace')(
                                                    <Input type='hidden'/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>

                                    <Row style={{'padding':'8px 0px'}}>
                                        <Col span={12} style={{ textAlign: 'left' }}>
                                            <FormItem
                                                label="生产车间/仓库"  {...this.formItemLayout} style={{"width":"100%"}}
                                            >
                                                {getFieldDecorator('Workshops', {
                                                    rules: [{required: false, message: '请上传'}],
                                                    onChange: this.uploadonChange('workshop'),
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}
                                                                                    multiple={true}>
                                                        {this.uploadicon('Workshops', 3)}
                                                    </Upload>
                                                )}
                                                {getFieldDecorator('workshop')(
                                                    <Input type='hidden'/>
                                                )}

                                                <Modalmodel  {...{
                                                    ...this.props.modalmodel,
                                                    visible: this.props.modalmodel.previewVisible,
                                                    title: '',
                                                    width: '650px',
                                                    style: {'maxWidth': '100%'}
                                                }} footer={null} onCancel={this.handleCancel2('previewVisible')}
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

                                                {getFieldDecorator('oem', {
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
                                                {getFieldDecorator('manage', {
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
                                                {getFieldDecorator('model', {
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
                                                {getFieldDecorator('regmoney', {
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
                                                {getFieldDecorator('employees', {
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
                                                {getFieldDecorator('turnover', {
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
                                                {getFieldDecorator('introduce', {
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
                                    <Modalmodel  {...{
                                        ...this.props.modalmodel,
                                        visible: this.props.modalmodel.submitVisible,
                                        title: '冲突提示',
                                        width: '650px',
                                        style: {'maxWidth': '100%'},
                                    }}
                                        ModalText={ct2text}  onCancel={this.handleCancel2('submitVisible')} onOk={this.handleOk2('submitVisible')} okText='确认提交'/>
                                </FormItem>
                            </Row>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}


export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            return props.Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(UserForm));

