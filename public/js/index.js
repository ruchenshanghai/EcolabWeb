/**
 * Created by wenjin on 2017/6/20.
 */

$(document).ready(function () {

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