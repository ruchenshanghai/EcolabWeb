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

    $('#CompetitorCNOptions').bind("click", function(){
        let CompetitorCNID = Number($('#CompetitorCNOptions').val());
        if (CompetitorCNID > 0) {
            $('#CompetitorCNInput').val($('#CompetitorCN-' + CompetitorCNID).html());

        } else {
            $('#CompetitorCNInput').val('');
        }
    });

    // observe EstimatedPCO <=100%
    $('#EstimatedPCOInput').on("input propertychange", function () {
        if( $('#EstimatedPCOInput').val().slice(0, 3) === 100) {
            $('#EstimatedPCOInput').val( $('#EstimatedPCOInput').val().slice(0, 3));
        } else {
            $('#EstimatedPCOInput').val( $('#EstimatedPCOInput').val().slice(0, 2));
        }
    });

    $('#delete-button').click(function () {
        let deleteMessage = {};
        deleteMessage.ID = mainDataID;
        $.post('/delete?mainData=' + JSON.stringify(deleteMessage)).then(status => {
            if (status === 'success') {
                console.log(status);
                window.location.href = 'http://cnshafinaap01p:2017/index';
            }
        });
    });

    $('#update-button').click(function () {
        let updateMessage = {};

        updateMessage.ReviewerID = Number($('#ReviewerInput').val());
        updateMessage.BUDistrictID = Number($('#BUDistrictInput').val());
        updateMessage.Province = $('#ProvinceInput').val();
        updateMessage.City = $('#CityInput').val();
        updateMessage.Site = $('#SiteInput').val();
        updateMessage.ChineseName = $('#ChineseNameInput').val();
        updateMessage.EnglishName = $('#EnglishNameInput').val();
        updateMessage.PipelineStatusID = Number($('#PipelineStatusInput').val());
        updateMessage.ContractTermID = Number($('#ContractTermInput').val());
        updateMessage.TargetRateID = Number($('#TargetRateInput').val());
        updateMessage.AnnualSales = Number($('#AnnualSalesInput').val());
        updateMessage.CorporateAccountChinese = $('#CorporateAccountChineseInput').val();
        updateMessage.CorporateAccountEnglish = $('#CorporateAccountEnglishInput').val();
        updateMessage.SalesRep = $('#SalesRepInput').val();
        updateMessage.AssistCAMNameID = Number($('#AssistCAMNameInput').val());
        updateMessage.FollowingStatusID = Number($('#FollowingStatusInput').val());
        updateMessage.CTCBUID = Number($('#CTCBUInput').val());
        updateMessage.CTCSales = $('#CTCSalesInput').val();
        updateMessage.SalesTypeID = Number($('#SalesTypeInput').val());
        updateMessage.FollowingStatusRemark = $('#FollowingStatusRemarkInput').val();
        updateMessage.CompetitorCN = $('#CompetitorCNInput').val();
        updateMessage.FirstCollaborationDate = $('#FirstCollaborationDateInput').val();
        updateMessage.EstimatedPCO = Number($('#EstimatedPCOInput').val());
        updateMessage.Remark = $('#RemarkInput').val();
        updateMessage.MarketClassificationID = Number($('#MarketClassificationInput').val());

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
        $.post('/update?mainData=' + JSON.stringify(updateMessage)).then(data => {
            if (data === 'success') {
                window.location.href = 'http://cnshafinaap01p:2017/index';
            }
        });
    });


    $('#new-button').click(function () {
        window.location.href = 'http://cnshafinaap01p:2017/create';
    });

    $('#back-button').click(function () {
        window.location.href = 'http://cnshafinaap01p:2017/index';
    });
});