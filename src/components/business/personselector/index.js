import React from 'react';
import PropTypes from 'prop-types'

import QueryFrom from './QueryFrom';
import './layout.css';
import { Modal, Table,Form,Button,Tag  } from 'antd';

import { connect_url } from '../../../util/connectConfig';
import axios from 'axios';

///chooseperson
class PersonSelector extends React.Component {
    static propTypes = { //声明prop中属性变量
        onChoosed: PropTypes.func.isRequired, //选择人之后提交的url
        title:PropTypes.string,
        visible: PropTypes.bool.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{key:1,label:xx}
            isFetching:false,
            pagination:{
                showQuickJumper: true,
                showSizeChanger: true,
                total: 1,
                current: 1,
                pageSize: 10,
                showTotal: total => `共 ${total} 条`
            },
            query:{} //查询条件
        }
    }
    restDefault =() =>{
        this.setState({visible: false,checkedList:[],dataSource:[]}); //重置数据
    }
    setVisible =(visible)=>{
        this.setState({visible:visible});
    }
    componentWillMount(){
        this.setVisible(this.props.visible?true:false);
    }
    componentWillReceiveProps(nextProps){
        this.setVisible(nextProps.visible?true:false);
    }
    handleOk = (e) => {
        var {checkedList} = this.state;
        this.props.onChoosed(checkedList);
        this.restDefault();
    }
    handleCancel = (e) => {
        this.restDefault();
    }
    handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
        var oldpagination = this.state.pagination;
        this.setState({pagination: {...oldpagination,...pagination}});
        this.fetch();
    }
    onQuery =(query)=>{  //查询的时候调用
        this.setState({query: query});
        this.fetch();
    }
    fetch =()=>{
        this.setState({ isFetching: true});
        var {query,pagination,checkedList} =this.state;
        var params = {...query,total:pagination.total,pageSize:pagination.pageSize};
        axios.get(connect_url + '/chooseperson', { params: params }).then((res)=>{
            var original = res.data.data;
            var data = this.formateDataWithChecked(checkedList,original);
            this.setState({ dataSource: data,pagination: {...pagination,total:res.data.total},isFetching: false});
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
    handleRowClick =(record, index, event)=>{
        console.log(event.target);
        var className = event.target.getAttribute("class");
        if(className.indexOf('js-checked')==-1 && className.indexOf('js-precheck')==-1){
            return;
        }

        var {checkedList,dataSource} = this.state;
        var i = checkedList.findIndex((d)=>{
            if(d.key ==record.key){
                return d;
            }
        });
        var isChecked = record.isChecked;
        if(i==-1){ //不存在
            checkedList.push({key:record.key,label:record.name});
        }else{
            checkedList.splice(i,1);
        }
        dataSource[index].isChecked = !isChecked;
        this.setState({checkedList: checkedList, dataSource: dataSource});
    }
    handleClose =(tag)=>{
        var key = tag.key;
        var {checkedList,dataSource} = this.state;
        var i = checkedList.findIndex((d)=>{
            if(d.key ==key){
                return d;
            }
        });
        checkedList.splice(i,1);
        for(let i= 0,len=dataSource.length;i<len;i++){
            if(dataSource[i].key==key){
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
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '部门',
            dataIndex: 'dept',
            key: 'dept',
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

        const title = this.props.title?this.props.title:'选择负责人';
        return (
            <Modal title={title} visible={visible}
                onOk={this.handleOk} onCancel={this.handleCancel}
            >
                <div className='person-selector-tagswrap'>
                {checkedList.map((tag, index)=>{
                    return(<Tag key={tag.key}  closable afterClose={() => this.handleClose(tag)}>
                    {tag.label}
                    </Tag>)
                })}
                </div>
                <WrappedQueryFrom  onQuery={this.onQuery} />
                <Table bordered className='person-selector-tablewrap' columns={columns} dataSource={dataSource} rowKey={record => record.key}  //数据中已key为唯一标识
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