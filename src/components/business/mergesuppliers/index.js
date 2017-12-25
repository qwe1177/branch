import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';
import QueryForm from './QueryForm';
import './layout.css';
import { Modal, Table, Form, Button, Tag } from 'antd';

import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo, getUrlParams } from '../../../util/baseTool';
import axios from 'axios';


export default class MergeSuppliers extends React.Component {
    static propTypes = { //声明prop中属性变量
        onComfirm: PropTypes.func.isRequired, //提交合并请求之后的回调
        onCancel:PropTypes.func.isRequired, //取消之后提交的回调
        supplierId: PropTypes.string.isRequired, //传入的的要合并的供应商id
        companyName: PropTypes.string.isRequired, //传入的的要合并的供应商id
        visible: PropTypes.bool.isRequired //属否显示
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{id:1,label:xx}
            isFetching: false,
            pagination: {
                size: "small",
                showSizeChanger: true,
                total: 1,
                current: 1,
                pageSize: 5,
                pageSizeOptions: ['5', '10'],
                showTotal: total => `共 ${total} 条`
            },
            query: {}, //查询条件
            step: 1 //提交第几步
        }
    }
    restDefault = () => {
        this.setState({ visible: false, checkedList: [], dataSource: [],step:1 }); //重置数据
    }
    doInit = (props) => {
        if (props.visible) { //显示的时候
            if (props.choosedKeys && props.choosedKeys.labelstr && props.choosedKeys.idstr) {
                var ids = props.choosedKeys.idstr.split(',');
                var labels = props.choosedKeys.labelstr.split(',');
                if (ids.length > 0 && ids.length === labels.length) {
                    var checkedList = ids.map((o, index) => {
                        return { id: o, brand_name_ch: labels[index] };
                    })
                    this.setState({ checkedList });
                }
            }
            this.fetch();
        }
        this.setState({ visible: props.visible ? true : false });
    }
    componentWillMount() {
        this.doInit(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.doInit(nextProps);
    }

    handleCancel = (e) => {
        this.props.onCancel();
        this.restDefault();
    }
    handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
        this.fetch({ pagination });
    }
    onQuery = (query) => {  //查询的时候调用
        this.fetch({ query });
    }
    fetch = (queryParams) => {
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';

        this.setState({ isFetching: true });
        var { query, pagination, checkedList } = this.state;
        if (queryParams && queryParams.pagination) { //解释分页查询条件
            pagination.current = queryParams.pagination.current;
            pagination.pageSize = queryParams.pagination.pageSize;
        }
        if (queryParams && queryParams.query) { //解析form表单查询条件
            query = _.omitBy(queryParams.query, _.isUndefined); //删除undefined参数
        }
        var params = { ...query, page: pagination.current, limit: pagination.pageSize, token: token, moduleId: moduleId };
        axios.get(connect_srm + '/clue/getIntoSupplierList.do', { params: params, timeout: 10000 }).then((res) => {
            if (res.data.code = '1') {
                var original = res.data.data.supplierList;
                var data = this.formateDataWithChecked(checkedList, original);
                this.setState({ query: query, dataSource: data, pagination: { ...pagination, total: res.data.data.count }, isFetching: false });
            }
        }).catch((e) => {
            this.setState({ isFetching: false });
            console.log('data error');
        });
    }
    formateDataWithChecked = (checkedList, data) => {
        const s = new Set();
        checkedList.forEach((d) => {
            s.add(d.id);
        })
        return data.map((d) => {
            d.isChecked = s.has(d.id);
            return d;
        });
    }
    handleRowClick = (record, index, event) => {
        // console.log(event.target);
        var className = event.target.getAttribute("class");
        if (className.indexOf('js-checked') == -1 && className.indexOf('js-precheck') == -1) {
            return;
        }

        var { checkedList, dataSource } = this.state;
        var i = checkedList.findIndex((d) => {
            if (d.id == record.id) {
                return d;
            }
        });
        var isChecked = record.isChecked;
        if (i == -1) { //不存在
            checkedList.push(record);
        } else {
            checkedList.splice(i, 1);
        }
        dataSource[index].isChecked = !isChecked;
        this.setState({ checkedList: checkedList, dataSource: dataSource });
    }
    handleClose = (tag) => {
        var id = tag.id;
        var { checkedList, dataSource } = this.state;
        var i = checkedList.findIndex((d) => {
            if (d.id == id) {
                return d;
            }
        });
        checkedList.splice(i, 1);
        for (let i = 0, len = dataSource.length; i < len; i++) {
            if (dataSource[i].id == id) {
                dataSource[i].isChecked = false;
                break;
            }
        }
        this.setState({ checkedList: checkedList, dataSource: dataSource });
    }
    handleMyCancel1 =()=>{
        this.setState({visible:false});
        this.restDefault();
    }
    turnToNext =() =>{
        this.setState({step:2});
    }
    handleMyCancel2 =() =>{
        this.setState({step:1});
    }
    doSubmit=() =>{
        var { checkedList } = this.state;
        var ids = checkedList.map((o) => {
            return o.supplierId;
        });
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId'] ? urlParams['moduleId'] : '';

        var supplierId  = this.props.supplierId;
        var toSupplierId  = ids.toString();

        var params = { supplierId,toSupplierId, token,moduleId};
        axios.get(connect_srm + '/clue/editIntoSupplierClue.do', { params: params, timeout: 10000 }).then((res) => {
            if (res.data.code = '1') {
                this.props.onComfirm(true);
                setTimeout(()=> {
                    location.href = document.referrer;
                }, 1000)
            }else{
                this.props.onComfirm(false);
            }
        }).catch((e) => {
            this.props.onComfirm(false);
            console.log(e);
        });
        this.restDefault();
    }
    render() {
        var { dataSource, checkedList, visible, pagination, isFetching } = this.state;
        var { addOrRemoveCheckList } = this.state;
        const columns = [{
            title: '企业名称',
            dataIndex: 'companyName',
            key: 'companyName'
        }, {
            title: '级别',
            dataIndex: 'sLevel',
            key: 'sLevel'
        }, {
            title: '操作',
            key: 'action',
            width: 76,
            render: (text, record) => {
                if (record.isChecked) {
                    return (<Button type="primary" className="js-checked" >已选择</Button>);
                } else {
                    return (<Button className="js-precheck"  >选择</Button>);
                }
            }
        }
        ];
        const WrappedQueryForm = Form.create()(QueryForm);
        var mainClassName = this.state.step == '1' ? 'merge-suppliers step1' : 'merge-suppliers step2';
        var title = this.state.step == '1' ? '并入客户' : '确认合并';
        return (
            <Modal title='并入企业' visible={visible} className={mainClassName}
                onOk={this.handleOk} onCancel={this.handleCancel} footer={null}
            >
                <div className='step1-wrap'>
                    <div>
                        <span>已选企业：</span>
                        {checkedList.map((tag, index) => {
                            return (<Tag color='#6392c1' key={tag.id} closable afterClose={() => this.handleClose(tag)}>
                                {tag.companyName}
                            </Tag>)
                        })}
                    </div>
                    <WrappedQueryForm onQuery={this.onQuery} query={this.state.query} />
                    <Table bordered columns={columns} dataSource={dataSource}
                        rowKey={record => record.id}  //数据中已key为唯一标识
                        pagination={pagination}
                        loading={isFetching}
                        onChange={this.handleTableChange}
                        onRowClick={this.handleRowClick}
                    />
                    <div className='bottom-wrap'>
                        <Button onClick={this.handleMyCancel1}>取消</Button>
                        <Button type="primary" onClick={this.turnToNext}>确认</Button>
                    </div>
                </div>
                <div className='step2-wrap'>
                    <div className='step2-label'>
                        请确认是否将客户
                    {this.state.checkedList.map((o,index) =>{
                        return (<span key={index}>{o.companyName}</span>)
                    })}
                        合并到{this.props.companyName}
                    </div>
                    <div className='bottom-wrap'>
                        <Button onClick={this.handleMyCancel2}>取消</Button>
                        <Button type="primary" onClick={this.doSubmit} >确认</Button>
                        此操作不可撤回，请谨慎操作
                    </div>
                </div>
            </Modal >
        );
    }
}

