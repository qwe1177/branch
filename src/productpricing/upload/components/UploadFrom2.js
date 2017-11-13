import React from 'react';
import './UploadFrom.css';
import {Table} from 'antd';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

const columns = [{
  title: '企业名称',
	dataIndex: 'key',
	className: 'column-money',
  render: (text, row, index) => {
    return <a href="#">{text}</a>
 },
}, {
  title: '申请时间',
	dataIndex: 'age',
	className: 'column-money',
  render: renderContent,
}, {
  title: '审核通过时间',
	dataIndex: 'tel',
  className: 'column-money',
  width: 480,
  render: renderContent,
}, {
  title: '审核',
	dataIndex: 'phone',
	className: 'column-money',
  render: renderContent,
}, {
  title: '申请人',
	dataIndex: 'address',
	className: 'column-money',
  render: renderContent,
}, {
  title: '操作',
	dataIndex: 'dsafdsf',
	className: 'column-money',
  render: (text, row, index) => {
     return <span><a href="#">{text}</a>&nbsp;&nbsp;<a href="#">更新资料</a></span>;
  },
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '注册资本>1亿，计5分；注册资本>5000万，计4分；注册资本>2000万，计3分；注册资本>1000万，计2分；注册资本>500万，计1分；注册资本<500万，计',
  phone: 18889898989,
	address: 'New York No. 1 Lake Park',
	dsafdsf:'查看',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
	address: 'London No. 1 Lake Park',
	dsafdsf:'查看',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
	address: 'Sidney No. 1 Lake Park',
	dsafdsf:'查看',
}, {
  key: '4',
  name: 'Jim Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
	address: 'London No. 2 Lake Park',
	dsafdsf:'查看',
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
	address: 'Dublin No. 2 Lake Park',
	dsafdsf:'查看',
}];


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

class UploadFrom2 extends React.Component {
    state = {
			// checkListFirst:checkListFirst,
			// defaultCheckListFirst:defaultCheckListFirst,
			// checkListSecond:checkListSecond,
			// defaultCheckListSecond:defaultCheckListSecond,
			// selectValue:'企业名称'
		};
		
    render() {
      return (
			<div className="pd20">
				<div className="tit"><div className="g-fl">商品信息</div></div>
				 <Table columns={columns} dataSource={data} bordered className="g-mt" rowSelection={rowSelection}/>
      </div>
			)
    }
  }
  
  export default UploadFrom2;