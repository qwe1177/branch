import React from 'react';
import './RankFrom.css';
import {Table} from 'antd';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

const columns = [{
  title: '序号',
	dataIndex: 'key',
	className: 'column-money',
  render: renderContent,
}, {
  title: '事项',
	dataIndex: 'age',
	className: 'column-money',
  render: renderContent,
}, {
  title: '分值',
	dataIndex: 'tel',
  className: 'column-money',
  width: 480,
  render: renderContent,
}, {
  title: '实际值',
	dataIndex: 'phone',
	className: 'column-money',
  render: renderContent,
}, {
  title: '实际得分',
	dataIndex: 'address',
	className: 'column-money',
  render: renderContent,
}, {
  title: '操作',
	dataIndex: 'dsafdsf',
	className: 'column-money',
  render: (text, row, index) => {
     return <a href="#">{text}</a>;
  },
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '注册资本>1亿，计5分；注册资本>5000万，计4分；注册资本>2000万，计3分；注册资本>1000万，计2分；注册资本>500万，计1分；注册资本<500万，计',
  phone: 18889898989,
	address: 'New York No. 1 Lake Park',
	dsafdsf:'编辑',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
	address: 'London No. 1 Lake Park',
	dsafdsf:'编辑',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
	address: 'Sidney No. 1 Lake Park',
	dsafdsf:'编辑',
}, {
  key: '4',
  name: 'Jim Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
	address: 'London No. 2 Lake Park',
	dsafdsf:'编辑',
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
	address: 'Dublin No. 2 Lake Park',
	dsafdsf:'编辑',
}];

class RankFrom2 extends React.Component {
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
				<div className="tit"><div className="g-fl"><a href="javascript:;">刷新</a></div></div>
				<Table columns={columns} dataSource={data} bordered className="g-mt" />
      </div>
			)
    }
  }
  
  export default RankFrom2;