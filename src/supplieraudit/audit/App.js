import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';

import AuditFrom from './components/AuditFrom';
import AuditFrom2 from './components/AuditFrom2';
import AuditFrom3 from './components/AuditFrom3';
import AuditFrom4 from './components/AuditFrom4';
import AuditFrom5 from './components/AuditFrom5';
import {
	baseInfoForm,
	modalmodelaction,
	tablemodelaction,
	tablemodelaction2,
	tablemodelaction3,
	fetchPosts,
	fetchcitysPosts
  } from '../actions'
  import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button ,DatePicker,Radio ,Upload} from 'antd';
// import EvalFrom3 from './components/EvalFrom3';
// import EvalFrom4 from './components/EvalFrom4';
const FormItem = Form.Item;
const Option = Select.Option;

const myPagination = {
	showQuickJumper: true,
	showSizeChanger: true,
	total: 1,
	showTotal: total => `共 ${total} 条`
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true, //弹层数据加载
			modalvisible:true,//弹层显示隐藏
			selectedRows:[] //
		};
	}
	render() {
		const {loading,modalvisible } = this.state;
		const AuditFromWard = Form.create()(AuditFrom);
		const AuditFromWard2= Form.create()(AuditFrom2);
		const AuditFromWard3= Form.create()(AuditFrom3);
		const AuditFromWard4= Form.create()(AuditFrom4);
		const AuditFromWard5= Form.create()(AuditFrom5);
		
		
		return (
			<div className="main">
				<h3 className="page-title">审核供应商</h3>
				
				<div className="audit-tit">
					企业信息
				</div>
				<Form>
				<div className="audit-ress">
					<div className="oflowen pt20">
						<div className="g-fl">企业名称</div>
						<div className="g-fl pl20">深圳华南城网科技有限公司</div>
					</div>
					<div className="oflowen pt10">
						<div className="g-fl">企业地址</div>
						<div className="g-fl pl20">华南城一号交易广场六楼</div>
					</div>
				</div>

				<div className="tabel-wrap">
					{<AuditFromWard />}
				</div> 

				<div className="tabel-wrap">
					{<AuditFromWard2/>}
				</div> 

				<div className="tabel-wrap">
					{<AuditFromWard3/>}
				</div> 

				<div className="tabel-wrap">
					{<AuditFromWard4/>}
				</div> 

				<div className="tabel-wrap">
					{<AuditFromWard5/>}
				</div> 

				<div className="submit">
					<Row style={{'padding':'8px 0px'}}>
						<FormItem>
							<Button style={{padding:'2px 55px'}}
									type="primary"
									htmlType="submit"
							>
								提交
							</Button>
						</FormItem>
					</Row>
				</div>
				</Form>
			</div>
		);
	}
}

export default App
