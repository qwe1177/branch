import React from 'react';
import './AuditFrom.css';
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  Row,
  Col,
  Radio,
  Cascader,
  Upload,
  Table,
  Popconfirm,
  Modal,
  DatePicker,
  message
} from 'antd'

import {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    tablemodelaction2,
    tablemodelaction3,
    fetchPosts,
    fetchcitysPosts
} from '../actions'

const FormItem = Form.Item
const Option = Select.Option

const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };

class AuditFrom2 extends React.Component {
    
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'No',
            width: 50,
            render: text=>text,
          }, {
            title: '品牌名称',
            dataIndex: 'BrandName',
            className: 'column-money',
            render: text=>text,
            width: 160,
            
          }, {
            title: '品牌类型',
            dataIndex: 'BrandType',
            className: 'column-money',
            width: 160,
            render: this.addselectdata,
          }, {
            title: '授权书',
            dataIndex: 'powerofAttorney',
            className: 'column-money',
            width: 160,
            render: this.adduploaddata,
          }, {
            title: '认证报告',
            dataIndex: 'AuditReports',
            className: 'column-money',
            width: 160,
            render: this.adduploaddata,
          }, {
            title: '注册证',
            dataIndex: 'registCard',
            className: 'column-money',
            width: 160,
            render: this.adduploaddata,
          }, {
            title: '其他资质',
            dataIndex: 'OtherInformation',
            className: 'column-money',
            width: 160,
            render: this.adduploaddata,
          }, {
            title: '添加人员',
            dataIndex: 'adduser',
            className: 'column-money',
            width: 160,
            render: text=>text,
          }, {
            title: '添加时间',
            dataIndex: 'adddate',
            className: 'column-money',
            width: 160,
            render: text=>text,
          },
          ];
    }
    /*下拉控件*/
    addselectdata = ({name, message, placeholder = ''}) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: false, message: message}],
        })(
            <Select style={{ width: 160 }} placeholder="请选择">
                <Option value="普伦四大">普伦四大</Option>
                <Option value="普伦五大">普伦五大</Option>
            </Select>
        )}
    </FormItem>)

    /*上传控件*/
    adduploaddata = ({name, message, placeholder = '', num = 1}) => (<FormItem>
        {this.props.form.getFieldDecorator(name, {
            rules: [{required: false, message: message}],
            onChange: this.uploadonChange,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
        })(
            <Upload {...this.uploadsprops2} beforeUpload={this.beforeUpload}>
                {this.uploadicon(name, num)}
            </Upload>
        )}
    </FormItem>)

    uploadsprops2 = {
        name: 'file',
        listType: 'picture',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        action: '//jsonplaceholder.typicode.com/posts/',
    }

    uploadIcon = (<Icon type="plus" className="avatar-uploader-trigger"
    style={{border: '1px dashed #d9d9d9',cursor: 'pointer','borderRadius': '6px'}}/>)

    uploadicon = (id, num, ic = this.uploadIcon)=>
    this.props.Infos[id] && this.props.Infos[id].value && this.props.Infos[id].value.length >= num ? null : ic


    handleAdd2 = () => {
        const {count, data2} = this.props.tablemodel2;
        const newData = {
            key: count + '',
            No: count + '',
            BrandName: {name: 'BrandName' + count, message: '请输入品牌名称', placeholder: '品牌名称',},
            BrandType: {name: 'BrandType' + count, message: '请输入品牌类型', placeholder: '品牌类型',},
            powerofAttorney: {name: 'powerofAttorney' + count, message: '请上传授权书', placeholder: '授权书',},
            registCard: {name: 'registCard' + count, message: '请上传注册证', placeholder: '注册证',},
            AuditReports: {name: 'AuditReports' + count, message: '请上传认证报告', placeholder: '认证报告',},
            OtherInformation: {name: 'OtherInformation' + count, message: '请上传其他资料', placeholder: '其他资料',},
            Operation: '删除',
        };

        this.props.dispatch(tablemodelaction2({data2: [...data2, newData], count: count + 1,}))
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const columns = this.columns;
        const {data2} = this.props.tablemodel2;
        return (
              <div>
                  <div className="audit-tit"> 经营品牌 </div>
                  <Table columns={columns}  dataSource={data2} bordered className="g-mt" 
                  footer={() =><div style={{textAlign:'center'}}><Button className="editable-add-btn" onClick={this.handleAdd2}>+添加经营品牌</Button></div>}
                  />
        </div>
        )
    }
}
    
export default connect((state) => {
    return {...state}
})(Form.create({
    mapPropsToFields(props) {
        return props.Infos
    },
    onFieldsChange(props, fields) {
        props.dispatch(baseInfoForm(fields))

    },
})(AuditFrom2));
