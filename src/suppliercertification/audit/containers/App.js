import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AuditForm from '../components/AuditForm';
class App extends Component {
    render() {

        return (
            <div>
                <h3 className="page-title">审核供应商</h3>
                <AuditForm />
            </div>
        );
    }
}

export default App
