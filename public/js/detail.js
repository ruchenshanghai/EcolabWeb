/**
 * Created by wenjin on 2017/6/21.
 */
$(document).ready(function () {
    // get MainData ID
    let url = window.location.href;
    let paramArray = url.split('/');
    let length = paramArray.length;
    let mainDataID = paramArray[length - 1];
    console.log(mainDataID);

    $.post('/data/' + mainDataID).then(mainData => {
        console.log(mainData);
    });
});