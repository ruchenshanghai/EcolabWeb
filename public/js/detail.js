/**
 * Created by wenjin on 2017/6/21.
 */
$(document).ready(function () {
    // get MainData ID
    let url = window.location.href;
    let paramArray = url.split('/');
    let length = paramArray.length;
    let mainDataID = paramArray[length - 1];
    // console.log(mainDataID);

    let username;
    $.post('/username').then(name => {
        username = name;
        $('#username').html(username);
    });
    $.post('/data/' + mainDataID).then(mainData => {
        // console.log(mainData);
        mainData.ReviewerArray.forEach(function (reviewer) {
            $('#ReviewerInput').append(`<option value="` + reviewer.ID + `">` + reviewer.Name + `</option>`);
        });
        $('#ReviewerInput').val(mainData.ReviewerID);
        mainData.BUDistrictArray.forEach(function (BUDistrict) {
            $('#BUDistrictInput').append(`<option value="` + BUDistrict.ID + `">` + BUDistrict.Name + `</option>`);
        });
        $('#BUDistrictInput').val(mainData.BUDistrictID);
        mainData.PipelineStatusArray.forEach(function (PipelineStatus) {
            $('#PipelineStatusInput').append(`<option value="` + PipelineStatus.ID + `">` + PipelineStatus.Detail + `</option>`);
        });
        $('#PipelineStatusInput').val(mainData.PipelineStatusID);
        mainData.ContractTermArray.forEach(function (ContractTerm) {
            $('#ContractTermInput').append(`<option value="` + ContractTerm.ID + `">` + ContractTerm.Detail + `</option>`);
        });
        $('#ContractTermInput').val(mainData.ContractTermID);
        mainData.TargetRateArray.forEach(function (TargetRate) {
            $('#TargetRateInput').append(`<option value="` + TargetRate.ID + `">` + TargetRate.Detail + `</option>`);
        });
        $('#TargetRateInput').val(mainData.TargetRateID);
        mainData.AssistCAMNameArray.forEach(function (AssistCAMName) {
            $('#AssistCAMNameInput').append(`<option value="` + AssistCAMName.ID + `">` + AssistCAMName.Detail + `</option>`);
        });
        $('#AssistCAMNameInput').val(mainData.AssistCAMNameID);
        mainData.FollowingStatusArray.forEach(function (FollowingStatus) {
            $('#FollowingStatusInput').append(`<option value="` + FollowingStatus.ID + `">` + FollowingStatus.Detail + `</option>`);
        });
        $('#FollowingStatusInput').val(mainData.FollowingStatusID);
        mainData.CTCBUArray.forEach(function (CTCBU) {
            $('#CTCBUInput').append(`<option value="` + CTCBU.ID + `">` + CTCBU.Name + `</option>`);
        });
        $('#CTCBUInput').val(mainData.CTCBUID);
        mainData.SalesTypeArray.forEach(function (SalesType) {
            $('#SalesTypeInput').append(`<option value="` + SalesType.ID + `">` + SalesType.Name + `</option>`);
        });
        $('#SalesTypeInput').val(mainData.SalesTypeID);
        mainData.CompetitorCNArray.forEach(function (CompetitorCN) {
            $('#CompetitorCNInput').append(`<option value="` + CompetitorCN.ID + `">` + CompetitorCN.Name + `</option>`);
        });
        $('#CompetitorCNInput').val(mainData.CompetitorCNID);
        mainData.MarketClassificationArray.forEach(function (MarketClassification) {
            $('#MarketClassificationInput').append(`<option value="` + MarketClassification.ID + `">` + MarketClassification.Name + `</option>`);
        });
        $('#MarketClassificationInput').val(mainData.MarketClassificationID);

        $('#ProvinceInput').val(mainData.Province);
        $('#CityInput').val(mainData.City);
        $('#SiteInput').val(mainData.Site);
        $('#ChineseNameInput').val(mainData.ChineseName);
        $('#EnglishNameInput').val(mainData.EnglishName);
        $('#AnnualSalesInput').val(mainData.AnnualSales);
        $('#CorporateAccountChineseInput').val(mainData.CorporateAccountChinese);
        $('#CorporateAccountEnglishInput').val(mainData.CorporateAccountEnglish);
        $('#SalesRepInput').val(mainData.SalesRep);
        $('#CTCSalesInput').val(mainData.CTCSales);
        $('#FollowingStatusRemarkInput').val(mainData.FollowingStatusRemark);
        $('#FirstCollaborationDateInput').val(mainData.FirstCollaborationDate.substring(0, 10));
        $('#EstimatedPCOInput').val(mainData.EstimatedPCO);
        $('#RemarkInput').val(mainData.Remark);


        // observe EstimatedPCO <=100%
        $('#EstimatedPCOInput').on("input propertychange", function () {
            if( $('#EstimatedPCOInput').val().slice(0, 3) === 100) {
                $('#EstimatedPCOInput').val( $('#EstimatedPCOInput').val().slice(0, 3));
            } else {
                $('#EstimatedPCOInput').val( $('#EstimatedPCOInput').val().slice(0, 2));
            }
        });

        $('#update-button').click(function () {
            // alert($('#ProvinceInput').val());
            //  alert($('#CityInput').val());
            //  alert($('#SiteInput').val());
            //  alert($('#ChineseNameInput').val());
            //  alert($('#EnglishNameInput').val());
            // alert($('#AnnualSalesInput').val());
        });
    });
});