import React from 'react';
import './RankFrom.css';
import {Form, Select, Input, Button, Table, Modal, Row, Col,DatePicker} from 'antd';
import moment from 'moment'

// const renderContent = (value, row, index) => {
//   const obj = {
//     children: value,
//     props: {},
//   };
//   return obj;
// };
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
class RankFrom extends React.Component {
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
        <Form layout="horizontal" >
          <Row gutter={16}>
						<Col span={3}>
								<FormItem >
								{getFieldDecorator('prefix',{initialValue:'企业名称'})(
								<Select style={{ width: '100%' }}  >
										<Option value="企业名称">企业名称</Option>
										<Option value="企业代码">企业代码</Option>
									</Select>
								)}
								</FormItem>
							</Col>
              <Col span={5}>
							<FormItem >
                  {getFieldDecorator('name', {
                    rules: [{validator: this.checkName}],
                  })(
                    <Input  style={{ width: '100%' }} placeholder="深圳华南城网科技有限公司"   />
                  )}
								</FormItem>
							</Col>
							<Col span={2}>
							</Col>			
              <Col span={7}>
								<FormItem {...formItemLayout} label="申请时间">
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
          </Row>
					<Row className="g-mt">
						
						<Col span={5}>
								<FormItem {...formItemLayout} label="审核时间">
								{getFieldDecorator('createdate')(
								<RangePicker />
								)}
								</FormItem>
						</Col>
						<Col span={4} className="g-rt">
							<Button type="primary" size="large" htmlType="submit">查询</Button>
							<Button type="ghost" size="large" className="resetButton">重置</Button>
						</Col>

					</Row>
				</Form>      
			)
    }
  }
  
  export default RankFrom;