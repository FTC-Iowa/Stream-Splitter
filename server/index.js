const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var whitelist = ['http://localhost:8080', 'http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors());

const port = 3000;
var sock = null;

function log(message) {
    console.log(message);
    sendMessage('log', message);
}

function error(message){
    console.log(message);
    sendMessage('error', message);
}

function sendMessage(type, message) {
    sock.emit('message', { 
        type: type,
        time: Date.now(),
        message: message
    });
}



server.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    //res.send('hello world')
    res.sendFile(__dirname + '/index.html');
});

sock.on('start', (data) => {
    // console.log('req:', req.body);
    // res.header('Access-Control-Allow-Origin', '*')
    let yt_id = data.id;
    let toa_id = data.toa;

    log("Start Download of " + yt_id);

    const video = ytdl(yt_id);
    let starttime;
    video.pipe(fs.createWriteStream(output));
    video.once('response', () => {
        starttime = Date.now();
    });
    video.on('progress', (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
        process.stdout.write(`, estimated time left: ${(downloadedMinutes / percent - downloadedMinutes).toFixed(2)}minutes `);
        readline.moveCursor(process.stdout, 0, -1);
        sock.emit('progress', { percent: percent * 100 });
    });
    video.on('end', () => {
        process.stdout.write('\n\n');
        log("Finished Download of " + yt_id);
    });

    // res.sendStatus(200);

})


const fs = require('fs');
const ytdl = require('ytdl-core');


const readline = require('readline');
const path = require('path');

const url = 'https://www.youtube.com/watch?v=PtLg4GIUbZo';
const output = path.resolve(__dirname, 'video.mpeg');


io.on('connection', function(socket) {
    sock = socket;
    log("Socket connected")
});