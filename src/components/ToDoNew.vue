<template>
    <div class="item" >
      <input type="text" placeholder="What needs to be done ?" v-model="newitem" @keyup.enter="additem">
      <br>
      <input type="range" id="vol" name="vol" min="0" max="10" v-model="valueRange">
      <label for="vol" id="showRange">{{valueRange}}</label>
      <br>
      <i>level of importance</i>
    </div>
</template>

<script>
import db from './firebaseInit'
import firebase, { auth } from 'firebase'

export default {
  data(){
    return{
        newitem: '',
        title: null,
        completed: false,
        valueRange: 0,
    }
  },
  methods: {
    additem(){
      const helpfulArr = [];


      db.collection('todo2')
        .doc(firebase.auth().currentUser.uid)
        .update({ 
          todo: firebase.firestore.FieldValue.arrayUnion ({
            title: this.newitem,
            completed: false,
            import: parseInt(this.valueRange),
            id: Math.floor(Math.random() * 1000)       
          }) 
      })
      .catch(() => {
        db.collection('todo2')
        .doc(firebase.auth().currentUser.uid)
        .set({ 
          todo: firebase.firestore.FieldValue.arrayUnion ({
            title: this.newitem,
            completed: false,
            import: parseInt(this.valueRange),
            id: Math.floor(Math.random() * 1000) 
          })
         })
      })

      /*if(this.newitem){
        db
        .collection('todo')
        .add({
          title: this.newitem,
          completed: false,
          import: parseInt(this.valueRange)
        })

        db
          .collection('todo')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const data= {
                id: doc.id,
                title: doc.data().title,
                completed: doc.data().completed,
              };
              helpfulArr.push(data);
             this.items = helpfulArr;
            })
          })
      }

      this.newitem = '';*/

    

    }
  },
  /*beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
}*/
  
}
</script>

<style scoped>
.item{
  text-align: center;
}
  input[type="text"]{
    width: 250px;
    height: 30px;
    margin: 30px 0px;
    padding: 0 30px;
    outline: none;
    box-shadow: 0px 1px 2px #888888;
    border: none;
    transition: .2s ease;
  }

  input:focus[type="text"]{
    box-shadow: 0px 1px 5px #888888;
  }

  input[type="range"]{
    -webkit-appearance: none;
    border-radius: 5px;
    box-shadow: inset 3px 18px rgb(0, 0, 0, 0.5);
    height: 2px;
    outline: none;
    margin-bottom: 10px;
  }

  input[type="range"]::-webkit-slider-thumb{
    -webkit-appearance: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    outline: none;
    box-shadow: 0 0 0 3px #fff,
                0 0 0 3px rgb(0, 0, 0, 0.6);
    background: rgb(255, 255, 255);
  }

  #showRange{
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-top: 50px;
    background: #fff;
    padding: 5px;
    color: #9966CC;
  }

  i{
    font-size: 10px;
    letter-spacing: 1px;
    font-weight: 600;
    color: rgb(0, 0, 0, 0.6);
  }

</style>