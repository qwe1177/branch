import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel  from '../components/Modalmodel'
import PersonSelector from '../../components/business/personselector'
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
import axios from '../../util/axios'
import * as config  from '../../util/connectConfig'
import {getLoginAccount, getLoginInfo, getUrlParams} from '../../util/baseTool';
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;


class UserForm extends Component {

    constructor(props) {
        super(props);

        this.columns = [{
            title: '企业名称',
            dataIndex: 'companyName',
            render: (text, record, index) => {
                let path = '';
                switch (record.type) {
                    case 'my':
                        path = 'myClueDetail';
                        break;
                    case 'underling':
                        path = 'underlingClueDetail';
                        break;
                    case 'all':
                        path = 'allClueDetail';
                        break;
                    case 'theHighSeas':
                        path = 'publicClueDetail';
                        break;
                    default:
                        path = 'allClueDetail'
                }
                const urlParams = getUrlParams();
                const systemId = urlParams['systemId'] ? urlParams['systemId'] : '';
                const moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';
                const url = `/${path}/?supplierId=${record.supplierId}&systemId=${systemId}&moduleId=${moduleId}`
                return path != 'allClueDetail' ? (<a target="_blank" href={url}>{text}</a>) : <span>{text}</span>

            }

        }, {
            title: '来源',
            className: '',
            dataIndex: 'source',
            width: 80,
            render: this.addinputdata,
        }, {
            title: '线索级别',
            dataIndex: 'clueLevel',
            render: this.addinputdata,
            width: 80,
        },
            {
                title: '企业性质',
                dataIndex: 'enterpriseType',
                render: this.adduploaddata,
                width: 80,
            },
            {
                title: '主营类目',
                dataIndex: 'varietyName',
                render: this.adduploaddata,
            },
            {
                title: '主营品牌',
                dataIndex: 'mainBrand',
                render: this.adduploaddata,
                width: 80,

            },
            {
                title: '联系人信息',
                dataIndex: 'fullname',
                render: this.adduploaddata,
                width: 80,
            },
            {
                title: '跟进次数',
                dataIndex: 'followupCount',
                render: this.adduploaddata,
                width: 80,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime1',
                render: this.adduploaddata,
                width: 85,
            },
            {
                title: '负责人',
                dataIndex: 'realName',
                render: this.adduploaddata,
                width: 70,
            },
            {
                title: '操作',
                width: 80,
                dataIndex: 'Operation',
                render: (text, record, index) => {
                    var value = []
                    if (record.type == 'my' || record.type == 'underling') {
                        value = [<p key={`${index}`} style={{marginBottom: '5px'}}>移入公海</p>,
                            <p key={`_${index}`}>分配负责人</p>]
                    } else if (record.type == "theHighSeas") {
                        value = [<p key={`${index}`}>加入我的</p>]
                    }
                    return (
                        (
                            <div><a onClick={this.Modalshow(text, record, index)}>{value}</a>
                            </div>)
                    );
                },
            }];

        this.state = {
            personSelectorVisible: false,
            actionInfo: true,
            PersonSelectortype: 'single'
        }

    }

    hasErrors = (fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);

    Modalshow = (text, record, index)=>(e)=> {

        const value = e.target.innerHTML;
        if (value == '分配负责人') {
            this.setState({personSelectorVisible: true,});
        } else if (value == '移入公海') {
            this.props.modalmodelaction({visible: true, ModalText: '确认移入公海分配吗？'})
        } else if (value == '加入我的') {
            this.props.modalmodelaction({visible: true, ModalText: '确认加入我的线索吗？'})
        }
        this.props.tablemodelaction({
            selectaction: value,
            actkey: [record.key],
            supplierId: record.supplierId,
            userId: record.userId
        });
    }


    Modalshow2 = (e)=> {

        var value = e.target.innerHTML;
        value = value.replace(/<.*>(.*)<.*>/, '$1')
        const selectedRows = this.props.tablemodel.selectedRows || []
        if (selectedRows.length) {

            const actkey = selectedRows.map(o=>o.key)
            const supplierId = selectedRows.map(o=>o.supplierId).join(',')
            const userId = selectedRows.map(o=>o.userId).join(',')
            if (value == '分配负责人') {
                this.setState({personSelectorVisible: true,});
            } else if (value == '移入公海') {
                this.props.modalmodelaction({visible: true, ModalText: '确认移入公海分配吗？'})
            } else if (value == '加入我的') {
                this.props.modalmodelaction({visible: true, ModalText: '确认加入我的线索吗？'})
            }
            this.props.tablemodelaction({selectaction: value, actkey: actkey, supplierId: supplierId, userId: userId});
        } else {
            message.error('请选择企业')
        }

    }

