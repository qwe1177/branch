import React from 'react';

import { Form,  Row, Col, Button,message,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doModifiyRelation } from './redux';

/**
 * 
 * store中的数据
 * baseData:object {key: '',gender: '男',name:'李四'}  企业基本信息
 * visible：boolean  编辑modal是否可显
 * 
 */
@connect(
    state => ({ companyBaseShower: state.companyBaseShower }),
    dispatch => bindActionCreators({doModifiyRelation}, dispatch)
)

class EffectFrom extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				// this.props.onQuery(values); //回调父方法
				this.props.doModifiyRelation(values);
			}
		});
	}
	componentDidMount() {
		//setFieldsValue方法必须在getFieldDecorator之后，getFieldDecorator在render生命周期中定义id来进行表单双向绑定
		var data = this.props.companyBaseShower.data;
		this.props.form.setFieldsValue({relation:data.relation});
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
						{getFieldDecorator('relation')(
							<Select  style={{ width: '80%' }}>
								<Option value="战略合作">战略合作</Option>
								<Option value="战略合作1">战略合作1</Option>
								<Option value="战略合作2">战略合作2</Option>
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

export default EffectFrom;