// requires express & body-parser to be used in our application
let express = require('express'),
  bodyParser = require('body-parser');

  // connect to models
  let db = require('./models');

// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

  // server static files from public folder
  app.use(express.static('public'));

  // body-parser config to accept our data-types
  app.use(bodyParser.urlencoded({ extended:true }));

// routes

app.get('/', function (req, res) {

  res.sendFile('views/index.html', {root:__dirname});
    console.log(__dirname);
});

app.get('/api', controllers.api.index);
app.get('/api/albums', controllers.albums.index);

app.get('/api/albums', controllers.albums.index);

app.get('/api/albums/:albumId', controllers.albums.show);
app.post('/api/albums', controllers.albums.create);
app.post('/api/albums/:albumId/songs', controllers.albumsSongs.create);
app.delete('/api/albums/:albumId', controllers.albums.destroy);

/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 3000, function (){
  console.log("Express Server is up and running on http://localhost:3000/");
});
