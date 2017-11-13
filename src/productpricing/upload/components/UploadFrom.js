import React from 'react';
import './UploadFrom.css';
import {Form, Select, Input, Button, Table, Modal, Row, Col,DatePicker} from 'antd';
import moment from 'moment'

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
class UploadFrom extends React.Component {
    state = {

		};
		componentDidMount() {
      //setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
      // let {queryform} = this.props.mainQueryData;
      // this.props.form.setFieldsValue({   
      //     other: queryform.other
      // });
    }
    changeToLastSeven =()=>{
			this.props.form.setFieldsValue({   
				createdate: [moment().subtract(7, "days"),moment()]
			});
		}
		changeToToday =()=>{
			this.props.form.setFieldsValue({   
				createdate: [moment(),moment()]
			});
		}
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {  //form中的label和内容各自占用多少
        labelCol: { span: 5 },
        wrapperCol: { span: 15 },
			};
			const formItemLayout2 = {  //form中的label和内容各自占用多少
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
			};
      return (
				<div>
				<div className="audit-tit"><div className="g-fl">基础信息</div> <div className="g-rt">编号:<span>4545464564</span></div></div>
        <Form layout="horizontal" onSubmit={this.handleSubmit} className="pd20">
          <Row gutter={24} style={{'padding':'8px 0px'}}>
						<Col span={12}>
						  <FormItem label="供应商名称"  {...formItemLayout} style={{"width":"100%"}}>
									{getFieldDecorator('levelSelect', {
											rules: [{required: false, message: '请选择'}],
									})(
											<Select style={{ width: 240 }} placeholder="请选择">
													<Option value="级别1">级别一</Option>
													<Option value="级别2">级别二</Option>
											</Select>
									)}
							</FormItem>
						</Col>
            <Col span={12}>
							<FormItem label="联系人信息"  {...formItemLayout} style={{"width":"100%"}}>
									{getFieldDecorator('levelSelect', {
											rules: [{required: false, message: '请选择'}],
									})(
											<Select style={{ width: 240 }} placeholder="请选择">
													<Option value="级别1">级别一</Option>
													<Option value="级别2">级别二</Option>
											</Select>
									)}
							</FormItem>
						</Col>
          </Row>
					<Row gutter={24} style={{'padding':'8px 0px'}}>
					<Col span={12}>
						  <FormItem label="采购商名称"  {...formItemLayout} style={{"width":"100%"}}>
									{getFieldDecorator('levelSelect', {
											rules: [{required: false, message: '请选择'}],
									})(
											<Select style={{ width: 240 }} placeholder="请选择">
													<Option value="级别1">级别一</Option>
													<Option value="级别2">级别二</Option>
											</Select>
									)}
							</FormItem>
						</Col>
					</Row>
				</Form>      
				</div>
			)
    }
  }
  
  export default UploadFrom;