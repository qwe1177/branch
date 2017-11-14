import React from 'react';
import './InquireFrom.css';
import {Table} from 'antd';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

const columns = [{
  title: '规格编码',
	dataIndex: 'key',
	className: 'column-money',
  render: (text, row, index) => {
    return <a href="#">{text}</a>
 },
}, {
  title: '供应商名称',
	dataIndex: 'age',
	className: 'column-money',
  render: renderContent,
}, {
  title: '联系人信息',
	dataIndex: 'tel',
  className: 'column-money',
  width: 480,
  render: renderContent,
}, {
  title: '采购商名称',
	dataIndex: 'phone',
	className: 'column-money',
  render: renderContent,
}, {
  title: 'SKU数量',
	dataIndex: 'address',
	className: 'column-money',
  render: renderContent,
}, {
  title: '报价单',
	dataIndex: 'dsafdsf',
	className: 'column-money',
  render: (text, row, index) => {
     return <span><a href="#">{text}</a>&nbsp;&nbsp;<a href="#">更新资料</a></span>;
  },
}
, {
  title: '上传者',
	dataIndex: 'uploaduser',
	className: 'column-money',
  render: (text, row, index) => {
     return <span><a href="#">{text}</a>&nbsp;&nbsp;<a href="#">更新资料</a></span>;
  },
}
, {
  title: '上传时间',
	dataIndex: 'uploaddate',
	className: 'column-money',
  render: (text, row, index) => {
     return <span><a href="#">{text}</a>&nbsp;&nbsp;<a href="#">更新资料</a></span>;
  },
}
, {
  title: '操作',
	dataIndex: 'gohome',
	className: 'column-money',
  render: (text, row, index) => {
     return <span><a href="#">{text}</a>&nbsp;&nbsp;<a href="#">更新资料</a></span>;
  },
}
];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '注册资本>1亿，计5分；注册资本>5000万，计',
  phone: 18889898989,
  address: 'New York No. 1 Lake Park',
  uploaduser:'林泽灿',
  uploaddate:'2017.07.01',
  gohome:'查看',
	dsafdsf:'下载',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: 'London No. 1 Lake Park',
  uploaduser:'林泽灿',
  uploaddate:'2017.07.01',
  gohome:'查看',
	dsafdsf:'查看',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Sidney No. 1 Lake Park',
  uploaduser:'林泽灿',
  uploaddate:'2017.07.01',
  gohome:'查看',
	dsafdsf:'查看',
}, {
  key: '4',
  name: 'Jim Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'London No. 2 Lake Park',
  uploaduser:'林泽灿',
  uploaddate:'2017.07.01',
  gohome:'查看',
	dsafdsf:'查看',
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Dublin No. 2 Lake Park',
  uploaduser:'林泽灿',
  uploaddate:'2017.07.01',
  gohome:'查看',
	dsafdsf:'查看',
}];


class InquireFrom2 extends React.Component {
    state = {
		};
		
    render() {
      return (
			<div className="pd20">
				 <Table columns={columns} dataSource={data} bordered className="g-mt"/>
      </div>
			)
    }
  }
  
  export default InquireFrom2;