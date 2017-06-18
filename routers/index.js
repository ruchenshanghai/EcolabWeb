var path = require('path');
var express = require('express');
var router = express.Router();


router.get('/AllData', function (req, res) {
    // res.send('hello, request for all data from db');
    res.render('AllData', {
        names: [
            {name: '金刚葫芦娃hello'},
            {name: '金刚葫芦娃world'}
            ]
    });
});
router.get('/data/:id', function (req, res) {
    res.send('hello, request for data id: ' + req.params.id);
});


module.exports = router;