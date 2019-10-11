const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors')

import Session from './session.js'

var sessions = [];

app.use(cors());

const port = 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));

// handle http requests
app.get('/', (req, res) => {
    //res.send('hello world')
    res.sendFile(__dirname + '/index.html');
});

// handel socket connections
io.on('connection', function(socket) {
    // create a new session for this connection
    let session = new Session(socket);

    // add the session to the session list
    sessions.push(session);

    // when the browser disconnects
    socket.on('disconnect', () => {
        session.onDisconnect();
        // on disconnect remove the session from the sessions list
        sessions = sessions.filter((val) => val !== session);
    })
});