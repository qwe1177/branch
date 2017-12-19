import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import CancelFrom from '../components/CancelFrom';
import CancelFrom2 from '../components/CancelFrom2';

import { Form } from 'antd';


class App extends Component {
  render() {
    const CancelWrap = Form.create()(CancelFrom);
    return (
      <div className='suppliercancel'>
        <h3 className="page-title" > 品控取消 </h3>

        <div className="query-wrap" >
          <CancelWrap />
        </div> <div className="tabel-wrap" >
          <CancelFrom2 />
        </div>
      </div>
    );
  }
}

export default App