import React from 'react';
import './AuditFrom.css';
import { Form, Input, Tooltip, Icon, Select, Table, Row, Col, Checkbox, Button ,DatePicker,Radio ,Upload} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

class AuditFrom extends React.Component {
    state = {
			// checkListFirst:checkListFirst,
			// defaultCheckListFirst:defaultCheckListFirst,
			// checkListSecond:checkListSecond,
			// defaultCheckListSecond:defaultCheckListSecond,
			// selectValue:'企业名称'
		};
		componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    orideonChange = (e) => {
      //console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    }
    uploadIcon = (<Icon type="plus" className="avatar-uploader-trigger"
    style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>)

    uploadicon = (id, num, ic = this.uploadIcon)=>
    this.props.Infos[id] && this.props.Infos[id].value && this.props.Infos[id].value.length >= num ? null : ic


    render() {
      const formItemLayout = {  //form中的label和内容各自占用多少
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
      };
      const formItemLayout2 = {  //form中的label和内容各自占用多少
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      };
      const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
      const dateFormat = 'YYYY/MM/DD';
      return (
        <div>
				<div className="audit-tit"> 资质文件 </div>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem {...formItemLayout} label="营业执照注册号">
                    {getFieldDecorator('IdCard', {
                        rules: [{required: false, message: '请输入营业执照注册号'}],
                    })(
                        <Input placeholder="营业执照注册号" style={{"width":"50%"}}/>
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout2} label="营业执照注册地">
                  {getFieldDecorator('sourceSelect', {
                        rules: [{required: false}],
                    })(
                        <Select style={{"width":"100%","marginLeft":"5px"}} placeholder="请选择来源">
                            <Option value="kfai1">自行开发1</Option>
                            <Option value="kaifa2">自行开发2</Option>
                        </Select>
                    )}
                   
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout2}>
                  {getFieldDecorator('sourceSelect', {
                        rules: [{required: false}],
                    })(
                        <Select style={{"width":"100%","marginLeft":"5px"}} placeholder="请选择来源">
                            <Option value="kfai1">自行开发1</Option>
                            <Option value="kaifa2">自行开发2</Option>
                        </Select>
                    )}
                   
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                <FormItem {...formItemLayout} label="营业执照期限">
                    {getFieldDecorator('rydsfg', {
                        rules: [{required: false, message: '请输入营业执照注册号'}],
                    })(
                      <DatePicker  format={dateFormat} style={{"width":"30%"}}/>
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="登记机构">
                    {getFieldDecorator('ddsa', {
                        rules: [{required: false, message: '请输入营业执照注册号'}],
                    })(
                        <Input placeholder="营业执照注册号" style={{"width":"50%" }}/>
                    )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={6}>
                <FormItem {...formItemLayout2} label="企业法人">
                      {getFieldDecorator('IdCard', {
                          rules: [{required: false, message: '请输入营业执照注册号'}],
                      })(
                          <Input placeholder="中国啊" style={{"width":"100%","marginLeft":"5px" }}/>
                      )}
                  </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout2}>
                  <RadioGroup onChange={this.orideonChange} value={this.state.value}>
                    <Radio value={1}>先生</Radio>
                    <Radio value={2}>女士</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="身份证号">
                      {getFieldDecorator('IdCard', {
                          rules: [{required: false, message: '请输入营业执照注册号'}],
                      })(
                          <Input placeholder="" style={{"width":"50%" }} />
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12} >
                    <FormItem {...formItemLayout} label="法人身份证">

                        {getFieldDecorator('registIdCard', {
                            rules: [{required: false, message: '请上传法人身份证'}],
                            onChange: this.uploadonChange,
                        })(
                            <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                                <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                            </Upload>
                        )}

                    </FormItem>
                </Col>
                <Col span={12} >
                <FormItem {...formItemLayout} label="营业执照">
                    {getFieldDecorator('BusinessLicense', {
                        rules: [{required: false, message: '请上传'}],
                        onChange: this.uploadonChange,
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                            <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                        </Upload>
                    )}
                </FormItem>
              </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} >
                <FormItem {...formItemLayout}  label="一般人纳税资质"  >
                    {getFieldDecorator('payAptitudes', {
                        rules: [{required: false, message: '请上传'}],
                        onChange: this.uploadonChange,
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                            <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                        </Upload>
                    )}
                </FormItem>
            </Col>
            <Col span={12} >
                <FormItem label="法人授权书/代理人授权书"  {...formItemLayout} >
                    {getFieldDecorator('powerAttorney', {
                        rules: [{required: false, message: '请上传'}],
                        onChange: this.uploadonChange,
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                            <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                        </Upload>
                    )}
                </FormItem>
            </Col>
          </Row>  
          <Row gutter={24}>
              <Col span={12}>
                  <FormItem label="廉洁承诺书"  {...formItemLayout} >

                      {getFieldDecorator('Undertaking', {
                          rules: [{required: false, message: '请上传'}],
                          onChange: this.uploadonChange,
                          valuePropName: 'fileList',
                          getValueFromEvent: this.normFile,
                      })(
                          <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                              <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                          </Upload>
                      )}
                  </FormItem>
              </Col>
              <Col span={12}>
                  <FormItem label="办公场所"  {...formItemLayout} >

                      {getFieldDecorator('Office', {
                          rules: [{required: false, message: '请上传'}],
                          onChange: this.uploadonChange,
                          valuePropName: 'fileList',
                          getValueFromEvent: this.normFile,
                      })(
                          <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                             <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                          </Upload>
                      )}

                  </FormItem>
              </Col>
          </Row>
          <Row gutter={24}>
              <Col span={12} >
                  <FormItem label="生产车间/仓库"  {...formItemLayout} >
                      {getFieldDecorator('Workshop', {
                          rules: [{required: false, message: '请上传'}],
                          onChange: this.uploadonChange,
                          valuePropName: 'fileList',
                          getValueFromEvent: this.normFile,
                      })(
                          <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload} multiple={true}>
                                 <Icon type="plus" className="avatar-uploader-trigger"
                                      style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>
                          </Upload>
                      )}
                  </FormItem>
              </Col>
          </Row>
				  </Form>
        </div>
			)
    }
  }
  
  export default AuditFrom;