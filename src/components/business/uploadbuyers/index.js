import React from 'react';
import PropTypes from 'prop-types'

import QueryFrom from './QueryFrom';
import './layout.css';
import { Modal, Table,Form,Button,Tag,Radio } from 'antd';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import { connect_url,crmnew_url } from '../../../util/connectConfig';
import axios from '../../../util/axios'
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
            pagination:{
                showQuickJumper: false,
                showSizeChanger: true,
                total:0,
                current: 1,
                pageSize: 5,
                pageSizeOptions:['5','10'],
                showTotal: total => `共 ${total} 条`
            },
            query:{} //查询条件
        }
    }
    restDefault =() =>{
        this.setState({visible: false,selectedRowKeys:[],pagination:{  showQuickJumper: false,
            showSizeChanger: true,
            total:0,
            current: 1,
            pageSize: 5,
            pageSizeOptions:['5','10'],
            showTotal: total => `共 ${total} 条`},reaiomoren:null,checkedlistall:[],checkedList:[],dataSource:[]}); //重置数据
    }
    setVisible =(visible)=>{
        this.setState({visible:visible});
    }
    componentDidMount() {

        //var params = {...query,page:pagination.current,pageSize:pagination.pageSize};
        // axios.get(crmnew_url + '/api/purchaser/searchPurchaserList', {params: params }).then((res)=>{
        //     var data = res.data.data.rows;
        //     var pageSize=parseInt(res.data.data.pageSize);
        //     var total=parseInt(res.data.data.total);
        //      this.setState({dataSource: data,pagination:{...pagination,pageSize:pageSize,total:total},isFetching: false});
        // }).catch((e)=>{
        //     this.setState({ isFetching: false});
        //     console.log('data error');
        // });
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

    // componentWillMount(){
    //     this.setVisible(this.props.visible?true:false);
    //     if(this.props.choosedKeys && this.props.choosedKeys.length>0){
    //         this.setState({checkedList:this.props.choosedKeys});
    //     }
    // }
    // componentWillReceiveProps(nextProps){
    //     this.setVisible(nextProps.visible?true:false);
    //     if(this.props.choosedKeys && this.props.choosedKeys.length>0){
    //         this.setState({checkedList:this.props.choosedKeys});
    //     }
    // }

    handleOk = (e) => {
        var {checkedlistall} = this.state;
        if(checkedlistall.length!=0) {
            var listall={
                name:checkedlistall[0].purchaserName,
                id:checkedlistall[0].purchaserId
            }
        }
     
        this.props.onChoosed(listall);
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
        this.setState({ isFetching: true});

        var {query,pagination,checkedList} =this.state;
        if(queryParams &&　queryParams.pagination){ //解释分页查询条件
            pagination.current =queryParams.pagination.current;
            pagination.pageSize =queryParams.pagination.pageSize;
        }
        
        if(queryParams &&　queryParams.query){ //解析form表单查询条件
            query = _.omitBy(queryParams.query, _.isUndefined); //删除undefined参数
        }
        
        if (queryParams && queryParams.checkedList) { //解析初始化的代码
            checkedList = queryParams.checkedList;
        }

        var params = {...query,page:pagination.current,pageSize:pagination.pageSize};
        axios.get(crmnew_url + '/api/purchaser/searchPurchaserList', {params: params }).then((res)=>{
            console.log(res)
            var data = res.data.data.rows;
            var pageSize=parseInt(res.data.data.pageSize);
            var total=parseInt(res.data.data.total);
             this.setState({dataSource: data,pagination:{...pagination,pageSize:pageSize,total:total},isFetching: false});
        }).catch((e)=>{
            this.setState({ isFetching: false});
            console.log('data error');
        });
    }
    
    render() {
        var { dataSource, checkedList, visible,pagination,isFetching} = this.state;
        var { addOrRemoveCheckList} = this.state;
        const columns = [{
            title: '采购商名称',
            dataIndex: 'purchaserName',
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
            <Modal title='选择采购商' visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <WrappedQueryFrom  onQuery={this.onQuery} />
                
                <Table bordered  rowSelection={rowSelection} className='person-selector-tablewrap' columns={columns} dataSource={dataSource} 
                    rowKey={record => record.purchaserId}  //数据中已key为唯一标识
                    pagination={pagination}
                    loading={isFetching}
                    onChange={this.handleTableChange}
                />
            </Modal>
        );
    }
}

