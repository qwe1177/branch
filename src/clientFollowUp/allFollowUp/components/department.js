import React from 'react';
import { Tree,Collapse } from 'antd';
const TreeNode = Tree.TreeNode;
const Panel = Collapse.Panel;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doInitList, doQueryFollow} from '../actions/index.js';


@connect(
    state => ({ AllFollowUP: state.AllFollowUP}),
    dispatch => bindActionCreators({doInitList, doQueryFollow},dispatch)
)

// ant-tree-node-selected  控制选中的样式
class Department extends React.Component {
    state = {
        defaultExpandAll: true,
      }
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
            this.props.doQueryFollow({query:this.props.AllFollowUP.query,userList:selectedKeys.toString(),pagination:this.props.AllFollowUP.pagination});
        }else if(info.node.props.dataRef&&info.node.props.dataRef != ''){
            const userLists = _this.getUser(info.node.props.dataRef.children);
            console.log(userLists)
             this.props.doQueryFollow({query:this.props.AllFollowUP.query,userList:userLists.toString(),pagination:this.props.AllFollowUP.pagination});
        }
      }
    componentWillMount() {
        this.props.doInitList();
        
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode showIcon='false' title={item.title} key={item.key} dataRef={item} >
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });
      }
  
  render() {
  
    const {departmentList} = this.props.AllFollowUP;
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
    var treeData = getTreeStruc(departmentList);
    return (
        <div className="department-list">
                <Tree
                defaultExpandAll={this.state.defaultExpandAll}
                onSelect={this.onSelect}
            >
                {this.renderTreeNodes(treeData)}
            </Tree> 
        </div>
    
    );
  }
}
export default Department