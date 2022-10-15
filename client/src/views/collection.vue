<template>
  <v-card class="mx-auto">

    <v-container fluid>
      <v-row dense>
        <v-col v-for="(item, i) in hotspots" :key="i" :cols="flex">
          <!--  <v-card class="pa-1" :to="{ name: 'col', params: { id: item.id}}"> -->
          <v-card class="pa-1" v-on:dblclick="counter += 1, funcao(item)">
            <v-hotspot class="image" :init-options="item" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VueHotspot from '../components/AddVueHotspot.vue'
import CollectionDataService from "/services/CollectionDataService";
export default {
  components: {
    'v-hotspot': VueHotspot
  },
  data() {
    return {
      counter: 0,
      image: '',
      hotspots: [],
      hotspotConfig: {
        id:'',
        image: '',
        editable: false,
        interactivity: 'hover',
        data: [
          { Title: '', Description: '', Link: '', Prix: '', x: '', y: '' }
        ],
      },
      contacts: [],
      flex: '6'
    }
  },
  created() {
    this.fetchContacts()
  },
  methods: {
    funcao(item) {
      this.$router.push(`/col/${item.id}`);
    },
    fetchContacts() {
      CollectionDataService.getAllCol()
        .then(response => {
          this.contacts = response.data;
          for (let i = 0; i < this.contacts.length; i++) {
            this.hotspotConfig.data.length = 0
            this.hotspotConfig.id = this.contacts[i]._id
            this.hotspotConfig.image = this.contacts[i].image
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
          console.log('hadihadihadi:', this.hotspots)
        })
    },
    changeEditable(conf) {
      if (!conf) return
      conf.editable = !conf.editable
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