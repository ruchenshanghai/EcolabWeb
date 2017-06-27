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
    // $.post('/data/' + mainDataID).then(mainData => {
    //     if (mainData === '') {
    //         window.location.href = 'http://localhost:2017/index';
    //     }
    //     mainData.ReviewerArray.forEach(function (reviewer) {
    //         $('#ReviewerInput').append(`<option value="` + reviewer.ID + `">` + reviewer.Name + `</option>`);
    //     });
    //     $('#ReviewerInput').val(mainData.ReviewerID);
    //     mainData.BUDistrictArray.forEach(function (BUDistrict) {
    //         $('#BUDistrictInput').append(`<option value="` + BUDistrict.ID + `">` + BUDistrict.Name + `</option>`);
    //     });
    //     $('#BUDistrictInput').val(mainData.BUDistrictID);
    //     mainData.PipelineStatusArray.forEach(function (PipelineStatus) {
    //         $('#PipelineStatusInput').append(`<option value="` + PipelineStatus.ID + `">` + PipelineStatus.Detail + `</option>`);
    //     });
    //     $('#PipelineStatusInput').val(mainData.PipelineStatusID);
    //     mainData.ContractTermArray.forEach(function (ContractTerm) {
    //         $('#ContractTermInput').append(`<option value="` + ContractTerm.ID + `">` + ContractTerm.Detail + `</option>`);
    //     });
    //     $('#ContractTermInput').val(mainData.ContractTermID);
    //     mainData.TargetRateArray.forEach(function (TargetRate) {
    //         $('#TargetRateInput').append(`<option value="` + TargetRate.ID + `">` + TargetRate.Detail + `</option>`);
    //     });
    //     $('#TargetRateInput').val(mainData.TargetRateID);
    //     mainData.AssistCAMNameArray.forEach(function (AssistCAMName) {
    //         $('#AssistCAMNameInput').append(`<option value="` + AssistCAMName.ID + `">` + AssistCAMName.Detail + `</option>`);
    //     });
    //     $('#AssistCAMNameInput').val(mainData.AssistCAMNameID);
    //     mainData.FollowingStatusArray.forEach(function (FollowingStatus) {
    //         $('#FollowingStatusInput').append(`<option value="` + FollowingStatus.ID + `">` + FollowingStatus.Detail + `</option>`);
    //     });
    //     $('#FollowingStatusInput').val(mainData.FollowingStatusID);
    //     mainData.CTCBUArray.forEach(function (CTCBU) {
    //         $('#CTCBUInput').append(`<option value="` + CTCBU.ID + `">` + CTCBU.Name + `</option>`);
    //     });
    //     $('#CTCBUInput').val(mainData.CTCBUID);
    //     mainData.SalesTypeArray.forEach(function (SalesType) {
    //         $('#SalesTypeInput').append(`<option value="` + SalesType.ID + `">` + SalesType.Name + `</option>`);
    //     });
    //     $('#SalesTypeInput').val(mainData.SalesTypeID);
    //     mainData.CompetitorCNArray.forEach(function (CompetitorCN) {
    //         $('#CompetitorCNOptions').append(`<option value="` + CompetitorCN.ID + `">` + CompetitorCN.Name + `</option>`);
    //     });
    //     $('#CompetitorCNInput').val(mainData.CompetitorCN);
    //     mainData.MarketClassificationArray.forEach(function (MarketClassification) {
    //         $('#MarketClassificationInput').append(`<option value="` + MarketClassification.ID + `">` + MarketClassification.Name + `</option>`);
    //     });
    //     $('#MarketClassificationInput').val(mainData.MarketClassificationID);
    //
    //     $('#OpportunityCodeOutput').append(mainData.OpportunityCode);
    //
    //     $('#ProvinceInput').val(mainData.Province);
    //     $('#CityInput').val(mainData.City);
    //     $('#SiteInput').val(mainData.Site);
    //     $('#ChineseNameInput').val(mainData.ChineseName);
    //     $('#EnglishNameInput').val(mainData.EnglishName);
    //     $('#AnnualSalesInput').val(mainData.AnnualSales);
    //     $('#CorporateAccountChineseInput').val(mainData.CorporateAccountChinese);
    //     $('#CorporateAccountEnglishInput').val(mainData.CorporateAccountEnglish);
    //     $('#SalesRepInput').val(mainData.SalesRep);
    //     $('#CTCSalesInput').val(mainData.CTCSales);
    //     $('#FollowingStatusRemarkInput').val(mainData.FollowingStatusRemark);
    //     if (mainData.FirstCollaborationDate !== null) {
    //         $('#FirstCollaborationDateInput').val(mainData.FirstCollaborationDate.substring(0, 10));
    //     }
    //     $('#EstimatedPCOInput').val(mainData.EstimatedPCO);
    //     $('#RemarkInput').val(mainData.Remark);
    //
    //
    //
    //     $('#CompetitorCNOptions').bind("change", function(){
    //         let CompetitorCNID = Number($('#CompetitorCNOptions').val());
    //         if (CompetitorCNID > 0) {
    //             mainData.CompetitorCNArray.forEach(Competitor => {
    //                 if (Competitor.ID === CompetitorCNID) {
    //                     $('#CompetitorCNInput').val(Competitor.Name);
    //                 }
    //             })
    //         }
    //     });
    //
    //     // observe EstimatedPCO <=100%
    //     $('#EstimatedPCOInput').on("input propertychange", function () {
    //         if( $('#EstimatedPCOInput').val().slice(0, 3) === 100) {
    //             $('#EstimatedPCOInput').val( $('#EstimatedPCOInput').val().slice(0, 3));
    //         } else {
    //             $('#EstimatedPCOInput').val( $('#EstimatedPCOInput').val().slice(0, 2));
    //         }
    //     });
    //
    //
    //     $('#update-button').click(function () {
    //         let updateMessage = {};
    //
    //         updateMessage.ReviewerID = Number($('#ReviewerInput').val());
    //         updateMessage.BUDistrictID = Number($('#BUDistrictInput').val());
    //         updateMessage.Province = $('#ProvinceInput').val();
    //         updateMessage.City = $('#CityInput').val();
    //         updateMessage.Site = $('#SiteInput').val();
    //         updateMessage.ChineseName = $('#ChineseNameInput').val();
    //         updateMessage.EnglishName = $('#EnglishNameInput').val();
    //         updateMessage.PipelineStatusID = Number($('#PipelineStatusInput').val());
    //         updateMessage.ContractTermID = Number($('#ContractTermInput').val());
    //         updateMessage.TargetRateID = Number($('#TargetRateInput').val());
    //         updateMessage.AnnualSales = Number($('#AnnualSalesInput').val());
    //         updateMessage.CorporateAccountChinese = $('#CorporateAccountChineseInput').val();
    //         updateMessage.CorporateAccountEnglish = $('#CorporateAccountEnglishInput').val();
    //         updateMessage.SalesRep = $('#SalesRepInput').val();
    //         updateMessage.AssistCAMNameID = Number($('#AssistCAMNameInput').val());
    //         updateMessage.FollowingStatusID = Number($('#FollowingStatusInput').val());
    //         updateMessage.CTCBUID = Number($('#CTCBUInput').val());
    //         updateMessage.CTCSales = $('#CTCSalesInput').val();
    //         updateMessage.SalesTypeID = Number($('#SalesTypeInput').val());
    //         updateMessage.FollowingStatusRemark = $('#FollowingStatusRemarkInput').val();
    //         updateMessage.CompetitorCN = $('#CompetitorCNInput').val();
    //         updateMessage.FirstCollaborationDate = $('#FirstCollaborationDateInput').val();
    //         updateMessage.EstimatedPCO = Number($('#EstimatedPCOInput').val());
    //         updateMessage.Remark = $('#RemarkInput').val();
    //         updateMessage.MarketClassificationID = Number($('#MarketClassificationInput').val());
    //
    //         // not change
    //         updateMessage.ID = Number(mainData.ID);
    //         updateMessage.OpportunityCode = mainData.OpportunityCode;
    //         updateMessage.Username = mainData.Username;
    //
    //         if (updateMessage.Province === '') {
    //             alert('Please input Province');
    //             return;
    //         }
    //         if (updateMessage.City === '') {
    //             alert('Please input City');
    //             return;
    //         }
    //         if (updateMessage.Site === '') {
    //             alert('Please input Site');
    //             return;
    //         }
    //         if (updateMessage.ChineseName === '') {
    //             alert('Please input CineseName');
    //             return;
    //         }
    //         if (updateMessage.EnglishName === '') {
    //             alert('Please input EnglishName');
    //             return;
    //         }
    //         if (updateMessage.AnnualSales === '') {
    //             alert('Please input AnnualSales');
    //             return;
    //         }
    //         if (updateMessage.SalesRep === '') {
    //             alert('Please input SalesRep');
    //             return;
    //         }
    //         if (updateMessage.CompetitorCN === '') {
    //             alert('Please input CompetitorCN');
    //             return;
    //         }
    //         if (updateMessage.EstimatedPCO === 0) {
    //             alert('Please input EstimatedPCO');
    //             return;
    //         }
    //
    //         if (updateMessage.FirstCollaborationDate === '') {
    //             updateMessage.FirstCollaborationDate = null;
    //         }
    //         console.log(JSON.stringify(updateMessage));
    //         $.post('/update?mainData=' + JSON.stringify(updateMessage)).then(data => {
    //             if (data === 'success') {
    //                 window.location.href = 'http://localhost:2017/index';
    //             }
    //         });
    //     });
    //
    //     $('#delete-button').click(function () {
    //         let deleteMessage = {};
    //         deleteMessage.Username = mainData.Username;
    //         deleteMessage.ID = mainData.ID;
    //         $.post('/delete?mainData=' + JSON.stringify(deleteMessage)).then(status => {
    //             if (status === 'success') {
    //                 console.log(status);
    //                 window.location.href = 'http://localhost:2017/index';
    //             }
    //         });
    //     });
    // });
    $('#new-button').click(function () {
        window.location.href = 'http://localhost:2017/create';
    });
    $('#back-button').click(function () {
        window.location.href = 'http://localhost:2017/index';
    });
});