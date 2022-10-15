<template>
  <div>
    <v-card class="col-lg-8" style="position: relative;left: 50%;transform: translateX(-50%);">
      <div class="container">

        <div class="main-body">
          <div class="row">
            <div class="col-lg-5">
              <v-container>
                <v-row>
                  <v-col :cols="flex">
                    <v-card>
                      <v-img :src="`/${product.image}`"></v-img>
                    </v-card>
                  </v-col>
                </v-row>

              </v-container>
            </div>

            <div class="col-lg-7">
              <v-container>

                <v-card-title>
                  <h3>{{ product.category }}</h3>
                </v-card-title>
                <v-row>
                  <v-col>
                    <v-card-subtitle class="headline">
                      <!--  {{product.category}} -->
                      {{ product.title }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-card-subtitle class="headline">
                      <h3>{{ product.Price }}Dh</h3>
                    </v-card-subtitle>
                  </v-col>
                </v-row>
                <v-card-text class="grey--text">
                  <p>{{ product.Description }}</p>
                </v-card-text>
                <v-card-actions class="pb-0">

                  <v-col v-if="token === null">
                    <v-btn rounded color="primary" dark v-on:click="addToCart()">
                      Add to Cart
                    </v-btn>
                  </v-col>
                </v-card-actions>


              </v-container>
            </div>



          </div>
        </div>
      </div>

    </v-card>
    <br> <br>
    <div class="col-lg-6" style="position: relative;left: 50%;transform: translateX(-50%);" v-if="length!==0">
      <div class="col-lg-12">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <template v-slot:prev="{ on, attrs }" v-if="length!==1">
            <v-btn v-bind="attrs" v-on="on" class="text-center" fab dark small color="primary">
              <v-icon dark>mdi-less-than</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }" v-if="length!==1">
            <v-btn fab dark small color="primary" v-bind="attrs" v-on="on">
              <v-icon dark>mdi-greater-than</v-icon>
            </v-btn>
          </template>
          <v-carousel-item v-for="(item, i) in hotspots" :key="i">
            <v-row class="fill-height" align="center" justify="center">
              <v-hotspot class="image" :init-options="item" />
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>

  </div>
</template>

<script>
import VueHotspot from '../components/AddVueHotspot.vue'
import CollectionDataService from "/services/CollectionDataService";
import ProductDataService from "/services/ProductDataService";
export default {
  components: {
    'v-hotspot': VueHotspot,
  },
  data() {
    return {
      product: {},
      token: '',
      isAdmin: '',
      image: '',
      hotspots: [],
      hotspotConfig: {
        image: '',
        editable: false,
        interactivity: 'hover',
        data: [
          { Title: '', Description: '', Link: '', Prix: '', x: '', y: '' }
        ],
      },
      contacts: [],
      flex: '12',
      length: ''
    };
  },
  async created() {
    this.token = localStorage.getItem('jwt')
    this.isAdmin = localStorage.getItem("isAdmin");
    this.fetchContacts();
    const response = await ProductDataService.getProductById(this.$route.params.id);
    this.product = response;
  },
  methods: {
    async removeProduct() {
      const response = await ProductDataService.deleteProductById(this.$route.params.id);
      this.$router.push({ name: "home", params: { message: response.message } })
    },
    addToCart() {
      this.$store.commit("addToCart", this.product)
      this.$store.commit("setPrice", this.product)
    },
    fetchContacts() {
      CollectionDataService.findColByProd(this.$route.params.id)
        .then(response => {
          this.contacts = response.data;
          for (let i = 0; i < this.contacts.length; i++) {
            this.hotspotConfig.data.length = 0
            this.hotspotConfig.image = `/${this.contacts[i].image}`
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
              editable: false,
              interactivity: 'hover',
              data: [
                { Title: '', Description: '', Link: '', Prix: '', x: '', y: '' }
              ]
            };


          }
          this.length = this.hotspots.length
          console.log('hadihadihadi:', this.hotspots)
        })
    },
  }

}
</script>
<style>











body {
  background: #f7f7ff;
  margin-top: 20px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: .25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}

.me-2 {
  margin-right: .5rem !important;
}


</style>