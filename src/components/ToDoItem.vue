<template>
    <div>
      <label>
        <input 
          type="checkbox" 
          :id="item.id" 
          @click="removeitem" 
          v-model="completed" 
          :disabled="item.completed"
        >
        <label :for="item.id" :class="{completed: item.completed}">{{item.title}}</label>
      </label>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data(){
      return{
        completed: this.item.completed
      }
    },
    methods: {
      removeitem(){
          this.$emit('removeComplete', this.item.id)
      },
    },
}
</script>

<style scoped>
  div{
    margin: 10px 0;
  }

  input[type="checkbox"]{
    position: relative;
    top: 8px;
    left: 15px;
    width: 30px;
    height: 30px;
    -webkit-appearance: none;
    outline: none;
    transition: .5s;
  }

  input[type="checkbox"]::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid gray;
    border-radius: 5px;
    box-sizing: border-box;
    transition: .5s;
  }

  input:checked[type="checkbox"]::before{
    border-left: none;
    border-top: none;
    border-radius: 0px;
    width: 15px;
    border-color: #9966CC;
    transform: rotate(45deg);
  }

  label{
    font-size: 20px;
    font-family: sans-serif;
  }

  label label{
    margin: 0 0 0 20px;
  }
</style>