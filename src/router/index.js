import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index.vue'
import Detail from '@/pages/detail/index.vue'
import ReadPages from '@/pages/readPages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },{
      path: '/readPages/:chapterId',
      name: 'ReadPages',
      component: ReadPages
    }
  ]
})
