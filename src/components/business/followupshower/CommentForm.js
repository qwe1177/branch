import React from 'react';
import PropTypes from 'prop-types'
import axios from '../../../util/axios';
import { Form, Input, Row, Col, Button, message } from 'antd';
const FormItem = Form.Item;
import { connect_srm } from '../../../util/connectConfig';

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
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();

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
                axios.get(connect_srm + '/supplier/addSupplierFollowupPostil.do', { params: params }).then((res) => {
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
                                rules: [{ required: true, message: '请填写批注内容!' }],
                            })(
                                <Input type="textarea" rows={4} />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={4}　className="my-submit">
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