    ModalhandleOk = ()=> {
        const data = [...this.props.tablemodel.data];
        const actkey = this.props.tablemodel.actkey;
        const url = this.props.tablemodel.selectaction == '移入公海' ? `${config.connect_srm}/clue/editToPublic.do` : `${config.connect_srm}/clue/editPersonLiable.do`
        const supplierId = this.props.tablemodel.supplierId;
        const userId = this.props.tablemodel.userId;
        axios.get(url, {
            params: {
                supplierId: supplierId,
                responsibleSources: userId,
                responsibleUserId: getLoginAccount()['userId'],
                responsiblRealName: getLoginAccount()['realName'],
            }
        }).then(response => {
            if (response.status == 200) {
                if (response.data.code == 1) {
                    message.success(`${response.data.msg}`);
                    //const newdata = data.filter(o=>actkey.every(j=>o.key != j))
                    this.props.tablemodelaction({selectedRowKeys: [], actkey: []});
                    this.props.modalmodelaction({ModalText: '提交中···', confirmLoading: true,})
                    this.props.fetchPosts({key: 'data', value: {isPass: 'no', markToDistinguish: 'all'}})
                    setTimeout(() => {
                        //this.props.tablemodelaction({data: newdata,});
                        this.props.modalmodelaction({
                            visible: false,
                            confirmLoading: false,
                        });

                    }, 500);

                } else {
                    message.error(`${response.data.msg}`);
                }
            } else {
                message.error(`${response.data.msg}`);
            }
        }).catch(e=> {
            console.log(e);
        })


    }

