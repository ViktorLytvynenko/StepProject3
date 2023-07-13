const express = require('express')
const app = express()
const path = require ('path')

const http = require('http')
const server = http.createServer(app)

app.use(express.static(__dirname + '/'));
app.get('/', (req,res) => {
    res.sendFile(path.resolve('./index.html'))
})

server.listen(4000, () => {
    console.log('Server has been started on port 4000')
})