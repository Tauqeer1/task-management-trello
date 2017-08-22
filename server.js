const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let log = require('./server/helper/dev-logger');
const router = express.Router();
let app = express();
let port = process.env.PORT || 3000;
let mongoUri = process.env.MONGO_URI || 'mongodb://localhost/trello-clone';

console.log('mongoUri', mongoUri);

mongoose.connect(mongoUri).then((db) => {
  console.log('db', db);
}).catch(function(err){
  console.log('Unabled to connect to mongodb err:', err);
  console.log('Check if MongoDB Server is running and available.');
});

app.use(cors());

let server = require('http').createServer(app);
let socketService = require('./server/services/socket')(server, true);

app.use(express.static(__dirname + '/dist')); // set the static files location for the static html
// app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
// You can set morgan to log differently depending on your environment
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', {
    skip: function (req, res) {
      return res.statusCode < 400
    }, stream: __dirname + '/../morgan.log'
  }));
} else {
  app.use(morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    }
  }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

router.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/dist/index.html');
});

router.get('/b/:id', (req, res, next) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use('/', router);
require('./server/api/routes/card.routes')(app);
require('./server/api/routes/column.routes')(app);
require('./server/api/routes/board.routes')(app);

server.listen(port, () => {
  console.log('App running on port ', port);
});
