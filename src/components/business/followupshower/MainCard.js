import React from 'react';
import PropTypes from 'prop-types'
import { Card, Tag, Row, Col, Button, Icon, message} from 'antd';

import CommentForm from './CommentForm';
import './MainCard.css';
import { connect_srm } from '../../../util/connectConfig';
import axios from '../../../util/axios';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow, doModifiyFollowInfo ,showOneCommentForm} from './redux';


@connect(
    state => ({ followupShower: state.followupShower }),
    dispatch => bindActionCreators({ doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow, doModifiyFollowInfo ,showOneCommentForm}, dispatch)
)


class MainCard extends React.Component {
    handleRemoveOneMess = (followUpId, commentId) => {
        this.props.onBeforeDelComment({confirmTarget: {action:'removeMess',data:{followUpId, commentId}}});
    }
    showModal = (key, id) => {
        this.props.onEdit(key, id)
    }
    showFrom = (id) =>{
        var list = this.props.followupShower.list;
        this.props.showOneCommentForm(list,id);
    }
    render() {
        const data = this.props.data;
        // console.log(data)
        const title = <div><span>{data.realName}</span><span className='card-date'>{data.thisContactTime}</span>
		{data.followUpNode?<span style={{float:'right',padding:'2px 8px',borderRadius:'3px', margin:'7px 15px', background:'#fff',lineHeight:'20px',border:'1px solid #ccc', color:'#666',fontSize:'12px'}}>{data.followUpNode}</span>:''}</div>;
        var followUpFlag = data.followUpFlag;
        followUpFlag = (followUpFlag == null || !followUpFlag) ? [] : followUpFlag.split(",");
        const tags = <div>{followUpFlag.map((o, index) => { return <Tag key={index} >{o}</Tag> })}</div>
        // const title =this.props.mainName;
        return (
            <Card className='followup-card' title={title} noHovering extra={tags}>
                <Row>
                    <Col span={8}>
                        <span className='label'>主动联络方:</span>
                        <span className='value'>{data.activeContact}</span>
                    </Col>
                    <Col span={8}>
                        <span className='label'>联系人:</span>
                        <span className='value'>{data.contactPersonnel}</span>
                    </Col>
                    <Col span={8}>
                        <span className='label'>跟进方式:</span>
                        <span className='value'>{data.contactWay}</span>
                    </Col>
                </Row>
                <Row className="marginStyle">
                    <Col>
                        <span className='label'>洽谈内容:</span>
                        <span className='value'>{data.followUpTheContent}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <span className='label'>下次跟进计划:</span>
                        <span className='value'>{data.planNextContent}</span>
                    </Col>
                    <Col span={6}>
                        <span>{data.planNextContactTime}</span>
                    </Col>
                </Row>
                {data.supplierFollowupPostilDTOs.map((o) => {
                    return <Row key={o.id} className="region-tool" type="flex" justify="space-between">
                        <Col span={18}>
                            <span className='label'>{o.realName}:</span>
                            <span className='value'>{o.postilContent}</span>
                        </Col>
                        <Col span={6} className='card-option'>
                            <div>{o.updateTime}</div>
                            {o.self == 'Y' ? <div className='remove-btn' onClick={() => this.handleRemoveOneMess(data.id, o.id)}>删除</div> : ''}
                        </Col>
                    </Row>
                })}
                 {/* 下属是负责人并且打开了from提交框 可以添加 */}
                {
                    (data.underling=='Y' && data.showCommentForm)?
                    <Row>
                    <Col span={24}>
                        <CommentForm recordsId={data.id} />
                    </Col>
                    </Row>:''
                }
                
                <Row>
                    <Col span={24} className='card-edit'>
                        {/* 自己是负责人可以修改 */}
                        {data.self=='Y'?<Icon type="edit" onClick={()=>{this.showModal(data.supplierId,data.id)}}/>:''}
                        {/* 下属是负责人可以添加批注 */}
                        {data.underling == 'Y' ? <Icon type="edit" onClick={()=>{this.showFrom(data.id)}} /> : ''}
                    </Col>
                </Row>
            </Card>
        );
    }
}


export default MainCard;