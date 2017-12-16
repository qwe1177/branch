import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneUrlParams } from '../../../util/baseTool';

import LookForm from '../components/LookForm';
import { Form } from 'antd';

import { connect_srm } from '../../../util/connectConfig';
import actions from '../actions'

@connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch)
)


class App extends Component {
    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}.png`,
            status: 'done',
            url: `//img.csc86.com${v}`,
        })) : []
    }
    render() {
        
        return (
            <div>
                <h3 className="page-title">查看审核</h3>
                {/* <div className="audit-tit">
                    企业信息
				</div>
                <div className="audit-ress">
                    <div className="oflowen pt20">
                        <div className="g-fl label">企业名称</div>
                        <div className="g-fl pl20">{companyName}</div>
                    </div>
                    <div className="oflowen pt10">
                        <div className="g-fl label">企业地址</div>
                        <div className="g-fl pl20">{companyAddress}</div>
                    </div>
                </div> */}
                <LookForm />
            </div>
        );
    }
}

export default App
