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
    fetchcitysPosts,
    Paginationmodelaction,
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
    message,
    Checkbox,
    Pagination,
    Spin,
} from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import '../css/css.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import axios from 'axios'
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;

class UserForm extends Component {

    constructor(props) {
        super(props);

        this.columns = [{
            title: '企业名称',
            dataIndex: 'companyName',
            width: 160,
            render: text=>text,
        }, {
            title: '来源',
            className: '',
            dataIndex: 'source',
            width: 80,
            render: this.addinputdata,
        }, {
            title: '线索级别',
            dataIndex: 'level',
            render: this.addinputdata,
            width: 100,
        },
            {
                title: '企业性质',
                dataIndex: 'type',
                render: this.adduploaddata,
                width: 100,
            },
            {
                title: '主营类目',
                dataIndex: 'category',
                render: this.adduploaddata,
                width: 100,
            },
            {
                title: '主营品牌',
                dataIndex: 'brand',
                render: this.adduploaddata,
                width: 100,

            },
            {
                title: '联系人信息',
                dataIndex: 'contacts',
                render: this.adduploaddata,
                width: 100,
            },
            {
                title: '跟进次数',
                dataIndex: 'Follow',
                render: this.adduploaddata,
                width: 80,
            },
            {
                title: '创建时间',
                dataIndex: 'time',
                render: this.adduploaddata,
                width: 100,
            },
            {
                title: '负责人',
                dataIndex: 'leader',
                render: this.adduploaddata,
                width: 80,
            },
            {
                title: '操作',
                width: 120,
                dataIndex: 'Operation',
                render: (text, record, index) => {
                    return (
                        (
                            <div><a onClick={this.Modalshow(text,record,index)}>{text}</a>
                            </div>)
                    );
                },
            }];


    }


    hasErrors = (fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);


    Modalshow = (text, record, index)=>()=> {
        if (text == '加入我的') {
            this.props.dispatch(modalmodelaction({visible: true, ModalText: '确认加入我的线索吗？'}))
            this.props.dispatch(tablemodelaction({actkey: index,}))
        } else {
            this.props.dispatch(modalmodelaction({visible: true, ModalText: '确认移入公海分配吗？'}))
            this.props.dispatch(tablemodelaction({actkey: index,}))
        }
    }

    ModalhandleOk = ()=> {
        const data = [...this.props.tablemodel.data];
        const actkey = this.props.tablemodel.actkey;
        data.splice(actkey, 1);
        this.props.dispatch(modalmodelaction({ModalText: '提交中···', confirmLoading: true,}))
        setTimeout(() => {
            this.props.dispatch(tablemodelaction({data: data,}));
            this.props.dispatch(modalmodelaction({
                visible: false,
                confirmLoading: false,
            }));

        }, 1000);
    }


