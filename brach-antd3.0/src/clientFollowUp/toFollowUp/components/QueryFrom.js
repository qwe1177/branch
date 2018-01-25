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
		componentDidMount() {
			//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
			let form = this.props.mainQueryData.queryform;
			form = _.pick(form,['companyName','finishData']);
			let data = {};
			for (let key in form) {  //过滤空字符串
				if (form[key] && form[key] != '') {
					data[key] = form[key];
				}
			}
			this.props.form.setFieldsValue(data);
		}
    handleSubmit = (e) => {
			e.preventDefault();
			let { queryform } = this.props.mainQueryData;
			let { pagination, isFetching } = this.props.mainTableData;
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
						console.log('Received values of form: ', values);
						var newPagination = { ...pagination }; //点击按钮重新查询时候重置查询第一页
						newPagination.current = 1;
						newPagination.pageSize = 10;
						this.props.setQueryFrom({queryform:values}); 
						this.props.queryTableData({queryform:values,pagination:newPagination});
        }
      });
		}
		handleReset = () => {
			this.props.form.resetFields();
			this.props.resetQueryFrom();  
		}
    render() {
			const { getFieldDecorator } = this.props.form;
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
						<Row >
							<Col span={9}>
							<FormItem  label="企业名称" style={{"width": "100%"}}>
                  {getFieldDecorator('companyName')(
                    <Input  style={{ width: '150px' }}  onBlur={this.handleConfirmBlur} />
                  )}
								</FormItem>
							</Col>
							<Col span={15}>
								<FormItem  label="计划完成日期">
								{getFieldDecorator('finishData',)(
											<RangePicker />
								)}
								</FormItem>
							</Col>
						</Row>
						<Row >
							<Col span={24} style={{'paddingTop': '12px'}}>
								<Button size="large" type="primary" style={{ width: 100,marginRight: 30 }} htmlType="submit">查询</Button>
								<Button size="large" type="danger" style={{ width: 100 }} onClick={this.handleReset}>重置</Button>
							</Col>
						</Row>
					</Form>
      );
    }
  }
  
  export default QueryFrom;