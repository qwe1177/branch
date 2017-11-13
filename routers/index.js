const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  res.json({code:'ok',data:[{country:'中国',capital:'北京'},{country:'日本',capital:'东京'}]});
})

router.get('/abc', (req,res) => {
  res.json({code:'ok',data:[{country:'美国',capital:'华盛顿'},{country:'英国',capital:'伦敦'}]});
})


router.get('/leimu', (req,res) => {
  res.json({code:'ok',data:[{name:'类目1',value:'1'},{name:'类目2',value:'2'},{name:'类目3',value:'3'}]});
})

router.get('/citys', (req,res) => {
  res.json({code:'ok',data:[{name:'城市1',value:'1'},{name:'城市2',value:'2'},{name:'城市3',value:'3'}]});
})

router.get('/binding', (req,res) => {
  res.json({code:'ok',error:-1});
})

router.get('/js', (req,res) => {
  res.json({code:'ok',usernameState:-1,data:[
      {
    key: '1',
    name: '华南城网络',
    type: '华南城网络',
    content: '华南城网络',
    Operation: '华南城网络',
    Operation:'查看',
  },
    {
      key: '2',
      name: '华南城网络',
      type: '华南城网络',
      content: '华南城网络',
      Operation: '华南城网络',
      Operation:'查看',
    },
    {
      key: '3',
      name: '华南城网络',
      type: '华南城网络',
      content: '华南城网络',
      Operation: '华南城网络',
      Operation:'查看',
    }
  ]
  });
})

router.get('/bd', (req,res) => {
  const {current,pageSize} = req.query;

  const data = [];
  for (let i = 1; i <=`${pageSize||10}`; i++) {
    data.push({
      key: i+'',
      companyName: `${current||1}深圳市华南城网科技有限公司`,
      source: 'buy5j',
      level: '品控审查中',
      type: '一级代理',
      category: '衣服,拉链',
      brand: '史丹利，劳斯莱斯',
      contacts: '小明,13812345678',
      Follow: '8',
      time: '17/08/22 14:25',
      leader: '小明,12/08/25',
      Operation:i%2==0?'加入我的':'移入公海分配',
    });
  }

  res.json({code:'ok',count: 200,data:data
  });
})

router.get('/buyer/allbuyer/query', (req,res) => {
  var data = [{
    key: 1,
    companyName: '深圳华南城网科技有限公司',
    link:'http://www.baidu.com',
    source: 'buy5j',
    level: '品控审核',
    type: '一级代理',
    industry: '石油化工',
    brand: '大田牌',
    contacts: '马天明 12232942342',
    numbers: '8/24',
    amount:44,
    createDate: '17/07/02 14:25'
  }, {
    key: 2,
    companyName: '五大星星',
    link:'http://www.baidu.com',
    source: 'buy5j',
    level: '待培育',
    type: '品牌解',
    industry: '衣服',
    brand: '珍品',
    contacts: '马天明 12232942342',
    numbers: '2/12',
    amount:12321,
    createDate: '17/07/02 14:25'
  }, {
    key: 3,
    companyName: '五大星星',
    link:'http://www.baidu.com',
    source: 'buy5j',
    level: '待培育',
    type: '品牌解',
    industry: '衣服',
    brand: '珍品',
    contacts: '马天明 12232942342',
    numbers: '2/12',
    amount:12321,
    createDate: '17/07/02 14:25',
    toperson:'贩子'
  }];

  res.json({code:'ok',data:data,total:2});
})

router.get('/clientFollowUp/followUp/query', (req,res) => {
  var data = [{
    key: 1,
    companyName: '深圳华南城网科技有限公司',
    link1:'http://www.baidu.com',
    planContent: '上门拜访,洽谈合同',
    finishData: '2017/08/12',
    timeLeft: '3天20小时',
    option: ['去跟进','移出'],
    link2:'http://www.baidu.com'
  }, {
    key: 2,
    companyName: '深圳华南城网科技有限公司',
    link1:'http://www.baidu.com',
    planContent: '上门拜访,洽谈合同',
    finishData: '2017/08/12',
    timeLeft: '3天20小时',
    option:['去跟进','移出'],
    link2:'http://www.baidu.com'
  }];
  res.json({code:'ok',data:data,total:2});
})

router.get('/chooseperson', (req,res) => {
  var data = [{
    key: 1,
    name: '伊莲娜·列宁娜',
    dept:'雾都',
    email: 'fa3243@163.com'
  }, {
    key: 2,
    name: '左翎',
    dept:'帝都',
    email: 'fa@163.com'
  }, {
    key: 3,
    name: '杨淇',
    dept:'魔都',
    email: 'fa@163.com'
  }];

  res.json({code:'ok',data:data,total:2});
})

/**模拟提交成功 */
router.get('/mockeffectSuccess', (req,res) => {
  res.json({code:'ok',result:true});
})

module.exports = router;