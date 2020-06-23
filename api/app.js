var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fetch = require("node-fetch")

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var testAPIRouter = require("./routes/testAPI");

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

var musicData = []
fetch("https://itunes.apple.com/search?term=the+beatles").then(response => response.json()).then(data => {
  musicData.push({
    artistName: data.results[0].artistName,
    artistId: data.results[0].artistId,
    albums: []
  })
})
fetch("https://itunes.apple.com/search?term=johnny+cash").then(response => response.json()).then(data => {
  musicData.push({
    artistName: data.results[0].artistName,
    artistId: data.results[0].artistId,
    albums: []
  })
})
for (const artist of musicData) {
  fetch(`https://itunes.apple.com/lookup?id=${artist.artistId}&entity=album`).then(response => response.json().then(data => {
    for (const album of data.results.slice(1)) {
      artist.albums.push({
        albumName: album.collectionName,
        albumId: album.collectionId,
        artworkUrl: album.artworkUrl100,
        songs: []
      })
    }
  }))
  for (const album of artist.albums) {
    fetch(`https://itunes.apple.com/search?attribute=albumTerm&term=${album.collectionName.replace(' ', '+')}&entity=song`).then(response => response.json()).then(data => {
      for (const song of data.results) {
        album.songs.push({
          songName: song.trackName,
          songId: song.trackId,
          previewUrl: song.previewUrl
        })
      }
      console.log(`Loaded`)
    })
  }
}

app.get('/', (req, res) => {
  returnData = []
  for (const artist of musicData) {
    returnData.push({
      artistName: artist.artistName,
      artistId: artist.artistId
    })
  }
  res.send(JSON.stringify(returnData))
})

app.get('/:artistId', (req, res) => {
  returnData = []
  for (const artist of musicData) {
    if (artist.artistId === req.params.artistId) {
      for (const album of artist.albums) {
        returnData.push({
          albumName: album.albumName,
          albumId: album.albumId,
          artworkUrl: album.artworkUrl100
        })
      }
      break
    }
  }
  res.send(JSON.stringify(returnData))
})

app.get('/:artistId/:albumId', (req, res) => {
    returnData = []
    for (const artist of musicData) {
      if (artist.artistId === req.params.artistId) {
        for (const album of artist.albums) {
          if (album.albumId === req.params.albumId) {
            for (const song of album.songs) {
              returnData.push({
                songName: song.songName,
                songId: song.songId
              })
            }
            break
          }
        }
        break
      }
    }
    res.send(JSON.stringify(returnData))
})

app.get('/:artistId/:albumId/:songId', (req, res) => {
    returnData = []
    for (const artist of musicData) {
      if (artist.artistId === req.params.artistId) {
        for (const album of artist.albums) {
          if (album.albumId === req.params.albumId) {
            for (const song of album.songs) {
              if (song.songId === req.params.songId) {
                returnData.push({
                  songName: song.songName,
                  songId: song.songId,
                  previewUrl: song.previewUrl
                })
                break
              }
            }
            break
          }
        }
        break
      }
    }
    res.send(JSON.stringify(returnData))
})

app.get('/songs', (req, res) => {
  let songName = req.query.song
  let albumName = req.query.album
  let artistName = req.query.artist
  console.log(req)
  returnData = []
  if (songName || albumName || artistName) {
    if (songName) {
      for (const artist of musicData) {
        for (const album of artist.albums) {
          for (const song of album.songs) {
            if (song.songName === songName) {
              returnData.push({
                songName: song.songName,
                songId: song.songId
              })
              break
            }
          }
        }
      }
    }
    else if (albumName) {
      for (const artist of musicData) {
        for (const album of artist.albums) {
          if (album.albumName === albumName) {
            for (const song of album.songs) {
              returnData.push({
                songName: song.songName,
                songId: song.songId
              })
            }
            break
          }
        }
      }
    }
    else {
      for (const artist of musicData) {
        if (artist.artistName === artistName) {
          for (const album of artist.albums) {
            for (const song of album.songs) {
              returnData.push({
                songName: song.songName,
                songId: song.songId
              })
            }
          }
          break
        }
      }
    }
  } else {
    for (const artist of musicData) {
      for (const album of artist.albums) {
        for (const song of album.songs) {
          returnData.push({
            songName: song.songName,
            songId: song.songId
          })
        }
      }
    }
  }
  res.send(JSON.stringify(returnData))
})

app.post('/songs', (req, res) => {
    // post a new song
})

app.delete('/:artistID/:albumID/:songID', (req, res) => {
    // delete a song
})

module.exports = app;
