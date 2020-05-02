<template>
    <div>
        <ToDoitem :item="item" 
        v-for="item in items" 
        :key="item.id"
        />
    </div>
</template>

<script>
import ToDoitem from './ToDoItem.vue'
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  components: {
    ToDoitem
  }, 
  data(){
    return{
        items: [],
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData(){
        /*db
            .collection('todo2')
            .where('completed', '==', true)
            .get()
            .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data= {
                id: doc.id,
                title: doc.data().title,
                completed: doc.data().completed
                };
                this.items.push(data);
            })
        })*/
        this.items = [];
        const t = this;
        db
          .collection('todo2')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(querySnapshot => {
            for(let i=0;i<querySnapshot.data().todo.length;i++){
              querySnapshot.data().todo[i].completed ? t.items.push(querySnapshot.data().todo[i]) : '';
            }
            
            //t.items = querySnapshot.data().todo;
          })



        },
    }
}
</script>