    ModalhandleCancel = (value) =>()=> {
        this.props.dispatch(modalmodelaction({[value]: false}))
    }


    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }


    componentDidMount() {

        this.props.dispatch(fetchPosts({key: 'data', value: {}}))
    }


    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                const newobj = {}
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'range-time') {
                            newobj[i] = values[i].map(v=>v.format("YYYY-MM-DD")).join(',')
                        } else if (i == 'other') {
                            newobj[i] = values[i].join(',')
                        } else {
                            newobj[i] = values[i]
                        }
                    }
                }

                this.props.dispatch(fetchPosts({key: 'data', value: newobj}))
            }
        });
    }


    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    }


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.props.dispatch(tablemodelaction({selectedRowKeys}));
    }


    Paginatihandle = (page, pageSize)=> {
        const {dispatch} = this.props
        dispatch(fetchPosts({key: 'data', value: {...this.props.Params, current: page, pageSize: pageSize}}))
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    setDate = (value)=>()=> {
        const start = moment().add(1, 'days').format('YYYY-MM-DD')
        const end = moment().add(value, 'days').format('YYYY-MM-DD')
        this.props.form.setFieldsValue({
            'range-time': [moment(start), moment(end)],
        })
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;


        const {data} = this.props.tablemodel;
        const columns = this.columns;

        const {
            categoryChild, jsbutton, province, provinces, city, citys, county, countys, town, towns, registAddressCitys
        } = this.props.Infos;

        const plainOptions = [
            {label: '有营业执照', value: '1'},
            {label: '有跟进记录', value: '2'},
            {label: '询价单', value: '3'},
            {label: '报价单', value: '4'},
            {label: '开票点数', value: '5'},

        ];

        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange
        };


        return (
            <div className="newClue">
                <h2>全部供应商线索</h2>
                <div className="newCluewk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="newCluewk">
                            <div className="newCluenk">

                                <div className="content">


                                    <Row style={{'padding':'8px 0px'}}>

                                        <Col span={3}>
                                            <FormItem {...{...this.formItemLayout, ...{wrapperCol: {span: 24}}}}
                                                label="" style={{"width":"100%",paddingRight:'10px'}}
                                            >

                                                {getFieldDecorator('companynameSelect', {
                                                    rules: [{required: false, message: '请选择名称'}],
                                                    initialValue: 'companyname1'
                                                })(
                                                    <Select placeholder="请选择名称">
                                                        <Option value="companyname1">企业名称</Option>
                                                        <Option value="companyname2">企业地址</Option>
                                                        <Option value="companyname3">手机</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>
                                        <Col span={5}>
                                            <FormItem {...{...this.formItemLayout, ...{wrapperCol: {span: 24}}}}
                                                label="" style={{"width":"100%",paddingRight:'10px'}}
                                            >

                                                {getFieldDecorator('companyname', {
                                                    rules: [{required: false, message: '请输入'}],
                                                })(
                                                    <Input placeholder=""/>
                                                )}


                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem
                                                label="线索来源" style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('sourceSelect', {
                                                    rules: [{required: false, message: '请选择来源'}],
                                                    initialValue: 'source1'
                                                })(
                                                    <Select style={{ width:100 }} placeholder="请选择来源">
                                                        <Option value="source1">全部</Option>
                                                        <Option value="source2">自行开发</Option>
                                                        <Option value="source3">来电咨询</Option>
                                                        <Option value="source4">网络推广</Option>
                                                        <Option value="source5">CSC86</Option>
                                                        <Option value="source6">buy5j</Option>
                                                        <Option value="source7">网络爬取</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                        <Col span={4}>
                                            <FormItem
                                                label="线索级别" style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('levelSelect', {
                                                    rules: [{required: false, message: '请选择级别'}], initialValue: 'level1'
                                                })(
                                                    <Select style={{ width: 100 }} placeholder="请选择级别">
                                                        <Option value="level1">全部</Option>
                                                        <Option value="level2">即将签约</Option>
                                                        <Option value="level3">意向客户</Option>
                                                        <Option value="level4">待培育客户</Option>
                                                        <Option value="level5">暂无兴趣</Option>
                                                        <Option value="level6">无效线索</Option>
                                                        <Option value="level7">暂无</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                        <Col span={4}>
                                            <FormItem
                                                label="客户类型" style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('typeSelect', {
                                                    rules: [{required: false, message: '请选择类型'}], initialValue: 'type1'
                                                })(
                                                    <Select style={{ width: 100 }} placeholder="请选择级别">
                                                        <Option value="type1">全部</Option>
                                                        <Option value="type2">企业客户</Option>
                                                        <Option value="type3">零售商</Option>
                                                        <Option value="type4">终端用户</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                        <Col span={4}>
                                            <FormItem
                                                label="区域" style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('areaSelect', {
                                                    rules: [{required: false, message: '请选择区域'}], initialValue: 'area1'
                                                })(
                                                    <Select style={{ width:100 }} placeholder="请选择区域">
                                                        <Option value="area1">全部</Option>
                                                        <Option value="area2">城内商户</Option>
                                                        <Option value="area3">城外商户</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                    </Row>

                                    <Row style={{'padding':'8px 0px'}}>
                                        <Col span={24}>
                                            <FormItem
                                                label="创建日期" style={{"width":"100%"}}
                                            >

                                                {getFieldDecorator('range-time', this.rangeConfig)(
                                                    <RangePicker style={{"width":"50%"}}/>
                                                )}
                                                <Button style={{marginLeft:'10px'}}
                                                        type="primary"
                                                        ghost onClick={this.setDate(1)}
                                                        disabled={this.hasErrors(getFieldsError())}
                                                >
                                                    今天
                                                </Button>
                                                <Button style={{marginLeft:'10px'}}
                                                        type="primary"
                                                        ghost onClick={this.setDate(7)}
                                                        disabled={this.hasErrors(getFieldsError())}
                                                >
                                                    近7天
                                                </Button>

                                            </FormItem>
                                        </Col>

                                    </Row>

                                    <Row style={{'padding':'8px 0px'}}>
                                        <Col span={12}>
                                            <FormItem
                                                label="其他条件" style={{"width":"100%"}}
                                            >
                                                {getFieldDecorator('other', this.rangeConfig)(
                                                    <CheckboxGroup options={plainOptions}/>
                                                )}


                                            </FormItem>

                                        </Col>
                                        <Col span={12}>
                                            <div style={{textAlign:'right'}}>
                                                <FormItem >
                                                    <Button
                                                        type="primary" style={{padding:'5px 30px'}}
                                                        htmlType="submit"
                                                        disabled={this.hasErrors(getFieldsError())}
                                                    >
                                                        查询
                                                    </Button>
                                                </FormItem>
                                                <FormItem style={{marginLeft:'10px'}}>
                                                    <Button
                                                        type="primary"
                                                        style={{backgroundColor:'#fe7676',borderColor:'#fe7676',padding:'5px 30px'}}
                                                        htmlType="submit"
                                                        onClick={this.handleReset}
                                                    >
                                                        重置
                                                    </Button>
                                                </FormItem>
                                            </div>
                                        </Col>
                                    </Row>


                                </div>
                            </div>

                            <div className="newCluenk">
                                <div className="title"><Button
                                    type="primary" style={{padding:'5px 30px',marginRight:'10px'}}
                                    ghost size="large" onClick={this.handleSubmit}
                                >
                                    刷新列表
                                </Button>
                                    <Button
                                        type="primary" style={{padding:'5px 30px',marginRight:'10px'}}
                                        ghost size="large"
                                    >
                                        移入公海
                                    </Button>
                                    <Button
                                        type="primary" style={{padding:'5px 30px',marginRight:'10px'}}
                                        ghost size="large"
                                    >
                                        分配负责人
                                    </Button>
                                    <Button
                                        type="danger" style={{padding:'5px 30px',marginRight:'10px'}}
                                        ghost size="large"
                                    >
                                        删除
                                    </Button></div>
                                <div className="content">


                                    <Spin spinning={this.props.tablemodel.loading}>
                                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered
                                               pagination={false}/>
                                    </Spin>
                                    <Pagination style={{padding:'10px 0px',textAlign:'right'}}
                                                showTotal={total => `共 ${total} 条`}
                                                pageSizeOptions={['10', '20', '30', '40','50']}
                                                showSizeChanger showQuickJumper
                                                current={this.props.Paginationmodel.current}
                                                defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                                                total={this.props.Paginationmodel.total}
                                                pageSize={this.props.Paginationmodel.pageSize}
                                                onChange={this.Paginatihandle}/>


                                    <Modalmodel  {...{
                                        ...this.props.modalmodel,
                                        visible: this.props.modalmodel.visible,
                                        ModalText: this.props.modalmodel.ModalText,
                                    }}
                                        onOk={this.ModalhandleOk} confirmLoading={this.props.modalmodel.confirmLoading}
                                        onCancel={this.ModalhandleCancel('visible')}/>
                                </div>
                            </div>

                        </div>

                    </Form>
                </div>
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

