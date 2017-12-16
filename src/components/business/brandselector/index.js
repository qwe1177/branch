import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';
import QueryForm from './QueryForm';
import './layout.css';
import { Modal, Table,Form,Button,Tag  } from 'antd';

import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import axios from 'axios';

//联调叶群丽，上线后去掉

export default class BrandSelector extends React.Component {
    static propTypes = { //声明prop中属性变量
        onChoosed: PropTypes.func.isRequired, //选择之后提交的回调
        onCancel:PropTypes.func.isRequired, //取消之后提交的回调
        visible: PropTypes.bool.isRequired, //属否显示
        choosedKeys:PropTypes.object      //默认选择的品牌    {labelstr:'xxx,yyy',idstr:'1,2'}  	
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{id:1,label:xx}
            isFetching:false,
            pagination:{
                size:"small",
                showSizeChanger: true,
                total: 1,
                current: 1,
                pageSize: 5,
                pageSizeOptions:['5','10'],
                showTotal: total => `共 ${total} 条`
            },
            query:{} //查询条件
        }
    }
    restDefault =() =>{
        this.setState({visible: false,checkedList:[],dataSource:[]}); //重置数据
    }
    doInit =(props)=>{
        console.log(props)
        if(props.visible){ //显示的时候
            var checkedList =[];
            if(props.choosedKeys && props.choosedKeys.labelstr && props.choosedKeys.idstr  ){
                var ids = props.choosedKeys.idstr.split('、');
                var labels = props.choosedKeys.labelstr.split('、');

                if(ids.length>0 && ids.length === labels.length){
                    checkedList = ids.map((o,index)=>{
                        return {id:parseFloat(o),brand_name_ch:labels[index]};
                    })
                    // this.setState({checkedList});
                }
            }
            this.fetch({checkedList});
        }
        this.setState({visible:props.visible?true:false});
    }
    componentWillMount(){
        this.doInit(this.props);
    }
    componentWillReceiveProps(nextProps){
        this.doInit(nextProps);
    }
    handleOk = (e) => {
        var {checkedList} = this.state;
        var labels = checkedList.map((o)=>{
			return o.brand_name_ch;
		});
		var ids = checkedList.map((o)=>{
			return o.id;
        });
        this.props.onChoosed(ids.join('、'),labels.join('、'));
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
        this.fetch({query});
    }
    fetch =(queryParams)=>{
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
        if(queryParams &&　queryParams.checkedList){ //解析初始化的代码
            checkedList =queryParams.checkedList;
        }
        var params = {...query,page:pagination.current,limit:pagination.pageSize,token: token,moduleId:moduleId};
        axios.get(connect_srm + '/queryBrandList.do', { params: params }).then((res)=>{
            if(res.data.status){
                var original = res.data.data.brandList;
                var data = this.formateDataWithChecked(checkedList,original);
                this.setState({query:query, dataSource: data,pagination: {...pagination,total:res.data.data.count},isFetching: false,checkedList});
            }
        }).catch((e)=>{
            this.setState({ isFetching: false});
            console.log('data error');
        });
    }
    formateDataWithChecked =(checkedList,data)=>{
        const s = new Set();
        checkedList.forEach((d)=>{
            s.add(d.id);
        })
        return data.map((d)=>{
            d.isChecked = s.has(d.id);
            return d;
        });
    }
    handleRowClick =(record, index, event)=>{
        // console.log(event.target);
        var className = event.target.getAttribute("class");
        if(className.indexOf('js-checked')==-1 && className.indexOf('js-precheck')==-1){
            return;
        }

        var {checkedList,dataSource} = this.state;
        var i = checkedList.findIndex((d)=>{
            if(d.id ==record.id){
                return d;
            }
        });
        var isChecked = record.isChecked;
        if(i==-1){ //不存在
            checkedList.push(record);
        }else{
            checkedList.splice(i,1);
        }
        dataSource[index].isChecked = !isChecked;
        this.setState({checkedList: checkedList, dataSource: dataSource});
    }
    handleClose =(tag)=>{
        var id = tag.id;
        var {checkedList,dataSource} = this.state;
        var i = checkedList.findIndex((d)=>{
            if(d.id ==id){
                return d;
            }
        });
        checkedList.splice(i,1);
        for(let i= 0,len=dataSource.length;i<len;i++){
            if(dataSource[i].id==id){
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
            title: '品牌名称',
            dataIndex: 'brand_name_ch',
            key: 'brand_name_ch'
        },{
            title: '品牌英文名称',
            dataIndex: 'brand_name_en',
            key: 'brand_name_en'
        },{
            title: 'LOGO',
            dataIndex: 'brand_logo_url',
            key: 'brand_logo_url',
            render: (text, record) => {
                return (text?<img style={{width:'20px',height:'20px'}} src={text} />:'');
            }
        }, {
            title: '操作',
            key: 'action',
            width:76,
            render: (text, record) => {
                if(record.isChecked){
                    return (<Button type="primary" className="js-checked" >已选择</Button>);
                }else{
                    return (<Button  className="js-precheck"  >选择</Button>);
                }
            }
        }
        ];
        const WrappedQueryForm = Form.create()(QueryForm);
        return (
            <Modal title='选择品牌' visible={visible} className='brand-selector'
                onOk={this.handleOk} onCancel={this.handleCancel}
            >
                <div className='person-selector-tagswrap'>
                <span>已选品牌：</span>
                {checkedList.map((tag, index)=>{
                    return(<Tag color='#6392c1' key={tag.id}  closable afterClose={() => this.handleClose(tag)}>
                    {tag.brand_name_ch}
                    </Tag>)
                })}
                </div>
                <WrappedQueryForm  onQuery={this.onQuery} query={this.state.query} />
                <Table bordered className='person-selector-tablewrap' columns={columns} dataSource={dataSource} 
                rowKey={record => record.id}  //数据中已key为唯一标识
                    pagination={pagination}
                    loading={isFetching}
                    onChange={this.handleTableChange}
                    onRowClick = {this.handleRowClick}
                     />
            </Modal >
        );
    }
}

