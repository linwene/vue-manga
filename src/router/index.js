import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index.vue'
import Detail from '@/pages/detail/index.vue'
import ReadPages from '@/pages/readPages/index.vue'
import TagPages from '@/pages/tagPages/index.vue'
import TagListAll from '@/pages/tagListAll/index.vue'
import Search from '@/pages/search/index.vue'
import Recommend from '@/pages/recommend/index.vue'
import UpdateToday from '@/pages/updateToday/index.vue'
import UpdateWeek from '@/pages/updateWeek/index.vue'

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
    },{
      path: '/tagPages',
      name: 'TagPages',
      component: TagPages
    },{
      path: '/tagListAll/:category_name',
      name: 'TagListAll',
      component: TagListAll
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },{
      path: '/updateToday',
      name: 'UpdateToday',
      component: UpdateToday
    },{
      path: '/updateWeek',
      name: 'UpdateWeek',
      component: UpdateWeek
    }
  ]
})
