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
    this.AssistCAMNameID = 1;
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
    this.AnnualSales = 0;
    this.CorporateAccountChinese = '';
    this.CorporateAccountEnglish = '';
    this.SalesRep = '';
    this.CTCSales = '';
    this.FollowingStatusRemark = '';
    this.FirstCollaborationDate = '';
    this.EstimatedPCO = '';
    this.Remark = '';

};

MainData.prototype.copyFromObject = function (object) {
    if (object.ID != undefined) {
        this.ID = object.ID;
    };
    if (object.ReviewerID != undefined) {
        this.ReviewerID = object.ReviewerID;
    };
    if (object.BUDistrictID != undefined) {
        this.BUDistrictID = object.BUDistrictID;
    };
    if (object.PipelineStatusID != undefined) {
        this.PipelineStatusID = object.PipelineStatusID;
    };
    if (object.ContractTermID != undefined) {
        this.ContractTermID = object.ContractTermID;
    };
    if (object.TargetRateID != undefined) {
        this.TargetRateID = object.TargetRateID;
    };
    if (object.AssistCAMNameID != undefined) {
        this.AssistCAMNameID = object.AssistCAMNameID;
    };
    if (object.FollowingStatusID != undefined) {
        this.FollowingStatusID = object.FollowingStatusID;
    };
    if (object.CTCBUID != undefined) {
        this.CTCBUID = object.CTCBUID;
    };
    if (object.SalesTypeID != undefined) {
        this.SalesTypeID = object.SalesTypeID;
    };
    if (object.CompetitorCNID != undefined) {
        this.CompetitorCNID = object.CompetitorCNID;
    };
    if (object.MarketClassificationID != undefined) {
        this.MarketClassificationID = object.MarketClassificationID;
    };
    if (object.OpportunityCode != undefined) {
        this.OpportunityCode = object.OpportunityCode;
    };
    if (object.Province != undefined) {
        this.Province = object.Province;
    };
    if (object.City != undefined) {
        this.City = object.City;
    };
    if (object.Site != undefined) {
        this.Site = object.Site;
    };
    if (object.ChineseName != undefined) {
        this.ChineseName = object.ChineseName;
    };
    if (object.EnglishName != undefined) {
        this.EnglishName = object.EnglishName;
    };
    if (object.AnnualSales != undefined) {
        this.AnnualSales = object.AnnualSales;
    };
    if (object.CorporateAccountChinese != undefined) {
        this.CorporateAccountChinese = object.CorporateAccountChinese;
    };
    if (object.CorporateAccountEnglish != undefined) {
        this.CorporateAccountEnglish = object.CorporateAccountEnglish;
    };
    if (object.SalesRep != undefined) {
        this.SalesRep = object.SalesRep;
    };
    if (object.CTCSales != undefined) {
        this.CTCSales = object.CTCSales;
    };
    if (object.FollowingStatusRemark != undefined) {
        this.FollowingStatusRemark = object.FollowingStatusRemark;
    };
    if (object.FirstCollaborationDate != undefined) {
        this.FirstCollaborationDate = object.FirstCollaborationDate;
    };
    if (object.EstimatedPCO != undefined) {
        this.EstimatedPCO = object.EstimatedPCO;
    };
    if (object.Remark != undefined) {
        this.Remark = object.Remark;
    };
};

MainData.prototype.constructTest = function () {
    this.ID = 1;
    this.ReviewerID = 1;
    this.BUDistrictID = 1;
    this.PipelineStatusID = 1;
    this.ContractTermID = 1;
    this.TargetRateID = 1;

    // 选填
    this.AssistCAMNameID = 1;

    this.FollowingStatusID = 1;
    this.CTCBUID = 1;
    this.SalesTypeID = 1;
    this.CompetitorCNID = 1;
    this.MarketClassificationID = 1;

    this.OpportunityCode = '007';
    this.Province = '香港';
    this.City = '007';
    this.Site = '007';
    this.ChineseName = '007';
    this.EnglishName = '007';
    this.AnnualSales = '007';
    this.CorporateAccountChinese = '007';
    this.CorporateAccountEnglish = '007';
    this.SalesRep = '007';
    this.CTCSales = '007';
    this.FollowingStatusRemark = '007';
    this.FirstCollaborationDate = '1997-01-17';
    this.EstimatedPCO = '007';
    this.Remark = '007';
};

module.exports = MainData;