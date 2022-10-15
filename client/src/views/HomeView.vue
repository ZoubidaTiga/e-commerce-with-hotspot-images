<template>
  <div>
    <main class="centerCol">


      <v-container fluid>

        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line></v-text-field>
        <v-row dense>
          <v-col v-for="(item, i) in hotspots" :key="i" :cols="flex">
            <!-- <v-card :to="{ name: 'col', params: { id: item.id}}">
              <v-hotspot class=" image" :init-options="item" />
            </v-card> -->
            <v-card class="pa-1" v-on:dblclick="counter += 1, funcao(item)">
              <v-hotspot class="image" :init-options="item" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>


      <div class="text-center">
        <a href="/collection" class="btn  btn-lg active  light-blue darken-4" role="button" aria-pressed="true"
          style="color: white;">
          See more ...
          <v-icon right dark>
            mdi-greater-than
          </v-icon>
        </a>

      </div>

    </main>


    <v-container>
      <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
        v-if="this.$route.params.message">{{ this.$route.params.message }}</v-alert>
      <v-row no-gutters>
        <v-col sm="4" class="pa-3" v-for="product in filterProducts" :key="product._id">
          <v-card class="pa-1" :to="{ name: 'product', params: { id: product._id } }">
            <v-img height="250" :src="`/${product.image}`"></v-img>
            <v-btn class="ml-4 mt-5" small outlined color="indigo">
              {{ product.category }}
            </v-btn>
            <v-card-title class="headline">
              {{ product.title }}
            </v-card-title>
            <v-card-text class="py-0">
              {{ product.Description }}
            </v-card-text>
          </v-card>
          <v-card class="pa-1">
            <v-btn v-if="token === null" rounded color="light-blue darken-4" dark v-on:click="addToCart(product)">
              Add to Cart
            </v-btn>
            <v-btn v-if="token !== null && isAdmin === 'true'" rounded color="light-blue darken-4" dark
              v-on:click="removeProduct(product._id)">
              delete
            </v-btn>
          </v-card>
        </v-col>

      </v-row>
    </v-container>


  </div>
</template>

<script>
import VueHotspot from '../components/VueHotspot.vue'
import CollectionDataService from "/services/CollectionDataService";
import ProductDataService from "/services/ProductDataService";
export default {
  name: 'Home',
  data() {
    return {
      counter: 0,
      products: [],
      token: '',
      image: '',
      search: '',
      hotspots: [],
      hotspotConfig: {
        image: '',
        id: '',
        editable: false,
        interactivity: 'hover',
        data: [
          { Title: '', Description: '', Link: '', Prix: '', x: '', y: '' }
        ],
      },
      contacts: [],
      length: '',
      isAdmin: '',
    }

  },
  components: {
    'v-hotspot': VueHotspot
  },

  async created() {
    this.fetchContacts()
    this.token = localStorage.getItem("jwt");
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log("this.list: " + this.isAdmin)
    this.products = await ProductDataService.getAllProduct();
    //console.log(this.products[0]._id)
  },
  computed: {
    filterProducts() {
      let filteredList = []
      if (this.search !== '') {
        this.products.filter(p => {
          if (typeof (p.title) !== 'undefined') {
            if (p.title.toLowerCase().includes(this.search.toLowerCase())) {
              filteredList.push(p);
            }
          }
        }
        )
        return filteredList
      } else {
        return this.filteredList = this.products
      }
    }
  },
  methods: {
    funcao(item) {
      this.$router.push(`/col/${item.id}`);
    },
    fetchContacts() {
      CollectionDataService.getAllCol()
        .then(response => {
          this.contacts = response.data;
          if (this.contacts.length >= 3) {
            this.length = 3;
          }
          else {
            this.length = this.contacts.length;
          }
          for (let i = 0; i < this.length; i++) {
            this.hotspotConfig.data.length = 0
            this.hotspotConfig.image = this.contacts[i].image
            this.hotspotConfig.id = this.contacts[i]._id
            for (let j = 0; j < this.contacts[i].tags.length; j++) {
              this.hotspotConfig.data.push({
                Title: this.contacts[i].tags[j].title,
                Description: this.contacts[i].tags[j].Description,
                Prix: this.contacts[i].tags[j].Prix,
                Link: this.contacts[i].tags[j].productId,
                x: this.contacts[i].tags[j].x,
                y: this.contacts[i].tags[j].y
              })
            }
            this.hotspots.push(this.hotspotConfig);
            this.hotspotConfig = {
              image: '',
              editable: true,
              interactivity: 'hover',
              data: [
                { Title: '', Description: '', Link: '', Prix: '', x: '', y: '' }
              ]
            };
          }
        })
    },
    async removeProduct(id) {
      console.log(id)
      const response = await ProductDataService.deleteProductById(id);
      this.$router.go();
      this.$router.push({ name: "home", params: { message: response.message } })

    },
    addToCart(product) {
      this.$store.commit("addToCart", product)
      this.$store.commit("setPrice", product)
    }
  }
}
</script>
<!-- <style>
v-card-text{
text-align: left;  
}
img {
    float: left;
     width: 200px;
  height: 300px;
  object-fit: fill;
}
.ui__vue_hotspot{
  height:300px ;
}
</style>
 -->

 <style>
 .ui__vue_hotspot_background_image {
   float: left;
   height: 400px;
   object-fit: fill;
 }
 </style>