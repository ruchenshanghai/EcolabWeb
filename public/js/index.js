/**
 * Created by wenjin on 2017/6/20.
 */

$(document).ready(function () {
    // //取得计算机名域名用户名
    var username;
    // $.get('/currentUser', username => {
    //     currentUser = username;
    // });
    $.post('/username').then(name => {
        username = name;
        console.log(username);
        $('#username').html(username);
    });

    $.post('/AllData', function (data, status) {
        if (status === 'success') {
            data.forEach(singleRecord => {
                $('#content-container').append(`<tr id="data-` + singleRecord.ID + `">
                        <td>` + singleRecord.ReviewerName + `</td>
                        <td>` + singleRecord.EnglishName + '/' + singleRecord.ChineseName + `</td>
                        <td>` + singleRecord.SalesRep + `</td>
                    </tr>`);
                $('#data-' + singleRecord.ID).click(function () {
                    window.location.href = 'http://localhost:2017/detail/' + singleRecord.ID;
                });
            });

        }
    });
});