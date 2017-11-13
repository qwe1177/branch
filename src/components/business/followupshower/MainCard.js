import React from 'react';
import PropTypes from 'prop-types'
import { Card, Tag, Row, Col, Button, Icon } from 'antd';

import './MainCard.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow ,doModifiyFollowInfo} from './redux';

@connect(
    state => ({ followupShower: state.followupShower }),
    dispatch => bindActionCreators({ doDeleteFollowMessage, doFirstQueryFollow, doQueryFollow,doModifiyFollowInfo }, dispatch)
)


class MainCard extends React.Component {
    static propTypes = {
        // tableData: PropTypes.array, //查询结果(表格数据)
        // isFetching: PropTypes.bool, //是否正在查询中
        // selectedList:PropTypes.array, //表格中选择多选状态
        // pagination:PropTypes.object //表格中的分页
    }
    componentWillMount() {
        // this.props.initSupplierTable();
    }

    removeOneMess =(listKey,messkey)=>{
        console.log('listKey='+listKey);
        console.log('messkey='+messkey);
        this.props.doDeleteFollowMessage({listKey:listKey,messkey:messkey});
    }
    render() {
        const data = this.props.data;
        const title = <div><span>{data.mainName}</span><span className='card-date'>{data.createDate}</span></div>;
        const tags = <div>{data.tags.map((o,index) => { return <Tag key={index} >{o.label}</Tag> })}</div>
        // const title =this.props.mainName;
        return (
            <Card className='followup-card' title={title} noHovering extra={tags}>
                <Row>
                    <Col span={8}>
                        <span className='label'>主动联络方:</span>
                        <span className='value'>{data.doContact}</span>
                    </Col>
                    <Col span={8}>
                        <span className='label'>联系人:</span>
                        <span className='value'>{data.contactPerson}</span>
                    </Col>
                    <Col span={8}>
                        <span className='label'>跟进方式:</span>
                        <span className='value'>{data.followType}</span>
                    </Col>
                </Row>
                <Row className="marginStyle">
                    <Col>
                        <span className='label'>洽谈内容:</span>
                        <span className='value'>{data.negotiationContent}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <span className='label'>下次跟进计划:</span>
                        <span className='value'>{data.planNext}</span>
                    </Col>
                    <Col span={6}>
                        <span>{data.followInfo}</span>
                    </Col>
                </Row>
                {data.message.map((o) => {
                    return <Row key={o.key} className="region-tool" type="flex" justify="space-between">
                        <Col span={20}>
                            <span className='label'>{o.author}:</span>
                            <span className='value'>{o.message}</span>
                        </Col>
                        <Col span={4} className='card-option'>
                            <div>{o.date}</div>
                            <div className='remove-btn'  onClick={() => this.removeOneMess(data.key,o.key)}>删除</div>
                        </Col>
                    </Row>
                })}
                <Row>
                    <Col span={24} className='card-edit'>
                        <Icon type="edit" />
                    </Col>
                </Row>
            </Card>
        );
    }
}


export default MainCard;