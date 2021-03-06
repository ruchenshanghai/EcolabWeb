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

    // observe EstimatedPCO <=100%, two numbers
    $('#EstimatedPCOInput').on("input propertychange", function () {
        if ($('#EstimatedPCOInput').val().slice(0, 3) === '100') {
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

    $('#delete-button').click(function () {
        $.post('/delete/' + mainDataID).then(status => {
            if (status === 'success') {
                console.log(status);
                window.location.href = 'http://cnshafinaap01p:2017/index';
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
        updateMessage.FollowingStatusRemark = $('#FollowingStatusRemarkInput').val();
        updateMessage.FirstCollaborationDate = $('#FirstCollaborationDateInput').val();
        updateMessage.EstimatedPCO = Number($('#EstimatedPCOInput').val());
        updateMessage.Remark = $('#RemarkInput').val();
        updateMessage.ModifyRemark = $('#ModifyRemarkInput').val();
        // not change
        updateMessage.ID = mainDataID;
        if ($('#RecordOwnerInput').length > 0 && $('#RecordOwnerInput').val() !== '') {
            updateMessage.RecordOwner = $('#RecordOwnerInput').val();
        } else {
            updateMessage.RecordOwner = null;
        }


        if (updateMessage.Province === '') {
            $('#province-container').addClass('error-container');
            alert('Please input Province');
            return;
        } else {
            $('#province-container').removeClass('error-container');
        }
        if (updateMessage.City === '') {
            $('#city-container').addClass('error-container');
            alert('Please input City');
            return;
        } else {
            $('#city-container').removeClass('error-container');
        }
        if (updateMessage.Site === '') {
            $('#site-container').addClass('error-container');
            alert('Please input Site');
            return;
        } else {
            $('#site-container').removeClass('error-container');
        }

        if (updateMessage.ChineseName === '') {
            $('#ChineseName-container').addClass('error-container');
            alert('Please input ChineseName');
            return;
        } else {
            $('#ChineseName-container').removeClass('error-container');
        }
        if (updateMessage.EnglishName === '') {
            $('#EnglishName-container').addClass('error-container');
            alert('Please input EnglishName');
            return;
        } else {
            $('#EnglishName-container').removeClass('error-container');
        }
        if (updateMessage.AnnualSales === 0) {
            $('#AnnualSales-container').addClass('error-container');
            alert('Please input AnnualSales');
            return;
        } else {
            $('#AnnualSales-container').removeClass('error-container');
        }
        if (updateMessage.SalesRep === '') {
            $('#SalesRep-container').addClass('error-container');
            alert('Please input SalesRep');
            return;
        } else {
            $('#SalesRep-container').removeClass('error-container');
        }
        if (updateMessage.EstimatedPCO === 0) {
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
            updateMessage.SalesType = JSON.stringify(salesTypeArray);
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
            updateMessage.CompetitorCN = JSON.stringify(competitorCNArray);
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
            updateMessage.MarketClassification = marketClassificationArray[0];
        }

        if (updateMessage.FirstCollaborationDate === '') {
            updateMessage.FirstCollaborationDate = null;
        }
        if ($('#ServiceTimeRequestedInputStart').val() !== '' || $('#ServiceTimeRequestedInputEnd').val() !== '') {
            if ($('#ServiceTimeRequestedInputStart').val() === '' || $('#ServiceTimeRequestedInputEnd').val() === '') {
                $('#ServiceTimeRequested-container').addClass('error-container');
                alert('Please input two correct time.');
                return;
            } else {
                $('#ServiceTimeRequested-container').removeClass('error-container');
            }
        }
        updateMessage.ServiceTimeRequested = $('#ServiceTimeRequestedInputStart').val();
        updateMessage.ServiceTimeRequested += '-';
        updateMessage.ServiceTimeRequested += $('#ServiceTimeRequestedInputEnd').val();

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
                    window.location.href = 'http://cnshafinaap01p:2017/index';
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

    $('#new-button').click(function () {
        window.location.href = 'http://cnshafinaap01p:2017/create';
    });
});