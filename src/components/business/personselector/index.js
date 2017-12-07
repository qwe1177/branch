import React from 'react';
import PropTypes from 'prop-types'

import QueryFrom from './QueryFrom';
import './layout.css';
import { Modal, Table,Form,Button,Tag  } from 'antd';

import { connect_cas } from '../../../util/connectConfig';
import { getLoginInfo} from '../../../util/baseTool';
import axios from 'axios';
import _ from 'lodash';

///chooseperson
class PersonSelector extends React.Component {
    static propTypes = { //声明prop中属性变量
        onChoosed: PropTypes.func.isRequired, //选择人之后提交的url
        onCancel:PropTypes.func.isRequired, //选择人canel之后的问题
        title:PropTypes.string,
        visible: PropTypes.bool.isRequired,
        type:PropTypes.string,  // single 单选 multiple 多选
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{userId:1,realName:xx}
            isFetching:false,
            pagination:{
                showQuickJumper: true,
                showSizeChanger: true,
                total: 1,
                current: 1,
                pageSize: 5,
                pageSizeOptions:['5', '10'],
                showTotal: total => `共 ${total} 条`
            },
            query:{}, //查询条件
            treeData:[]
        }
    }
    restDefault =() =>{
        this.setState({visible: false,checkedList:[],dataSource:[]}); //重置数据
    }
    setVisible =(visible)=>{
        this.setState({'visible':visible});
        if(visible){
            this.fetch();
        }
    }
    componentWillMount(){
        this.setVisible(this.props.visible?true:false);
        this.queryData();
    }
    componentWillReceiveProps(nextProps){
        this.setVisible(nextProps.visible?true:false);
    }
    handleOk = (e) => {
        var {checkedList} = this.state;
        var ids = checkedList.map((o)=>o.userId).toString();
        var labels = checkedList.map((o)=>o.realName).toString();
        this.props.onChoosed(ids,labels,this.props.actionInfo);
        this.restDefault();
    }
    handleCancel = (e) => {
        this.props.onCancel();
        this.restDefault();
    }
    handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
        this.fetch({pagination});
    }
    onQuery =(query)=>{  //查询的时候调用
        var currentquery = {...this.state.query,...query};
        this.fetch({'query':currentquery});
    }
    fetch =(paramsObj)=>{
        var token = getLoginInfo()['token'];  //获取token　登录用
        var {pagination,checkedList} =this.state;
        var params = {token:token,page:pagination.current,pageSize:pagination.pageSize};
        if(paramsObj){
            if(paramsObj.query){
                params = {...params,...paramsObj.query};
            }
            if(paramsObj.pagination){
                pagination = paramsObj.pagination;
                params = {...params,'page':paramsObj.pagination.current,'pageSize':paramsObj.pagination.pageSize};
            }
        }
        params = _.omitBy(params, _.isUndefined); //删除undefined参数
        this.setState({ isFetching: true});
        axios.get(connect_cas + '/api/user/searchUserList', { params: params }).then((res)=>{
            if(res.data.code=='0'){
                var original = res.data.data.rows;
                var data = this.formateDataWithChecked(checkedList,original);
                var op = { dataSource: data,pagination: {...pagination,total:parseInt(res.data.data.total)} ,isFetching: false}
                if(paramsObj && paramsObj.query){
                    op['query'] =paramsObj.query;
                }
                this.setState(op);
            }else{
                this.setState({ isFetching: false});
            }
        }).catch((e)=>{
            this.setState({ isFetching: false});
            console.log('data error');
        });
    }
    getTree = (list, parentId)=>{
		var formatTree = (items, parentId) =>{
			let result = [];
			if (!items[parentId]) {
				return result;
			}
			for (let t of items[parentId]) {
				t.children = formatTree(items, t.key)
				result.push(t);
			}
		  return result;
		};

		list = list.map((o)=>{
			return  {label:o.departmentName,key:o.departmentId,value:o.departmentId,parent_id:o.pid};
		})

		var items= {};
		// 获取每个节点的直属子节点，*记住是直属，不是所有子节点
		for (let i = 0; i < list.length; i++) {
			 let key = list[i].parent_id;
			 if (items[key]) {
				 items[key].push(list[i]);
			 } else {
				 items[key] = [];
				 items[key].push(list[i]);
			 }
		 }
		 return formatTree(items, parentId);
    }
    queryData =()=>{
		var token = getLoginInfo()['token'];  //获取token　登录用
		axios.get(connect_cas + '/api/user/getAllDepartment', { params: {token:token} }).then((res) => {
			if(res.data.code=='0'){
				var d  = res.data.data;
				var treeData =this.getTree(d,'');
				// console.log(treeData);
				this.setState({treeData})
			}
		}).catch((e) => {
		  console.log(e);
		});
	}
    formateDataWithChecked =(checkedList,data)=>{
        const s = new Set();
        checkedList.forEach((d)=>{
            s.add(d.userId);
        })
        return data.map((d)=>{
            d.isChecked = s.has(d.userId);
            return d;
        });
    }
    handleRowClick =(record, index, event)=>{
        console.log(event.target);
        var className = event.target.getAttribute("class");
        if(className.indexOf('js-checked')==-1 && className.indexOf('js-precheck')==-1){
            return;
        }

        var {checkedList,dataSource} = this.state;

        const type = this.props.type?this.props.type:'single';
        if(type=='single'  && checkedList.length==1){ //支持单选只能不能超过1
            return; 
        }

        var i = checkedList.findIndex((d)=>{
            if(d.userId ==record.userId){
                return d;
            }
        });
        var isChecked = record.isChecked;
        if(i==-1){ //不存在
            checkedList.push({userId:record.userId,realName:record.realName});
        }else{
            checkedList.splice(i,1);
        }
        dataSource[index].isChecked = !isChecked;
        this.setState({checkedList: checkedList, dataSource: dataSource});
    }
    handleClose =(tag)=>{
        var userId = tag.userId;
        var {checkedList,dataSource} = this.state;
        var i = checkedList.findIndex((d)=>{
            if(d.userId ==userId){
                return d;
            }
        });
        checkedList.splice(i,1);
        for(let i= 0,len=dataSource.length;i<len;i++){
            if(dataSource[i].userId==userId){
                dataSource[i].isChecked = false;
                break;
            }
        }
        this.setState({checkedList: checkedList, dataSource: dataSource});
    }
    render() {
        var { dataSource, checkedList, visible,pagination,isFetching} = this.state;
        var { addOrRemoveCheckList} = this.state;
        const columns = [{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName'
        }, {
            title: '部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if(record.isChecked){
                    return (<Button type="primary" className="js-checked" >已选择</Button>);
                }else{
                    return (<Button  className="js-precheck"  >选择</Button>);
                }
            }
        }];


        const WrappedQueryFrom = Form.create()(QueryFrom);
        const type = this.props.type?this.props.type:'single';
        var title = (this.props.title?this.props.title:'选择负责人') + (type=='single'?'(单选)':'(多选)');
        return (
            <Modal title={title} visible={visible}
                onOk={this.handleOk} onCancel={this.handleCancel}
            >
                <div className='person-selector-tagswrap'>
                {checkedList.map((tag, index)=>{
                    return(<Tag key={tag.userId}  closable afterClose={() => this.handleClose(tag)}>
                    {tag.realName}
                    </Tag>)
                })}
                </div>
                <WrappedQueryFrom  onQuery={this.onQuery.bind(this)} query={this.state.query} treeData={this.state.treeData}  />
                <Table bordered className='person-selector-tablewrap' columns={columns} dataSource={dataSource} rowKey={record => record.userId}  //数据中已key为唯一标识
                    pagination={pagination}
                    loading={isFetching}
                    onChange={this.handleTableChange}
                    onRowClick = {this.handleRowClick}
                     />
            </Modal >
        );
    }
}

export default PersonSelector;