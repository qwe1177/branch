import React from 'react';
import './QuoteFrom.css';
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
class QuoteFrom extends React.Component {
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
					<Col span={3} style={{'paddingLeft':'0px'}}>
						<FormItem >
							{getFieldDecorator('prefix', { initialValue: '企业名称' })(
								<Select style={{ width: '100%' }}  >
									<Option value="企业名称">企业名称</Option>
									<Option value="企业地址">企业地址</Option>
									<Option value="手机">手机</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem >
							{getFieldDecorator('name', {
								rules: [{
									required: true, message: '请输入内容!',
								}
									// ,{validator: this.checkName}
								],
							})(
								<Input style={{ width: '100%' }} />
								)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="上传者"  {...formItemLayout} style={{"width":"100%"}}>
								{getFieldDecorator('levelSelect', {
										rules: [{required: false, message: '请选择'}],
								})(
										<Select style={{ width: 240 }} placeholder="全部">
												<Option value="级别1">级别一</Option>
												<Option value="级别2">级别二</Option>
										</Select>
								)}
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem {...formItemLayout} label="申请时间">
							{getFieldDecorator('createdate')(
								<RangePicker />
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<Button type="primary" htmlType="submit">查询</Button>
						<Button type="ghost" className="resetButton" onClick={this.handleReset}>重置</Button>
					</Col>

          </Row>
					<Row gutter={24} style={{'padding':'8px 0px'}} className="skusum">
						<Col span={12}>
							下SKU总数：<span>534654</span>
						</Col>
					</Row>
				</Form>      
				</div>
			)
    }
  }
  
  export default QuoteFrom;