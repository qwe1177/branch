import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import LookForm from '../components/LookForm';

class App extends Component {
    render() {
        return (
            <div>
                <h3 className="page-title">查看审核</h3>
                <LookForm />
            </div>
        );
    }
}

export default App
