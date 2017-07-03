/**
 * Created by wenja on 2017/6/26.
 */
$(document).ready(function () {

    $('#CompetitorCNOptions').bind("click", function () {
        if ($('#CompetitorCNOptions').val() !== '0') {
            $('#CompetitorCNInput').val($('#CompetitorCNOptions').val());
        } else {
            $('#CompetitorCNInput').val('');
        }
    });

    // observe EstimatedPCO <=100%, two numbers
    $('#EstimatedPCOInput').on("input propertychange", function () {
        if ($('#EstimatedPCOInput').val().slice(0, 3) === 100) {
            $('#EstimatedPCOInput').val($('#EstimatedPCOInput').val().slice(0, 3));
        } else {
            $('#EstimatedPCOInput').val($('#EstimatedPCOInput').val().slice(0, 2));
        }
    });

    $('#new-button').click(function () {
        let newMessage = {};

        newMessage.Reviewer = $('#ReviewerInput').val();
        newMessage.BUDistrict = $('#BUDistrictInput').val();
        newMessage.Province = $('#ProvinceInput').val();
        newMessage.City = $('#CityInput').val();
        newMessage.Site = $('#SiteInput').val();
        newMessage.ChineseName = $('#ChineseNameInput').val();
        newMessage.EnglishName = $('#EnglishNameInput').val();
        newMessage.PipelineStatus = $('#PipelineStatusInput').val();
        newMessage.ContractTerm = $('#ContractTermInput').val();
        newMessage.TargetRate = $('#TargetRateInput').val();
        newMessage.AnnualSales = Number($('#AnnualSalesInput').val());
        newMessage.CorporateAccountChinese = $('#CorporateAccountChineseInput').val();
        newMessage.CorporateAccountEnglish = $('#CorporateAccountEnglishInput').val();
        newMessage.SalesRep = $('#SalesRepInput').val();
        newMessage.AssistCAMName = $('#AssistCAMNameInput').val();
        newMessage.FollowingStatus = $('#FollowingStatusInput').val();
        newMessage.CTCBU = $('#CTCBUInput').val();
        newMessage.CTCSales = $('#CTCSalesInput').val();
        newMessage.SalesType = $('#SalesTypeInput').val();
        newMessage.FollowingStatusRemark = $('#FollowingStatusRemarkInput').val();
        newMessage.CompetitorCN = $('#CompetitorCNInput').val();
        newMessage.FirstCollaborationDate = $('#FirstCollaborationDateInput').val();
        newMessage.EstimatedPCO = Number($('#EstimatedPCOInput').val());
        newMessage.Remark = $('#RemarkInput').val();
        newMessage.MarketClassification = $('#MarketClassificationInput').val();


        if (newMessage.Province === '') {
            alert('Please input Province');
            return;
        }
        if (newMessage.City === '') {
            alert('Please input City');
            return;
        }
        if (newMessage.Site === '') {
            alert('Please input Site');
            return;
        }
        if (newMessage.ChineseName === '') {
            alert('Please input CineseName');
            return;
        }
        if (newMessage.EnglishName === '') {
            alert('Please input EnglishName');
            return;
        }
        if (newMessage.AnnualSales === 0) {
            alert('Please input AnnualSales');
            return;
        }
        if (newMessage.SalesRep === '') {
            alert('Please input SalesRep');
            return;
        }
        if (newMessage.CompetitorCN === '') {
            alert('Please input CompetitorCN');
            return;
        }
        if (newMessage.EstimatedPCO === 0) {
            alert('Please input EstimatedPCO');
            return;
        }

        if (newMessage.FirstCollaborationDate === '') {
            newMessage.FirstCollaborationDate = null;
        }
        console.log(JSON.stringify(newMessage));
        $.ajax({
            type: 'POST',
            url: '/create',
            data: JSON.stringify(newMessage),
            contentType: 'application/json',
            dataType : 'json',
            timeout: 10000,
            success: function(result){
                console.log(result.ID);
                    if (!isNaN(result.ID)) {
                        // console.log(status);
                        window.location.href = 'http://localhost:2017/detail/' + result.ID;
                    }
            },
            error: function(xhr, type, errerThrown){
                console.log(errerThrown);
            }
        });
    });

    $('#back-button').click(function () {
        window.location.href = 'http://localhost:2017/index';
    });

});