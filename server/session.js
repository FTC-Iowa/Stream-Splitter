/**
 * This class represnets a browswer session to the server.  Each session
 * will create a new session object.
 */


const fs = require('fs');
const ytdl = require('ytdl-core');


export default class Session {
    constructor(socket, onDisconnect) {
        this.socket = socket;

        this.log("Connected to client!")

        this.socket.on('start', (data) => {
            this.onStart(data);
        });




    }

    onDisconnect() {

    }

    onStart(data) {
        let startTime;
        this.log("Starting download");
        this.log("Video ID = " + data.youtubeId);

        // create the video object
        const video = ytdl(data.youtubeId);

        // start downloading the video
        video.pipe(fs.createWriteStream(data.youtubeId + '.mpeg'));

        // when the download starts
        video.once('response', () => {
            startTime = Date.now();
        });

        // During the download
        video.on('progress', (chunkLength, downloaded, total) => {
            let downloadedSeconds = (Date.now() - startTime) / 1000;
            let percentage = downloaded / total;
            const progress = {
                percentage: percentage.toFixed(2), // percent downloaded
                downloaded: (downloaded / 1024 / 1024).toFixed(2), // downloaed amount in MB
                total: (total / 1024 / 1024).toFixed(2), // total filesize in MB
                elapsedTime: downloadedSeconds.toFixed(2), // Seconds it has been downloading for
                remainingTime: (downloadedSeconds / percentage - downloadedSeconds).toFixed(2) // estimated remaining time in seconds
            }
            this.socket.emit('progress', progress);
        })

        // when finished
        video.on('end', () => {
            this.log('Finished Download in ' + ((Date.now() - startTime) / 1000) + ' seconds');
        })

    }



    log(message) {
        console.log(message);
        this.sendMessage('log', message);
    }

    error(message) {
        console.error(message);
        this.sendMessage('error', message);
    }

    sendMessage(type, message) {
        this.socket.emit('message', {
            type: type,
            time: Date.now(),
            message: message
        });
    }

}