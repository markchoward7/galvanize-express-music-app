var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var testAPIRouter = require("./routes/testAPI");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
    song object structure
    {
        "artistId": artistId,
        "collectionId": albumId,
        "trackId": songId,
        "artistName": artistName,
        "collectionName": albumName,
        "trackName": songName,
        "artistViewUrl": url-to-artist,
        "collectionViewUrl": url-to-album,
        "trackViewUrl": url-to-song,
        "previewUrl": url-to-preview,
        "artworkUrl60": url-to-small-artwork,
        "artworkUrl100": url-to-large-artwork
    }
*/

app.get('/', (req, res) => {
    // return [{artist1.name: url-to-artist}, {artist2.name: url-to-artist}]
})

app.get('/:artistId', (req, res) => {
    // return [{album1.name: url-to-album}, {album2.name: url-to-album}]
})

app.get('/:artistId/:albumId', (req, res) => {
    // return [{song1.name: url-to-song}, {song2.name: url-to-song}]
})

app.get('/:artistId/:albumId/:songId', (req, res) => {
    // return {name: song-name, etc.}
})

app.get('/songs', (req, res) => {
    // query params
        // song=    return {name: song-name, etc.}
        // album=   return [{song1.name: url-to-song}, {song2.name: url-to-song}] 
        // artist=  return [{song1.name: url-to-song}, {song2.name: url-to-song}] 
    // return [{song1.name: url-to-song}, {song2.name: url-to-song}]
})

app.post('/songs', (req, res) => {
    // post a new song
})

app.delete('/:artistID/:albumID/:songID', (req, res) => {
    // delete a song
})

module.exports = app;
