const express = require('express')

const app = express()

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
    // return [{artist1.name: url-to-albums}, {artist2.name: url-to-albums}]
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

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))