/**
 * Created by wenjin on 2017/6/20.
 */

$(document).ready(function () {
    //取得计算机名域名用户名
    var mynetinfo = new ActiveXObject("WScript.network");
    alert("计算机名:" + mynetinfo.ComputerName + "域名:" + mynetinfo.UserDomain + "用户名:" + mynetinfo.UserName);

    $.get('/AllData', function (data, status) {
        console.log(status);
        if (status === 'success') {
            data.forEach(singleRecord => {
                $('#content-container').append(`<tr id="data-` + singleRecord.ID + `">
                        <td>Tanmay</td>
                        <td>Bangalore</td>
                        <td>560001</td>
                    </tr>`);
                $('#data-' + singleRecord.ID).click(function () {
                    // console.log('http://localhost:2017/detail/' + singleRecord.ID);
                    window.location.href = 'http://localhost:2017/detail/' + singleRecord.ID;
                });
                // $('#data-' + singleRecord.ID).onclick = (function (id) {
                //     return function () {
                //       alert(id);
                //     };
                // })(singleRecord.ID);
            });
        }
    });
});
