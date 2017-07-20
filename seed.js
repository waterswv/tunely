var db = require("./models");

var albumList =[];
  albumList.push({
                artistName: 'Nine Inch Nails',
                name: 'The Downward Spiral',
                releaseDate: '1994, March 8',
                genres: [ 'industrial', 'industrial metal' ]
              });
  albumList.push({
                artistName: 'Metallica',
                name: 'Metallica',
                releaseDate: '1991, August 12',
                genres: [ 'heavy metal' ]
              });
  albumList.push({
                artistName: 'The Prodigy',
                name: 'Music for the Jilted Generation',
                releaseDate: '1994, July 4',
                genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
              });
  albumList.push({
                artistName: 'Johnny Cash',
                name: 'Unchained',
                releaseDate: '1996, November 5',
                genres: [ 'country', 'rock' ]
              });
  // data here soon!

db.Album.remove({}, function(err, albums){
  // code in here runs after all albums are removed
  db.Album.create(albumList, function(err, albums){
    // code in here runs after all albums are created
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });
});
