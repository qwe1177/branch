webpackJsonp([16],{1507:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(40),r=(n.n(a),n(0)),o=n.n(r),i=n(12),u=(n.n(i),n(2)),c=n(5),l=n(37),s=n.n(l),p=n(38),m=(n.n(p),n(1508)),f=n(39),d=n(1509),y=[s.a],h=Object(u.createStore)(m.a,u.applyMiddleware.apply(void 0,y));Object(i.render)(o.a.createElement(c.Provider,{store:h},o.a.createElement(f.a,null,o.a.createElement(d.a,null))),document.getElementById("root"))},1508:function(e,t,n){"use strict";var a=n(2),r=n(26),o=(n.n(r),n(1)),i=(n.n(o),n(333)),u=n(116),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l={state:"3",companyNameOrMobile:"companyName",companyName:"",applyStartTime:"",applyEndTime:"",approvalStartTime:"",approvalEndTime:""},s={queryform:l},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments[1];switch(t.type){case i.g:return t.data;case i.f:return{queryform:l};case i.b:return s;default:return e}},m={isFetching:!1,tableData:[],selectedList:[],pagination:{showQuickJumper:!0,showSizeChanger:!0,total:1,current:1,pageSize:10,showTotal:function(e){return"共 "+e+" 条"}}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments[1];switch(t.type){case i.e:return c({},e,{isFetching:!0});case i.c:var n=t.data,a=n.tableData,r=n.pagination,o=c({},e.pagination,r);return c({},e,{tableData:a,pagination:o,isFetching:!1});case i.d:return c({},e,{isFetching:!1});case i.a:var u=t.data.selectedList;return c({},e,{selectedList:u});default:return e}},d=Object(a.combineReducers)({mainQueryData:p,mainTableData:f,power:u.a});t.a=d},1509:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(13),u=(n.n(i),n(14)),c=n.n(u),l=n(0),s=n.n(l),p=n(1510),m=(n.n(p),n(20)),f=(n.n(m),n(30)),d=(n.n(f),n(1511)),y=n(1512),h=function(e){function t(){return a(this,t),r(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){var e=c.a.create()(d.a);return s.a.createElement("div",{className:"supplierrefuse"},s.a.createElement("h3",{className:"page-title"},"品控拒绝"),s.a.createElement("div",{className:"query-wrap"},s.a.createElement(e,null)),s.a.createElement("div",{className:"tabel-wrap"},s.a.createElement(y.a,null)))},t}(l.Component);t.a=h},1510:function(e,t){},1511:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i,u,c=n(19),l=(n.n(c),n(18)),s=n.n(l),p=n(21),m=(n.n(p),n(22)),f=n.n(m),d=n(27),y=(n.n(d),n(33)),h=n.n(y),b=n(24),g=(n.n(b),n(25)),E=n.n(g),v=n(46),D=(n.n(v),n(47)),T=n.n(D),w=n(28),O=(n.n(w),n(29)),I=n.n(O),C=n(13),j=(n.n(C),n(14)),N=n.n(j),S=n(0),_=n.n(S),q=n(635),P=(n.n(q),n(1)),F=n.n(P),Q=n(5),R=n(2),k=n(333),Y=n(73),x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},M=N.a.Item,L=I.a.Option,U=(T.a.MonthPicker,T.a.RangePicker),z=(i=Object(Q.connect)(function(e){return{mainQueryData:e.mainQueryData,mainTableData:e.mainTableData}},function(e){return Object(R.bindActionCreators)({initQueryFrom:k.i,setQueryFrom:k.m,resetQueryFrom:k.l,requestSupplier:k.k,queryTableData:k.j},e)}))(u=function(e){function t(){var n,o,i;a(this,t);for(var u=arguments.length,c=Array(u),l=0;l<u;l++)c[l]=arguments[l];return n=o=r(this,e.call.apply(e,[this].concat(c))),o.state={},o.handleSubmit=function(e){e.preventDefault();var t=(o.props.mainQueryData.queryform,o.props.mainTableData),n=t.pagination,a=t.isFetching;o.props.form.validateFieldsAndScroll(function(e,t){if(!e&&!a){var r=x({current:1},n);o.props.setQueryFrom({queryform:t}),o.props.queryTableData({queryform:t,pagination:r})}})},o.handleReset=function(){o.props.form.resetFields();var e=o.props.mainQueryData;e.queryform,e.pagination;o.props.resetQueryFrom()},o.changeToLastSeven=function(){o.props.form.setFieldsValue({createdate:[F()().subtract(6,"days"),F()()]})},o.changeToToday=function(){o.props.form.setFieldsValue({createdate:[F()(),F()()]})},o.changeToLastSeven1=function(){o.props.form.setFieldsValue({refuseDate:[F()().subtract(6,"days"),F()()]})},o.changeToToday1=function(){o.props.form.setFieldsValue({refuseDate:[F()(),F()()]})},i=n,r(o,i)}return o(t,e),t.prototype.componentDidMount=function(){},t.prototype.render=function(){var e=this.props.form.getFieldDecorator,t={labelCol:{span:6},wrapperCol:{span:18}};return _.a.createElement(N.a,{layout:"horizontal",onSubmit:this.handleSubmit},_.a.createElement(f.a,{gutter:16},_.a.createElement(E.a,{span:3},_.a.createElement(M,null,e("companyNameOrMobile",{initialValue:"companyName"})(_.a.createElement(I.a,{style:{width:"100%"}},Object(Y.a)("企业名称").map(function(e){return _.a.createElement(L,{key:e.value,value:e.value},e.label)}))))),_.a.createElement(E.a,{span:5},_.a.createElement(M,null,e("name",{rules:[{validator:this.checkName}]})(_.a.createElement(h.a,{style:{width:"100%"},placeholder:"深圳华南城网科技有限公司"})))),_.a.createElement(E.a,{span:7},_.a.createElement(M,x({},t,{label:"申请时间"}),e("createdate")(_.a.createElement(U,null)))),_.a.createElement(E.a,{span:3},_.a.createElement("span",{className:"rangeButton",onClick:this.changeToToday},"今天"),"  ",_.a.createElement("span",{className:"rangeButton",onClick:this.changeToLastSeven},"近7天"))),_.a.createElement(f.a,{gutter:16,className:"g-mt"},_.a.createElement(E.a,{span:8},_.a.createElement(M,x({},t,{label:"审核驳回时间"}),e("refuseDate")(_.a.createElement(U,null)))),_.a.createElement(E.a,{span:3},_.a.createElement("span",{className:"rangeButton",onClick:this.changeToToday1},"今天"),"  ",_.a.createElement("span",{className:"rangeButton",onClick:this.changeToLastSeven1},"近7天")),_.a.createElement(E.a,{span:5,className:"g-rt"},_.a.createElement(s.a,{type:"primary",size:"large",htmlType:"submit"},"查询"),_.a.createElement(s.a,{type:"ghost",size:"large",className:"resetButton",onClick:this.handleReset},"重置"))))},t}(_.a.Component))||u;t.a=z},1512:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i,u,c=n(34),l=(n.n(c),n(35)),s=n.n(l),p=n(0),m=n.n(p),f=n(635),d=(n.n(f),n(5)),y=n(2),h=n(333),b=(n(10),n(15)),g=n(20),E=(n.n(g),n(74),n(68),(i=Object(d.connect)(function(e){return{mainQueryData:e.mainQueryData,mainTableData:e.mainTableData,power:e.power}},function(e){return Object(y.bindActionCreators)({queryTableData:h.j,setQueryFrom:h.m,doChangeMainCheck:h.h},e)}))(u=function(e){function t(){var n,o,i;a(this,t);for(var u=arguments.length,c=Array(u),l=0;l<u;l++)c[l]=arguments[l];return n=o=r(this,e.call.apply(e,[this].concat(c))),o.state={},o.queryWithDefault=function(){var e=o.props.mainQueryData.queryform,t=o.props.mainTableData.pagination;o.props.queryTableData({queryform:e,pagination:t})},o.handleRefresh=function(){o.props.mainTableData.isFetching||o.queryWithDefault()},o.getDetailUrl=function(e,t,n){var a=Object(b.e)(),r=a.moduleId?a.moduleId:"",o=a.systemId?a.systemId:"",i="";return"my"==e?i="/myClueDetail/":"theHighSeas"==e?i="/publicClueDetail/":"underling"==e&&(i="/underlingClueDetail/"),""==i?n:m.a.createElement("a",{href:i+"?systemId="+o+"&moduleId="+r+"&supplierId="+t,target:"_blank"},n)},o.handleTableChange=function(e,t,n){var a=o.props.mainQueryData.queryform;o.props.queryTableData({queryform:a,pagination:e})},i=n,r(o,i)}return o(t,e),t.prototype.componentWillMount=function(){this.queryWithDefault()},t.prototype.render=function(){var e=this,t=Object(b.e)(),n=t.moduleId?t.moduleId:"",a=t.systemId?t.systemId:"",r="/suppliercertification/supplierlook/?systemId="+a+"&moduleId="+n+"&moduleUrl=/suppliercertification/supplierlook/",o=this.props.mainTableData,i=(o.tableData,o.pagination),u=o.isFetching,c=[{title:"企业名称",dataIndex:"companyName",className:"column-money",render:function(t,n){return e.getDetailUrl(n.type,n.supplierId,t)}},{title:"申请时间",dataIndex:"createTime",className:"column-money"},{title:"审核驳回时间",dataIndex:"updateTime",className:"column-money"},{title:"备注",dataIndex:"note",className:"column-money"},{title:"申请人",dataIndex:"approval",className:"column-money"},{title:"操作",dataIndex:"operation",className:"column-money",render:function(e,t){return m.a.createElement("span",null,m.a.createElement("a",{href:r+"&supplierId="+t.supplierId},"查看"))}}],l=this.props.mainTableData.tableData?this.props.mainTableData.tableData:[];l=l.map(function(e,t){return e.index=t+1,e});var p={onChange:function(e,t){},onSelect:function(e,t,n){},onSelectAll:function(e,t,n){},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name}}};return m.a.createElement("div",{className:"pd20"},m.a.createElement("div",{className:"tit"},m.a.createElement("div",{className:"g-fl"},m.a.createElement("a",{href:"javascript:;",onClick:this.handleRefresh},"刷新"))),m.a.createElement(s.a,{rowKey:function(e){return e.id},columns:c,rowSelection:p,pagination:i,onChange:this.handleTableChange,dataSource:l,bordered:!0,loading:u,className:"g-mt"}))},t}(m.a.Component))||u);t.a=E},333:function(e,t,n){"use strict";function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(r,o){try{var i=t[r](o),u=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(u).then(function(e){a("next",e)},function(e){a("throw",e)});e(u)}return a("next")})}}n.d(t,"b",function(){return p}),n.d(t,"f",function(){return m}),n.d(t,"g",function(){return f}),n.d(t,"e",function(){return d}),n.d(t,"c",function(){return y}),n.d(t,"d",function(){return h}),n.d(t,"a",function(){return b}),n.d(t,"k",function(){return D}),n.d(t,"i",function(){return I}),n.d(t,"l",function(){return C}),n.d(t,"m",function(){return j}),n.d(t,"j",function(){return N}),n.d(t,"h",function(){return S});var r=n(10),o=n(15),i=n(23),u=n(26),c=n.n(u),l=this,s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},p="INIT_QUERY",m="RESET_QUERY",f="SET_QUERY",d="REQUEST_SUPPLIER",y="RECEIVE_SUPPLIER",h="RECEIVE_SUPPLIER_FAIL",b="CHANGE_MAIN_CHECK",g=function(e){return{type:p,data:e}},E=function(e){return{type:f,data:e}},v=function(e){return{type:m,data:e}},D=function(){return{type:d}},T=function(e){return{type:y,data:e}},w=function(){return{type:h}},O=function(e){return{type:b,data:e}},I=function(e){return function(t,n){return t(g(e))}},C=function(e){return function(t,n){return t(v(e))}},j=function(e){return function(t,n){return t(E(e))}},N=function(e){return function(){var t=a(regeneratorRuntime.mark(function t(n,a){var u,p,m,f,d,y,h;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n(D());case 3:return u=Object(o.e)(),p=u.moduleId?u.moduleId:"",m=e.queryform,f=e.pagination,d={pageNo:f.current,pageSize:f.pageSize},m.createdate&&m.createdate.length>0&&(m.applyStartTime=m.createdate[0].format("YYYY-MM-DD"),m.applyEndTime=m.createdate[1].format("YYYY-MM-DD")),m.refuseDate&&m.refuseDate.length>0&&(m.approvalStartTime=m.refuseDate[0].format("YYYY-MM-DD"),m.approvalEndTime=m.refuseDate[1].format("YYYY-MM-DD")),m.companyNameOrMobileValue=m.name,m=c.a.omitBy(m,c.a.isUndefined),y=s({},m,d,{state:"3",moduleId:p}),t.next=15,i.a.get(r.c+"/qualityControl/viewQualityControlList.do",{params:y});case 15:return h=t.sent,t.next=18,n(T({tableData:h.data.data.data,pagination:{total:h.data.data.rowCount,current:h.data.data.pageNo,pageSize:h.data.data.pageSize}}));case 18:return t.abrupt("return",t.sent);case 21:return t.prev=21,t.t0=t.catch(0),t.next=26,n(w());case 26:return t.abrupt("return",t.sent);case 27:case"end":return t.stop()}},t,l,[[0,21]])}));return function(e,n){return t.apply(this,arguments)}}()},S=function(e){return function(t,n){return t(O(e))}}},635:function(e,t){}},[1507]);