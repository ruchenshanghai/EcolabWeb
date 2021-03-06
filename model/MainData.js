/**
 * Created by wenja on 2017/6/17.
 */
// var Util = require('lib/Util');

function MainData() {
    this.ID = null;
    this.Reviewer = null;
    this.BUDistrict = null;
    this.OpportunityCode = null;
    this.Province = null;
    this.City = null;
    this.Site = null;
    this.ChineseName = null;
    this.EnglishName = null;
    this.PipelineStatus = null;
    this.ContractTerm = null;
    this.TargetRate = null;
    this.AnnualSales = null;
    this.CorporateAccountChinese = null;
    this.CorporateAccountEnglish = null;
    this.SalesRep = null;
    this.AssistCAMName = null;
    this.FollowingStatus = null;
    this.CTCBU = null;
    this.CTCSales = null;
    this.SalesType = null;
    this.FollowingStatusRemark = null;
    this.CompetitorCN = null;
    this.FirstCollaborationDate = null;
    this.EstimatedPCO = null;
    this.Remark = null;
    this.MarketClassification = null;
    this.RecordOwner = null;
    this.ServiceTimeRequested = null;
    this.ModifyRemark = null;
    this.CheckedUsers = null;
};

MainData.prototype.constructTest = function () {
    this.Reviewer = 'Norman Li';
    this.BUDistrict = '东南向西北中';
    // this.OpportunityCode = ''; generated by express backend
    this.Province = '上海市';
    this.City = '浦东新区';
    this.Site = '金桥';
    this.ChineseName = '黄鹤';
    this.EnglishName = 'Huanghe';
    this.PipelineStatus = '>90Day';
    this.ContractTerm = '123年';
    this.TargetRate = '不确定';
    this.AnnualSales = 2333;
    this.CorporateAccountChinese = null;
    this.CorporateAccountEnglish = null;
    this.SalesRep = '葫芦娃';
    this.AssistCAMName = null;
    this.FollowingStatus = '123321';
    this.CTCBU = '不适用';
    this.CTCSales = null;
    this.SalesType = '基础四害';
    this.FollowingStatusRemark = null;
    this.CompetitorCN = '竞争者';
    this.FirstCollaborationDate = '2017-07-03';
    this.EstimatedPCO = 17;
    this.Remark = null;
    this.MarketClassification = '市场分类';
    this.RecordOwner = 'GLOBAL/wenja';
    this.ServiceTimeRequested = '12:00-13:00';
    this.ModifyRemark = 'initial';
    this.CheckedUsers = ['initial'];
}

MainData.getChineseName = function (EnglishPropertyName) {
    let resultChineseName = '';
    switch (EnglishPropertyName) {
        case 'ID':
            resultChineseName = '编号';
            break;
        case 'Reviewer':
            resultChineseName = '区域负责人';
            break;
        case 'BUDistrict':
            resultChineseName = 'BU区属';
            break;
        case 'OpportunityCode':
            resultChineseName = '机会客户编码';
            break;
        case 'Province':
            resultChineseName = '行政省';
            break;
        case 'City':
            resultChineseName = '行政市';
            break;
        case 'Site':
            resultChineseName = '行政区';
            break;
        case 'ChineseName':
            resultChineseName = '客户中文名';
            break;
        case 'EnglishName':
            resultChineseName = '客户英文名';
            break;
        case 'PipelineStatus':
            resultChineseName = 'Pipeline进度';
            break;
        case 'ContractTerm':
            resultChineseName = '合同有效期';
            break;
        case 'TargetRate':
            resultChineseName = '成功几率';
            break;
        case 'AnnualSales':
            resultChineseName = '年度金额（元）';
            break;
        case 'CorporateAccountChinese':
            resultChineseName = '集团客户-中文';
            break;
        case 'CorporateAccountEnglish':
            resultChineseName = '集团客户-英文';
            break;
        case 'SalesRep':
            resultChineseName = '销售代表';
            break;
        case 'AssistCAMName':
            resultChineseName = '协助CAM';
            break;
        case 'FollowingStatus':
            resultChineseName = '进展状态';
            break;
        case 'CTCBU':
            resultChineseName = 'CTC业务部';
            break;
        case 'CTCSales':
            resultChineseName = 'CTC销售负责人';
            break;
        case 'SalesType':
            resultChineseName = '销售类型';
            break;
        case 'FollowingStatusRemark':
            resultChineseName = '进展状态-备注';
            break;
        case 'CompetitorCN':
            resultChineseName = '竞争对手-中文';
            break;
        case 'FirstCollaborationDate':
            resultChineseName = '最早合作日期';
            break;
        case 'EstimatedPCO':
            resultChineseName = '艺康可能占客户PCO比例';
            break;
        case 'Remark':
            resultChineseName = '备注';
            break;
        case 'MarketClassification':
            resultChineseName = '市场分类-中文';
            break;
        case 'RecordOwner':
            resultChineseName = '记录执行人电脑登录名';
            break;
        case 'ServiceTimeRequested':
            resultChineseName = '客户要求服务时间';
            break;
        case 'ModifyRemark':
            resultChineseName = '更改备注';
            break;
        case 'CheckedUsers':
            resultChineseName = '已经查阅过更改的用户';
            break;
    }
    return resultChineseName;
}

module.exports = MainData;