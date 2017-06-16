var express = require('express');
var app = express();

var indexRouter = require('./routers/index');

app.use('/', indexRouter);
// 404 page
app.use(function (req, res) {
  if (!res.headersSent) {
    res.redirect('/AllData');
  }
});


app.listen(2017);