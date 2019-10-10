<template>
       <div>{{text}}
        <v-btn @click="buttonclick">

        </v-btn>

        <console/>
        </div>
</template>


<script>
import Console from '../plugins/console/Console.vue';

export default {
    components: {
        Console
    },
    data:()=>({
        text: "hey there"
    }), 
    methods:{
        buttonclick(){
            this.text="PIZZA"
            this.$console.log("Hello World");
            this.$console.error("Something went wrong");
        }
    }
}
</script>