    ModalhandleCancel = (value) =>()=> {
        this.props.modalmodelaction({[value]: false});
    }


    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }

    componentDidMount() {

        this.props.fetchPosts({key: 'data', value: {isPass: 'no', markToDistinguish: 'all'}})
    }

    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'range-time') {
                            const arr = values[i].map(v=>v.format("YYYY-MM-DD"))
                            newobj['startTime'] = arr[0] ? arr[0] : ''
                            newobj['endTime'] = arr[1] ? arr[1] : ''
                        } else if (i == 'other') {
                            newobj[i] = values[i].join(',')
                        } else if (i == 'compNameOrAddressOrMobile') {
                            newobj[i] = values[i].key
                        } else {
                            newobj[i] = values[i]
                        }
                    }
                }
                newobj.isPass = 'no';
                newobj.markToDistinguish = 'all';
                or && this.props.fetchPosts({key: 'data', value: newobj});
            }
        });
        return newobj
    }


    handlePersonCancel = () => {
        this.setState({personSelectorVisible: false, PersonSelectortype: 'single', actionInfo: true});
    }

    handleOpenChooseForCategory = () => {
        this.setState({personSelectorVisible: true, PersonSelectortype: 'multiple', actionInfo: false});
    }

    handleChoosed = (ids, labels, actionInfo) => {
        if (actionInfo) {
            const data = [...this.props.tablemodel.data];
            const actkey = this.props.tablemodel.actkey;
            const supplierId = this.props.tablemodel.supplierId;

            axios.get(`${config.connect_srm}/clue/editPersonLiable.do`, {
                params: {
                    supplierId: supplierId,
                    responsibleSources: this.props.tablemodel.userId,
                    responsibleUserId: ids,
                    responsiblRealName: labels,
                }
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.code == 1) {
                        message.success(`${response.data.msg}`);
                        const newdata = data.filter(o=>actkey.every(j=>o.key != j))
                        this.props.tablemodelaction({data: newdata, actkey: [], selectedRowKeys: []});
                        this.setState({personSelectorVisible: false});
                    } else {
                        message.error(`${response.data.msg}`);
                    }
                } else {
                    message.error(`${response.data.msg}`);
                }
            }).catch(e=> {
                console.log(e);
            })
        } else {
            this.setState({personSelectorVisible: false, PersonSelectortype: 'single', actionInfo: true});
            this.props.form.setFieldsValue({userIds: ids, usernames: labels});
        }

    }

    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({selectedRowKeys, selectedRows});
    }

    Paginatihandle = (page, pageSize)=> {
        this.props.fetchPosts({key: 'data', value: {...this.handleSubmit(), pageSize: page, offset: pageSize}});
        this.props.tablemodelaction({selectedRowKeys: []});
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    setDate = (value)=>()=> {
        const start = moment().add(-value + 1, 'days').format('YYYY-MM-DD')
        const end = moment().add(0, 'days').format('YYYY-MM-DD')
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
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: true,
            }),
        };

        const compNameOrAddressOrMobilelable = this.props.form.getFieldValue('compNameOrAddressOrMobile') ? this.props.form.getFieldValue('compNameOrAddressOrMobile').label : undefined;

        return (
            <div className="newClue">
                <h2>全部供应商线索</h2>
                <div className="newCluewk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="newCluewk">
                            <div className="newCluenk">

                                <div className="content">


                                    <Row style={{'padding': '8px 0px'}}>

                                        <Col span={3}>
                                            <FormItem {...{...this.formItemLayout, ...{wrapperCol: {span: 24}}}}
                                                      label="" style={{"width": "100%", paddingRight: '10px'}}
                                            >

                                                {getFieldDecorator('compNameOrAddressOrMobile', {
                                                    rules: [{required: false, message: '请选择名称'}],
                                                    initialValue: {key: 'companyName'}
                                                })(
                                                    <Select labelInValue placeholder="请选择名称">
                                                        <Option value="companyName">企业名称</Option>
                                                        <Option value="address">企业地址</Option>
                                                        <Option value="mobile">手机</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>
                                        <Col span={5}>
                                            <FormItem {...{...this.formItemLayout, ...{wrapperCol: {span: 24}}}}
                                                      label="" style={{"width": "100%", paddingRight: '10px'}}
                                            >

                                                {getFieldDecorator('compNameOrAddressOrMobileValue', {
                                                    rules: [{
                                                        required: false,
                                                        message: `请输入${compNameOrAddressOrMobilelable}`
                                                    }],
                                                })(
                                                    <Input placeholder={`请输入${compNameOrAddressOrMobilelable}`}
                                                           maxLength="100"/>
                                                )}


                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem
                                                label="线索来源" style={{"width": "100%"}}
                                            >

                                                {getFieldDecorator('source', {
                                                    rules: [{required: false, message: '请选择来源'}],
                                                    initialValue: ''
                                                })(
                                                    <Select style={{width: 100}} placeholder="请选择来源">
                                                        <Option value="">全部</Option>
                                                        <Option value="自行开发">自行开发</Option>
                                                        <Option value="来电咨询">来电咨询</Option>
                                                        <Option value="网络推广">网络推广</Option>
                                                        <Option value="CSC86">CSC86</Option>
                                                        <Option value="buy5j">buy5j</Option>
                                                        <Option value="网络爬取">网络爬取</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                        <Col span={4}>
                                            <FormItem
                                                label="线索级别" style={{"width": "100%"}}
                                            >

                                                {getFieldDecorator('clueLevel', {
                                                    rules: [{required: false, message: '请选择级别'}], initialValue: ''
                                                })(
                                                    <Select style={{width: 100}} placeholder="请选择级别">
                                                        <Option value="">全部</Option>
                                                        <Option value="即将签约">即将签约</Option>
                                                        <Option value="意向客户">意向客户</Option>
                                                        <Option value="待培育客户">待培育客户</Option>
                                                        <Option value="暂无兴趣">暂无兴趣</Option>
                                                        <Option value="无效线索">无效线索</Option>
                                                        <Option value="暂无">暂无</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                        <Col span={4}>
                                            <FormItem
                                                label="客户类型" style={{"width": "100%"}}
                                            >

                                                {getFieldDecorator('enterpriseType', {
                                                    rules: [{required: false, message: '请选择类型'}], initialValue: ''
                                                })(
                                                    <Select style={{width: 100}} placeholder="请选择级别">
                                                        <Option value="">全部</Option>
                                                        <Option value="企业客户">企业客户</Option>
                                                        <Option value="零售商">零售商</Option>
                                                        <Option value="终端用户">终端用户</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                        <Col span={4}>
                                            <FormItem
                                                label="区域" style={{"width": "100%"}}
                                            >

                                                {getFieldDecorator('areaType', {
                                                    rules: [{required: false, message: '请选择区域'}], initialValue: ''
                                                })(
                                                    <Select style={{width: 100}} placeholder="请选择区域">
                                                        <Option value="">全部</Option>
                                                        <Option value={'1'}>城内商户</Option>
                                                        <Option value={'2'}>城外商户</Option>
                                                    </Select>
                                                )}


                                            </FormItem>
                                        </Col>

                                    </Row>

                                    <Row style={{'padding': '8px 0px'}}>


                                        <Col span={3} style={{'padding': '0px 10px 0px 0px'}}>
                                            <FormItem
                                                label=""
                                                style={{"width": "100%"}} {...{...this.formItemLayout, ...{wrapperCol: {span: 24}}}}
                                            >
                                                {getFieldDecorator('createOrResponsibleTime', {
                                                    rules: [{required: false, message: '请选择'}],
                                                    initialValue: 'createTime'
                                                })(
                                                    <Select
                                                        placeholder="请选择">
                                                        <Option key='createTime'>创建时间</Option>
                                                        <Option key='responsibleTime'>负责时间</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>


                                        <Col span={21}>
                                            <FormItem
                                                label=""
                                            >

                                                {getFieldDecorator('range-time', this.rangeConfig)(
                                                    <RangePicker style={{"width": "50%"}}/>
                                                )}
                                                <Button style={{marginLeft: '10px'}}
                                                        type="primary"
                                                        ghost onClick={this.setDate(1)}
                                                        disabled={this.hasErrors(getFieldsError())}
                                                >
                                                    今天
                                                </Button>
                                                <Button style={{marginLeft: '10px'}}
                                                        type="primary"
                                                        ghost onClick={this.setDate(7)}
                                                        disabled={this.hasErrors(getFieldsError())}
                                                >
                                                    近7天
                                                </Button>

                                            </FormItem>

                                            <FormItem
                                                label="负责人"
                                            >
                                                {getFieldDecorator('usernames')(
                                                    <Input onClick={this.handleOpenChooseForCategory} readOnly
                                                           style={{width: '280px'}}
                                                           placeholder="点击选择"/>
                                                )}

                                                {getFieldDecorator('userIds')(
                                                    <Input type='hidden'/>
                                                )}
                                            </FormItem>
                                        </Col>

                                    </Row>

                                    <Row style={{'padding': '8px 0px'}}>
                                        <Col span={12}>
                                            <FormItem
                                                label="其他条件" style={{"width": "100%"}}
                                            >
                                                {getFieldDecorator('other', this.rangeConfig)(
                                                    <CheckboxGroup options={plainOptions}/>
                                                )}


                                            </FormItem>

                                        </Col>
                                        <Col span={12}>
                                            <div style={{textAlign: 'right'}}>
                                                <FormItem>
                                                    <Button
                                                        type="primary" style={{
                                                        height: '35px',
                                                        lineHeight: '35px',
                                                        padding: '0px 30px'
                                                    }}
                                                        htmlType="submit"
                                                        disabled={this.hasErrors(getFieldsError())}
                                                    >
                                                        查询
                                                    </Button>
                                                </FormItem>
                                                <FormItem style={{marginLeft: '20px'}}>
                                                    <Button
                                                        type="primary"
                                                        style={{
                                                            height: '35px', lineHeight: '35px',
                                                            backgroundColor: '#f5f5f5',
                                                            borderColor: '#e6e6e6',
                                                            padding: '0px 30px',
                                                            color: '#a8a8a8'
                                                        }}
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
                                    type="primary" style={{padding: '5px 15px', marginRight: '5px', border: 'none'}}
                                    ghost size="large" onClick={this.handleSubmit}
                                >
                                    刷新列表
                                </Button>
                                    {/* <Button
                                     type="primary" style={{padding: '5px 15px', marginRight: '5px',border:'none'}}
                                     ghost size="large"
                                     >
                                     移入公海
                                     </Button>
                                     <Button
                                     type="primary" style={{padding: '5px 15px', marginRight: '5px',border:'none'}}
                                     ghost size="large"
                                     >
                                     分配负责人
                                     </Button>
                                     <Button
                                     type="danger" style={{padding: '5px 15px', marginRight: '5px',border:'none'}}
                                     ghost size="large"
                                     >
                                     删除
                                     </Button>*/}</div>
                                <div className="content">


                                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered
                                               pagination={false}/>
                                    </Spin>
                                    <Pagination style={{padding: '10px 0px', textAlign: 'right'}}
                                                showTotal={total => `共 ${total} 条`}
                                                pageSizeOptions={['20', '30', '40', '50']}
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
                                                 onOk={this.ModalhandleOk}
                                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                                 onCancel={this.ModalhandleCancel('visible')}/>

                                    <PersonSelector onChoosed={this.handleChoosed} onCancel={this.handlePersonCancel}
                                                    type={this.state.PersonSelectortype}
                                                    title={'分配负责人'} visible={this.state.personSelectorVisible}
                                                    actionInfo={this.state.actionInfo}/>

                                </div>
                            </div>

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