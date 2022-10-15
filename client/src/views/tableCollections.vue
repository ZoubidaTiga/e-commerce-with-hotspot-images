<template>
  <v-card>
    <v-card-title>
      Collections

      <v-spacer></v-spacer>
      <a href="http://localhost:8080/add-collection" class="btn mb-2 primary" role="button" aria-pressed="true"
        style="color: white;position: relative;top: 10px;">
        New Collection
      </a>
    </v-card-title>
    <v-card-title>
      <v-spacer></v-spacer>

      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-row align="center">
      <v-col>

        <v-data-table :headers="headers" :items="tutorials" disable-pagination :hide-default-footer="true"
          :search="search">

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item._id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:[`item.image`]="{ item }">
            <div class="p-2">
              <v-img :src="`/${item.image}`" height="100px" width="130px"></v-img>
            </div>
          </template> 

        </v-data-table>
        <v-card-actions v-if="tutorials.length > 0">
          <!--    <v-btn small color="error" @click="removeAllTutorials">
            Remove All
          </v-btn>-->
        </v-card-actions>

      </v-col>
    </v-row>

  </v-card>
</template>

<script>

import CollectionDataService from "/services/CollectionDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      title: "",
      search: '',
      headers: [
        { text: "Image", value: "image", sortable: false },
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "Description", sortable: false },
       // { text: "Created at", value: "createdAt", sortable: false },
        { text: "Actions", value: "actions", sortable: false },

      ],
    };
  },
  methods: {
    async retrieveTutorials() {
      CollectionDataService.getAllCol()
        .then(response => {
          console.log(response.data);
          this.tutorials = response.data;
          this.products = response.data.tags
        })
    },
    refreshList() {
      this.retrieveTutorials();
    },
    /* searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, */
    editTutorial(id) {

      this.$router.push({ name: "edit-collection", params: { id: id } });
    },
    async deleteTutorial(item) {

      const index = this.tutorials.indexOf(item)
      console.log(index);

      confirm('Are you sure you want to delete this product?') && this.tutorials.splice(index, 1)
      console.log('deleted data');
      this.editedIndex = this.tutorials.indexOf(item)
      this.editedItem = Object.assign({}, item)
      CollectionDataService.delete(this.editedItem._id)
        .then(response => {
          console.log(response);
          //this.$router.push({name:"home", params:{ message: response.data.message}})
        })


    },
    getDisplayTutorial(tutorial) {
      return {
        id: tutorial.id,
        title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
        description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
        status: tutorial.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    console.log("fgggggggggggggggg")
    this.token = localStorage.getItem("jwt");
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log('this.token', this.isAdmin)
    this.retrieveTutorials();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
