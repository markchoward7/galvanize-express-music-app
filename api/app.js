var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fetch = require('node-fetch')

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var musicData = []
fetch("https://itunes.apple.com/search?term=the+beatles").then(response => response.json()).then(data => {
  newArtist = {
    artistName: data.results[0].artistName,
    artistId: data.results[0].artistId,
    albums: []
  }
  musicData.push(newArtist)
  LoadAlbums(newArtist)
})
fetch("https://itunes.apple.com/search?term=johnny+cash").then(response => response.json()).then(data => {
  newArtist = {
    artistName: data.results[0].artistName,
    artistId: data.results[0].artistId,
    albums: []
  }
  musicData.push(newArtist)
  LoadAlbums(newArtist)
})
function LoadAlbums(artist) {
  fetch(`https://itunes.apple.com/lookup?id=${artist.artistId}&entity=album`).then(response => response.json()).then(data => {
    for (const album of data.results.slice(1)) {
      newAlbum = {
        albumName: album.collectionName,
        albumId: album.collectionId,
        artworkUrl: album.artworkUrl100,
        nextSongId: 0,
        songs: []
      }
      artist.albums.push(newAlbum)
      LoadSongs(newAlbum)
      }
    })
  }
function LoadSongs(album) {
  fetch(`https://itunes.apple.com/search?attribute=albumTerm&term=${album.albumName.replace(' ', '+')}&entity=song`).then(response => response.json()).then(data => {
    for (const song of data.results) {
      album.songs.push({
        songName: song.trackName,
        songId: song.trackId,
        previewUrl: song.previewUrl
      })
      if (songId >= album.nextSongId) {
        album.nextSongId = songId + 1
      }
    }
  })
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

app.get('/lookup/:artistId', (req, res) => {
  returnData = []
  for (const artist of musicData) {
    if (artist.artistId === Number(req.params.artistId)) {
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

app.get('/lookup/:artistId/:albumId', (req, res) => {
    returnData = []
    for (const artist of musicData) {
      if (artist.artistId === Number(req.params.artistId)) {
        for (const album of artist.albums) {
          if (album.albumId === Number(req.params.albumId)) {
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

app.get('/lookup/:artistId/:albumId/:songId', (req, res) => {
    returnData = []
    for (const artist of musicData) {
      if (artist.artistId === Number(req.params.artistId)) {
        for (const album of artist.albums) {
          if (album.albumId === Number(req.params.albumId)) {
            for (const song of album.songs) {
              if (song.songId === Number(req.params.songId)) {
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
    for (const artist of musicData) {
      if (artist.artistName === req.body.artistName) {
        for (const album of artist.albums) {
          if (album.albumName === req.body.albumName) {
            album.songs.push({
              songName: req.body.songName,
              songId: album.nextSongId
            })
            album.nextSongId++
          }
        }
      }
    }
    res.send(200)
})

app.delete('/:artistID/:albumID/:songID', (req, res) => {
    for (const artist of musicData) {
      if (artist.artistId === Number(req.params.artistId)) {
        for (const album of artist.albums) {
          if (album.albumId === Number(req.params.albumId)) {
            for (const song of album.songs) {
              if (song.id === Number(req.params.artistId)) {
                album.splice(album.songs.indexOf(song), 1)
                break
              }
            }
            break
          }
        }
        break
      }
    }
    res.send(200)
})

app.listen(3000)
