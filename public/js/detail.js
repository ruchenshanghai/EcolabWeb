/**
 * Created by wenjin on 2017/6/21.
 */
$(document).ready(function () {
    // get MainData ID
    let url = window.location.href;
    let paramArray = url.split('/');
    let length = paramArray.length;
    let mainDataID = Number(paramArray[length - 1]);
    // console.log(mainDataID);

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

    $('#delete-button').click(function () {
        $.post('/delete?ID=' + mainDataID).then(status => {
            if (status === 'success') {
                console.log(status);
                window.location.href = 'http://localhost:2017/index';
            }
        });
    });

    $('#update-button').click(function () {
        let updateMessage = {};

        updateMessage.Reviewer = $('#ReviewerInput').val();
        updateMessage.BUDistrict = $('#BUDistrictInput').val();
        updateMessage.Province = $('#ProvinceInput').val();
        updateMessage.City = $('#CityInput').val();
        updateMessage.Site = $('#SiteInput').val();
        updateMessage.ChineseName = $('#ChineseNameInput').val();
        updateMessage.EnglishName = $('#EnglishNameInput').val();
        updateMessage.PipelineStatus = $('#PipelineStatusInput').val();
        updateMessage.ContractTerm = $('#ContractTermInput').val();
        updateMessage.TargetRate = $('#TargetRateInput').val();
        updateMessage.AnnualSales = Number($('#AnnualSalesInput').val());
        updateMessage.CorporateAccountChinese = $('#CorporateAccountChineseInput').val();
        updateMessage.CorporateAccountEnglish = $('#CorporateAccountEnglishInput').val();
        updateMessage.SalesRep = $('#SalesRepInput').val();
        updateMessage.AssistCAMName = $('#AssistCAMNameInput').val();
        updateMessage.FollowingStatus = $('#FollowingStatusInput').val();
        updateMessage.CTCBU = $('#CTCBUInput').val();
        updateMessage.CTCSales = $('#CTCSalesInput').val();
        updateMessage.SalesType = $('#SalesTypeInput').val();
        updateMessage.FollowingStatusRemark = $('#FollowingStatusRemarkInput').val();
        updateMessage.CompetitorCN = $('#CompetitorCNInput').val();
        updateMessage.FirstCollaborationDate = $('#FirstCollaborationDateInput').val();
        updateMessage.EstimatedPCO = Number($('#EstimatedPCOInput').val());
        updateMessage.Remark = $('#RemarkInput').val();
        updateMessage.MarketClassification = $('#MarketClassificationInput').val();

        // not change
        updateMessage.ID = mainDataID;

        if (updateMessage.Province === '') {
            alert('Please input Province');
            return;
        }
        if (updateMessage.City === '') {
            alert('Please input City');
            return;
        }
        if (updateMessage.Site === '') {
            alert('Please input Site');
            return;
        }
        if (updateMessage.ChineseName === '') {
            alert('Please input CineseName');
            return;
        }
        if (updateMessage.EnglishName === '') {
            alert('Please input EnglishName');
            return;
        }
        if (updateMessage.AnnualSales === '') {
            alert('Please input AnnualSales');
            return;
        }
        if (updateMessage.SalesRep === '') {
            alert('Please input SalesRep');
            return;
        }
        if (updateMessage.CompetitorCN === '') {
            alert('Please input CompetitorCN');
            return;
        }
        if (updateMessage.EstimatedPCO === 0) {
            alert('Please input EstimatedPCO');
            return;
        }

        if (updateMessage.FirstCollaborationDate === '') {
            updateMessage.FirstCollaborationDate = null;
        }

        console.log(JSON.stringify(updateMessage));
        $.ajax({
            type: 'POST',
            url: '/update',
            data: JSON.stringify(updateMessage),
            contentType: 'application/json',
            dataType : 'json',
            timeout: 10000,
            success: function(result){
                console.log(result.status);
                if (result.status === 'success') {
                    window.location.href = 'http://localhost:2017/index';
                }
            },
            error: function(xhr, type, errerThrown){
                console.log(errerThrown);
            }
        });
    });


    $('#new-button').click(function () {
        window.location.href = 'http://localhost:2017/create';
    });

    $('#back-button').click(function () {
        window.location.href = 'http://localhost:2017/index';
    });
});