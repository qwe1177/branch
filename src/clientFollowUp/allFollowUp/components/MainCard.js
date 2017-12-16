import React from 'react';
import PropTypes from 'prop-types'
import { Card,Tag,Row,Col,Button,Icon,Input,message } from 'antd';
import CommentForm from './CommentForm';
import { getLoginInfo} from '../../../util/baseTool.js';
import { connect_srm } from '../../../util/connectConfig';
import './MainCard.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showOneCommentForm,doQueryFollow} from '../actions/index.js';


@connect(
    state => ({ AllFollowUP: state.AllFollowUP}),
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
 showModal = (key, id) => {
        this.props.onEdit(key, id)
    }    
removeOneMess =(id)=>{
    let _this = this;
    var token = getLoginInfo()['token']; 
    axios.get(connect_srm+'/supplier/delSupplierFollowupPostil.do',{
        params: {
          id: id ,
          token
        } 
      })
      .then(function (response) {
        _this.props.doQueryFollow({query:_this.props.AllFollowUP.query,pagination:_this.props.AllFollowUP.pagination});
        message.success('删除成功!');
      })
      .catch(function (error) {
        console.log(error);
      });
}
showFrom = (id) =>{
    var list = this.props.AllFollowUP.list;
    this.props.showOneCommentForm(list,id);
}
    render() {
        const data = this.props.data;
        const title = <div><a src="#">{data.companyName}</a><span className='card-date'>{data.createTime}</span></div>;
        var tagsType = data.followUpFlag != '' ? data.followUpFlag.split(',') : data.followUpNode.split(',');
        const tags =  <div>{tagsType.map((o,index) => { return <Tag key={index} >{o}</Tag> })}</div> ;
        return (
            <div className='allFollowUp'>
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
                    {data.supplierFollowupPostilDTOs.map((o) => {
                            return <Row key={o.id} className="region-tool delete-follow" type="flex" justify="space-between">
                                        <Col span={20}>
                                            <span className='label'>{o.realName}:&nbsp;</span>
                                            <span className='value'>{o.postilContent}</span>
                                        </Col>
                                        <Col span={4} className='card-option'>
                                            <div>{o.createTime}</div>
                                            {o.self == 'Y' ? <div className='remove-btn' onClick={() => this.removeOneMess(o.id)}>删除</div> : ''}
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
                            {/* 自己是负责人可以修改 */}
                            {data.self=='Y'?<Icon type="edit" onClick={()=>{this.showModal(data.supplierId,data.id)}}/>:''}
                            {/* 下属是负责人可以添加批注 */}
                            {data.underling == 'Y' ? <Icon type="edit" onClick={()=>{this.showFrom(data.id)}} /> : ''}
                        </Col>
                    </Row>
                </Card>  
            
            </div>
            
        )
    }
   
}
export default MainCard;