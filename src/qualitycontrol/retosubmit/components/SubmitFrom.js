import React from 'react';
import './SubmitFrom.css';
import { Form, Input, Tooltip, Icon, Select, Table, Row, Col, Checkbox, Button, DatePicker, Radio, Upload, message } from 'antd';
import moment from 'moment';
import qs from 'qs';

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import Modalmodel from './Modalmodel';
import { getLoginInfo, getUrlParams ,getOneUrlParams} from '../../../util/baseTool';
import * as config from '../../../util/connectConfig'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions'
import {fetchInitInfo} from '../actions'

import BrandSelector from '../../../components/business/brandselector/index';
import axios  from '../../../util/axios'

class SubmitFrom extends React.Component {
    constructor(props) {
        super(props);
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        var systemId = urlParams['systemId']?urlParams['systemId']:'';
        this.addSheetUrl ='/productpricing/upload/index.html?systemId'+systemId+'&moduleId='+moduleId+'&moduleUrl=/productpricing/upload/';

        this.columns = [{
            title: '序号',
            dataIndex: 'No',
            width: 50,
            render: text => text,
        }, {
            title: '品牌名称',
            className: 'column-money',
            dataIndex: 'brankName',
            width: 160,
            render: this.addinputdata2,
        }, {
            title: '品牌类型',
            dataIndex: 'brankType',
            render: this.addselectdata,
            width: 160,
        },
        {
            title: '授权书',
            dataIndex: 'authorization',
            render: this.adduploaddata,
            width: 160,
        },
        {
            title: '注册证',
            dataIndex: 'registration',
            render: this.adduploaddata,
            width: 160,
        },
        {
            title: '认证报告',
            dataIndex: 'certification',
            render: this.adduploaddata,
            width: 160,

        },
        {
            title: '其他资料',
            dataIndex: 'otherAptitude',
            render: this.adduploaddata,
            width: 160,
        },
        {
            title: '操作',
            width: 60,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                return (
                    <div><a onClick={this.Modalshow(index)} >删除</a>
                    </div>
                );
            },
        }
        ];
        this.columns1 = [
            {
                title: '序号',
                dataIndex: 'index',
                className: 'column-money',
                width: 50
            }, {
                title: '报价单编号',
                dataIndex: 'quotationId',
                className: 'column-money',
                width: 160,

            }, {
                title: 'SKU数量',
                dataIndex: 'skuTotal',
                className: 'column-money',
                width: 160,
            }, {
                title: '上传人',
                dataIndex: 'userName',
                className: 'column-money',
                width: 160,
            }, {
                title: '上传时间',
                dataIndex: 'createTime',
                className: 'column-money',
                width: 160,
            }, {
                title: '操作',
                dataIndex: 'option',
                className: 'column-money',
                width: 160,
                render: text => <a href={this.addSheetUrl}>操作</a>,
            }
        ];


