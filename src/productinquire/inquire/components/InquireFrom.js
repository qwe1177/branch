import React from 'react';
import './InquireFrom.css';
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
class InquireFrom extends React.Component {
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
        <Form layout="horizontal" onSubmit={this.handleSubmit} className="pd20">
          <Row gutter={24} style={{'padding':'8px 0px'}}>
					<Col span={6} >
					</Col>
						<Col span={12} >
							<Input addonAfter={<Button type="primary" value="small">查询</Button>} defaultValue="mysite"/>
						</Col>
						<Col span={6} >
					</Col>
					</Row>
				</Form>      
				</div>
			)
    }
  }
  
  export default InquireFrom;