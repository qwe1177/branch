webpackJsonp([11],{1441:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t(40),r=(t.n(n),t(0)),i=t.n(r),l=t(12),o=(t.n(l),t(2)),s=t(5),c=t(37),d=t.n(c),u=t(38),p=(t.n(u),t(1442)),m=t(1443),h=(t.n(m),t(1444)),f=t(39),y=[d.a],b=Object(o.createStore)(p.a,o.applyMiddleware.apply(void 0,y));Object(l.render)(i.a.createElement(s.Provider,{store:b},i.a.createElement(f.a,null,i.a.createElement(h.a,null))),document.getElementById("root"))},1442:function(e,a,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{data:[{id:"0",specCode:{name:"specCode",message:"请输入规格编码",placeholder:"请输入规格编码",required:!0},pName:{name:"pName",message:"请输入名称",placeholder:"请输入名称",required:!0},brand:{name:"brand",message:"请输入品牌",placeholder:"请输入品牌",required:!0},categoryName:{name:"categoryName",message:"请输入所属类目",placeholder:"请输入所属类目",required:!1},specParams:{name:"specParams",message:"请输入规格型号",placeholder:"请输入规格型号",required:!1},unit:{name:"unit",message:"请输入单位",placeholder:"请输入单位",required:!1},minQuantity:{name:"minQuantity",message:"请输入最小起订量",placeholder:"请输入最小起订量",required:!1},price:{name:"price",message:"请输入进价(元)",placeholder:"请输入进价(元)",required:!0},taux:{name:"taux",message:"请输入税点",placeholder:"请输入税点",required:!1},invoice:{name:"invoice",message:"请输入发票",placeholder:"请输入发票",required:!1},deliveryTime:{name:"deliveryTime",message:"请输入付款交期",placeholder:"请输入付款交期",required:!1},payWay:{name:"payWay",message:"请输入付款方式",placeholder:"请输入付款方式",required:!1},Operation:"删除"}],count:1},a=arguments[1];switch(a.type){case l.c:return o({},e,a.payload);default:return e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{title:"提示",ModalText:"内容",visible:!1,previewVisible:!1,visible2:!1,jsbuttionVisible:!1},a=arguments[1];switch(a.type){case l.a:return o({},e,a.payload);default:return e}}var i=t(2),l=(t(70),t(631)),o=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},s=Object(i.combineReducers)({tablemodel:n,modalmodelall:r});a.a=s},1443:function(e,a){},1444:function(e,a,t){"use strict";function n(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function r(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}function i(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}var l=t(13),o=(t.n(l),t(14)),s=t.n(o),c=t(0),d=t.n(c),u=t(1445),p=(t.n(u),t(20)),m=(t.n(p),t(30)),h=(t.n(m),t(1446)),f=(s.a.Item,function(e){function a(){return n(this,a),r(this,e.apply(this,arguments))}return i(a,e),a.prototype.render=function(){var e=s.a.create()(h.a);return d.a.createElement("div",null,d.a.createElement("h3",{className:"page-title"},"上传产品报价"),d.a.createElement("div",{className:"tabel-wrap"},d.a.createElement(e,null)))},a}(c.Component));a.a=f},1445:function(e,a){},1446:function(e,a,t){"use strict";function n(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function r(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}function i(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}var l=t(121),o=(t.n(l),t(122)),s=t.n(o),c=t(34),d=(t.n(c),t(35)),u=t.n(d),p=t(19),m=(t.n(p),t(18)),h=t.n(m),f=t(21),y=(t.n(f),t(22)),b=t.n(y),v=t(24),g=(t.n(v),t(25)),E=t.n(g),N=t(27),w=(t.n(N),t(33)),O=t.n(w),x=t(41),q=(t.n(x),t(42)),C=t.n(q),j=t(232),V=(t.n(j),t(233)),I=t.n(V),S=t(28),T=(t.n(S),t(29)),P=t.n(T),_=t(13),B=(t.n(_),t(14)),k=t.n(B),W=t(0),L=t.n(W),F=t(1447),M=(t.n(F),t(23)),Q=t(15),D=t(10),$=t(1448),K=t(12),R=(t.n(K),t(5)),U=t(26),A=t.n(U),z=t(631),J=t(1372),G=t(1368),H=t(1),X=(t.n(H),Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}),Y=k.a.Item,Z=P.a.Option,ee=function(e){function a(t){n(this,a);var i=r(this,e.call(this,t));return i.state={catNamelist:[],selectedallKeys:[],brandSelectorVisible:!1,brandBuyersVisible:!1,BuyersList:{name:"",id:""},supplierList:{supplierId:"",contactsId:"",contacts:"",contactsWay:""}},i.uploads={name:"file",action:D.c+"/quotation/uploadExcelQuotation.do?token="+Object(Q.b)().token,onChange:function(e){var a=e.file.status;if("done"===a)if(1==e.file.response.code){var t=e.file.response.data,n=i.props.tablemodel,r=n.count,l=n.data,o=t.map(function(e){var a=A.a.pick(e,["id","specCode","pName","brand","categoryName","specParams","unit","minQuantity","price","taux","invoice","deliveryTime","payWay"]);return a=A.a.omitBy(a,A.a.isUndefined)}),s=o.map(function(e,a){return{id:r+a+1+"",specCode:{name:"specCode"+(r+a+1),initialValue:e.specCode,message:"请输入规格编码",placeholder:"请输入规格编码",required:!0},pName:{name:"pName"+(r+a+1),initialValue:e.pName,message:"请输入名称",placeholder:"请输入名称"},brand:{name:"brand"+(r+a+1),initialValue:e.brand,message:"请输入品牌",placeholder:"请输入品牌",required:!0},categoryName:{name:"categoryName"+(r+a+1),initialValue:e.categoryName,message:"请选择所属类目",placeholder:"请选择所属类目"},specParams:{name:"specParams"+(r+a+1),initialValue:e.specParams,message:"请输入规格型号",placeholder:"请输入规格型号"},unit:{name:"unit"+(r+a+1),initialValue:e.unit,message:"请输入单位",placeholder:"请输入单位"},minQuantity:{name:"minQuantity"+(r+a+1),initialValue:e.minQuantity,message:"请输入最小起订量",placeholder:"请输入最小起订量"},price:{name:"price"+(r+a+1),initialValue:e.price,message:"请输入进价(元)",placeholder:"请输入进价(元)"},taux:{name:"taux"+(r+a+1),initialValue:e.taux,message:"请输入税点",placeholder:"请输入税点"},invoice:{name:"invoice"+(r+a+1),initialValue:e.invoice,message:"请选择发票",placeholder:"请选择发票"},deliveryTime:{name:"deliveryTime"+(r+a+1),initialValue:e.deliveryTime,message:"请输入交期",placeholder:"请输入交期"},payWay:{name:"payWay"+(r+a+1),initialValue:e.payWay,message:"请输入付款方式",placeholder:"请输入付款方式"},Operation:"删除"}});i.props.dispatch(Object(z.d)({data:[].concat(l,s),count:parseInt(s[s.length-1].id)+1}))}else if(""==e.file.response.msg||void 0==e.file.response.msg){var c={message:"提示：",description:"上传文件错误",duration:3};I.a.open(c)}else{var d={message:"提示：",description:e.file.response.msg,duration:3};I.a.open(d)}else"error"===a&&C.a.error(e.file.name+" file upload failed.")}},i.handleAdd=function(){var e=i.props.tablemodel,a=e.count,t=e.data,n={id:a+"",specCode:{name:"specCode"+a,message:"请输入规格编码",placeholder:"请输入规格编码",required:!0},pName:{name:"pName"+a,message:"请输入名称",placeholder:"请输入名称",required:!0},brand:{name:"brand"+a,message:"请输入品牌",placeholder:"请输入品牌",required:!0},categoryName:{name:"categoryName"+a,message:"请选择所属类目",placeholder:"请选择所属类目",required:!1},specParams:{name:"specParams"+a,message:"请输入规格型号",placeholder:"请输入规格型号",required:!1},unit:{name:"unit"+a,message:"请输入单位",placeholder:"请输入单位",required:!1},minQuantity:{name:"minQuantity"+a,message:"请输入最小起订量",placeholder:"请输入最小起订量",required:!1},price:{name:"price"+a,message:"请输入进价(元)",placeholder:"请输入进价(元)",required:!0},taux:{name:"taux"+a,message:"请输入税点",placeholder:"请输入税点",required:!1},invoice:{name:"invoice"+a,message:"请选择发票类型",placeholder:"请选择发票类型",required:!1},deliveryTime:{name:"deliveryTime"+a,message:"请输入交期",placeholder:"请输入交期",required:!1},payWay:{name:"payWay"+a,message:"请选择付款方式",placeholder:"请选择付款方式",required:!1},Operation:"删除"};i.props.dispatch(Object(z.d)({data:[].concat(t,[n]),count:a+1}))},i.addselectdata=function(e){var a=e.name,t=e.message,n=(e.placeholder,e.initialValue),r=void 0===n?void 0:n;return L.a.createElement(Y,null,i.props.form.getFieldDecorator(a,{rules:[{required:!1,message:t}],initialValue:r})(L.a.createElement(P.a,{style:{width:80},placeholder:"请选择"},L.a.createElement(Z,{value:"普票"},"普票"),L.a.createElement(Z,{value:"专票"},"专票"))))},i.addpayWaydata=function(e){var a=e.name,t=e.message,n=(e.placeholder,e.initialValue),r=void 0===n?void 0:n;return L.a.createElement(Y,null,i.props.form.getFieldDecorator(a,{rules:[{required:!1,message:t}],initialValue:r})(L.a.createElement(P.a,{style:{width:80},placeholder:"请选择"},L.a.createElement(Z,{value:"线上付款"},"线上付款"),L.a.createElement(Z,{value:"线下转账"},"线下转账"))))},i.ModalhandleCancellist=function(e){return function(){var a;i.props.dispatch(Object(z.b)((a={},a[e]=!1,a)))}},i.categoryNamelist=function(e){var a=e.name,t=e.message,n=(e.placeholder,e.initialValue),r=void 0===n?void 0:n;return L.a.createElement(Y,null,i.props.form.getFieldDecorator(a,{rules:[{required:!1,message:t}],initialValue:r})(L.a.createElement(P.a,{style:{width:80},placeholder:"请选择"},i.selectcatName())))},i.ModalhandleallOk=function(){var e=i.state.selectedallKeys,a=[].concat(i.props.tablemodel.data),t=new Set(e),n=a.filter(function(e){if(!t.has(e.id))return e});i.props.dispatch(Object(z.d)({data:n})),i.props.dispatch(Object(z.b)({visible:!1}))},i.handledeleteall=function(){i.props.dispatch(Object(z.b)({visible:!0}))},i.deleterow=function(e){var a=[].concat(i.props.tablemodel.data),t=e;a.splice(t,1),i.props.dispatch(Object(z.d)({data:a}))},i.excelbtn=function(){var e=Object(Q.b)().token;window.location.href=D.c+"/quotation/downloadQuotationTemplate.do?token="+e},i.addinputdata=function(e){var a=e.name,t=e.message,n=e.placeholder,r=void 0===n?"":n,l=e.initialValue,o=void 0===l?"":l,s=e.required,c=void 0!==s&&s,d=e.type,u=void 0===d?"string":d;return L.a.createElement(Y,null,i.props.form.getFieldDecorator(a,{rules:[{required:c,message:t,type:u}],initialValue:o})(L.a.createElement(O.a,{placeholder:r,style:{width:"100%"}})))},i.handleCancel=function(){i.setState({brandSelectorVisible:!1})},i.handleBuyser=function(){i.setState({brandBuyersVisible:!1})},i.handleOpenbuyers=function(){i.setState({brandBuyersVisible:!0})},i.handleOpenChoose=function(){i.setState({brandSelectorVisible:!0})},i.handleChoosed=function(e){var a=i.state.supplierList;a.supplierId=e.supplierId,a.contactsId=e.contactsId,a.contacts=e.companyuser,a.contactsWay=e.companyipone,i.setState({supplierList:a});var t=e.companyuser+"/"+e.companyipone;i.props.form.setFieldsValue({companyName:e.companyName,contact:t}),i.setState({brandSelectorVisible:!1})},i.handleBuyersChoosed=function(e){var a=i.state.BuyersList;a.name=e.name,a.id=e.id,i.setState({BuyersList:a}),i.props.form.setFieldsValue({purchaserName:e.name}),i.setState({brandBuyersVisible:!1})},i.objToarrsort=function(e){var a=[],t=[];for(var n in e)n.match(/\d+$/g)?a.push([n,e[n]]):t.push([n,e[n]]);return a.sort(function(e,a){return 1*e[0].match(/\d+$/g).join("")-1*a[0].match(/\d+$/g).join("")}),[].concat(a,t)},i.objTodata=function(e){var a=[];for(var t in e)e[t]&&a.push(t+"="+e[t]);return a.join("&")},i.hrefhost=function(){window.location.reload()},i.handleSubmit=function(e){e.preventDefault(),i.props.form.validateFields(function(e,a){if(!e){for(var t={},n=i.objToarrsort(a),r=n.length,l=i.state,o=l.supplierList,s=l.BuyersList,c=0;c<r;c++){var d=/\d+$/g,u=n[c][0],p=n[c][1];if(d.test(u)){var m=u.replace(/(.*?)\d+/,"$1");Reflect.has(t,m)?t[m].push(p):(t[m]=[],t[m].push(p))}else t[u]=p}var h={};for(var f in t)t[f]&&(h[f]=t[f]);h.contactsId=o.contactsId,h.contacts=o.contacts,h.contactsWay=o.contactsWay,h.supplierId=o.supplierId,h.purchaseId=s.id,h.purchaseName=s.name;var y=i.objTodata(h);M.a.post(D.c+"/quotation/addQuotationSku.do",y).then(function(e){if(1==e.data.code){var a={message:"提示：",description:e.data.msg,duration:3};I.a.open(a),setTimeout(function(){i.hrefhost()},3e3)}else if(0==e.data.code){var t={message:"提示：",description:e.data.msg,duration:3};I.a.open(t)}})}})},i.columns=[{title:"规格编码",dataIndex:"specCode",className:"column-money required",render:i.addinputdata},{title:"名称",dataIndex:"pName",className:"column-money required",render:i.addinputdata},{title:"品牌",dataIndex:"brand",className:"column-money required",render:i.addinputdata},{title:"所属类目",dataIndex:"categoryName",className:"column-money",render:i.categoryNamelist},{title:"规格型号",dataIndex:"specParams",className:"column-money",render:i.addinputdata},{title:"单位",dataIndex:"unit",className:"column-money",render:i.addinputdata},{title:"最小起订量",dataIndex:"minQuantity",className:"column-money",render:i.addinputdata},{title:"进价(元)",dataIndex:"price",className:"column-money required",render:i.addinputdata},{title:"税点",dataIndex:"taux",className:"column-money",render:i.addinputdata},{title:"发票",dataIndex:"invoice",className:"column-money",render:i.addselectdata},{title:"交期",dataIndex:"deliveryTime",className:"column-money widthmonery",render:i.addinputdata},{title:"付款方式",dataIndex:"payWay",className:"column-money",render:i.addpayWaydata},{title:"操作",dataIndex:"Operation",className:"column-money",width:50,render:function(e,a,t){return i.props.tablemodel.data.length>0?L.a.createElement("div",null,L.a.createElement("a",{href:"javascript:;",onClick:function(){return i.deleterow(t)}},e)):null}}],i.rowSelection={onChange:function(e,a){i.state.selectedallKeys;i.setState({selectedallKeys:e})}},i}return i(a,e),a.prototype.componentDidMount=function(){var e=this;M.a.get(D.c+"/queryCategoryList.do").then(function(a){var t=a.data.data;e.setState({catNamelist:t})}).catch(function(a){e.setState({isFetching:!1})})},a.prototype.beforeUpload=function(e){var a=/(xls$)|(xlsx$)/,t=a.test(e.name);t||C.a.error("上传文件类型不符合！");var n=e.size/1024/1024<8;return n||C.a.error("图片大小超过8M！"),t&&n},a.prototype.selectcatName=function(){var e=this.state.catNamelist,a=[],t={};return e.forEach(function(e){t[e.c_name]||(a.push(e),t[e.c_name]=1)}),a.map(function(e,a){return L.a.createElement(Z,{key:a,value:e.c_name},e.c_name)})},a.prototype.render=function(){var e=this,a=this.props.tablemodel.data,t=this.columns,n=this.rowSelection,r=this.props.form.getFieldDecorator,i={labelCol:{span:5},wrapperCol:{span:15}};return L.a.createElement("div",null,L.a.createElement(k.a,{layout:"horizontal",onSubmit:this.handleSubmit},L.a.createElement("div",{className:"pd20"},L.a.createElement("div",{className:"audit-tit"},L.a.createElement("div",{className:"g-fl"},"基础信息")),L.a.createElement(b.a,{gutter:24,style:{padding:"8px 0px"}},L.a.createElement(E.a,{span:12},L.a.createElement(Y,X({label:"供应商名称"},i,{style:{width:"100%"}}),r("companyName",{rules:[{required:!0,message:"请点击选择供应商"}]})(L.a.createElement(O.a,{placeholder:"请点击选择供应商",onClick:this.handleOpenChoose,readOnly:!0})))),L.a.createElement(E.a,{span:12},L.a.createElement(Y,X({label:"联系人信息"},i,{style:{width:"100%"}}),r("contact",{rules:[{required:!0,message:"请联系人信息"}]})(L.a.createElement(O.a,{placeholder:"",readOnly:!0}))))),L.a.createElement(b.a,{gutter:24,style:{padding:"8px 0px"}},L.a.createElement(E.a,{span:12},L.a.createElement(Y,X({label:"采购商名称"},i,{style:{width:"100%"}}),r("purchaserName",{rules:[{required:!1,message:"请点击选择采购商"}]})(L.a.createElement(O.a,{placeholder:"请点击选择采购商",onClick:this.handleOpenbuyers,readOnly:!0}))))),L.a.createElement(J.default,{onChoosed:this.handleChoosed.bind(this),visible:this.state.brandSelectorVisible,onCancel:this.handleCancel.bind(this)}),L.a.createElement(G.default,{onChoosed:this.handleBuyersChoosed.bind(this),visible:this.state.brandBuyersVisible,onCancel:this.handleBuyser.bind(this)})),L.a.createElement("div",{className:"bjed"}),L.a.createElement("div",{className:"pd20"},L.a.createElement("div",{className:"tit"},L.a.createElement("div",{className:"g-fl"},"商品信息")),L.a.createElement(u.a,{columns:t,rowKey:function(e){return e.id},dataSource:a,pagination:!1,bordered:!0,className:"g-mt",rowSelection:n,footer:function(){return L.a.createElement("div",{style:{textAlign:"center"}},L.a.createElement(h.a,{className:"editable-add-btn",onClick:e.handleAdd},"+添加一条商品"))}}),L.a.createElement("div",{className:"com_ishdh"},L.a.createElement(h.a,{className:"editable-delete-btn resetButton g-fl",type:"primary",onClick:this.handledeleteall},"删除"),L.a.createElement(s.a,X({},this.uploads,{className:"g-fl",beforeUpload:this.beforeUpload,showUploadList:!1}),L.a.createElement(h.a,{className:"editable-listall-btn resetButton"},"批量上传")),L.a.createElement("span",{className:"editable-excel-btn resetButton g-fl"},L.a.createElement("a",{href:"javascript:;",onClick:this.excelbtn},"下载Excel模板")," （必须按模板格式并且文件大小不得超过8M）")),L.a.createElement($.a,X({},X({},this.props.modalmodelall,{ModalText:"确认全部删除吗？"}),{onOk:this.ModalhandleallOk,confirmLoading:this.props.modalmodelall.confirmLoading,onCancel:this.ModalhandleCancellist("visible")}))),L.a.createElement("div",{className:"submit left-margin-30"},L.a.createElement(b.a,{style:{padding:"8px 0px"}},L.a.createElement(Y,null,L.a.createElement(h.a,{style:{padding:"2px 55px"},type:"primary",htmlType:"submit"},"提交"))))))},a}(L.a.Component);a.a=Object(R.connect)(function(e){return X({},e)})(k.a.create({mapPropsToFields:function(e){return e.Infos},onFieldsChange:function(e,a){e.dispatch(baseInfoForm(a))}})(ee))},1447:function(e,a){},1448:function(e,a,t){"use strict";function n(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function r(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}function i(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}var l=t(31),o=(t.n(l),t(32)),s=t.n(o),c=t(0),d=t.n(c),u=function(e){function a(){return n(this,a),r(this,e.apply(this,arguments))}return i(a,e),a.prototype.render=function(){return d.a.createElement("div",null,d.a.createElement(s.a,this.props,d.a.createElement("div",{style:{textAlign:"center"}},this.props.ModalText)))},a}(d.a.Component);a.a=u},631:function(e,a,t){"use strict";t.d(a,"c",function(){return r}),t.d(a,"a",function(){return i}),t.d(a,"d",function(){return l}),t.d(a,"b",function(){return o});var n=t(20),r=(t.n(n),"tablemodelInfo"),i="modalmodelList",l=function(e){return{type:r,payload:e}},o=function(e){return{type:i,payload:e}}}},[1441]);