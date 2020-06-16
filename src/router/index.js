import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/images',
    name: 'Images',
    component: () => import('../views/ImageApiViews/Images.vue'),
    children: [
      // '' = default component
      // { path: '', component: () => import('../views/ImageApiViews/CatApi.vue'), },
      { path: 'cat', component: () => import('../views/ImageApiViews/CatApi.vue'), },
      { path: 'dog', component: () => import('../views/ImageApiViews/DogApi.vue'), },
      { path: 'picsum', component: () => import('../views/ImageApiViews/PicsumApi.vue'), },
    ]
  },
  {
    path: '/tv-movies',
    name: 'TV-Movies',
    component: () => import('../views/TV-MovieApiViews/TV-Movies.vue'),
    children: [
      { path: 'omdb', component: () => import('../views/TV-MovieApiViews/OmdbApi.vue'), },
      { path: 'tmdb', component: () => import('../views/TV-MovieApiViews/TmdbApi.vue'), },
    ]
  },
  {
    path: '/dictionaries',
    name: 'Dictionaries',
    component: () => import('../views/DictionaryApiViews/Dictionaries.vue'),
    children: [
      { path: 'owlbot', component: () => import('../views/DictionaryApiViews/OwlbotApi.vue'), },
      { path: 'merriam-webster', component: () => import('../views/DictionaryApiViews/MerriamWebsterApi.vue'), },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
