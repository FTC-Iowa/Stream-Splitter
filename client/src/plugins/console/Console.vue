<template>
  <div>
      <console-entry v-for="(item, index) in enteries" :key="index" :value="item"/>
  </div>
</template>

<script>
import ConsoleEntry from './ConsoleEntry.vue'
// import io from 'socket.io-client';

const dateFormat = require('date-format');

export default {
    name: 'console',
    components: {
        ConsoleEntry
    },
    props: {
    },
    data: () => ({
        enteries: [],
        socket: null
    }),
    created() {
        // this.$console = {};
        this.$console.log = this.log;
        this.$console.error = this.error;

        this.$socket.on('message', this.message);
    },
    methods: {
        // log message from the client
        log(value) {
            let time = Date.now();
            this.addEntry('client', 'log', time, value);
        },
        // log error from client
        error(value) {
            let time = Date.now();
            this.addEntry('client', 'error', time, value);
        },
        // recieve message from server
        message(value) {
            this.addEntry('server', value.type, value. time, value.message)
        },
        // add an entry to the console
        addEntry(source,  type, time, value) {
            this.enteries.push({
                source: source,
                type: type,
                time: dateFormat('hh:mm:ss.SSS',value.time),
                value: value
            })
            this.$nextTick(function() {
                if (this.$refs.console) {
                    this.$$refs.console.scrollTop = this.$refs.console.scrollHeight;
                }
            })
        }
    }
}
</script>

<style>

</style>