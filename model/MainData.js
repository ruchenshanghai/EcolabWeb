/**
 * Created by wenja on 2017/6/17.
 */
// var Util = require('lib/Util');

function MainData() {
    this.ID = 1;
    this.ReviewerID = 1;
    this.ReviewerName = '';
    this.BUDistrictID = 1;
    this.BUDistrictName = '';
    this.PipelineStatusID = 1;
    this.PipelineStatusDetail = '';
    this.ContractTermID = 1;
    this.ContractTermDetail = '';
    this.TargetRateID = 1;
    this.TargetRateDetail = '';

    // 选填
    this.AssistCAMNameID = 0;
    this.AssistCAMNameDetail = '';

    this.FollowingStatusID = 1;
    this.FollowingStatusDetail = '';
    this.CTCBUID = 1;
    this.CTCBUName = '';
    this.SalesTypeID = 1;
    this.SalesTypeName = '';
    this.CompetitorCNID = 1;
    this.CompetitorCNName = '';
    this.MarketClassificationID = 1;
    this.MarketClassificationName = '';

    this.OpportunityCode = '';
    this.Province = '';
    this.City = '';
    this.Site = '';
    this.ChineseName = '';
    this.EnglishName = '';
    this.AnnualSales = '';
    this.CorporateAccountChinese = '';
    this.CorporateAccountEnglish = '';
    this.SalesRep = '';
    this.CTCSales = '';
    this.FollowingStatusRemark = '';
    this.FirstCollaborationDate = '';
    this.EstimatedPCO = '';
    this.Remark = '';

};



module.exports = MainData;