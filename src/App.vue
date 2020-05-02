<template>
  <div v-cloak>

    <div id="login" :class="{mobile: mobile}" v-show="!ifSingIn">
      <from>
        <h2>Sign In</h2>
        <div class="input-box">
          <i class="demo-icon icon-user icon"></i>
          <input type="text" class="input input-login-login" v-model="login" required="">
        </div>
        <div class="input-box">
          <i 
            class="demo-icon icon-lock-alt icon lock" 
            v-if="iconLockLogin" 
            @click="iconLockLogin = !iconLockLogin" 
            title="Switch to letters"
          ></i>
          <i 
            class="demo-icon icon-lock-open-alt icon lock" 
            v-else 
            @click="iconLockLogin = !iconLockLogin" 
            title="Switch to dots"
          ></i>
          <input
            class="input input-login-password" 
            :type="iconLockLogin ? 'password' : 'text'" 
            v-model="password"             
            required=""
          >
        </div>
        <p></p>
        <div class="input-box animated">
          <input @click="loginn" type="submit" neme="" value="" id="InpLog">
          <label for="InpLog"><i class="demo-icon icon-right-big animated arrow"></i></label>
        </div>

        <div id="login-media">
          <div @click="singInFb"><i class="demo-icon icon-facebook-rect"></i></div>
          <div @click="singInGoogle"><i class="demo-icon icon-googleplus-rect"></i></div>
          <div @click="singInTwitter"><i class="demo-icon icon-twitter-bird"></i></div>
          <div @click="singInGithub"><i class="demo-icon icon-github"></i></div>
        </div>
        
        <h2>Register</h2>
        <div class="input-box">
          <i class="demo-icon icon-user icon"></i>
          <input 
            class="input input-register-login" 
            @keyup="validLogin" 
            type="text" 
            v-model="registerLogin" 
            placeholder="John@gmail.com" 
            required=""
          >        
        </div>
        <p v-show="errorRegisterLogin"></p>
        <div class="input-box">
          <i 
            class="demo-icon icon-lock-alt icon lock" 
            v-if="iconLockRegister" 
            @click="iconLockRegister = !iconLockRegister" 
            title="Switch to letters"
          ></i>
          <i 
            class="demo-icon icon-lock-open-alt icon lock" 
            v-else 
            @click="iconLockRegister = !iconLockRegister" 
            title="Switch to dots">
          </i>
          <input 
            class="input input-register-password" 
            @keyup="validPassword" 
            :type="iconLockRegister ? 'password' : 'text'" 
            v-model="registerPassword" 
            placeholder="Smith123"  
            required=""
          >
        </div>
        <p v-show="errorRegisterPassword"></p> 
        <div class="input-box animated">
          <input @click="registration" type="submit" neme="" value="" id="InpReg">
          <label for="InpReg"><i class="demo-icon icon-right-big arrow"></i></label>
        </div>
      </from>
      
    </div>

    <main v-show="ifSingIn">
      <router-link to="/" class="router all active">
        <i class="demo-icon icon-th"></i>
      </router-link>
      <router-link to="/Completed" class="router comp">
        <i class="demo-icon icon-calendar-check-o"></i>
      </router-link>
      <div class="helpful"></div>

      <div class="hide">
        <transition name="slide" enter-active-class="animated slideInUp" >
          <keep-alive>
              <router-view />
          </keep-alive>
        </transition>
      </div>

      <router-link to="/New" class="add">+</router-link>
      <button class="exit" @click="signOut"><i class="demo-icon icon-logout"></i></button>
    </main>
  </div>
</template>

<script>
import TodoApp from './components/ToDoApp.vue'
import db from './components/firebaseInit'
import firebase, { auth } from 'firebase'

export default {
  components: {
    TodoApp
  },
  data(){
    return{
      login: '',
      password: '',
      registerLogin: '',
      registerPassword: '',
      iconLockLogin: true,
      iconLockRegister: true,
      ifSingIn: null,
      errorLoginLogin: false,
      errorRegisterLogin: false,
      errorRegisterPassword: false,
    }
  },
  methods: {
    registration(){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.registerLogin, this.registerPassword)
        .then(() => {
          console.log('Hello')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = document.querySelectorAll('p');

          console.log(errorCode);

          switch(errorCode){
            case 'auth/email-already-in-use':
              this.errorRegisterLogin = true;
              errorMessage[1].innerHTML = "Email is busy";
            break;
            

            case 'auth/invalid-email':
              errorMessage[1].innerHTML = "Bad email format";
              this.errorRegisterLogin = true;
            

            case 'auth/weak-password':
              errorMessage[2].innerHTML = "Password Required";
              this.errorRegisterPassword = true;
            
          };

          document.querySelectorAll('div.animated')[1].classList.add('shake');
          setTimeout(()=>{
            document.querySelectorAll('div.animated')[1].classList.remove('shake');
          },300)

        });
    },
    validLogin(){
      if(this.registerLogin.match(/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i)){
        this.errorRegisterLogin = false;
      }else{
        document.querySelectorAll('p')[1].innerHTML = "Bad email format";
        this.errorRegisterLogin = true;
      }
    },
    validPassword(){
      if(this.registerPassword.match(/^......+$/i)){
        this.errorRegisterPassword = false;
      }else{
        document.querySelectorAll('p')[2].innerHTML = "Password minimum 6 characters";
        this.errorRegisterPassword = true;
      }
    },
    signOut(){
      firebase.auth().signOut().then(() => {
        console.log('Bay')
      })
    },
    loginn(){
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login, this.password)
        .then(()=>{
          console.log("Authenticated successfully with payload:");
        })
        .catch((error)=>{
          console.log("Login Failed!", error);

          document.querySelectorAll('p')[0].innerHTML = "Login or password incorrect";
          this.errorLoginLogin = true;
          
          document.querySelectorAll('div.animated')[0].classList.add('shake');  
          setTimeout(()=>{
            document.querySelectorAll('div.animated')[0].classList.remove('shake');
          },300)
        });
    },
    singInFb(){
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    singInGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    singInTwitter(){
      let provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    singInGithub(){
      let provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
  },
  computed:{
    mobile(){
      return this.errorLoginLogin&&this.errorRegisterLogin&&this.errorRegisterPassword;
    }
  },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.ifSingIn = user;
      }else {
        this.ifSingIn = user;
      }
    });
  }
}

