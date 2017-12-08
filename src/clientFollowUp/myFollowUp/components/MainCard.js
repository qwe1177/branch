import React from 'react';
import PropTypes from 'prop-types'
import { Card,Tag,Row,Col,Button,Icon } from 'antd';
import moment from 'moment';
import './MainCard.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  doQueryFollow ,doEditFollowInfo} from '../actions/index.js';


@connect(
    state => ({ MyFollowUP: state.MyFollowUP }),
    dispatch => bindActionCreators({ doQueryFollow,doEditFollowInfo }, dispatch)
)

class MainCard extends React.Component{
    constructor(props) {
        super(props); 
    }
    static propTypes = {
        cardData: PropTypes.array, //查询结果(表格数据)
        isFetching: PropTypes.bool, //是否正在查询中
        // selectedList:PropTypes.array, //表格中选择多选状态
         pagination:PropTypes.object //表格中的分页
    }
    showModal = (key,id)=>(e) => {
        this.props.onEdit(key,id)
      }
    render() {
        const data = this.props.data;
        const title = <div><a src="#">{data.companyName}</a><span className='card-date'>{data.createTime}</span></div>;
        var tagsType = data.followUpFlag != '' ? data.followUpFlag.split(',') : data.followUpNode.split(',');
        const tags =  <div>{tagsType.map((o,index) => { return <Tag key={index} >{o}</Tag> })}</div> ;
        return (
            <div className="myFollowUp">
                 <Card  title={title}  noHovering extra={ tags }>
                     <Row>
                        <Col span={6}>
                            <span className='label' >跟进人:&nbsp;</span>
                            <span className='value'>{data.realName}</span>
                        </Col>
                        <Col span={6}>
                            <span className='label'>主动联络方:&nbsp;</span>
                            <span className='value'>{data.activeContact}</span>
                        </Col>
                        <Col span={6}>
                            <span className='label'>联系人:&nbsp;</span>
                            <span className='value'>{data.contactPersonnel}</span>
                        </Col>
                        <Col span={6}>
                            <span className='label'>跟进方式:&nbsp;</span>
                            <span className='value'>{data.contactWay}</span>
                        </Col>
                    </Row>
                    <Row className="marginStyle">
                        <Col>
                            <span className='label'>洽谈内容:&nbsp;</span>
                            <span className='value'>{data.followUpTheContent}</span>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                         <Col span={14}>
                            <span className='label'>下次跟进计划:&nbsp;</span>
                            <span className='value'>{data.planNextContent}</span>
                        </Col>
                        <Col span={6}>
                            <span>{data.planNextContactTime}</span>
                        </Col>
                    </Row>
                    {data.supplierFollowupPostilDTOs.map((o) => {
                    return <Row key={o.id} className="region-tool" type="flex" justify="space-between">
                        <Col span={20}>
                            <span className='value'>{o.postilContent}</span>
                        </Col>
                        <Col span={4} className='card-option'>
                            <div>{o.createTime}</div>
                        </Col>
                    </Row>
                })}
                    <Row type="flex" justify="end">
                         <Col >
                            <Icon  type="edit" onClick={this.showModal(data.supplierId,data.id)} className="editStyle"></Icon>
                        </Col>
                    </Row>
                </Card>  
            
            </div>
            
        )
    }
   
}
export default MainCard;