import React from 'react';
import PropTypes from 'prop-types'
import { Form,  Row, Col, Button,message,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import _ from 'lodash';
import { levelOptions } from '../../../util/options';


class EffectForm extends React.Component {
	static propTypes = {
		onChoosed: PropTypes.func.isRequired //查询结果(表格数据)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.onChoosed(values.relation);
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {  //form中的label和内容各自占用多少
			labelCol: { span: 7 },
			wrapperCol: { span: 17 }
		};
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} ref="test">
				<Row gutter={16}>
					<FormItem {...formItemLayout} label="合作关系" style={{textAlign:'center'}}>
						{getFieldDecorator('relation',{ initialValue: '等待合作' })(
							<Select  style={{ width: '80%' }}>
								{levelOptions('合作关系').map(item => {
										return (
											<Option key={item.value} value={item.value}
											>
												{item.label}
											</Option>
										)
									})}
							</Select>
						)}
					</FormItem>

					
				</Row>
				
				<Row gutter={16}>
					<FormItem style={{textAlign:'center'}}>
						<Button type="primary" htmlType="submit" className='normal'>确认</Button>
					</FormItem>
				</Row>
			</Form>
		);
	}
}

export default EffectForm;