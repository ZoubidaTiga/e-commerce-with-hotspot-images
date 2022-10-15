<template>
  <div class="container">
    <div class="main-body">
      <div class="row">

        <div class="col-lg-6">
          <h4>Galerie Inspiration</h4>
          <p>collection</p>
          <v-hotspot :init-options="hotspotConfig" />
        </div>

        <div class="col-lg-6">
          <template>
            <v-card>
              <v-row align="center">
                <v-col>
                  <v-data-table :headers="headers" :items="hotspotConfig.data" hide-default-header hide-default-footer>
                    <template v-slot:[`item.image`]="{ item }">
                      <div class="p-2">
                        <v-img :src="`/${item.image}`" height="100px" width="130px"></v-img>
                      </div>
                    </template>
                    <template v-slot:[`item.Prix`]="{ item }">
                      <div class="p-2">
                       {{`${item.Prix}Dh`}}
                      </div>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </div>

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
    'v-hotspot': VueHotspot
  },
  data() {
    return {
      rules: [(value) => !!value || "this field is required! "],
      collection: {
        title: "",
        Description: "",
        image: "",
        tags: [],
      },
      tagsData: [],
      hotspotConfig: {
        image: '',
        editable: false,
        interactivity: 'hover',
        data: []
      },
      headers: [
        { text: "Image", value: "image", sortable: false, value: "image" },
        { text: "Title", align: "start", sortable: false, value: "Title" },
        { text: "Price", align: "start", sortable: false, value: "Prix" },



      ],
      product: {
        title: "",
        Description: "",
        image: "",
},
    };
  },
  async created() {
    this.fetchCollection()

  },

  methods: {
    async fetchCollection() {
      const response = await CollectionDataService.get(this.$route.params.id);
      this.collection = response.data;
      console.log("product 1", this.collection.tags[1])
      this.hotspotConfig.data.length = 0
      //this.collection.image="uploads\\0Collection-medium.jpg"
      this.hotspotConfig.image = `/${this.collection.image}`

      for (let j = 0; j < this.collection.tags.length; j++) {

        const response = await ProductDataService.getProductById(this.collection.tags[j].productId);
        this.product = response;
        console.log('this.product', this.product.image)
        this.hotspotConfig.data.push({
          Title: this.collection.tags[j].title,
          Description: this.collection.tags[j].Description,
          Prix: `${this.collection.tags[j].Prix}`,
          image: this.product.image,
          id: this.collection.tags[j].productId,
          Link: this.collection.tags[j].productId,
          x: this.collection.tags[j].x,
          y: this.collection.tags[j].y
        })
      }
    },

  }
}
</script>
<style>
.ui__vue_hotspot_background_image {
  float: left;
  height: 400px;
  object-fit: fill;
}
</style>