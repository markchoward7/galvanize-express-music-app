const express = require('express')
var router = express.Router();

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

router.get('/', (req, res) => {
    // return [{artist1.name: url-to-albums}, {artist2.name: url-to-albums}]
})

router.get('/:artistId', (req, res) => {
    // return [{album1.name: url-to-album}, {album2.name: url-to-album}]
})

router.get('/:artistId/:albumId', (req, res) => {
    // return [{song1.name: url-to-song}, {song2.name: url-to-song}]
})

router.get('/:artistId/:albumId/:songId', (req, res) => {
    // return {name: song-name, etc.}
})

router.get('/songs', (req, res) => {
    // query params
        // song=    return {name: song-name, etc.}
        // album=   return [{song1.name: url-to-song}, {song2.name: url-to-song}] 
        // artist=  return [{song1.name: url-to-song}, {song2.name: url-to-song}] 
    // return [{song1.name: url-to-song}, {song2.name: url-to-song}]
})

router.post('/songs', (req, res) => {
    // post a new song
})

router.delete('/:artistID/:albumID/:songID', (req, res) => {
    // delete a song
})

module.export = router