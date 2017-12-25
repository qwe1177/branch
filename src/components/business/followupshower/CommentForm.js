import React from 'react';
import PropTypes from 'prop-types'
import axios from '../../../util/axios';
import { Form, Input, Row, Col, Button, message } from 'antd';
const FormItem = Form.Item;
import { connect_srm } from '../../../util/connectConfig';
import qs from 'qs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doQueryFollow } from './redux';
@connect(
    state => ({ followupShower: state.followupShower }),
    dispatch => bindActionCreators({ doQueryFollow }, dispatch)
)


class CommentForm extends React.Component {
    static propTypes = {
        recordsId: PropTypes.number.isRequired
    }
    state = {
        numb3: { len: 0, color: '' }
    }
    companyIntroductionHandle = (n, v) => (e) => {
        const { value } = e.target;
        var len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({ [n]: { len: len, color: color } })
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var data = {};
                for (var key in values) {
                    var newKey = key.replace(/\d+/g, '');
                    data[newKey] = values[key];
                }
                var recordsId = this.props.recordsId;
                data['recordsId'] = recordsId;
                data = qs.stringify(data);
                axios.post(connect_srm + '/supplier/addSupplierFollowupPostil.do', data).then((res) => {
                    if (res.data.code == '1') {
                        message.success('提交成功!');
                        var { query, pagination } = this.props.followupShower;
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
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        var recordsId = this.props.recordsId;
        var name2 = 'postilContent' + recordsId;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Row gutter={16} >
                    <Col span={20}>
                        <FormItem>
                            {getFieldDecorator(name2, {
                                rules: [{ required: true, message: '请填写公司介绍(100个字符)' }],
                                onChange: this.companyIntroductionHandle('numb3', 100)
                            })(
                                <div style={{ position: 'relative' }}>
                                    <Input type="textarea" rows={4}
                                        placeholder="请填写批注内容（100个字符）"
                                        maxLength="100" />
                                    <p style={{
                                        position: 'relative',
                                        position: 'absolute',
                                        bottom: '0px',
                                        right: '0px',
                                        paddingRight: '10px',
                                        color: this.state.numb3.color,
                                    }}
                                    >{this.state.numb3.len}/100</p>
                                </div>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={4} className="my-submit">
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                提交批注
                </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(CommentForm);