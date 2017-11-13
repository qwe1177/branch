import React from 'react';
import PropTypes from 'prop-types'

import moment from 'moment'

import './QueryFrom.css';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button ,DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const checkedList = ['客户', '商机', '线索'];
// const checkListFirst
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {initQueryFrom,setQueryFrom,resetQueryFrom,requestSupplier,queryTableData} from '../actions';

@connect(
  state =>  ({mainQueryData: state.mainQueryData,mainTableData:state.mainTableData}),
  dispatch => bindActionCreators({initQueryFrom,setQueryFrom,resetQueryFrom,requestSupplier,queryTableData}, dispatch)
)

class QueryFrom extends React.Component {
		static propTypes = {
			queryform: PropTypes.object  //查询条件
		}
		constructor(props) {
			super(props);
			let {followTypeOther} = this.props.mainQueryData.queryform;
			this.state = {
					checkedList:followTypeOther,
					indeterminate: true,
					checkAll: false,
			};
		}

		componentWillMount(){
			this.props.initQueryFrom();
		}
		componentDidMount() {
			//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
			let {queryform} = this.props.mainQueryData;
			this.props.form.setFieldsValue({   
				followTypeOther: queryform.followTypeOther
			});
		}
    handleSubmit = (e) => {
			e.preventDefault();
			let {queryform} = this.props.mainQueryData;
			let {pagination,isFetching} = this.props.mainTableData;
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
					if(!isFetching){
						console.log('Received values of form: ', values);
						var newPagination = {current:1,...pagination}; //点击按钮重新查询时候重置查询第一页
						this.props.setQueryFrom({queryform:values}); 
						this.props.queryTableData({queryform:values,pagination:newPagination});
					}
        }
      });
		}
		handleReset = () => {
			this.props.form.resetFields();
			const {queryform,pagination } = this.props.mainQueryData;  
			this.props.resetQueryFrom();  
		}
    checkName = (rule, value, callback) => {
			const form = this.props.form;
			var name  = form.getFieldValue('companyName');
      if (!name || ''== name) {
        callback('企业名称必须填写!');
      } else {
        callback();
      }
		}
		onChange = (checkedList) => {
			let {queryform} = this.props.mainQueryData;
			this.setState({
				// followTypeOther: queryform.followTypeOther,
				checkedList,
				indeterminate: !!checkedList.length && (checkedList.length < queryform.followTypeOther.length),
				checkAll: checkedList.length === queryform.followTypeOther.length,
			});
		}
		onCheckAllChange = (e) => {
			let {queryform} = this.props.mainQueryData;
			this.setState({
				checkedList: e.target.checked ? queryform.followTypeOther : [],
				indeterminate: false,
				checkAll: e.target.checked,
			});
		}
		changeToLastSeven = () => {
			this.props.form.setFieldsValue({
				createdate: [moment().subtract(7, "days"), moment()]
			});
		}
		changeToToday = () => {
			this.props.form.setFieldsValue({
				createdate: [moment(), moment()]
			});
		}
    render() {
      const { getFieldDecorator } = this.props.form;
			const formItemLayout = {  //form中的label和内容各自占用多少
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
			};
			const checkItemLayoutFirst = { 
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
			};
		
			
      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
							<Row gutter={16} >
							<Col span={6}>
								<FormItem {...formItemLayout} label="企业名称">
                  {getFieldDecorator('companyName', {
                    rules: [{validator: this.checkName}],
                  })(
                    <Input  style={{ width: '100%' }}  onBlur={this.handleConfirmBlur} />
                  )}
								</FormItem>
							</Col>
							<Col span={6}>
								<FormItem {...formItemLayout} label="跟进方式">
									{getFieldDecorator('followUpWay',{initialValue:'全部'})(
										<Select  style={{ width: '100%' }}  >
											<Option value="商机">商机</Option>
											<Option value="线索">线索</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formItemLayout} label="计划完成日期">
									{getFieldDecorator('finishData')(
									<RangePicker />
									)}
								</FormItem>
							</Col>
							<Col span={3}>
						<span className="rangeButton" onClick={this.changeToToday}>今天</span>
						&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
					</Col>
						</Row>
						<Row  gutter={16} className="followType">
							<Col span={4} style={{ textAlign: 'left' }}>
								<FormItem {...checkItemLayoutFirst} label="跟进类型">
									{getFieldDecorator('followTypeAll')(
										<Checkbox
											indeterminate={this.state.indeterminate}
											onChange={this.onCheckAllChange}
											checked={this.state.checkAll}
										>
											全部
										</Checkbox>
											)}
									</FormItem>
							</Col>
							<Col span={12} style={{ textAlign: 'left' }}>
								<FormItem {...checkItemLayoutFirst}>
									{getFieldDecorator('followTypeOther')(
										<CheckboxGroup options={checkedList} indeterminate={this.state.indeterminate} onChange={this.onChange} />
											)}
									</FormItem>
							</Col>				
							<Col span={8}>
								<Button size="large" type="primary" style={{ width: 100,marginRight: 30 }} htmlType="submit">查询</Button>
								<Button size="large" type="danger" style={{ width: 100 }} onClick={this.handleReset}>重置</Button>
							</Col>
						</Row>
					</Form>
      );
    }
  }
  
  export default QueryFrom;