/**
 * Created by wenjin on 2017/6/20.
 */

$(document).ready(function () {
    $('#download-button').click(function () {
        $.ajax({
            type: 'POST',
            url: '/download',
            // data: JSON.stringify(newMessage),
            // contentType: 'application/json',
            // dataType : 'json',
            timeout: 10000,
            success: function(result){
                console.log(result);
            },
            error: function(xhr, type, errerThrown){
                console.log(errerThrown);
            }
        });
    });
});