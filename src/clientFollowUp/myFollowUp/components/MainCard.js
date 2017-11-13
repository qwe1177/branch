import React from 'react';
import PropTypes from 'prop-types'
import { Card,Tag,Row,Col,Button,Icon } from 'antd';
import './MainCard.css';
import EditModal from '../../../components/publicFollowUp'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  doFirstQueryFollow, doQueryFollow ,doEditFollowInfo} from '../actions/index.js';
import {doFormEdit} from '../../../components/publicFollowUp/redux';

@connect(
    state => ({ MyFollowUP: state.MyFollowUP,EditModal: state.EditModal }),
    dispatch => bindActionCreators({  doFirstQueryFollow, doQueryFollow,doEditFollowInfo,doFormEdit }, dispatch)
)

class MainCard extends React.Component{
    constructor(props) {
        super(props); 
    }
    static propTypes = {
        // tableData: PropTypes.array, //查询结果(表格数据)
        // isFetching: PropTypes.bool, //是否正在查询中
        // selectedList:PropTypes.array, //表格中选择多选状态
         pagination:PropTypes.object //表格中的分页
    }
    componentWillMount() {
        // this.props.initSupplierTable();
        
    }
    showModal = () => {
        this.props.doFormEdit();
      }
    render() {
        const data = this.props.data;
        const title = <div><a src="#">{data.mainName}</a><span className='card-date'>{data.createDate}</span></div>;
        const tags = <div>{data.tags.map((o,index) => { return <Tag key={index} >{o.label}</Tag> })}</div>
        // const title =this.props.mainName;
        return (
            <div className="myFollowUp">
                 <Card  title={title}  noHovering extra={ tags }>
                     <Row>
                        <Col span={6}>
                            <span className='label' >跟进人:&nbsp;</span>
                            <span className='value'>{data.followPeople}</span>
                        </Col>
                        <Col span={6}>
                            <span className='label'>主动联络方:&nbsp;</span>
                            <span className='value'>{data.doContact}</span>
                        </Col>
                        <Col span={6}>
                            <span className='label'>联系人:&nbsp;</span>
                            <span className='value'>{data.contactPerson}</span>
                        </Col>
                        <Col span={6}>
                            <span className='label'>跟进方式:&nbsp;</span>
                            <span className='value'>{data.followType}</span>
                        </Col>
                    </Row>
                    <Row className="marginStyle">
                        <Col>
                            <span className='label'>洽谈内容:&nbsp;</span>
                            <span className='value'>{data.negotiationContent}</span>
                        </Col>
                    </Row>
                    <Row>
                         <Col span={6}>
                            <span className='label'>下次跟进计划:&nbsp;</span>
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
                        <Col span={3} className='card-option'>
                            <div>{o.date}</div>
                        </Col>
                    </Row>
                })}
                    <Row type="flex" justify="end">
                         <Col >
                            <Icon  type="edit" onClick={this.showModal} className="editStyle"></Icon>
                            <EditModal/>
                        </Col>
                    </Row>
                </Card>  
            
            </div>
            
        )
    }
   
}
export default MainCard;