import React from 'react';
import {  Button,Modal,Form,Input,Select,Row,Col,Table,Tag } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types'
import PublicModal from '../../../../components/publicFollowUp'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doAdd,doRequest,doCancelForm } from './redux';
import {doFormAdd} from '../../../../components/publicFollowUp/redux'
import {doQueryFollow } from '../../actions'
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
	state =>  ({ AddModal: state.AddModal,EditModal: state.EditModal,MyFollowUP: state.MyFollowUP }),
	dispatch => bindActionCreators({ doAdd,doRequest,doCancelForm,doFormAdd,doQueryFollow  }, dispatch)
  )


class ModalForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            title:'选择要跟进的企业'
        }
    }
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
			let form = this.props.AddModal.query;
			let data ={};
			for(let key in form){  //过滤空字符串
				if(form[key]!=''){
					data[key] = form[key];
				}
			}
			this.props.form.setFieldsValue(data);
        }
        
	addShowModal = (supplierId,companyName,followupType) => {
        this.props.doCancelForm();
        this.props.doFormAdd({supplierId,companyName,followupType,modalType:'1'});
      }
      handleAddSuccess =()=>{
		var {query,pagination} = this.props.MyFollowUP;
		this.props.doQueryFollow({query,pagination});
	}
    addShow = (e) => {
        this.props.doAdd();
        var queryParams =  this.props.AddModal;
        queryParams = _.pick(queryParams,['query','pagination']);
		this.props.doRequest(queryParams)
      }
    handleCancel = () => {
        this.props.doCancelForm();
	  }
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.doRequest({query:values,pagination:this.props.AddModal.pagination});
			}
		});
	}
	  handleRefresh = ()=>{
		let {pagination,isFetching,query} = this.props.AddModal;
		if(!isFetching){
		  pagination.current = 1;  //刷新重置为查询第1页
		  this.props.doRequest({query:query,pagination:pagination});
		}
	  }
	  handlePageChange = (pagination, filters, sorter) => {  //点击分页控件调用  比如换页或者换pageSize
        let {query} = this.props.AddModal
        this.props.doRequest({query:query,pagination:pagination});
	  }
	render() {
		const {visible,tableData,pagination,isFetching } = this.props.AddModal;
        const {title} = this.state; 
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {  //form中的label和内容各自占用多少
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
              };
          const  columns = [{
                    title: '企业名称',
                    dataIndex: 'companyName',
                    key:'companyName',
                } , {
                    title: '联系人',
                    dataIndex: 'fullnameanda0',
                    render: (text, record) => {
                        if(record.contactList.length>1){
                            return (
                                <div>
                                    {record.contactList.map((tag, index)=>{
                                        return(<div key={tag.contactId}>{tag.fullname}/{tag.mobile}</div>)
                                    })}
                                </div>
                            );
                        }else if(record.contactList.length==1){
                            return (
                                <div> 
                                    {record.contactList[0].fullname}/{record.contactList[0].mobile}
                                </div>
                            );
                        }else{
                            return (
                                <div></div>
                            );
                        }
                    }
        
                }, {
                    title: '操作',
                    dataIndex: 'option',
                    key:'option',
                    render: (text, record) => (
                         <div className="tabel-extend-option">
                            <Tag onClick={() => this.addShowModal(record.supplierId,record.companyName,record.followupType)}>选择</Tag>
                         </div>
                )}];
        return (
            <div>
                <Button size="large" onClick={this.addShow} type="primary" style={{ width: 236 }}>添加跟进</Button>
                <Modal className="addFollowUp" visible={visible} title={title} onCancel={this.handleCancel} footer={null}>
                    <Form layout="horizontal" onSubmit={this.handleSubmit} >
						<Row type="flex" justify="space-between">
                            < Col span={16}>
                                <FormItem {...formItemLayout} label="企业名称">
                                    {getFieldDecorator('companyName', {
                                        rules: [{validator: this.checkName}],
                                    })(
                                        <Input size="default" style={{ width: '100%' }}  onBlur={this.handleConfirmBlur} />
                                    )}
                                </FormItem>
                            </Col>      
                            <Col span={3}>
								<Button type="primary" style={{ marginTop: '2px' }} htmlType="submit">查询</Button>
							</Col>                      
						</Row>
					</Form>
                    <div className="addRefresh"><sapn onClick={this.handleRefresh}>刷新列表</sapn></div>
                    <Table 
                        className="add-table" 
                        rowKey={record => record.supplierId}  //数据中已key为唯一标识
                        columns={columns} 
                        loading={isFetching}
                        dataSource={tableData.resultList} 
                        pagination={pagination} 
                        onChange={this.handlePageChange}/>  
                </Modal>
                <PublicModal onSuccess={this.handleAddSuccess.bind(this)}/>
            </div>
        )
    }
}
ModalForm = Form.create()(ModalForm);
export default ModalForm;