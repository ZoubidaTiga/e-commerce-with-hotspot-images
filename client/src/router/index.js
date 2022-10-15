import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/collection',
    name: 'collection',
    component: ()=>import ('../views/collection.vue')

  }, 
  {
    path: '/add-collection',
    name: 'add-collection',
    component: ()=>import ('../views/AddCollection.vue')

  }, 
  {
    path: '/',
    name: 'checkout',
    component: ()=>import ('../views/Checkout.vue')
  }, 
  {
    path: '/add-product',
    name: 'add-product',
    component: ()=>import ('../views/AddProduct.vue')
  },
  {
    path: '/tableCollections',
    name: 'tableCollections',
    component: ()=>import ('../views/tableCollections.vue')
  },
  {
    path: '/col/:id',
    name: 'col',
    component: ()=>import ('../views/col.vue')
  },
  {
    path: '/users',
    name: 'user',
    component: ()=>import ('../views/Users.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: ()=>import ('../views/col.vue')
  },
  {
    path: '/add-admin',
    name: 'add-admin',
    component: ()=>import ('../views/Register.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: ()=>import ('../views/cart.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ()=>import ('../views/Product.vue')
  },
  {
    path: '/product/:id',
    name: 'edit-product',
    component: ()=>import ('../views/EditProduct.vue')
  },
  {
    path: '/collection/:id',
    name: 'edit-collection',
    component: ()=>import ('../views/EditCollection.vue')
  },
 
  {
    path: '/myproducts',
    name: 'myproducts',
    component: ()=>import ('../views/MyProducts.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/Users/login',
    name: 'LoginU',
    component: () => import( '../views/LoginU.vue')
  },
  {
    path: '/Product',
    name: 'Product',
    component: () => import( '../views/Product.vue')
  },
  {
    path: '/chart',
    name: 'Graph',
    component: () => import( '../views/chart.vue')
  },
  {
    path: '/Income',
    name: 'Income',
    component: () => import( '../views/income.vue')
  },
  {
    path: '/Orders',
    name: 'orders',
    component: () => import( '../views/Order.vue')
  },
 
  {
    path: '/me',
    name: 'profile',
    component: () => import( '../views/ProfilAdmin.vue')
  }, 
  {
    path: '/Customers',
    name: 'customers',
    component: () => import( '../views/Customers.vue')
  }, 
  {
    path: '/help',
    name: 'help',
    component: () => import( '../views/AboutView.vue')
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
