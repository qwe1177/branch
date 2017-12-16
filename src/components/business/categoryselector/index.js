import React from 'react';
import PropTypes from 'prop-types'

import './layout.css';
import { Modal, Table,Form,Button,Tag  } from 'antd';

import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';
import axios from 'axios';

//联调叶群丽，上线后去掉

export default class CategorySelector extends React.Component {
    static propTypes = { //声明prop中属性变量
        onChoosed: PropTypes.func.isRequired, //选择之后提交的回调
        onCancel:PropTypes.func.isRequired, //取消之后提交的回调
        visible: PropTypes.bool.isRequired, //属否显示
        choosedKeys:PropTypes.string      //默认选择的品类
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            visible: false,
            dataSource: [],
            checkedList: [], //形式为{cid:1,label:c_name}
        }
    }
    restDefault =() =>{
        this.setState({visible: false,selectedRowKeys:[],dataSource:[]}); //重置数据
    }
    doInit =(props)=>{
        if(props.visible){ //显示的时候
            if(props.choosedKeys){
                var choosedKeys = props.choosedKeys.split(',');
                choosedKeys =  choosedKeys.map((o) => {
                    return parseInt(o);
                })
                this.setState({selectedRowKeys:choosedKeys});
            }
            this.fetch();
        }
        this.setState({visible:props.visible?true:false});
    }
    setVisible =(visible)=>{
        this.setState({visible:visible});
    }
    componentWillMount(){
        this.doInit(this.props);
    }
    componentWillReceiveProps(nextProps){
        this.doInit(nextProps);
    }
    handleOk = (e) => {
        var {checkedList,selectedRowKeys} = this.state;
        if(selectedRowKeys.length==0){
            this.props.onChoosed('','');
        }else{
            if(checkedList.length!=selectedRowKeys.length){
                var s = new Set(selectedRowKeys);
                checkedList =this.state.dataSource.filter((o)=>{
                    if(s.has(o.cid)){
                        return o;
                    }
                })
                this.setState({checkedList:checkedList});
            }
            var labels = checkedList.map((o)=>{
                return o.c_name;
            });
            var ids = checkedList.map((o)=>{
                return o.cid;
            });
            this.props.onChoosed(ids.toString(),labels.toString());
        }
        this.restDefault();
    }
    handleCancel = (e) => {
        this.props.onCancel();
        this.restDefault();
    }
    fetch =()=>{
        this.setState({ isFetching: true});
        var token = getLoginInfo()['token'];  //获取token　登录用
        axios.get(connect_srm + '/queryCategoryList.do', {params:{token}}).then((res)=>{
            if(res.data.status){
                var original = res.data.data;
                this.setState({selectedRowKeys:this.state.selectedRowKeys, dataSource: original,isFetching: false});
            }
        }).catch((e)=>{
            this.setState({ isFetching: false});
            console.log('data error');
        });
    }
    render() {
        var { dataSource, selectedRowKeys, visible,isFetching} = this.state;
        const columns = [{
            title: '品类名称',
            dataIndex: 'c_name',
            key: 'c_name'
            }
        ];

        const rowSelection = {
            selectedRowKeys, 
            onChange: (selectedRowKeys, selectedRows) => {
            //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              this.setState({selectedRowKeys:selectedRowKeys,checkedList:selectedRows})
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
          };

        return (
            <Modal title='选择类目' visible={visible} 
                onOk={this.handleOk} onCancel={this.handleCancel} className='category-selector'
            >
                <Table bordered className='category-selector-tablewrap' columns={columns} dataSource={dataSource} rowKey={record => record.cid}  //数据中已key为唯一标识
                     rowSelection={rowSelection}
                     pagination ={false}
                     showHeader ={false}
                     loading={isFetching}
                     />
            </Modal >
        );
    }
}