$(document).ready(function(){
  $(".router").click(function(){
    $(".router").removeClass("active");
    $(this).addClass("active");
  });

  $(".add").click(function(){
    $(this).addClass("addClick");
      var t = this;
     setTimeout(function(){$(t).removeClass("addClick")}, 1000)
  });
});
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";
@import 'icons/css/fontello.css';

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(300deg ,#9966CC, rgb(255, 189, 255));
    background-repeat: no-repeat;
    font-family: sans-serif;
  }

  #login{
    max-width: 400px;
    margin: 80px auto 0px auto;
    padding: 10px 0px;

    border-radius: 8px;
    background: #fff;

    text-align: center;
  }

  @media screen and (max-width: 500px) {
    .mobile{
      margin: 10px auto 0px auto!important;
  }
}

  #login h2{
    color: #777;
    margin: 0px 0px 40px;
    font-size: 40px;
  }

  #login .input-box{
    position: relative;
    margin: 15px 0px 10px 0px;
  }

  #login .input-box  i.icon{
    position: absolute;
    top: 50%;
    transform: translate(40%,-60%);
    color: #777;
  }

  #login .input-box input[type="text"],
  #login .input-box input[type="password"]{
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #777;
    outline: none;
    padding-left: 25px;
    box-sizing: border-box;
    font-weight: bold;
    color: #777;
    transition: .2s;
  }

  #login .input-box input:focus,
  #login .input-box input:valid{
    border-bottom: 2px solid #d774e4;
  }

  #login .input-box input[type="submit"]{
    border: none;
  }

  #login .input-box label{
    transform: translateX(-50%);
  }

  #login .input-box label i{
    cursor: pointer;
    color: #777;
    font-size: 20px;
  }

  #login-media{
    display: flex;
    margin: 40px 0px 20px 0px;
  }

  #login-media div{
    width: 25%;
    height: 50px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 20px;
    color: rgb(143, 143, 143);
    transition: .2s ease;
  }

  #login-media div:hover{
    transform: scale(1.3);
    font-size: 27px;
  }

  #login-media div:nth-child(1):hover{
    color: #3B5998;
  }

  #login-media div:nth-child(2):hover{
    color: #c2c2c2;
  }
  
  #login-media div:nth-child(3):hover{
    color: #00acee;
  }

  #login-media div:nth-child(4):hover{
    color: black;
  }

  .lock:hover{
    cursor: pointer;
  }

  p{
    font-size: 12px;
    font-style: italic;
    letter-spacing: 1px;
    color: rgb(255, 58, 44);
  }

  .input{
    margin: 10px;
  }

  main{
    max-width: 400px;
    margin: 80px auto 0px auto;

    border-radius: 8px;
    background: #fff;
  }

  .hide{
    overflow: hidden;
  }

  .router{
    display: block;
    width: 50%;
    float: left;

    color: rgb(189, 189, 189);
    text-decoration: none;
    text-align: center;
    padding: 5px;
    background: rgb(248, 248, 248);
    box-sizing: border-box;
    border: 2px solid rgb(243, 243, 243);
    transition: .3s ease;
  }

  .all{
    border-radius: 8px 0 0 0;
    padding: 20px;
  }

  .all i{
    font-size: 20px;
  }

  .comp{
    border-radius: 0 8px 0 0;
    padding: 18.5px;
  }

  .comp i{
    font-size: 22px;
  }

  .active{
    color: #9966CC;
    background: #fff;
    border: 2px solid #fff;
  } 

  .helpful{
    clear: both;
  }

  .add{
    display: block;
    text-decoration: none;
    text-align: center;
    font-weight: 900; 
    font-size: 40px;
    font-family: none;
    position: relative;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    z-index: 1000;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgb(255, 148, 105);
    color: #fff;
    outline: none;
  }

  .addClick{
    animation: lol .5s ease;
  }

  @keyframes lol {
    20%{
      transform: translate(-50%, 50%) scale(0.8);
    }
    60%{
      transform: translate(-50%, 50%) scale(1.2)
    }
  }

  .exit{
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    background: rgb(223, 63, 63);
    border-radius: 50%;
    border: none;
    color: #fff;
    top: 0;
    right: 0;
    margin: 10px 10px;
  }
</style>
