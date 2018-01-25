import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types'
import { Card,Tag,Row,Col,Button,Icon,Input } from 'antd';
import CommentForm from './CommentForm';
import { getUrlParams } from '../../../util/baseTool.js';
import './MainCard.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showOneCommentForm,doQueryFollow} from '../actions/index.js';


@connect(
    state => ({ FollowUP: state.FollowUP}),
    dispatch => bindActionCreators({ showOneCommentForm, doQueryFollow}, dispatch)
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
    handleRemoveOneMess = (followUpId, commentId) => {
        this.props.onBeforeDelComment({confirmTarget: {action:'removeMess',data:{followUpId, commentId}}});
    }
showFrom = (id) =>{
    var list = this.props.FollowUP.list;
    this.props.showOneCommentForm(list,id);
}
getDetailUrl =(followupType,type,supplierId,companyName,createTime)=>{
    var urlParams = getUrlParams();
    var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
    var systemId = urlParams['systemId']?urlParams['systemId']:'';
    var detailUrl ='';
    if(followupType == '2') {
        if(type=='my'){
          detailUrl ='/suppliermanage/mysupplierdetail/';
        }else if(type=='theHighSeas'){
          detailUrl ='/suppliermanage/inseasupplierdetail/';
        }else if(type=='underling'){
          detailUrl ='/suppliermanage/underlingsupplierdetail/';
        }
      }else {
        if(type=='my'){
          detailUrl ='/myClueDetail/';
        }else if(type=='theHighSeas'){
          detailUrl ='/publicClueDetail/';
        }else if(type=='underling'){
          detailUrl ='/underlingClueDetail/';
        }
      }
      detailUrl +='?systemId='+systemId+'&moduleId='+moduleId+'&supplierId='+supplierId;
      return detailUrl.indexOf('?') ==0 ? <div>{companyName}<span className='card-date'>{createTime}</span></div> : <div><a target="_blank" href={detailUrl}>{companyName}</a><span className='card-date'>{createTime}</span></div>;
  }
    render() {
        const data = this.props.data;
        // const title = <div><a src="#">{data.companyName}</a><span className='card-date'>{data.createTime}</span></div>;
        var tagsType = data.followUpFlag != '' ? data.followUpFlag.split(',') : data.followUpNode.split(',');
        const tags =  <div>{tagsType.map((o,index) => { return <Tag key={index} >{o}</Tag> })}</div> ;

        return (
            <div className='followUp'>
                 <Card  title={this.getDetailUrl(data.followupType,data.type,data.supplierId,data.companyName,data.createTime)}  extra={ tags }>
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
                         <Col span={12}>
                            <span className='label'>下次跟进计划:&nbsp;</span>
                            <span className='value'>{data.planNextContent}</span>
                        </Col>
                        <Col span={6}>
                            <span>{data.planNextContactTime}</span>
                        </Col>
                    </Row>
                    {data.supplierFollowupPostilDTOs.map((o) => {
                            return <Row key={o.id} className="region-tool delete-follow" type="flex" justify="space-between">
                                        <Col span={20}>
                                            <span className='label'>{o.realName}:&nbsp;</span>
                                            <span className='value'>{o.postilContent}</span>
                                        </Col>
                                        <Col span={4} className='card-option'>
                                            <div>{o.createTime}</div>
                                            {o.self == 'Y' ? <div className='remove-btn' onClick={() => this.handleRemoveOneMess(data.id, o.id)}>删除</div> : ''}
                                
                                        </Col>
                                    </Row>
                    })}
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
                            {/* 下属是负责人可以添加批注 */}
                            {data.underling == 'Y' ? <Icon type="edit" onClick={()=>{this.showFrom(data.id)}}/> : ''}
                        </Col>
                    </Row>
                   
                </Card>  
            
            </div>
            
        )
    }
   
}
export default MainCard;