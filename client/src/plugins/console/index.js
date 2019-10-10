import consoleComponent from './Console.vue';

export default {
    install (Vue) {
        Vue.prototype.$console = {
            commands: [],
            visible: false,
            log: () => {},
            error: () => {}
        }

        Vue.mixin({
            beforeMount () {

            }
        })

        Vue.component('console', consoleComponent);
    }
}
