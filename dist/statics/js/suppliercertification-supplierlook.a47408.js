webpackJsonp([17],{1500:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(40),r=(a.n(n),a(0)),o=a.n(r),i=a(12),l=(a.n(i),a(2)),s=a(5),c=a(37),d=a.n(c),u=a(38),p=(a.n(u),a(1501)),m=a(39),h=a(1502),f=[d.a],b=Object(l.createStore)(p.a,l.applyMiddleware.apply(void 0,f));Object(i.render)(o.a.createElement(s.Provider,{store:b},o.a.createElement(m.a,null,o.a.createElement(h.a,null))),document.getElementById("root"))},1501:function(e,t,a){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{orOut:{name:"orOut",value:"2"}},t=arguments[1];switch(t.type){case s.a:return c({},e,t.payload);default:return e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{title:"提示",ModalText:"内容",visible:!1,previewVisible:!1,visible2:!1,jsbuttionVisible:!1,submitVisible:!1},t=arguments[1];switch(t.type){case s.b:return c({},e,t.payload);default:return e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{data1:[{key:"1",No:"1",brankName:{name:"brankName1",message:"请输入品牌名称",placeholder:"品牌名称"},brankType:{name:"brankType1",message:"请输入品牌类型",placeholder:"品牌类型"},authorization:{name:"authorization1",message:"请上传授权书",placeholder:"授权书"},registration:{name:"registration1",message:"请输入注册证",placeholder:"注册证"},certification:{name:"certification1",message:"请输入认证报告",placeholder:"认证报告"},otherAptitude:{name:"otherAptitude1",message:"请输入其他资料",placeholder:"其他资料",num:3},Operation:"删除"}],count:1},t=arguments[1];switch(t.type){case s.c:return c({},e,t.payload);default:return e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{data2:[],count:0},t=arguments[1];switch(t.type){case s.d:return c({},e,t.payload);default:return e}}var l=a(2),s=a(187),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},d=Object(l.combineReducers)({Infos:n,modalmodel:r,tablemodel1:o,tablemodel2:i});t.a=d},1502:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i,l,s=a(0),c=a.n(s),d=a(1503),u=(a.n(d),a(30)),p=(a.n(u),a(5)),m=a(2),h=a(15),f=a(187),b=a(1504),y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},g=(i=Object(p.connect)(function(e){return y({},e)},function(e){return Object(m.bindActionCreators)(f.e,e)}))(l=function(e){function t(){return n(this,t),r(this,e.apply(this,arguments))}return o(t,e),t.prototype.componentWillMount=function(){var e=Object(h.c)("supplierId");this.props.fetchTable2Info(e)},t.prototype.render=function(){return c.a.createElement("div",null,c.a.createElement("h3",{className:"page-title"},"查看审核"),c.a.createElement(b.a,null))},t}(s.Component))||l;t.a=g},1503:function(e,t){},1504:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(34),l=(a.n(i),a(35)),s=a.n(l),c=a(21),d=(a.n(c),a(22)),u=a.n(d),p=a(24),m=(a.n(p),a(25)),h=a.n(m),f=a(59),b=(a.n(f),a(43)),y=a.n(b),g=a(41),v=(a.n(g),a(42)),E=a.n(v),w=a(121),N=(a.n(w),a(122)),k=a.n(N),I=a(27),O=(a.n(I),a(33)),x=a.n(O),C=a(67),L=(a.n(C),a(65)),T=a.n(L),j=a(46),F=(a.n(j),a(47)),q=a.n(F),P=a(28),V=(a.n(P),a(29)),A=a.n(V),U=a(13),M=(a.n(U),a(14)),z=a.n(M),_=a(0),S=a.n(_),R=a(1505),D=(a.n(R),a(1)),B=a.n(D),G=a(105),$=(a.n(G),a(1506)),Q=a(15),K=a(10),W=a(73),J=a(5),Z=a(2),H=a(187),X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},Y=z.a.Item,ee=A.a.Option,te=(q.a.MonthPicker,q.a.RangePicker),ae=T.a.Group,ne=(x.a.TextArea,function(e){function t(a){n(this,t);var o=r(this,e.call(this,a));o.formItemLayout={labelCol:{span:5},wrapperCol:{span:19}},o.objToarrsort=function(e){var t=[],a=[];for(var n in e)n.match(/\d+$/g)?t.push([n,e[n]]):a.push([n,e[n]]);return t.sort(function(e,t){return 1*e[0].match(/\d+$/g).join("")-1*t[0].match(/\d+$/g).join("")}),[].concat(t,a)},o.handleSubmit=function(e){e.preventDefault(),o.props.form.validateFieldsAndScroll(function(e,t){})},o.normFile=function(e){return Array.isArray(e)?e:e&&e.fileList},o.addinputdata=function(e){var t=e.name,a=e.message,n=e.placeholder,r=void 0===n?"":n,i=e.initialValue,l=void 0===i?"":i,s=e.required,c=void 0!==s&&s,d=e.type,u=void 0===d?"string":d;return S.a.createElement(Y,X({style:{width:"100%"}},{labelCol:{span:7},wrapperCol:{span:17}}),o.props.form.getFieldDecorator(t,{rules:[{required:c,message:a,type:u},{validator:"mobile1"==t?o.telphonevalid:null}],initialValue:l})(S.a.createElement(x.a,{disabled:!0,placeholder:r,style:{width:"100%"}})))},o.addselectdata=function(e){var t=e.name,a=e.message,n=(e.placeholder,e.initialValue),r=void 0===n?"":n;return S.a.createElement(Y,null,o.props.form.getFieldDecorator(t,{rules:[{required:!1,message:a}],initialValue:r})(S.a.createElement(A.a,{disabled:!0,style:{width:160},placeholder:"请选择"},Object(W.a)("品牌类型").map(function(e){return S.a.createElement(ee,{key:e.value,value:e.value},e.label)}))))},o.adduploaddata=function(e){var t=e.name,a=e.message,n=e.initialValue,r=void 0===n?[]:n,i=(e.placeholder,e.num),l=void 0===i?1:i;t.replace(/(.*?)s(\d+)$/g,"$1$2");return S.a.createElement(Y,X({style:{width:"100%"}},X({},o.formItemLayout,{wrapperCol:{span:24}})),o.props.form.getFieldDecorator(t,{rules:[{required:!1,message:a}],onChange:o.uploadonChange,valuePropName:"fileList",getValueFromEvent:o.normFile,initialValue:r})(S.a.createElement(k.a,X({},o.uploadsprops2,{beforeUpload:o.beforeUpload,listType:"picture-card"}),o.uploadicon(t,l))))},o.handlePreview=function(e){o.props.modalmodelaction({previewVisible:!0,previewImage:e.url||e.thumbUrl})},o.uploadsprops2={showUploadList:{showRemoveIcon:!1},disabled:!0,name:"Filedata",listType:"picture",className:"upload-list-inline",onPreview:o.handlePreview,multiple:!0,accept:"image/*",action:K.b+"/upload?type=approveLicensePic&token="+Object(Q.b)().token},o.handleCancel2=function(e){return function(){var t;return o.props.modalmodelaction((t={},t[e]=!1,t))}},o.handleAdd1=function(){var e=o.props.tablemodel1,t=e.count,a=e.data1,n={key:t+"",No:t+"",brankName:{name:"brankName"+t,message:"请输入品牌名称",placeholder:"品牌名称"},brankType:{name:"brankType"+t,message:"请输入品牌类型",placeholder:"品牌类型"},authorization:{name:"authorization"+t,message:"请上传授权书",placeholder:"授权书"},registration:{name:"registration"+t,message:"请上传注册证",placeholder:"注册证"},certification:{name:"certification"+t,message:"请上传认证报告",placeholder:"认证报告"},otherAptitude:{name:"otherAptitude"+t,message:"请上传其他资料",placeholder:"其他资料",num:3},Operation:"删除"};o.props.tablemodelaction({data1:[].concat(a,[n]),count:t+1})},o.Modalshow=function(e){return function(){o.props.modalmodelaction({visible:!0}),o.props.tablemodelaction({delkey:e})}},o.fileListhanddle=function(e){return e?e.split("@").map(function(e,t){return{uid:t,name:t+".png",status:"done",url:"//img.csc86.com"+e}}):[]},o.uploadonChange=function(e){var t=e.file.status;e.file.response;"done"===t?E.a.success(e.file.name+" 图片上传成功."):"error"===t&&E.a.error(e.file.name+" 图片上传失败.")},o.onChange=function(e){var t=e.target.name,a=e.target.value;o.props.baseInfoForm({name:{name:t,value:a}})},o.uploadIcon=S.a.createElement(y.a,{type:"plus",className:"avatar-uploader-trigger",style:{border:"1px dashed #d9d9d9",cursor:"pointer",borderRadius:"6px"}}),o.uploadicon=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.uploadIcon;return o.props.Infos[e]&&o.props.Infos[e].value&&o.props.Infos[e].value.length>=t?null:a},o.provincehandle=function(e,t){return function(a){var n=2==o.props.Infos.orOut.value?K.c+"/clue/getZone.do":K.c+"/clue/getArea.do";o.props.fetchzonesPosts({url:n,name:e,value:a.key,returnName:t})}},o.ModalhandleOk=function(){var e=[].concat(o.props.tablemodel1.data1),t=o.props.tablemodel1.delkey;e.splice(t,1),o.props.modalmodelaction({ModalText:"删除中···",confirmLoading:!0}),setTimeout(function(){o.props.tablemodelaction({data1:e}),o.props.modalmodelaction({visible:!1,confirmLoading:!1})},500)},o.ModalhandleCancel=function(e){return function(){var t;o.props.modalmodelaction((t={},t[e]=!1,t))}};var i=location.pathname;return o.downloadUrl=K.c+"/quotation/exportQuotationData.do?token="+Object(Q.b)().token+"&moduleUrl="+i,o.columns=[{title:"序号",dataIndex:"No",width:50,render:function(e){return e}},{title:"品牌名称",className:"column-money",dataIndex:"brankName",width:160,render:o.addinputdata},{title:"品牌类型",dataIndex:"brankType",render:o.addselectdata,width:160},{title:"授权书",dataIndex:"authorization",render:o.adduploaddata,width:160},{title:"注册证",dataIndex:"registration",render:o.adduploaddata,width:160},{title:"认证报告",dataIndex:"certification",render:o.adduploaddata,width:160},{title:"其他资料",dataIndex:"otherAptitude",render:o.adduploaddata,width:160},{title:"添加人员",width:160,dataIndex:"person"},{title:"添加时间",width:160,dataIndex:"createTime"}],o.columns1=[{title:"序号",dataIndex:"index",className:"column-money",width:50},{title:"报价单编号",dataIndex:"quotationId",className:"column-money",width:160},{title:"SKU数量",dataIndex:"skuTotal",className:"column-money",width:160},{title:"添加人员",dataIndex:"userName",className:"column-money",width:160},{title:"添加时间",dataIndex:"createTime",className:"column-money",width:160},{title:"操作",dataIndex:"option",className:"column-money",width:160,render:function(e,t,a){var n=o.downloadUrl+"&quotationId="+t.quotationId;return S.a.createElement("a",{href:n},"下载")}}],o.columns2=[{title:"序号",dataIndex:"index",className:"column-money",width:50},{title:"操作",dataIndex:"operation",className:"column-money",width:160},{title:"备注",dataIndex:"noteLog",className:"column-money",width:300},{title:"上传时间",dataIndex:"createTime",className:"column-money",width:160},{title:"操作人",dataIndex:"operationStaff",className:"column-money",width:100}],o}return o(t,e),t.prototype.beforeUpload=function(e){var t=/jpeg|jpg|png|gif/,a=t.test(e.type);a||E.a.error("上传图片类型不符合！");var n=e.size/1024/1024<4;return n||E.a.error("图片大小超过4M！"),a&&n},t.prototype.componentDidMount=function(){var e=this,t=Object(Q.c)("supplierId");Object(H.f)(t).then(function(t){if(t.data.code="1"){var a=t.data.data,n=a.companyName,r=a.companyAddress,o=a.creditNumber,i=a.province,l=a.city,s=a.deadline,c=a.organization,d=a.corporation,u=a.corporationGender,p=a.idcard,m=a.idcards,h=(a.card1,a.card2,a.license),f=a.qualification,b=a.undertaking,y=a.officespace,g=a.workshop,v=(a.brankName,a.brankType,a.authorization),E=(a.registration,a.certification,a.otherAptitude,a.supplierBrankList),w=a.qualityControlLogList;a.harea,a.hvenue,a.hfloor,a.hdistrict,a.provincebase,a.citybase,a.countybase,a.townbase;if(e.props.baseInfoForm({companyName:n,companyAddress:r,qualityControlLogList:w}),E&&E.length>0){var N=E.map(function(t,a){return{key:t.key,No:t.key,brankName:{name:"brankName"+t.key,initialValue:t.brankName,message:"请输入品牌名称",placeholder:"品牌名称"},brankType:{name:"brankType"+t.key,initialValue:t.brankType,message:"请输入品牌类型",placeholder:"品牌类型"},authorization:{name:"authorization"+t.key,initialValue:e.fileListhanddle(t.authorization),message:"请上传授权书",placeholder:"授权书"},registration:{name:"registration"+t.key,initialValue:e.fileListhanddle(t.registration),message:"请输入注册证",placeholder:"注册证"},certification:{name:"certification"+t.key,initialValue:e.fileListhanddle(t.certification),message:"请输入认证报告",placeholder:"认证报告"},otherAptitude:{name:"otherAptitude"+t.key,initialValue:e.fileListhanddle(t.otherAptitude),message:"请输入其他资料",placeholder:"其他资料",num:3},Operation:"删除"}});e.props.tablemodelaction({data1:N,count:N.length+1})}var k=[];""!=s&&(k=s.split(","),k=k.length?[B()(k[0]),B()(k[1])]:[]);var I=e.fileListhanddle(m),O=e.fileListhanddle(h),x=e.fileListhanddle(f),C=e.fileListhanddle(v),L=e.fileListhanddle(b),T=e.fileListhanddle(y),j=e.fileListhanddle(g);e.props.form.setFieldsValue({creditNumber:o,province:{key:i},city:{key:l},deadline:k,organization:c,corporation:d,corporationGender:u,idcard:p,idcards:I,license:O,qualification:x,authorizationBus:C,undertaking:L,officespace:T,workshop:j})}}).catch(function(e){})},t.prototype.render=function(){var e={labelCol:{span:7},wrapperCol:{span:17}},t=this.props.form,a=t.getFieldDecorator,n=(t.getFieldsError,t.getFieldError,t.isFieldTouched,this.props.tablemodel1.data1),r=this.props.tablemodel2.data2,o=this.props.Infos.qualityControlLogList?this.props.Infos.qualityControlLogList:[];o=o.map(function(e,t){return e.index=t+1,e});var i=this.props.Infos,l=i.provinces,c=(i.citys,i.registAddressCitys),d=i.companyName,p=i.companyAddress,m=l?l.map(function(e,t,a){return S.a.createElement(ee,{key:e.id},e.name)}):[],f=c?c.map(function(e,t,a){return S.a.createElement(ee,{key:e.id},e.name)}):[];return S.a.createElement(z.a,{layout:"horizontal",onSubmit:this.handleSubmit,className:"main-submit-form"},S.a.createElement("div",{className:"audit-tit"},"企业信息"),S.a.createElement("div",{className:"audit-ress"},S.a.createElement("div",{className:"oflowen pt20"},S.a.createElement("div",{className:"g-fl label"},"企业名称"),S.a.createElement("div",{className:"g-fl pl20"},d)),S.a.createElement("div",{className:"oflowen pt10"},S.a.createElement("div",{className:"g-fl label"},"企业地址"),S.a.createElement("div",{className:"g-fl pl20"},p))),S.a.createElement("div",{className:"tabel-wrap"},S.a.createElement("div",{className:"audit-tit"}," 资质文件 "),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({},e,{label:"营业执照注册号"}),a("creditNumber",{rules:[{required:!1,message:"请输入营业执照注册号"}]})(S.a.createElement(x.a,{placeholder:"营业执照注册号",disabled:!0,style:{width:"50%"}})))),S.a.createElement(h.a,{span:12,style:{textAlign:"left"}},S.a.createElement(Y,X({label:"营业执照注册地"},e,{style:{width:"100%"}}),a("province",{rules:[{required:!1,message:"请选择省"}]})(S.a.createElement(A.a,{labelInValue:!0,style:{width:"45%",marginRight:"5px"},placeholder:"请选择省",disabled:!0,onChange:this.provincehandle("id","registAddressCitys")},m)),a("city",{rules:[{required:!1,message:"请选择市"}]})(S.a.createElement(A.a,{labelInValue:!0,disabled:!0,style:{width:"45%",marginRight:"5px"},placeholder:"请选择市"},f))))),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({},e,{label:"营业执照期限"}),a("deadline",{rules:[{type:"array",required:!1,message:"请选择"}]})(S.a.createElement(te,{disabled:!0,style:{width:"65%"}})))),S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({},e,{label:"登记机构"}),a("organization",{rules:[{required:!1,message:"请输入登记机构"}]})(S.a.createElement(x.a,{placeholder:"登记机构",disabled:!0,style:{width:"50%"}}))))),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12,style:{textAlign:"left"}},S.a.createElement(Y,X({label:"企业法人"},e,{style:{width:"100%"}}),a("corporation",{rules:[{required:!1,message:"请输入企业法人"}]})(S.a.createElement(x.a,{placeholder:"企业法人",disabled:!0,style:{width:"60%",marginRight:"10px"}})),a("corporationGender",{rules:[{required:!1,message:"请选择"}],initialValue:this.props.Infos.corporationGender&&this.props.Infos.corporationGender.value})(S.a.createElement(ae,{name:"orwomen",disabled:!0},Object(W.a)("性别").map(function(e){return S.a.createElement(T.a,{key:e.value,value:e.value},e.label)}))))),S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({},e,{label:"身份证号"}),a("idcard",{rules:[{required:!1,message:"请输入营业执照注册号"}]})(S.a.createElement(x.a,{placeholder:"",disabled:!0,style:{width:"50%"}}))))),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"法人身份证"},e,{style:{width:"100%"}}),a("idcards",{rules:[{required:!1,message:"请上传法人身份证"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,listType:"picture-card"}),this.uploadicon("idcards",2))))),S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"营业执照"},e,{style:{width:"100%"}}),a("license",{rules:[{required:!1,message:"请上传"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,listType:"picture-card"}),this.uploadicon("license",1)))))),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"一般人纳税资质"},e,{style:{width:"100%"}}),a("qualification",{rules:[{required:!1,message:"请上传"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,listType:"picture-card"}),this.uploadicon("qualification",1))))),S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"法人授权书/代理人授权书"},e,{style:{width:"100%"}}),a("authorizationBus",{rules:[{required:!1,message:"请上传"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,listType:"picture-card"}),this.uploadicon("authorizationBus",1)))))),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"廉洁承诺书"},e,{style:{width:"100%"}}),a("undertaking",{rules:[{required:!1,message:"请上传"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,listType:"picture-card"}),this.uploadicon("undertaking",1))))),S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"办公场所"},e,{style:{width:"100%"}}),a("officespace",{rules:[{required:!1,message:"请上传"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,listType:"picture-card"}),this.uploadicon("officespace",1)))))),S.a.createElement(u.a,{gutter:24},S.a.createElement(h.a,{span:12},S.a.createElement(Y,X({label:"生产车间/仓库"},e,{style:{width:"100%"}}),a("workshop",{rules:[{required:!1,message:"请上传"}],onChange:this.uploadonChange,valuePropName:"fileList",getValueFromEvent:this.normFile})(S.a.createElement(k.a,X({},this.uploadsprops2,{beforeUpload:this.beforeUpload,multiple:!0,listType:"picture-card"}),this.uploadicon("workshop",3))),S.a.createElement($.a,X({},X({},this.props.modalmodel,{visible:this.props.modalmodel.previewVisible,title:"",width:"650px",style:{maxWidth:"100%"}}),{footer:null,onCancel:this.handleCancel2("previewVisible"),ModalText:S.a.createElement("img",{alt:"example",style:{maxWidth:"100%"},src:this.props.modalmodel.previewImage})})))))),S.a.createElement("div",{className:"tabel-wrap"},S.a.createElement("div",{className:"audit-tit"}," 经营品牌 "),S.a.createElement("div",{className:"section-wrap alignment-bottom"},S.a.createElement(s.a,{pagination:!1,columns:this.columns,dataSource:n,bordered:!0,className:"g-mt"}),S.a.createElement($.a,X({},X({},this.props.modalmodel,{visible:this.props.modalmodel.visible,ModalText:"确认删除吗?"}),{onOk:this.ModalhandleOk,confirmLoading:this.props.modalmodel.confirmLoading,onCancel:this.ModalhandleCancel("visible")})))),S.a.createElement("div",{className:"tabel-wrap"},S.a.createElement("div",{className:"audit-tit"},S.a.createElement("span",null," 产品报价")," "),S.a.createElement("div",{className:"section-wrap"},S.a.createElement(s.a,{rowKey:function(e){return e.quotationId},pagination:!1,columns:this.columns1,dataSource:r,bordered:!0,className:"g-mt"}))),S.a.createElement("div",{className:"tabel-wrap"},S.a.createElement("div",{className:"audit-tit"},S.a.createElement("span",null," 审核日志")," "),S.a.createElement("div",{className:"section-wrap"},S.a.createElement(s.a,{rowKey:function(e){return e.id},columns:this.columns2,dataSource:o,bordered:!0,className:"g-mt"}))))},t}(S.a.Component));t.a=Object(J.connect)(function(e){return X({},e)},function(e){return Object(Z.bindActionCreators)(H.e,e)})(z.a.create({mapPropsToFields:function(e){return e.Infos},onFieldsChange:function(e,t){e.baseInfoForm(t)}})(ne))},1505:function(e,t){},1506:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(31),l=(a.n(i),a(32)),s=a.n(l),c=a(0),d=a.n(c),u=(a(187),function(e){function t(){return n(this,t),r(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){return d.a.createElement("div",null,d.a.createElement(s.a,this.props,d.a.createElement("div",{style:{textAlign:"center"}},this.props.ModalText)))},t}(d.a.Component));t.a=u},187:function(e,t,a){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function n(r,o){try{var i=t[r](o),l=i.value}catch(e){return void a(e)}if(!i.done)return Promise.resolve(l).then(function(e){n("next",e)},function(e){n("throw",e)});e(l)}return n("next")})}}a.d(t,"a",function(){return s}),a.d(t,"b",function(){return c}),a.d(t,"c",function(){return d}),a.d(t,"d",function(){return u}),a.d(t,"f",function(){return b});var r=a(10),o=(a(15),a(23)),i=a(26),l=(a.n(i),this),s="BASEINFO",c="MODALMODEL_INFO",d="TABLEMODEL1_INFO",u="TABLEMODEL2_INFO",p=function(e){return{type:s,payload:e}},m=function(e){return{type:c,payload:e}},h=function(e){return{type:d,payload:e}},f=function(e){return{type:u,payload:e}},b=function(e){var t=location.pathname,a={supplierId:e,moduleUrl:t};return o.a.get(r.c+"/qualityControl/viewToQualityControl.do",{params:a})},y=function(e){return function(){var t=n(regeneratorRuntime.mark(function t(a,n){var i,s,c,d;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,i=location.pathname,s={supplierId:e,moduleUrl:i},t.next=5,o.a.get(r.c+"/quotation/queryQuotationListQC.do",{params:s});case 5:if(c=t.sent,!(c.data.code="1")){t.next=11;break}return d=c.data.data.map(function(e,t){return e.index=t+1,e}),t.next=10,a(f({data2:d,count:c.data.data.length}));case 10:return t.abrupt("return",t.sent);case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0);case 16:case"end":return t.stop()}},t,l,[[0,13]])}));return function(e,a){return t.apply(this,arguments)}}()},g=function(e){var t=e.url,a=e.name,n=e.value,r=e.returnName;return function(e,i){return Object(o.a)(t+"?"+a+"="+n).then(function(t){if(200==t.status){var a;e(p((a={},a[r]=t.data.data,a)))}}).catch(function(e){})}},v={baseInfoForm:p,modalmodelaction:m,tablemodelaction:h,tablemodelaction2:f,fetchTable2Info:y,fetchzonesPosts:g};t.e=v}},[1500]);