<template>
   <base-card>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="Email Id"> Enter EmailId </label>
            <input type="email" id="email" v-model.trim="email"/>
        </div>
        <div class="form-control">
            <label for="Password"> Password </label>
            <input type="password" id="password" v-model="password"/>
        </div>
        <p v-if="!formIsValid" id="error"> Please Enter email and password <br>
        (should be atleast 5 characters long). </p>
        <base-button> LogIn</base-button>
        <base-button type="button" mode="flat" 
        @click="switchAuthMode"> Signup instead</base-button>
    </form></base-card>
</template>
<script>
export default {
    data(){ return {email:'',password:'',formIsValid:true,mode:'login'}; },
    methods:{
        submitForm(){
        const Data={email:this.email,password:this.password};
    if(this.email === '' || !this.email.includes('@') || this.password.length<6)
       { this.formIsValid = false; return ;}
       if(this.mode === 'login'){ this.$store.dispatch('login',Data);}
       else{ this.$store.dispatch('signup',Data); }
      },
        switchAuthMode(){
            if(this.mode === 'login'){this.mode = 'signup';}
            else { this.mode = 'login';}
         }
    }
}
</script>
<style scoped>
form { margin: 1rem;padding: 1rem;}
.form-control { margin: 0.5rem 0;}
label {
        font-weight: bold;
  margin-bottom: 0.5rem;  display: block;
}
input,textarea {
  display: block; width: 100%; font: inherit;
  border: 1px solid #ccc; padding: 0.15rem;
}
input:focus,textarea:focus {
        border-color: #3d008d;
  background-color: #faf6ff; outline: none;
}
#error{ color: crimson }
</style>