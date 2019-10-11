import io from 'socket.io-client';

const URL = 'http://localhost:3000'

export default {
    install(Vue) {
        Vue.prototype.$socket = io(URL);
    }
}