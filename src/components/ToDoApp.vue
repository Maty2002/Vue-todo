<template>
  <div id="ToDoApp">
  
    <ToDoitem :item="item" 
    v-for="item in items" 
    :key="item.id"
    @removeComplete='completeditem'
    />

  </div>
</template>

<script>
import ToDoitem from './ToDoItem.vue'
import lol from './ToDoNew.vue'
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  components: {
    ToDoitem
  },  
  data(){
    return{
      newitem: '',
      items: [],
      helped: []
    }
  },
  methods: {
    completeditem(id){
      let todo;
      const index = this.items.findIndex(el => el.id === id);
      this.items[index].completed = true;

      this.helped = this.items;
      this.helped[index].completed = true;

      todo = this.helped;

      db.collection('todo2')
        .doc(firebase.auth().currentUser.uid)
        .set({todo})
         

    },
    deleteAll(){

      db
        .collection('todo2')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection('todo2').doc(doc.id).delete();
          })
        })
      
      this.items = []
    },
    fetchData(){
      this.items = [];
      const t = this;
      db
        .collection('todo2')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          t.items = querySnapshot.data().todo;
        })
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created(){
    this.fetchData();
  }
}
</script>

<style>
  #ToDoApp{
    min-height: 50px;
    max-height: 500px;
    overflow: auto;
    border-radius: 0 0 8px 8px;
    background: #fff;
  }

  .completed{
    opacity: 0.5;
    text-decoration: line-through;
  }
  
  .completed h2{
    text-decoration: line-through;
  }

</style>
