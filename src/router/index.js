import Vue from 'vue'
import Router from 'vue-router'
import ToDoApp from '@/components/ToDoApp'
import ToDoCompleted from '@/components/ToDoCompleted'
import ToDoNew from '@/components/ToDoNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ToDoApp',
      component: ToDoApp
    },
    {
      path: '/Completed',
      name: 'ToDoCompleted',
      component: ToDoCompleted
    },
    {
      path: '/New',
      name: 'ToDoNew',
      component: ToDoNew
    }
  ]
})