        this.columns2 = [
            {
                title: '序号',
                dataIndex: 'index',
                className: 'column-money',
                width: 50
            }, {
                title: '操作',
                dataIndex: 'operation',
                className: 'column-money',
                width: 160

            }, {
                title: '备注',
                dataIndex: 'noteLog',
                className: 'column-money',
                width: 300
            },{
                title: '上传时间',
                dataIndex: 'createTime',
                className: 'column-money',
                width: 160
            }, {
                title: '操作人',
                dataIndex: 'operationStaff',
                className: 'column-money',
                width: 100
            }
        ];
        this.state ={
            brandSelectorVisible: false,
            brankName:'',
            brankId:'',
        }
    }
    handleOpenChoose = (name,id) => ()=>{
        this.setState({brandSelectorVisible: true,brankName:name,brankId:id});
    }
    handleChoosed = (ids, labels) => {
        this.props.form.setFieldsValue({[this.state.brankName]: labels, [this.state.brankId]: ids});
        this.setState({brandSelectorVisible: false});
    }
    handleCancel = () => {
        this.setState({brandSelectorVisible: false});
    }
    getLastSelectBrand = () => {
        var labelstr = this.props.form.getFieldValue(this.state.brankName);
        var idstr = this.props.form.getFieldValue(this.state.brankId);
        return {labelstr, idstr}
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
               //测试环境上传报价单有问题，暂时屏蔽
                var quotationLen = this.props.tablemodel2.data2.length;
                if(quotationLen==0){
                    message.error('请至少上传1条报价单!');
                    return;
                }

                console.log('Received values of form: ', values);
                const params = {}
                const newarrobj = this.objToarrsort(values)
                console.log(newarrobj)
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
                console.log(params)
                var newparams = {}
                for (let o in params) {
                    if (typeof params[o] === 'object') {
                        if (params[o].constructor === Array) {
                            if (o == 'deadline') {
                                newparams[o] = params[o].map(v => v ? v.format("YYYY-MM-DD") : '').join(',')
                            } else if (o == 'birthday') {
                                newparams[o] = params[o].map(v => v ? v.format("YYYY-MM-DD") : '').join(',')
                            } else if (typeof params[o][0] == 'object' && params[o][0] && params[o][0].status) {
                                newparams[o] = params[o].map(v => (v.response ? v.response.key : v.url).replace(/.*com/g, '')).join('@')
                            } else if (typeof params[o][0] == 'object' && params[o][0].constructor == Array && params[o][0][0] && params[o][0][0].status) {
                                newparams[o] = params[o].map(v => v.map(k => (k.response ? k.response.key : k.url).replace(/.*com/g, '')).join('@')).join(',')
                            } else {
                                newparams[o] = params[o].join(',')
                            }
                        } else {
                            newparams[o] = params[o].label
                        }
                    } else {
                        if (params[o]) {
                            newparams[o] = params[o]
                        } else if (params[o] == '') {
                            newparams[o] = params[o]
                        }
                    }
                }
           

                console.log(newparams)
                //只提交基础信息和联系人资料和企业规模
                var filteFields = [ 'creditNumber', 'province', 'city', 'deadline', 'organization', 'corporation', 'corporationGender', 'creditNumber',
                'idcard', 'idcards', 'license', 'qualification', 'authorizationBus', 'undertaking', 'officespace', 'workshop','brankId', 'brankName',
                'brankType', 'authorization', 'registration', 'certification','otherAptitude', 'remark'];
                newparams = _.pick(newparams, filteFields);
                var moduleUrl = location.pathname;
                var supplierId = getOneUrlParams("supplierId");
                newparams['moduleUrl'] = moduleUrl;
                newparams['supplierId'] = supplierId;
                
                var data = qs.stringify(newparams);
                axios.post(`${config.connect_srm}/qualityControl/addQualityControl.do`, data)
                    .then(response => {
                        const code = response.data.code
                        if (code == 1) {
                            message.success(`${response.data.msg}`);
                        } else {
                            message.error(`${response.data.msg}`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    addinputdata = ({name, message, placeholder = '', initialValue = '', required = false, type = 'string',}) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type}, {
                    validator: name.match(/^mobile/g) ? this.telphonevalid : null,
                }], initialValue: initialValue
            })(
                <Input placeholder={placeholder} style={{width: '100%'}}/>
            )}
        </FormItem>)
     addinputdata2 = ({name, message, placeholder = '', initialValue = ['',''], required = false, type = 'string',}) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>

            {this.props.form.getFieldDecorator(name.replace(/Name/g,'Id'),{initialValue: initialValue[1]})(
                <Input type='hidden'/>
            )}
            {this.props.form.getFieldDecorator(name,{
                rules: [{required: required, message: message, type: type}, {
                    validator: name.match(/^mobile/g) ? this.telphonevalid : null,
                }], initialValue: initialValue[0]
            })(
                <Input onClick={this.handleOpenChoose(name,name.replace(/Name/g,'Id'))} readOnly style={{width: '100%'}}
                       placeholder="点击选择经营品牌"/>
            )}

        </FormItem>)
    /*下拉控件*/
    addselectdata = ({ name, message, placeholder = '',initialValue = '' }) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{ required: false, message: message }],initialValue: initialValue
        })(
            <Select style={{ width: 160 }} placeholder="请选择">
                {this.props.Infos.category?this.props.Infos.category.map((o)=>{
                    return <Option key={o.cid} value={o.cid+''}>{o.c_name}</Option>
                }):''}
            </Select>
            )}
    </FormItem>)

    /*上传控件*/
    adduploaddata = ({name, message, initialValue = [], placeholder = '', num = 1}) => {
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
                onChange: this.uploadonChange,
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: initialValue,
            })(
                <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload} listType="picture-card">
                    {this.uploadicon(name, num)}
                </Upload>
            )}


        </FormItem>)
    }

    identityCodeValid = (rule, value, callback)=>{ 
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)){
            tip = "身份证号格式错误";
            pass = false;
        }

       else if(!city[value.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(value.length == 18){
                value = value.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = value[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != value[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) {
            callback(tip)
        } else {
            callback()
        }
    }

    handlePreview = (file) => {
        this.props.modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        });
    }
    uploadsprops2 = {
        name: 'Filedata',
        listType: 'picture',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        accept: 'image/*',
        action: `${config.connect_img}/upload?type=approveLicensePic&token=${getLoginInfo()['token']}`
    }

    handleCancel2 = (visible) => () => this.props.modalmodelaction({ [visible]: false })

    handleAdd1 = () => {
        const { count, data1 } = this.props.tablemodel1;
        const newData = {
            key: count + '',
            No: count + '',
            brankName: { name: 'brankName' + count, message: '请输入品牌名称', placeholder: '品牌名称', },
            brankType: { name: 'brankType' + count, message: '请输入品牌类型', placeholder: '品牌类型', },
            authorization: { name: 'authorization' + count, message: '请上传授权书', placeholder: '授权书', },
            registration: { name: 'registration' + count, message: '请上传注册证', placeholder: '注册证', },
            certification: { name: 'certification' + count, message: '请上传认证报告', placeholder: '认证报告', },
            otherAptitude: { name: 'otherAptitude' + count, message: '请上传其他资料', placeholder: '其他资料', num: 3, },
            Operation: '删除',
        };
        this.props.tablemodelaction({ data1: [...data1, newData], count: count + 1, });
    }

    Modalshow = (index) => () => {
        this.props.modalmodelaction({ visible: true })
        this.props.tablemodelaction({ delkey: index })
    }
    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}.png`,
            status: 'done',
            url: `//img.csc86.com${v}`,
        })) : []
    }
    uploadonChange = (info) => {
        const status = info.file.status;
        const response = info.file.response;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            message.success(`${info.file.name} 图片上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 图片上传失败.`);
        }
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
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.baseInfoForm({ name: { name: name, value: value } })
    }
    uploadIcon = (<Icon type="plus" className="avatar-uploader-trigger"
        style={{ border: '1px dashed #d9d9d9', cursor: 'pointer', 'borderRadius': '6px' }} />)

    uploadicon = (id, num, ic = this.uploadIcon) =>
        this.props.Infos[id] && this.props.Infos[id].value && this.props.Infos[id].value.length >= num ? null : ic

    provincehandle = (name, returnName) => (value) => {
        const url = this.props.Infos.orOut.value == 2 ? `${config.connect_srm}/clue/getZone.do` : `${config.connect_srm}/clue/getArea.do`
        this.props.fetchzonesPosts({ url, name, value: value['key'], returnName })
    }
    ModalhandleOk = () => {
        const data1 = [...this.props.tablemodel1.data1];
        const delkey = this.props.tablemodel1.delkey;
        this.props.modalmodelaction({ ModalText: '删除中···', confirmLoading: true, })
        setTimeout(() => {
            if(data1.length==1){ //只有1条的时候清空
                this.props.resettablemodelaction();
            }else{
                data1.splice(delkey, 1);
                this.props.tablemodelaction({ data1: data1 });
            }
            this.props.modalmodelaction({
                visible: false,
                confirmLoading: false
            });
        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({ [value]: false })
    }
    componentDidMount() {
        var supplierId = getOneUrlParams("supplierId");
        fetchInitInfo(supplierId).then((res)=>{
            if(res.data.code='1'){
                const {
                    companyName, companyAddress,creditNumber, province, city, deadline, organization, corporation, corporationGender, idcard, idcards, card1, card2, license, qualification
                    , undertaking, officespace, workshop, brankName, brankType, authorization, registration, certification, otherAptitude, remark, supplierBrankList,qualityControlLogList,
                    harea, hvenue, hfloor, hdistrict, provincebase, citybase, countybase, townbase
                } = res.data.data;

                this.props.baseInfoForm({companyName,companyAddress,qualityControlLogList});

                if (supplierBrankList 　&& 　supplierBrankList.length > 0) {
                    var newbrankList = supplierBrankList.map((v,index) => {
                        return ({
                            key: v.key,
                            No: v.key,
                            brankName: {
                                name: `brankName${v.key}`,
                                initialValue: [v.brankName,v.brankId],
                                message: '请输入品牌名称',
                                placeholder: '品牌名称',
                            },
                            brankType: {
                                name: `brankType${v.key}`,
                                initialValue: v.brankType,
                                message: '请输入品牌类型',
                                placeholder: '品牌类型',
                            },
                            authorization: {
                                name: `authorization${v.key}`,
                                initialValue: this.fileListhanddle(v.authorization),
                                message: '请上传授权书',
                                placeholder: '授权书',
        
                            },
                            registration: {
                                name: `registration${v.key}`,
                                initialValue: this.fileListhanddle(v.registration),
                                message: '请输入注册证',
                                placeholder: '注册证',
        
                            },
                            certification: {
                                name: `certification${v.key}`,
                                initialValue: this.fileListhanddle(v.certification),
                                message: '请输入认证报告',
                                placeholder: '认证报告',
        
                            },
                            otherAptitude: {
                                name: `otherAptitude${v.key}`,
                                initialValue: this.fileListhanddle(v.otherAptitude),
                                message: '请输入其他资料',
                                placeholder: '其他资料',
                                num: 3,
                            },
                            Operation: '删除',
                        })
                    });
        
                    this.props.tablemodelaction({ data1: newbrankList, count: newbrankList.length + 1, })
                }
        
                //省市区联动
                var allcitys = {}
                // var allcitysarr = [['Harea', harea], ['Hvenue', hvenue], ['Hfloor', hfloor], ['Hdistrict', hdistrict], ['provincebase', provincebase],
                //  ['citybase', citybase], ['countybase', countybase], ['townbase', townbase]]

                var allcitysarr = [['provincebase', provincebase],
                 ['citybase', citybase]]
        
                var allcitysarrlen = allcitysarr.length
                for (let i = 0; i < allcitysarrlen; i++) {
        
                    if (allcitysarr[i][1]) {
                        allcitys[allcitysarr[i][0]] = {
                            name: allcitysarr[i][0],
                            value: { key: allcitysarr[i][1], label: allcitysarr[i][1] }
                        }
                    }
                }
                this.props.baseInfoForm(allcitys);

                var newdeadline =[];
                if(deadline !=''){
                    newdeadline = deadline.split(',');
                    newdeadline = newdeadline.length ? [moment(newdeadline[0]), moment(newdeadline[1])] : [];
                }
                var newidcards = this.fileListhanddle(idcards);
                var newlicense = this.fileListhanddle(license)
                var newqualification = this.fileListhanddle(qualification)
                var newauthorizationBus = this.fileListhanddle(authorization)
                var newundertaking = this.fileListhanddle(undertaking)
                var newofficespace = this.fileListhanddle(officespace)
                var newworkshop = this.fileListhanddle(workshop)
        
        
        
                this.props.form.setFieldsValue({
                    creditNumber,
                    province: { key: province },
                    city: { key: city },
                    deadline: newdeadline,
                    organization,
                    corporation,
                    corporationGender,
                    idcard,
                    idcards: newidcards,
                    license: newlicense,
                    qualification: newqualification,
                    authorizationBus: newauthorizationBus,
                    undertaking: newundertaking,
                    officespace: newofficespace,
                    workshop: newworkshop,
                    remark
        
                });
            }
        

            this.props.fetchzonesPosts({
                url: `${config.connect_srm}/clue/getZone.do`,
                name: 'id',
                value: '',
                returnName: 'provinces'
            });
            this.props.fetchzonesPosts({
                url: `${config.connect_srm}/clue/getArea.do`,
                name: 'id',
                value: '',
                returnName: 'Hareas'
            });
            this.props.fetchCategory();
        }).catch((e)=>{
            console.log(e);
        })
    }
    render() {
        const formItemLayout = {  //form中的label和内容各自占用多少
            labelCol: { span: 7 },
            wrapperCol: { span: 17 },
        };

        const formItemLayout3 = {  //form中的label和内容各自占用多少
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    
        const { data1 } = this.props.tablemodel1;
        const { data2 } = this.props.tablemodel2;
        var  data3 = this.props.Infos.qualityControlLogList?this.props.Infos.qualityControlLogList:[];
        data3 = data3.map((o,index)=>{
            o['index'] =index+1;
            return o;
        });
        

        const {
            provinces, citys, registAddressCitys,companyName,companyAddress
        } = this.props.Infos;

        const provincesarr = provinces ? provinces.map((v, i, a) => (<Option key={v['id']}>{v['name']}</Option>)) : [];
        // const citysarr = citys ? citys.map((v, i, a) => (<Option key={v['id']}>{v['name']}</Option>)) : [];
        const registAddressCitysarr = registAddressCitys ? registAddressCitys.map((v, i, a) => (
            <Option key={v['id']}>{v['name']}</Option>)) : [];
        const choosedKeys = this.getLastSelectBrand();

        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit} className="main-submit-form">
                <div className="audit-tit">
                    企业信息
				</div>
                <div className="audit-ress">
                    <div className="oflowen pt20">
                        <div className="g-fl label">企业名称</div>
                        <div className="g-fl pl20">{companyName}</div>
                    </div>
                    <div className="oflowen pt10">
                        <div className="g-fl label">企业地址</div>
                        <div className="g-fl pl20">{companyAddress}</div>
                    </div>
                </div>
                <div className="tabel-wrap">
                    <div className="audit-tit"> 资质文件 </div>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="营业执照注册号">
                                {getFieldDecorator('creditNumber', {
                                    rules: [{ required: false, message: '请输入营业执照注册号' }],
                                })(
                                    <Input placeholder="营业执照注册号" style={{ "width": "50%" }} maxLength="30"/>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ textAlign: 'left' }}>
                            <FormItem
                                label="营业执照注册地"  {...formItemLayout} style={{ "width": "100%" }}
                            >

                                {getFieldDecorator('province', {
                                    rules: [{ required: false, message: '请选择省' }],
                                })(
                                    <Select labelInValue style={{ "width": "45%", "marginRight": "5px" }}
                                        placeholder="请选择省"
                                        onChange={this.provincehandle('id', 'registAddressCitys')}>
                                        {provincesarr}
                                    </Select>
                                    )}

                                {getFieldDecorator('city', {
                                    rules: [{ required: false, message: '请选择市' }],
                                })(
                                    <Select labelInValue style={{ "width": "45%", "marginRight": "5px" }}
                                        placeholder="请选择市">
                                        {registAddressCitysarr}
                                    </Select>
                                    )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="营业执照期限">
                                {getFieldDecorator('deadline', {
                                    rules: [{ type: 'array', required: false, message: '请选择' }],
                                })(
                                    <RangePicker style={{ "width": "65%" }} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="登记机构">
                                {getFieldDecorator('organization', {
                                    rules: [{ required: false, message: '请输入登记机构' }],
                                })(
                                    <Input placeholder="登记机构" style={{ "width": "50%" }} maxLength="30" />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12} style={{ textAlign: 'left' }}>
                            <FormItem
                                label="企业法人"  {...formItemLayout}
                                style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('corporation', {
                                    rules: [{ required: false, message: '请输入企业法人' }],
                                })(
                                    <Input placeholder="企业法人"
                                        style={{ width: '60%', 'marginRight': '10px' }} maxLength="30" />
                                    )}
                                {getFieldDecorator('corporationGender', {
                                    rules: [{ required: false, message: '请选择' }],
                                    initialValue: this.props.Infos.corporationGender && this.props.Infos.corporationGender.value
                                })(
                                    <RadioGroup name="orwomen">
                                        <Radio value='男'>先生</Radio>
                                        <Radio value='女'>女士</Radio>
                                    </RadioGroup>
                                    )}
                            </FormItem>

                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="身份证号">
                            {getFieldDecorator('idcard', {
                                    rules: [{required: false, message: '请输入身份证号'},
                                    {validator:this.identityCodeValid}],
                                })(
                                    <Input placeholder="身份证号" style={{ width: '70%'}} maxLength="18"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} >
                            <FormItem
                                label="法人身份证"  {...formItemLayout} style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('idcards', {
                                    rules: [{ required: false, message: '请上传法人身份证' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,

                                })(
                                    <Upload {...this.uploadsprops2}
                                        beforeUpload={this.beforeUpload} listType="picture-card">
                                        {this.uploadicon('idcards', 2)}
                                    </Upload>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                label="营业执照"  {...formItemLayout} style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('license', {
                                    rules: [{ required: false, message: '请上传' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload {...this.uploadsprops2}
                                        beforeUpload={this.beforeUpload} listType="picture-card">
                                        {this.uploadicon('license', 1)}
                                    </Upload>
                                    )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} >
                            <FormItem
                                label="一般人纳税资质"  {...formItemLayout} style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('qualification', {
                                    rules: [{ required: false, message: '请上传' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload {...this.uploadsprops2}
                                        beforeUpload={this.beforeUpload}  listType="picture-card">
                                        {this.uploadicon('qualification', 1)}
                                    </Upload>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            <FormItem
                                label="法人授权书/代理人授权书"  {...formItemLayout}
                                style={{ "width": "100%" }}
                            >

                                {getFieldDecorator('authorizationBus', {
                                    rules: [{ required: false, message: '请上传' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload {...this.uploadsprops2}
                                        beforeUpload={this.beforeUpload} listType="picture-card">
                                        {this.uploadicon('authorizationBus', 1)}
                                    </Upload>
                                    )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                label="廉洁承诺书"  {...formItemLayout} style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('undertaking', {
                                    rules: [{ required: false, message: '请上传' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload {...this.uploadsprops2}
                                        beforeUpload={this.beforeUpload} listType="picture-card">
                                        {this.uploadicon('undertaking', 1)}
                                    </Upload>
                                    )}

                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="办公场所"  {...formItemLayout} style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('officespace', {
                                    rules: [{ required: false, message: '请上传' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,

                                })(
                                    <Upload {...this.uploadsprops2}
                                        beforeUpload={this.beforeUpload} listType="picture-card">
                                        {this.uploadicon('officespace', 1)}
                                    </Upload>
                                    )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} >
                            <FormItem
                                label="生产车间/仓库"  {...formItemLayout} style={{ "width": "100%" }}
                            >
                                {getFieldDecorator('workshop', {
                                    rules: [{ required: false, message: '请上传' }],
                                    onChange: this.uploadonChange,
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}
                                        multiple={true} listType="picture-card">
                                        {this.uploadicon('workshop', 3)}
                                    </Upload>
                                    )}


                                <Modalmodel  {...{
                                    ...this.props.modalmodel,
                                    visible: this.props.modalmodel.previewVisible,
                                    title: '',
                                    width: '650px',
                                    style: { 'maxWidth': '100%' }
                                }} footer={null} onCancel={this.handleCancel2('previewVisible')}
                                    ModalText={(<img alt='example' style={{ 'maxWidth': '100%' }} src={this.props.modalmodel.previewImage} />)} />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="tabel-wrap">
                    <div className="audit-tit"> 经营品牌 </div>
                    <div className='section-wrap alignment-bottom'>
                        <Table pagination={false} columns={this.columns} dataSource={data1} bordered className="g-mt"
                            footer={() => <div style={{ textAlign: 'center' }} ><Button className="editable-add-btn" onClick={this.handleAdd1}  >+添加经营品牌</Button></div>}
                        />
                        <Modalmodel  {...{
                            ...this.props.modalmodel,
                            visible: this.props.modalmodel.visible,
                            ModalText: '确认删除吗?',
                        }}
                            onOk={this.ModalhandleOk} confirmLoading={this.props.modalmodel.confirmLoading}
                            onCancel={this.ModalhandleCancel('visible')} />
                         <BrandSelector onChoosed={this.handleChoosed}
                            visible={this.state.brandSelectorVisible}
                            choosedKeys={choosedKeys}
                            onCancel={this.handleCancel}
                            type='single'  />  
                    </div>
                </div>
                <div className="tabel-wrap">
                    <div className="audit-tit"><span> 产品报价</span> </div>
                    <div className='section-wrap'>
                        {this.props.tablemodel2.data2.length > 0 ?
                            <Table rowKey={record => record.quotationId} pagination={false} columns={this.columns1} dataSource={data2} bordered className="g-mt" /> : <Table pagination={false} columns={this.columns1} dataSource={data2} bordered className="g-mt"
                                footer={() => <div style={{ textAlign: 'center' }} >您还没有添加任何产品报价，请点击<a href={this.addSheetUrl}>添加报价单</a>至少上传条记录</div>}
                            />}

                    </div>
                </div>

                <div className="tabel-wrap">
                    <div className="audit-tit"><span> 审核日志</span> </div>
                    <div className='section-wrap'>
                            <Table rowKey={record => record.id}  columns={this.columns2} dataSource={data3} bordered className="g-mt" /> 
                    </div>
                </div>

                <div className="tabel-wrap">
                    <div className="audit-tit"> 提交备注 </div>
                    <Row gutter={24} className='section-wrap'>
                        <Col span={20}>
                            <FormItem {...formItemLayout3} label="备注信息">
                                {getFieldDecorator('remark')(
                                    <TextArea rows={4} maxLength='200' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <FormItem>
                        <Button style={{ padding: '2px 55px' }} type="primary" htmlType="submit">
                            提交
							</Button>
                    </FormItem>
                </Row>
            </Form>
        )
    }
}


export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            return props.Infos
        },
        onFieldsChange(props, fields) {
            console.log(fields);
            props.baseInfoForm(fields)
        }
    })(SubmitFrom));
