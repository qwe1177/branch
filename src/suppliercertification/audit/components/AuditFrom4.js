import React from 'react';
import './AuditFrom.css';
import {Table,Switch} from 'antd';

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
  title: '操作',
	dataIndex: 'dsafdsf',
	className: 'column-money',
  render: (text, record) => (
    <span>
      <a href="#">编辑 </a>
      <span className="ant-divider" />
      
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <Switch   defaultChecked={false} size='small' />
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '注册资本>1亿，计5分；注册资本>5000万，计4分；注册资本>2000万，计3分；注册资本>1000万，计2分；注册资本>500万，计1分；注册资本<500万，计',
}, {
  key: '2',
  name: 'Jim Green',
  tel: '0571-22098333',
  age: 42,
}, {
  key: '5',
  name: 'Jake White',
  age: 18,
  tel: '0575-22098909',
}];

class AuditFrom4 extends React.Component {
    state = {
			// checkListFirst:checkListFirst,
			// defaultCheckListFirst:defaultCheckListFirst,
			// checkListSecond:checkListSecond,
			// defaultCheckListSecond:defaultCheckListSecond,
			// selectValue:'企业名称'
		};
		
    render() {
      return (
			<div>
				<div className="audit-tit">审核日志</div>
				<Table columns={columns} dataSource={data} bordered className="g-mt" />

      </div>
			)
    }
  }
  
  export default AuditFrom4;