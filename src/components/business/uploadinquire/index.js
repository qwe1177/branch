import React from 'react';
import PropTypes from 'prop-types'

import QueryFrom from './QueryFrom';
import './layout.css';
import { Modal, Table,Form,Button,Tag,Radio } from 'antd';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import { connect_url } from '../../../util/connectConfig';
import axios from 'axios';
const RadioGroup = Radio.Group;
export default class BrandSelector extends React.Component {
    static propTypes = { //声明prop中属性变量
        onChoosed: PropTypes.func.isRequired, //选择之后提交的回调
        onCancel:PropTypes.func.isRequired, //取消之后提交的回调
        visible: PropTypes.bool.isRequired, //属否显示
        choosedKeys:PropTypes.array      //默认选择的品牌
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{key:1,label:xx}
            checkedlistall:[],
            isFetching:false,
            reaiomoren:null,
            pagination:{
                showQuickJumper: false,
                showSizeChanger: true,
                total:0,
                current: 1,
                pageSize: 20,
                showTotal: total => `共 ${total} 条`
            },
            query:{} //查询条件
        }
    }
    restDefault =() =>{
        this.setState({visible: false,selectedRowKeys:[],pagination:{current:1,total:0,},reaiomoren:null,checkedlistall:[],checkedList:[],dataSource:[]}); //重置数据
    }
    setVisible =(visible)=>{
        this.setState({visible:visible});
    }
    componentWillMount(){
        this.setVisible(this.props.visible?true:false);
        if(this.props.choosedKeys && this.props.choosedKeys.length>0){
            this.setState({checkedList:this.props.choosedKeys});
        }
    }
    componentWillReceiveProps(nextProps){
        this.setVisible(nextProps.visible?true:false);
        if(this.props.choosedKeys && this.props.choosedKeys.length>0){
            this.setState({checkedList:this.props.choosedKeys});
        }
    }
    handleOk = (e) => {
        var {checkedlistall,reaiomoren} = this.state;
        var company={
            companyName:'',
            companyuser:'',
            companyipone:'',
            contactsId:'',  //联系人id
            supplierId:'',  //供应商ID
        }
        checkedlistall.map(function (item,index) {
            if(item.contactList.length>=2){
                item.contactList.map(function (e,index){
                    if(reaiomoren==e.contactId){
                        company.companyuser=e.fullname
                        company.companyipone=e.mobile
                        company.contactsId=e.contactId
                    }
                });
                company.companyName=item.companyName;
                company.supplierId=item.supplierId;
            }else if(item.contactList.length==1){
                company.companyName=item.companyName;
                company.companyipone=item.contactList[index].mobile;
                company.companyuser=item.contactList[index].fullname;
                company.supplierId=item.supplierId;
                company.contactsId=item.contactList[index].contactId;
            }else{
                company.companyName=item.companyName;
                company.companyipone="";
                company.companyuser="";
                company.supplierId=item.supplierId;
                company.contactsId="";
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
        this.fetch({pagination});
    }
    onQuery =(query)=>{  //查询的时候调用
        this.fetch({query});
    }
    fetch =(queryParams)=>{
        //console.log(queryParams);
        var token = getLoginInfo()['token'];  //获取token　登录用
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        this.setState({ isFetching: true});
        var {query,pagination,checkedList} =this.state;
        if(queryParams &&　queryParams.pagination){ //解释分页查询条件
            pagination.current =queryParams.pagination.current;
            pagination.pageSize =queryParams.pagination.pageSize;
        }
        if(queryParams &&　queryParams.query){ //解析form表单查询条件
            query = _.omitBy(queryParams.query, _.isUndefined); //删除undefined参数
        }
        var params = {...query,pageNo:pagination.current,pageSize:pagination.pageSize,token: token,moduleId:moduleId};

        axios.get(connect_url + '/v1/clue/viewCompanyList.do', {params: params }).then((res)=>{
            //console.log(res);
            var data = res.data.data.resultList;
            var pageSize=parseInt(res.data.data.pageSize);
            this.setState({dataSource: data,pagination:{...pagination,pageSize:pageSize,total:res.data.data.rowCount},isFetching: false});
        }).catch((e)=>{
            this.setState({ isFetching: false});
            console.log('data error');
        });
    }
    formateDataWithChecked =(checkedList,data)=>{
        const s = new Set();
        checkedList.forEach((d)=>{
            s.add(d.key);
        })
        return data.map((d)=>{
            d.isChecked = s.has(d.key);
            return d;
        });
    }
    // handleRowClick =(record, index, event)=>{
    //     // console.log(event.target);
    //     var className = event.target.getAttribute("class");
    //     if(className.indexOf('js-checked')==-1 && className.indexOf('js-precheck')==-1){
    //         return;
    //     }

    //     var {checkedList,dataSource} = this.state;
    //     var i = checkedList.findIndex((d)=>{
    //         if(d.key ==record.key){
    //             return d;
    //         }
    //     });
    //     var isChecked = record.isChecked;
    //     if(i==-1){ //不存在
    //         checkedList.push(record);
    //     }else{
    //         checkedList.splice(i,1);
    //     }
    //     dataSource[index].isChecked = !isChecked;
    //     this.setState({checkedList: checkedList, dataSource: dataSource});
    // }
    // handleClose =(tag)=>{
    //     var key = tag.key;
    //     var {checkedList,dataSource} = this.state;
    //     var i = checkedList.findIndex((d)=>{
    //         if(d.key ==key){
    //             return d;
    //         }
    //     });
    //     checkedList.splice(i,1);
    //     for(let i= 0,len=dataSource.length;i<len;i++){
    //         if(dataSource[i].key==key){
    //             dataSource[i].isChecked = false;
    //             break;
    //         }
    //     }
    //     this.setState({checkedList: checkedList, dataSource: dataSource});
    // }
    radioonChange=(e) => {
        this.setState({reaiomoren: e.target.value});
    }
    render() {
        var { dataSource, checkedList, visible,pagination,isFetching} = this.state;
        var { addOrRemoveCheckList} = this.state;
        const columns = [{
            title: '供应商名称',
            dataIndex: 'companyName',
        },{
            title: '联系人',
            dataIndex: 'fullnameanda0',
            render: (text, record) => {

                if(record.contactList.length>1){
                    return (
                        <div>
                            <RadioGroup onChange={this.radioonChange.bind(this)} >
                            {record.contactList.map((tag, index)=>{
                                return(<div key={tag.contactId}><Radio value={tag.contactId}>{tag.fullname}/{tag.mobile}</Radio></div>)
                            })}
                            </RadioGroup>
                        </div>
                    );
                }else if(record.contactList.length==1){
                    return (
                        <div> 
                            {record.contactList[0].fullname}/{record.contactList[0].mobile}
                        </div>
                    );
                }else{
                    return (
                        <div></div>
                    );
                }
            }

        }];

        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            type:'radio',
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selectedRowKeys:selectedRowKeys,checkedlistall:selectedRows})
            },
        };
        const WrappedQueryFrom = Form.create()(QueryFrom);
        return (
            <Modal title='选择供应商' visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <WrappedQueryFrom  onQuery={this.onQuery} />
                <div className="tctit">
                    <span><a>刷新列表</a></span>
                    <span><a>添加企业</a></span>
                    <span><a>新增联系人</a></span>
                </div>
                <Table bordered  rowSelection={rowSelection} className='person-selector-tablewrap' columns={columns} dataSource={dataSource} 
                    rowKey={record => record.supplierId}  //数据中已key为唯一标识
                    pagination={pagination}
                    loading={isFetching}
                    onChange={this.handleTableChange}
                />
            </Modal>
        );
    }
}

