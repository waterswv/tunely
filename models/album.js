// require mongoose and seutp Schema

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var AlbumSchema = new Schema({
       artistName: String,
       name: String,
       releaseDate: String,
       genres:[]
  });
// create Schema

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
