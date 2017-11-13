import React from 'react';
import './CertificationFrom.css';
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
class CertificationFrom extends React.Component {
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
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
			};
			const formItemLayout2 = {  //form中的label和内容各自占用多少
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
			};
      return (
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Row gutter={16}>
						<Col span={3}>
						  <FormItem label="企业名称">
							</FormItem>
						</Col>
              <Col span={5}>
							<FormItem >
                  {getFieldDecorator('name', {
                    rules: [{validator: this.checkName}],
                  })(
                    <Input  style={{ width: '100%' }} placeholder="深圳华南城网科技有限公司"   onBlur={this.handleConfirmBlur} />
                  )}
								</FormItem>
							</Col>

              <Col span={8}>
								<FormItem {...formItemLayout} label="创建日期">
								{getFieldDecorator('createdate')(
								<RangePicker />
								)}
								</FormItem>
							</Col>
							<Col span={3}>
							<span className="rangeButton" onClick={this.changeToToday}>今天</span>
							&nbsp;&nbsp;
							<span className="rangeButton" onClick={this.changeToLastSeven}>近7天</span>
							</Col>
							<Col span={4}>
							<Button type="primary" size="large" htmlType="submit">查询</Button>
							<Button type="ghost" size="large" className="resetButton" onClick={this.handleReset}>重置</Button>
							</Col>
          </Row>
				</Form>      
			)
    }
  }
  
  export default CertificationFrom;