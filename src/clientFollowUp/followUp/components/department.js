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
    state = {
        defaultExpandAll: true,
      }
      onSelect = (selectedKeys,info) => {//选择的操作
        this.props.doQueryFollow({query:this.props.FollowUP.query,pagination:this.props.FollowUP.pagination,userList:selectedKeys.toString()});
      }
    componentWillMount() {
        this.props.doInitList();
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item) {
            return (
              <TreeNode title={item.realName} key={item.userId} dataRef={item}>
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });
      }
  
  render() {
  
    const {departmentList} = this.props.FollowUP;
    return (
        <div className="department-list">
                <Tree
                defaultExpandAll={this.state.defaultExpandAll}
                onSelect={this.onSelect}
            >
                {this.renderTreeNodes(departmentList==undefined ?[]:departmentList)}
            </Tree> 
        </div>
    
    );
  }
}
export default Department