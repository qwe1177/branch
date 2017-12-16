import React from 'react';
import { Tree,Collapse } from 'antd';
const TreeNode = Tree.TreeNode;
const Panel = Collapse.Panel;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doInitList, doQueryFollow} from '../actions/index.js';


@connect(
    state => ({ FollowUP: state.FollowUP}),
    dispatch => bindActionCreators({doInitList, doQueryFollow},dispatch)
)

// ant-tree-node-selected  控制选中的样式
class Department extends React.Component {
      getUser = (arrRead) => {
        const userList = [];
        (function circle(arrRead,arrWrite) {
        for (var i = 0; i < arrRead.length; i++) {
            if(arrRead[i].type == '11') {
                arrWrite.push((arrRead[i].key))
            }
            if (arrRead[i].children && arrRead[i].children.length !== 0) {
            circle(arrRead[i].children, arrWrite);
            }
            }
        })(arrRead, userList);
        return userList;
    }
      onSelect = (selectedKeys,info) => {//选择的操作
        // getUser(node.props)
        var _this = this;
        if(info.node.props.type == '11') {
            const userList = []
            userList.push(selectedKeys);
            this.props.doQueryFollow({query:this.props.FollowUP.query,pagination:this.props.FollowUP.pagination},userList);
        }else if(info.node.props.dataRef&&info.node.props.dataRef != ''){
            const userList = _this.getUser(info.node.props.dataRef.children);
             this.props.doQueryFollow({query:this.props.FollowUP.query,pagination:this.props.FollowUP.pagination},userList);
        }
      }
    componentWillMount() {
        this.props.doInitList();
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });
      }
  
  render() {
  
    const {departmentList} = this.props.FollowUP;
    // 改变获取的数据结构
    function getTreeStruc(arrRead) {
        var treeData = [];
        (function circle(arrRead, arrWrite,layer) {
        for (var i = 0; i < arrRead.length; i++) {
        arrWrite.push({
            title: arrRead[i].realName||arrRead[i].departmentName ,
            key: arrRead[i].userId||arrRead[i].departmentId,
            type:layer
        })
            if (arrRead[i].children && arrRead[i].children.length !== 0) {
            arrWrite[i].children = [];
            circle(arrRead[i].children, arrWrite[i].children,layer);
            }
            if (arrRead[i].userList && arrRead[i].userList.length) {
            if (!arrWrite[i].children) {
            arrWrite[i].children = [];
            }
            circle(arrRead[i].userList, arrWrite[i].children,layer+'1');
            }
            }
        })(arrRead, treeData,'1');
        return treeData;
    }
    var a = getTreeStruc(departmentList);
    return (
        <div className="department-list">
                <Tree
                onSelect={this.onSelect}
            >
                {this.renderTreeNodes(a)}
            </Tree> 
        </div>
    
    );
  }
}
export default Department