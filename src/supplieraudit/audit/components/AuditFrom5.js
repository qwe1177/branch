import React from 'react';
import './AuditFrom.css';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button ,DatePicker,Radio ,Upload} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

const columns = [{
  title: '序号',
	dataIndex: 'key',
	className: 'column-money',
  render: renderContent,
}, {
  title: '事项',
	dataIndex: 'age',
	className: 'column-money',
  render: renderContent,
}, {
  title: '分值',
	dataIndex: 'tel',
  className: 'column-money',
  width: 480,
  render: renderContent,
}, {
  title: '操作',
	dataIndex: 'dsafdsf',
	className: 'column-money',
  render: (text, record) => (
    <span>
      <a href="#">编辑 </a>
      <span className="ant-divider" />
      
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <Switch   defaultChecked={false} size='small' />
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '注册资本>1亿，计5分；注册资本>5000万，计4分；注册资本>2000万，计3分；注册资本>1000万，计2分；注册资本>500万，计1分；注册资本<500万，计',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  age: 42,
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
}];

class AuditFrom5 extends React.Component {
    state = {
			// checkListFirst:checkListFirst,
			// defaultCheckListFirst:defaultCheckListFirst,
			// checkListSecond:checkListSecond,
			// defaultCheckListSecond:defaultCheckListSecond,
			// selectValue:'企业名称'
		};
    
    orideonChange = (e) => {
      //console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    }

    render() {
      const formItemLayout2 = {  //form中的label和内容各自占用多少
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      };
      const formItemLayout1 = {  //form中的label和内容各自占用多少
        labelCol: { span: 20 },
        wrapperCol: { span:4 },
      };

      return (
			<div>
				<div className="audit-tit">提交备注</div>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <Row gutter={12}>
          <Col span={2}>
          <FormItem {...formItemLayout1} label="审核结论">
          </FormItem></Col>
          <Col span={5}>
            <FormItem {...formItemLayout2}>
              <RadioGroup onChange={this.orideonChange} value={this.state.value}>
                <Radio value={1}>通过审核</Radio>
                <Radio value={2}>驳回审核</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={2}>
          <FormItem {...formItemLayout1} label="备注信息">
          </FormItem></Col>
          <Col span={16}>
            <FormItem {...formItemLayout2}>
            <Input type="textarea"  autosize={{ minRows: 4, maxRows: 10 }} />
            </FormItem>
          </Col>
        </Row>

        </Form>
        <div className="hei20">
        </div>
      </div>
			)
    }
  }
  
  export default AuditFrom5;

  