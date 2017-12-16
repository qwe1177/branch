
/**
 * 
 * @param {string} name (筛选项名称)
 * 
 */
export const levelOptions = (name) => {
    switch (name) {
        case '企业名称':
            return [
                { label: '企业名称', value: 'companyName' },
                { label: '手机', value: 'mobile' }
            ]
        case '客户来源':
            return [
                { label: '全部', value: '' },
                { label: '自行开发', value: 'self-developed' },
                { label: '来电咨询', value: 'toInquire' },
                { label: '网络推广', value: 'networkPromotion' },
                { label: 'CSC86', value: 'CSC86' },
                { label: 'buy5j', value: 'buy5j' },
                { label: '网络爬取', value: 'webCrawl' }
            ]
        case '客户级别':
            return [
                { label: '全部', value: '' },
                { label: '一星', value: 'one_Star' },
                { label: '二星', value: 'two_Star' },
                { label: '三星', value: 'three_Star' },
                { label: '四星', value: 'four_Star' },
                { label: '五星', value: 'five_Star' },
            ]
        case '客户类型':
            return [
                { label: '全部', value: '' },
                { label: '一级代理商', value: 'firstLevelAgent' },
                { label: '厂家', value: 'manufacturer' },
                { label: '经销商', value: 'dealers' },
            ]
        case '客户区域':
            return [
                { label: '全部', value: '' },
                { label: '城内商户', value: 'merchantsIn' },
                { label: '城外商户', value: 'merchantsOut' }
            ]
        case '合作关系':
            return [
                { label: '请选择', value: '' },
                { label: '战略合作', value: 'strategicCooperation' },
                { label: '友好合作', value: 'friendlyCooperation' },
                { label: '普通合作', value: 'commonCooperation' },
                { label: '终止合作', value: 'stopCooperation' },
            ]
        case '主动联络方':
            return [
                { label: '请选择', value: '' },
                { label: '客户', value: 'client' },
                { label: '自己', value: 'oneself' }
            ]
        case '联络方式':
            return [
                { label: '请选择', value: '' },
                { label: '电话', value: 'phone' },
                { label: 'email', value: 'email' },
                { label: 'QQ', value: 'QQ' },
                { label: '上门拜访', value: 'homeVisits' },
                { label: '客户来访', value: 'customerVisits' },
                { label: '其它', value: 'other' }
            ]
        case '询价编号':
            return [
                { label: '询价编号', value: 'inquiryNumber' },
                { label: '企业名称', value: 'companyName' },
                { label: '联系信息', value: 'contactInformation' }
            ]
        case '类型1':
            return [
                { label: '全部', value: '' },
                { label: 'KA订单', value: 'KAorders' },
                { label: '普通订单', value: 'regularOrders' },
                { label: '碎片单', value: 'contactInformation' }
            ]
        case '类型2':
            return [
                { label: '全部', value: '' },
                { label: '我负责的', value: 'chargeOf' },
                { label: '我创建的', value: 'createOf' }
            ]
        case '状态':
            return [
                { label: '全部', value: '' },
                { label: '创建报价单', value: 'KAorders' },
                { label: '配单中', value: 'regularOrders' },
                { label: '配单完成', value: 'contactInformation' },
                { label: '发送报价单', value: 'sendQuotation' },
                { label: '配单调整中', value: 'adjusting' },
                { label: '配单调整完成', value: 'adjustComplete' },
                { label: '报价失败', value: 'faile' },
                { label: '报价成功', value: 'bid' },
                { label: '交易完成', value: 'deal' }
            ]
        case '经营模式':
            return [
                { label: '请选择', value: '' },
                { label: '贸易型', value: 'trade' },
                { label: '生产型', value: 'produced' },
                { label: '服务型', value: 'service' },
                { label: '招商代理', value: 'investment' },
                { label: '政府机构', value: 'government' },
                { label: '其它', value: 'adjusting' }
            ]
        case '员工人数':
            return [
                { label: '请选择', value: '' },
                { label: '1-50人以下', value: '1' },
                { label: '51-100人', value: '51' },
                { label: '101-500人', value: '101' },
                { label: '501-1000人', value: '501' },
                { label: '1000人以上', value: '1001' }
            ]
        case '年营业额':
            return [
                { label: '请选择', value: '' },
                { label: '人民币500万/年以下', value: '1' },
                { label: '人民币501万元/年-1000万/年', value: '501' },
                { label: '人民币1001万元/年-5000万/年', value: '1001' },
                { label: '5001万/年-1亿元/年', value: '5001' },
                { label: '人民币1亿元/年以上', value: '10001' }
            ]
        case '品牌类型':
            return [
                { label: '请选择', value: '' },
                { label: '自有品牌', value: 'ownBrand' },
                { label: '代理品牌', value: 'agentBrand' }
            ]
        case '线索级别':
            return [
                { label: '全部', value: '' },
                { label: '品控驳回', value: 'rejected' },
                { label: '品控审查中', value: 'censoring' },
                { label: '即将签约', value: 'willSigning' },
                { label: '意向客户', value: 'interestedBuyers' },
                { label: '待培育客户', value: 'toCultivateCustomers' },
                { label: '暂无兴趣', value: 'noInterest' }
            ]
        case '跟进方式':
            return [
                { label: '全部', value: '' },
                { label: '电话', value: '1' },
                { label: 'email', value: '2' },
                { label: 'QQ', value: '3' },
                { label: '微信', value: '4' },
                { label: '上门拜访', value: '5' },
                { label: '客户来访', value: '6' },
                { label: '其他', value: '7' }
            ]
        default:
            return []
    }
}
