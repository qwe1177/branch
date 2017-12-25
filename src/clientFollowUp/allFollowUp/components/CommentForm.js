import React from 'react';
import PropTypes from 'prop-types'
import axios from '../../../util/axios';
import { Form, Input, Row, Col, Button, message } from 'antd';
const FormItem = Form.Item;
import { connect_srm } from '../../../util/connectConfig';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doQueryFollow } from '../actions/index.js';
@connect(
    state => ({ AllFollowUP: state.AllFollowUP }),
    dispatch => bindActionCreators({ doQueryFollow }, dispatch)
)


class CommentForm extends React.Component {
    state = {
		numb1: {len: 0, color: ''},
	  };
	
    static propTypes = {
        recordsId: PropTypes.number.isRequired
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var params = {};
                for (var key in values) {
                    var newKey = key.replace(/\d+/g, '');
                    params[newKey] = values[key];
                }
                var recordsId = this.props.recordsId;
                params['recordsId'] = recordsId;
                axios.get(connect_srm+'/supplier/addSupplierFollowupPostil.do', { params: params }).then((res) => {
                    if (res.data.code == '1') {
                        message.success('提交成功!');
                        var { query, pagination } = this.props.AllFollowUP;
                        this.props.doQueryFollow({ query, pagination });
                    } else {
                        message.error(res.data.msg);
                    }
                }).catch((e) => {
                    message.error(e);
                })
            }
        });
    }
    companyIntroductionHandle = (n, v)=>(e)=> {
        const {value} = e.target;
        var len = value.length;
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        var recordsId = this.props.recordsId;
        var name2 = 'postilContent' + recordsId;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} className= "commont-form">
                <Row gutter={16} >
                    <Col span={21}>
                        <FormItem>
                            {getFieldDecorator(name2, {
                                rules: [{ required: true, message: '请填写批注内容!' }],
                                onChange: this.companyIntroductionHandle('numb1', 100)
                            })(
                                <Input type="textarea" rows={3} />
                                )}
                                 <p style={{
										position: 'relative',
										position: 'absolute',
										bottom: '0px',
										right: '0px',
										paddingRight: '10px',
										color: this.state.numb1.color,
									}}
								>{this.state.numb1.len}/100</p>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            <Button  type="primary" htmlType="submit" size="small">
                                添加批注
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(CommentForm);