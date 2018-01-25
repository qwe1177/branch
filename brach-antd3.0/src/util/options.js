
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
                { label: '企业地址', value: 'address' },
                { label: '手机', value: 'mobile' }
            ]
        case '来源':
            return [
                { label: '全部', value: '' },
                { label: '自行开发', value: '自行开发' },
                { label: '来电咨询', value: '来电咨询' },
                { label: '网络推广', value: '网络推广' },
                { label: 'CSC86', value: 'CSC86' },
                { label: 'buy5j', value: 'buy5j' },
                { label: '网络爬取', value: '网络爬取' },
                { label: '行业展会', value: '行业展会' }
            ]
        case '客户级别':
            return [
                { label: '全部', value: '' },
                { label: '一星', value: '一星' },
                { label: '二星', value: '二星' },
                { label: '三星', value: '三星' },
                { label: '四星', value: '四星' },
                { label: '五星', value: '五星' },
            ]
        case '企业性质':
            return [
                { label: '全部', value: '' },
                { label: '厂家', value: '厂家' },
                { label: '一级代理商', value: '一级代理商' },
                { label: '经销商', value: '经销商' },
                { label: '集采', value: '集采' },
                { label: '其它', value: '其它' },
                
            ]
        case '客户区域':
            return [
                { label: '全部', value: '' },
                { label: '城内商户', value: '1' },
                { label: '城外商户', value: '2' }
            ]
        case '时间':
            return [
                { label: '创建时间', value: 'createTime' },
                { label: '负责时间', value: 'responsibleTime' }
            ]
        case '合作关系':
            return [
                { label: '全部', value: '' },
                { label: '战略合作', value: '战略合作' },
                { label: '友好合作', value: '友好合作' },
                { label: '普通合作', value: '普通合作' },
                { label: '终止合作', value: '终止合作' },
            ]
        case '主动联络方':
            return [
                { label: '客户', value: '1' },
                { label: '自己', value: '2' }
            ]
        case '联络方式':
            return [
                { label: '电话', value: '1' },
                { label: 'email', value: '2' },
                { label: 'QQ', value: '3' },
                { label: '微信', value: '4' },
                { label: '上门拜访', value: '5' },
                { label: '客户来访', value: '6' },
                { label: '其它', value: '7' }
            ]
        case '经营模式':
            return [
                { label: '贸易型', value: '贸易型' },
                { label: '生产型', value: '生产型' },
                { label: '服务型', value: '服务型' },
                { label: '招商代理', value: '招商代理' },
                { label: '政府机构', value: '政府机构' },
                { label: '其它', value: '其它' }
            ]
        case '员工数量':
            return [
                { label: '1-50人以下', value: '1-50人以下' },
                { label: '51-100人', value: '51-100人' },
                { label: '101-500人', value: '101-500人' },
                { label: '501-1000人', value: '501-1000人' },
                { label: '1000人以上', value: '1000人以上' }
            ]
        case '年营业额':
            return [
                { label: '人民币500万/年以下', value: '人民币500万/年以下' },
                { label: '人民币501万元/年-1000万/年', value: '人民币501万元/年-1000万/年' },
                { label: '人民币1001万元/年-5000万/年', value: '人民币1001万元/年-5000万/年' },
                { label: '5001万/年-1亿元/年', value: '5001万/年-1亿元/年' },
                { label: '人民币1亿元/年以上', value: '人民币1亿元/年以上' }
            ]
        case '品牌类型':
            return [
                { label: '自有品牌', value: '自有品牌' },
                { label: '代理品牌', value: '代理品牌' }
            ]
        case '线索级别':
            return [
                { label: '全部', value: '' },
                { label: '即将签约', value: '即将签约' },
                { label: '意向客户', value: '意向客户' },
                { label: '待培育客户', value: '待培育客户' },
                { label: '暂无兴趣', value: '暂无兴趣' },
                { label: '无效线索', value: '无效线索'},
                { label: '暂无', value: '暂无'}
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
                { label: '其它', value: '7' }
            ]
        case '供应商列表其他查询条件':
            return [
                { label: '有营业执照', value: 'creditNumber' },
                { label: '有跟进记录', value: 'followupRecords' },
                { label: '有询价单', value: 'hasSheet' },
                { label: '有上传产品', value: 'hasUpload' }
            ];
        case '性别':
            return [
                { label: '先生', value: '0' },
                { label: '女士', value: '1' }
            ];
        case '管理体系认证':
            return [
                { label: 'ISO9000', value: 'ISO9000' },
                { label: 'ISO9001', value: 'ISO9001' },
                { label: 'ISO9002', value: 'ISO9002' }
            ]; 
        case '报价单':
            return [
                { label: '规格型号', value: '规格型号' },
                { label: '规格编码', value: '规格编码' },
                { label: '名称', value: '名称' },
                { label: '品牌', value: '品牌' }
            ];  
        case '产品报价':
            return [
                { label: '企业名称', value: '企业名称' },
                { label: '报价单编号', value: '报价单编号' },
                { label: '联系人', value: '联系人' }
            ]; 
        case '是否有批注':
            return [
                { label: '全部', value: 'all' },
                { label: '是', value: 'yes' },
                { label: '否', value: 'no' }
            ]; 
        default:
            return []
    }
}
