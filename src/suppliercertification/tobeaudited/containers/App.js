import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import CertificationFrom from '../components/CertificationFrom';
import CertificationFrom2 from '../components/CertificationFrom2';

import { Form } from 'antd';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const CertifFrom = Form.create()(CertificationFrom);
		const CertifFrom2 = Form.create()(CertificationFrom2);
		return (
			<div>
				<h3 className="page-title">待审批</h3>

				<div className="query-wrap">
					<CertifFrom />
				</div>
				<div className="tabel-wrap">
					<CertifFrom2 />
				</div>
			</div>
		);
	}
}

export default App
