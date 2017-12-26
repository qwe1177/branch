import React from 'react';
import PropTypes from 'prop-types'

import QueryFrom from './QueryFrom';
import './layout.css';
import { Modal, Table, Form, Button, Tag, Radio } from 'antd';
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import { connect_srm } from '../../../util/connectConfig';
import axios from '../../../util/axios'
const RadioGroup = Radio.Group;
// import { selectmodelaction} from '../../../productpricing/actions';

export default class BrandSelector extends React.Component {
    static propTypes = { //声明prop中属性变量
        onChoosed: PropTypes.func.isRequired, //选择之后提交的回调
        onCancel: PropTypes.func.isRequired, //取消之后提交的回调
        visible: PropTypes.bool.isRequired, //属否显示
        choosedKeys: PropTypes.array      //默认选择的品牌
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{key:1,label:xx}
            checkedlistall: [],
            isFetching: false,
            reaiomoren: null,
            pagination: {
                showQuickJumper: false,
                showSizeChanger: true,
                total: 0,
                current: 1,
                pageSize: 5,
                showTotal: total => `共 ${total} 条`
            },
            checked:'',
            query: {} //查询条件
        }
        this.columns = [{ //defaultValue={record.contactList[0].contactId}
            title: '供应商名称',
            dataIndex: 'companyName',
        }, {
            title: '联系人',
            dataIndex: 'fullnameanda0',
            render: (text, record) => {
                if (record.contactList.length > 1) {
                    return (
                        <div>
                            <RadioGroup onChange={this.radioonChange.bind(this)} value={this.state.checked}>
                                {record.contactList.map((tag, index) => {
                                    return (<div key={tag.contactId}><Radio value={tag.contactId}>{tag.fullname}/{tag.mobile}</Radio></div>)
                                })}
                            </RadioGroup>
                        </div>
                    );
                } else if (record.contactList.length == 1) {
                    return (
                        <div>
                            {record.contactList[0].fullname}/{record.contactList[0].mobile}
                        </div>
                    );
                } else {
                    return (
                        <div></div>
                    );
                }
            }

        }];

    }

    doInit = (props) => {
        if (props.visible) { //显示的时候
            var checkedList = [];
            if (props.choosedKeys && props.choosedKeys.labelstr && props.choosedKeys.idstr) {
                var ids = props.choosedKeys.idstr.split('、');
                var labels = props.choosedKeys.labelstr.split('、');

                if (ids.length > 0 && ids.length === labels.length) {
                    checkedList = ids.map((o, index) => {
                        return { id: parseFloat(o), brand_name_ch: labels[index] };
                    })
                    // this.setState({checkedList});
                }
            }
            this.fetch({ checkedList });
        }
        this.setState({ visible: props.visible ? true : false });
    }
    //弹窗点击打开自动调用
    componentWillMount() {
        this.doInit(this.props);
    }
    //弹窗点击打开自动调用
    componentWillReceiveProps(nextProps) {
        this.doInit(nextProps);
    }

    restDefault = () => {
        this.setState({ visible: false, selectedRowKeys: [], query: {},checked:'', pagination: { current: 1, total: 0, pageSize:5}, reaiomoren: null, checkedlistall: [], checkedList: [], dataSource: [] }); //重置数据
    }

    setVisible = (visible) => {
        this.setState({ visible: visible });
    }

    handleOk = (e) => {
        var { checkedlistall, reaiomoren } = this.state;
        var company = {
            companyName: '',
            companyuser: '',
            companyipone: '',
            contactsId: '',  //联系人id
            supplierId: '',  //供应商ID
        }

        checkedlistall.map(function (item, index) {
            if (item.contactList.length >= 2) {
                item.contactList.map(function (e, index) {
                    if (reaiomoren == e.contactId) {
                        company.companyuser = e.fullname
                        company.companyipone = e.mobile
                        company.contactsId = e.contactId
                    }
                });
                company.companyName = item.companyName;
                company.supplierId = item.supplierId;
            } else if (item.contactList.length == 1) {
                company.companyName = item.companyName;
                company.companyipone = item.contactList[index].mobile;
                company.companyuser = item.contactList[index].fullname;
                company.supplierId = item.supplierId;
                company.contactsId = item.contactList[index].contactId;
            } else {
                company.companyName = item.companyName;
                company.companyipone = "";
                company.companyuser = "";
                company.supplierId = item.supplierId;
                company.contactsId = "";
            }
        });
        this.props.onChoosed(company);
        this.restDefault();
    }
    handleCancel = (e) => {
        this.props.onCancel();
        this.restDefault();
    }
    handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
        //console.log(pagination);
        this.fetch({ pagination });
    }
    onQuery = (query) => {  //查询的时候调用
        var { pagination } = this.state;
        pagination.current = 1; //点击查询将页码归1
        this.setState({ pagination: { ...pagination } })
        this.fetch({ query });
    }

    fetch = (value) => {
        this.setState({ isFetching: true });
        var { query, pagination, checkedList } = this.state;
        if (value && value.pagination) { //解释分页查询条件
            pagination.current = value.pagination.current;
            pagination.pageSize = value.pagination.pageSize;
        }
        if (value && value.query) { //解析form表单查询条件
            query = _.omitBy(value.query, _.isUndefined); //删除undefined参数
        }

        if (value && value.checkedList) { //解析初始化的代码
            checkedList = value.checkedList;
        }

        var params = { ...query, pageNo: pagination.current, pageSize: pagination.pageSize };
        axios.get(connect_srm + '/clue/getCompanyList.do', { params: params }).then((res) => {
            var data = res.data.data.resultList;
            var pageSize = parseInt(res.data.data.pageSize);
            this.setState({ query: query, dataSource: data, pagination: { ...pagination, pageSize: pageSize, total: res.data.data.rowCount }, isFetching: false });
        }).catch((e) => {
            this.setState({ isFetching: false });
            console.log('data error');
        });
    }

    formateDataWithChecked = (checkedList, data) => {
        const s = new Set();
        checkedList.forEach((d) => {
            s.add(d.key);
        })
        return data.map((d) => {
            d.isChecked = s.has(d.key);
            return d;
        });
    }

    radioonChange = (e) => {
        this.setState({ reaiomoren: e.target.value,checked:e.target.value});
    }
    redtablelist=()=>{
        var { query, pagination, checkedList } = this.state;
        var params = { ...query, pageNo: pagination.current, pageSize: pagination.pageSize };
        axios.get(connect_srm + '/clue/getCompanyList.do', { params: params }).then((res) => {
            var data = res.data.data.resultList;
            var pageSize = parseInt(res.data.data.pageSize);
            this.setState({ query: query, dataSource: data, pagination: { ...pagination, pageSize: pageSize, total: res.data.data.rowCount }, isFetching: false });
        }).catch((e) => {
            this.setState({ isFetching: false });
            console.log('data error');
        });
        
    }
    render() {
        var { dataSource, checkedList, visible, pagination, isFetching, checked} = this.state;
        var { addOrRemoveCheckList } = this.state;
        const { selectedRowKeys,reaiomoren} = this.state;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(selectedRows[0].companyName);
                let che=selectedRows[0].contactList[0].contactId;

                this.setState({ selectedRowKeys: selectedRowKeys, checkedlistall: selectedRows,checked:che,reaiomoren:che })
            },
        };
        const columns = this.columns;
        const WrappedQueryFrom = Form.create()(QueryFrom);
        return (
            <Modal title='选择供应商' visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <WrappedQueryFrom onQuery={this.onQuery} query={this.state.query} />
                <div className="tctit">
                    <span><a href="javascript:;" onClick={this.redtablelist}>刷新列表</a></span>
                    <span><a href='http://srm.csc86.com/newClue/?systemId=fe5a16a4f59fcf086d89173b54b5e8c3&moduleId=cc266cfe88bd704831bdac5ca11c5672'>添加企业</a></span>
                </div>
                <Table bordered rowSelection={rowSelection} className='person-selector-tablewrap' columns={columns} dataSource={dataSource}
                    rowKey={record => record.supplierId}  //数据中已key为唯一标识
                    pagination={pagination}
                    loading={isFetching}
                    onChange={this.handleTableChange}
                />
            </Modal>
        );
    }
}

