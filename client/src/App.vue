<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="light-blue darken-4" dark v-if="token!==null">
      <img src="./image/logo.png" width="245px" height="60px" />
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="primary" active-class="white--text">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="light-blue darken-4" dark style="height:75px">

      <v-app-bar-nav-icon v-if="token!==null" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div v-if="token===null">
        <img src="./image/logo.png" width="245px" height="60px" />
      </div>
      <div v-else>
        <v-toolbar-title>Application</v-toolbar-title>
      </div>

      <template width="600px">
        <v-tabs v-if="token!==null">
          <v-tab v-for="tab in tabToken" :key="tab.id" :to="tab.route" exact>
            {{ tab.name }}
          </v-tab>
          <v-tab exact @click="logUserOut">
            Log Out
          </v-tab>
        </v-tabs>
        <v-tabs v-if="token===null">
          <v-tab>
            <cart />
          </v-tab>
          <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route" exact>
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import cart from "./components/cart.vue"
  export default {
    data: () => ({
        drawer: null,
        items: [],
        user:{
          name:'',
          email:''
        },
        isAdmin:'',
        token:'',
        tabToken: [
        { id: 1, name: "Home", route: `/` },
        { id: 2, name: "Collection", route: `/collection` },
        { id: 3, name: "Profil", route: `/me` },
        { id: 4, name: "About Us", route: `/help` },
        ],
        tabs: [
        { id: 1, name: "Home", route: `/` },
        { id: 2, name: "Collection", route: `/collection` },
        { id: 3, name: "Espace Admin", route: `/Users/login` },
        { id: 4, name: "About", route: `/help` },
      ]
    }),
    components: {cart},
    created() {
      this.initialize();
        
      },
     
    methods:{
      logUserOut() {
          localStorage.removeItem("jwt");        
          
          this.$router.push("/")
          this.$router.go();
      }
      ,
      initialize(){
        this.token = localStorage.getItem("jwt")
        this.isAdmin = localStorage.getItem("isAdmin");
        console.log("item ", this.token !== null && this.isAdmin == 'false' )
        if(!this.token){
          this.items=[
            { title: "Collections", icon: "mdi-cart", link: "/collection" },
            { title: "Espace Admin", icon: "mdi-account", link: "/Users/login" },
        ];
        }
        else if (this.token !== null && this.isAdmin == 'false') {
          this.items = [
         /*    { title: 'Add Product', icon: 'mdi-cart-plus', link: "/add-product" },
            { title: 'Add Collection', icon: 'mdi-note-plus', link: "/add-collection" }, */
            { title: "Customers", icon: "mdi-account-group", link: "/Customers" },
            { title: 'Products', icon: 'mdi-clipboard-list', link: "/myproducts" },
            { title: "Orders", icon: "mdi-table", link: "/Orders" },
            { title: "Collections", icon: "mdi-playlist-star", link: "/tableCollections" },
            { title: "Statistic", icon: "mdi-chart-bar", link: "/chart" },
          ]
         }
        else{
          this.items=[
          /*   { title: "Add user", icon: "mdi-account-plus", link: "/add-admin" },
            { title: 'Add Product', icon: 'mdi-cart-plus' , link:"/add-product" },
            { title: 'Add Collection', icon: 'mdi-note-plus' , link:"/add-collection" }, */
            { title: "Customers", icon: "mdi-account-group", link: "/Customers" },
            { title: 'Users', icon: 'mdi-account-group', link: "/users" },
            { title: 'Products', icon: 'mdi-clipboard-list' , link:"/myproducts" },
            { title: "Orders", icon: "mdi-table", link: "/Orders" },
            { title: "Collections", icon: "mdi-playlist-star", link: "/tableCollections" },
            { title: "Statistic", icon: "mdi-chart-bar", link: "/chart" },
        ]
        }
      }
    }
}
</script>
<style>
.v-tabs-bar{
  float:right !important
}
.v-tab{
  text-transform:none !important
}
.v-toolbar__content{
  height:70px
}

</style>