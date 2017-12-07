import React from 'react';
import PropTypes from 'prop-types'
import { Card,Tag,Row,Col,Button,Icon,Input } from 'antd';
import './MainCard.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doAnnotate,doDeleteFollowMessage,doQueryFollow} from '../actions/index.js';


@connect(
    state => ({ AllFollowUP: state.AllFollowUP}),
    dispatch => bindActionCreators({ doAnnotate,doDeleteFollowMessage, doQueryFollow}, dispatch)
)

class MainCard extends React.Component{
    constructor(props) {
        super(props); 
    }
    static propTypes = {
        list: PropTypes.array, //查询结果(表格数据)
        isFetching: PropTypes.bool, //是否正在查询中
        // selectedList:PropTypes.array, //表格中选择多选状态
         pagination:PropTypes.object //表格中的分页
    }
    componentWillMount() {
        // this.props.initSupplierTable();
    }
onChange(recordsId,value){
    this.props.doAnnotate(recordsId,value)
    this.props.doQueryFollow({query:this.props.AllFollowUP.query,pagination:this.props.AllFollowUP.pagination});
}       
removeOneMess =(id)=>{
    this.props.doDeleteFollowMessage(id);
    this.props.doQueryFollow({query:this.props.AllFollowUP.query,pagination:this.props.AllFollowUP.pagination});
}
    render() {
        const data = this.props.data;
        const title = <div><a src="#">{data.companyName}</a><span className='card-date'>{data.createTime}</span></div>;
        var tagsType = data.followUpFlag != '' ? data.followUpFlag.split(',') : data.followUpNode.split(',');
        const tags =  <div>{tagsType.map((o,index) => { return <Tag key={index} >{o}</Tag> })}</div> ;
        const className = data.supplierFollowupPostilDTOs != '' ?'myFollowUp':'myFollowUp pizhu';
        return (
            <div className={className}>
                 <Card  title={title} noHovering extra={ tags }>
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
                    <Row>
                         <Col span={6}>
                            <span className='label'>下次跟进计划:&nbsp;</span>
                            <span className='value'>{data.planNextContent}</span>
                        </Col>
                        <Col span={6}>
                            <span>{data.planNextContactTime}</span>
                        </Col>
                    </Row>
                    <Row  type="flex" justify="space-between" className='add-follow' align="bottom">
                            <Col span={21} className="region-tool">
                                <input ref={"input"}/>
                            </Col>
                            <Col span={2} className='card-option'>
                                <Tag color="#649acb" onClick={ ()=> this.onChange(data.id,this.refs.input.value)} >添加批注</Tag>
                            </Col>
                    </Row>
                    {data.supplierFollowupPostilDTOs.map((o) => {
                            return <Row key={o.id} className="region-tool delete-follow" type="flex" justify="space-between">
                                        <Col span={20}>
                                            <span className='value'>{o.postilContent}</span>
                                        </Col>
                                        <Col span={4} className='card-option'>
                                            <div>{o.createTime}</div>
                                            <div className='remove-btn'  onClick={() => this.removeOneMess(o.id)}>删除</div>
                                        </Col>
                                    </Row>
                    })}
                </Card>  
            
            </div>
            
        )
    }
   
}
export default MainCard;