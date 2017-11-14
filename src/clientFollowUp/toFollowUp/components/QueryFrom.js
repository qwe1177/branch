import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import './QueryFrom.css';
import { Form, Input, Icon, Select, Row, Col, Button ,DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

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
		componentWillMount(){
			this.props.initQueryFrom();
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
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {  //form中的label和内容各自占用多少
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
			};
      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
						<Row >
							<Col span={6}>
							<FormItem {...formItemLayout} label="企业名称">
                  {getFieldDecorator('companyName', {
                    rules: [{validator: this.checkName}],
                  })(
                    <Input  style={{ width: '100%' }}  onBlur={this.handleConfirmBlur} />
                  )}
								</FormItem>
							</Col>
							<Col span={12}>
								<FormItem {...formItemLayout} label="计划完成日期">
								{getFieldDecorator('finishData',)(
											<RangePicker />
								)}
								</FormItem>
							</Col>
						</Row>
						<Row >
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