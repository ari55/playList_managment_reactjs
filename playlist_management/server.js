'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// CORS
app.use(cors())

const dao = require('./src/server/dao')

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
// const CONTENT_TYPE_HTML = 'text/html'

app.get('/playlists', function (request, response) {
    // récupérer la liste des playlistes
    dao.connect()
    dao.query('select * from playlist', [], (result) => {
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
        response.end(JSON.stringify(result.rows))
        dao.disconnect()
    })
})

app.get('/playlists/:id', function (request, response) {
    // récupérer une playlist correspondant à l'id
    dao.connect()
    dao.query('select * from track where playlist_id=' + request.params.id, [], (result) => {
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
        response.end(JSON.stringify(result.rows))
        dao.disconnect()
    })
})

app.get('/tracks/:playlistId/:title/:uri/:master_id', function (request, response) {
    // ajouter une piste à une playlist
    dao.connect()
    dao.query('INSERT INTO track (playlist_id,title,uri,master_id) VALUES (\'' + request.params.playlistId + '\',\'' + request.params.title + '\',\'' + request.params.uri + '\',\'' + request.params.master_id + '\')', [], (result) => {
        response.writeHead(HTTP_OK)
        response.end()
        dao.disconnect()
    })
})

app.get('/tracks/:id', function (request, response) {
    // supprimer une piste d'une playlist
    dao.connect()
    dao.query('delete from track where id=' + request.params.id, [], (result) => {
        response.writeHead(HTTP_OK)
        response.end()
        dao.disconnect()
    })
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
