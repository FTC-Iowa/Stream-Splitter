<template>
       <div>{{text}}
        <v-btn @click="buttonclick">

        </v-btn>
        </div>
</template>


<script>
export default {
    data:()=>({
        text: "hey there"
    }), 
    methods:{
        buttonclick(){
            this.text="PIZZA"
        }
    }
}
</script>