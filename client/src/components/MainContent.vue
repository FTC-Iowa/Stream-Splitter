<template>
       <div>{{text}}
        <v-btn @click="buttonclick">
            Start
        </v-btn>
        Downloaded {{down}}MB of {{total}}MB, {{percent * 100}}%

        <console/>
        </div>
</template>


<script>

export default {
    components: {
    },
    data:()=>({
        text: "hey there",
        down: 0,
        total: 0,
        percent: 0
    }), 
    methods:{
        buttonclick(){
            this.text="PIZZA"
            this.$console.log("Hello World");
            this.$console.error("Something went wrong");

            // Get progress updates
            this.$socket.on('progress', (data) => {
                // progress = {
                //     percentage: percentage, // percent downloaded
                //     downloaded: downloaded / 1024 / 1024, // downloaed amount in MB
                //     total: total / 1024 / 1024, // total filesize in MB
                //     elapsedTime: downloadedSeconds, // Seconds it has been downloading for
                //     remainingTime: (downloadedSeconds / percentage - downloadedSeconds) // estimated remaining time in seconds
                // }
                this.down = data.downloaded;
                this.total = data.total;
                this.percent = data.percentage;
            })

            // send the start command to server
            this.$socket.emit('start', {
                youtubeId: 'd1KgznEBmgI'
            })
        }
    }
}
</script>