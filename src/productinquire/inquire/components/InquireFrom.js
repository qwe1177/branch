import React from 'react';
import './InquireFrom.css';
import axios from '../../../util/axios';
import { connect_srm } from '../../../util/connectConfig';
import { Form, Select, Input, Button, Table, Modal, Row, Col, notification } from 'antd';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import {
  tablemodelaction,
} from '../../actions'

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  return obj;
};

const columns = [{
  title: '报价单编号',
  dataIndex: 'quotationId',
  className: 'column-money',
  render: (text, row, index) => {
    return <a href="#">{text}</a>
  }
}, {
  title: '规格编码',
  dataIndex: 'specCode',
  className: 'column-money',
  render: renderContent,
}, {
  title: '商品名称',
  dataIndex: 'pName',
  className: 'column-money',
  render: renderContent,
}, {
  title: '品牌',
  dataIndex: 'brand',
  className: 'column-money',
  render: renderContent,
}, {
  title: '规格',
  dataIndex: 'specParams',
  className: 'column-money',
  render: renderContent,
}, {
  title: '单位',
  dataIndex: 'unit',
  className: 'column-money',
  render: renderContent,
}, {
  title: '进价(元)',
  dataIndex: 'price',
  className: 'column-money',
  render: renderContent,
}, {
  title: '税点',
  dataIndex: 'taux',
  className: 'column-money',
  render: renderContent,
}, {
  title: '发票类型',
  dataIndex: 'invoice',
  className: 'column-money',
  render: renderContent,
}, {
  title: '交期',
  dataIndex: 'deliveryTime',
  className: 'column-money',
  render: renderContent,
}, {
  title: '付款方式',
  dataIndex: 'payWay',
  className: 'column-money',
  render: renderContent,
}, {
  title: '上传者',
  dataIndex: 'username',
  className: 'column-money',
  render: renderContent,
}, {
  title: '最新编辑时间',
  dataIndex: 'updateTime',
  className: 'column-money',
  render: renderContent,
}
];

const FormItem = Form.Item;
const Option = Select.Option;


class InquireFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        showQuickJumper: false,
        values: '',
        total: 0,
        pageCount: 1,
        pageSize: 10,
        showTotal: total => `共 ${total} 条`
      },
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      var { pagination } = this.state;
      pagination.values=values.typeValue;
      var params = { q: values.typeValue,pageNo:pagination.pageCount,pageSize:pagination.pageSize};
      axios.get(connect_srm + '/quotation/search.do', { params: params }).then((res) => {
        var code = res.data.code;
        var datas=res.data.data;
        if (code == '0') {
          const args = {
            message: '提示：',
            description: res.data.msg,
            duration: 3,
          };
          notification.open(args);
        } else if (code == '1') {
          this.setState({pagination:{ ...pagination,total: datas.rowCount}});
          this.props.dispatch(tablemodelaction({ data: res.data.data.quotationSkus }));
        }
      }).catch((e) => {
        this.setState({ isFetching: false });
        console.log('data error');
      });

    })
  }
  handleTableChange = (pagi, filters, sorter) => {
		var { pagination } = this.state;
		pagination.pageCount = pagi.current;
    pagination.pageSize = pagi.pageSize;
    var params = { q: pagination.values,pageNo:pagination.pageCount,pageSize:pagination.pageSize};
		axios.get(connect_srm + '/quotation/search.do', { params: params }).then((res) => {
      var code = res.data.code;
      var datas=res.data.data;
			if (code == '0') {
        const args = {
          message: '提示：',
          description: res.data.msg,
          duration: 3,
        };
        notification.open(args);
      } else if (code == '1') {
        this.setState({pagination:{ ...pagination,total: datas.rowCount}});
        this.props.dispatch(tablemodelaction({ data: res.data.data.quotationSkus }));
      }

		})

	}
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props.tablemodel;
    var { pagination } = this.state;
    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit} className="pd20">
          <Row gutter={24} style={{ 'padding': '8px 0px' }}>
            <Col span={6} >
            </Col>
            <Col span={12} >
              <FormItem >
                {getFieldDecorator('typeValue')(
                  <Input addonAfter={<Button type="primary" htmlType="submit" className="inputselectbtn">查询</Button>} placeholder="名称/品牌/规格" />
                )}
              </FormItem>

            </Col>
            <Col span={6} >
            </Col>
          </Row>

          <Table columns={columns} rowKey={record => record.skuId} dataSource={data} onChange={this.handleTableChange} bordered className="g-mt" pagination={pagination} />

        </Form>
      </div>
    )
  }
}

export default connect((state) => {
  return { ...state }
})(Form.create({
  mapPropsToFields(props) {
    return props.Infos
  },
  onFieldsChange(props, fields) {
    props.dispatch(baseInfoForm(fields))

  },
})(InquireFrom));