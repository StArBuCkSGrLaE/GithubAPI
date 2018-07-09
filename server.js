var express = require('express');
var cors = require('cors');
var app = express();

// to handle Access-Control-Allow-Origin
app.use(cors({origin: 'null'}));

require('./routes/routes.js')(app);

app.listen(3000, function () {
  console.log('server up')
});
