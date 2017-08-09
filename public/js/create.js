/**
 * Created by wenja on 2017/6/26.
 */
$(document).ready(function () {

    // observe EstimatedPCO <=100%, two numbers
    $('#EstimatedPCOInput').on("input propertychange", function () {
        if ($('#EstimatedPCOInput').val().slice(0, 3) === 100) {
            $('#EstimatedPCOInput').val($('#EstimatedPCOInput').val().slice(0, 3));
        } else {
            $('#EstimatedPCOInput').val($('#EstimatedPCOInput').val().slice(0, 2));
        }
    });

    $('#add-CompetitorCN').click(function () {
        $('#CompetitorCNInput-container').append(`                                    <span class="input-group-addon">
						                <input type="checkbox" name="CompetitorCNCheck">
                                        
                                    <input type="text" class="form-control" name="CompetitorCNInput"
                                           value="" placeholder="Please input CompetitorCN here.">
					                </span>`);
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

        newMessage.FollowingStatusRemark = $('#FollowingStatusRemarkInput').val();
        newMessage.CompetitorCN = $('#CompetitorCNInput').val();
        newMessage.FirstCollaborationDate = $('#FirstCollaborationDateInput').val();
        newMessage.EstimatedPCO = Number($('#EstimatedPCOInput').val());
        newMessage.Remark = $('#RemarkInput').val();


        if (newMessage.Province === '') {
            $('#province-container').addClass('error-container');
            alert('Please input Province');
            return;
        } else {
            $('#province-container').removeClass('error-container');
        }
        if (newMessage.City === '') {
            $('#city-container').addClass('error-container');
            alert('Please input City');
            return;
        } else {
            $('#city-container').removeClass('error-container');
        }
        if (newMessage.Site === '') {
            $('#site-container').addClass('error-container');
            alert('Please input Site');
            return;
        } else {
            $('#site-container').removeClass('error-container');
        }

        if (newMessage.ChineseName === '') {
            $('#ChineseName-container').addClass('error-container');
            alert('Please input ChineseName');
            return;
        } else {
            $('#ChineseName-container').removeClass('error-container');
        }
        if (newMessage.EnglishName === '') {
            $('#EnglishName-container').addClass('error-container');
            alert('Please input EnglishName');
            return;
        } else {
            $('#EnglishName-container').removeClass('error-container');
        }
        if (newMessage.AnnualSales === 0) {
            $('#AnnualSales-container').addClass('error-container');
            alert('Please input AnnualSales');
            return;
        } else {
            $('#AnnualSales-container').removeClass('error-container');
        }
        if (newMessage.SalesRep === '') {
            $('#SalesRep-container').addClass('error-container');
            alert('Please input SalesRep');
            return;
        } else {
            $('#SalesRep-container').removeClass('error-container');
        }
        if (newMessage.EstimatedPCO === 0) {
            $('#EstimatedPCO-container').addClass('error-container');
            alert('Please input EstimatedPCO');
            return;
        } else {
            $('#EstimatedPCO-container').removeClass('error-container');
        }

        let salesTypeArray = new Array();
        $('input[name="SalesTypeInput"]:checked').each(function () {
            salesTypeArray.push($(this).val());
        });
        if (salesTypeArray.length === 0) {
            $('#SalesType-container').addClass('error-container');
            alert('Please input SalesType');
            return;
        } else {
            $('#SalesType-container').removeClass('error-container');
            newMessage.SalesType = JSON.stringify(salesTypeArray);
        }
        let competitorCNArray = new Array();
        $('input[name="CompetitorCNCheck"]:checked').each(function () {
            competitorCNArray.push($(this).next().val());
        });
        if (competitorCNArray.length === 0) {
            $('#CompetitorCN-container').addClass('error-container');
            alert('Please input CompetitorCN');
            return;
        } else {
            $('#CompetitorCN-container').removeClass('error-container');
            newMessage.CompetitorCN = JSON.stringify(competitorCNArray);
        }
        let marketClassificationArray = new Array();
        $('input[name="MarketClassificationRadio"]:checked').each(function () {
            marketClassificationArray.push($(this).next().val());
        });
        if (marketClassificationArray.length !== 1) {
            $('#MarketClassification-container').addClass('error-container');
            alert('Please input MarketClassification.');
            return;
        } else {
            $('#MarketClassification-container').removeClass('error-container');
            newMessage.MarketClassification = marketClassificationArray[0];
        }

        if (newMessage.FirstCollaborationDate === '') {
            newMessage.FirstCollaborationDate = null;
        }

        // console.log(JSON.stringify(newMessage));
        $.ajax({
            type: 'POST',
            url: '/insert',
            data: JSON.stringify(newMessage),
            contentType: 'application/json',
            dataType : 'json',
            timeout: 10000,
            success: function(result){
                console.log(result.ID);
                    if (!isNaN(result.ID)) {
                        // console.log(status);
                        window.location.href = 'http://cnshafinaap01p:2017/detail/' + result.ID;
                    }
            },
            error: function(xhr, type, errerThrown){
                console.log(errerThrown);
            }
        });
    });

    $('#back-button').click(function () {
        window.location.href = 'http://cnshafinaap01p:2017/index';
    });

});