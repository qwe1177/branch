import React from 'react';
import PropTypes from 'prop-types'
import { Card,Tag,Row,Col,Button,Pagination,Table} from 'antd';

import './MainCard.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {queryTableData,initSupplierTable,setQueryFrom,doChangeMainCheck} from '../actions';
import ModalFrom from './ModalFrom'


@connect(
  state =>  ({mainQueryData: state.mainQueryData,mainTableData:state.mainTableData,doChangeMainCheck}),
  dispatch => bindActionCreators({queryTableData,initSupplierTable,setQueryFrom}, dispatch)
)


class MainCard extends React.Component {
  static propTypes = {
    tableData: PropTypes.array, //查询结果(表格数据)
    isFetching: PropTypes.bool, //是否正在查询中
    selectedList:PropTypes.array, //表格中选择多选状态
    pagination:PropTypes.object //表格中的分页
  }
  componentWillMount(){
    this.props.initSupplierTable();
  }
  handleTableChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
    let {queryform} =  this.props.mainQueryData;
    let paginationObj =  this.props.mainTableData.pagination;
    paginationObj.current = pagination.current;
    paginationObj.pageSize = pagination.pageSize;
    this.props.queryTableData({queryform:queryform,pagination:paginationObj});
  }
 
  render() {

    const {tableData,pagination,isFetching} =this.props.mainTableData; 
    return (
      <div className="">
                 <Card  title={<div><a href="#">深圳市华南城网科技有限公司</a><span>2017/8/12</span></div>}  noHovering extra={<div><Tag >客户关怀</Tag><Tag >客户关怀</Tag><Tag >客户关怀</Tag></div>}>
                     <Row>
                        <Col span={6}>
                            <span>跟进人:&nbsp;</span>
                            <span>欧阳文杰</span>
                        </Col>
                        <Col span={6}>
                            <span>主动联络方:&nbsp;</span>
                            <span>客户</span>
                        </Col>
                        <Col span={6}>
                            <span>联系人:&nbsp;</span>
                            <span>李小姐</span>
                        </Col>
                        <Col span={6}>
                            <span>跟进方式:&nbsp;</span>
                            <span>电话</span>
                        </Col>
                    </Row>
                    <Row className="marginStyle">
                        <Col>
                            <span>洽谈内容:&nbsp;</span>
                            <span>上次的货，客人经签收入库，没有问题。发票预计可以再8月15前给</span>
                        </Col>
                    </Row>
                    <Row>
                         <Col span={6}>
                            <span>下次跟进计划:&nbsp;</span>
                            <span>李小姐</span>
                        </Col>
                        <Col span={6}>
                            <span>2017/8/12跟进</span>
                        </Col>
                    </Row>
                    <Row className="region-tool" type="flex" justify="space-between">
                         <Col>
                            <span>欧阳文杰:&nbsp;</span>
                            <span>快点跟进，有机会拿下</span>
                        </Col>
                         <Col>
                            <span>2017/8/12</span>
                        </Col>
                    </Row>
                    <Row type="flex" justify="end">
                         <Col>
                            <ModalFrom/>
                        </Col>
                    </Row>
                </Card>  
                
            </div>
    );
  }
}


export default MainCard;