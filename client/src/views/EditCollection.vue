<template>
    <v-container>



        <v-row>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Update This Collection</v-card-title>
                    <v-divided></v-divided>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Title" v-model="collection.title" prepend-icon="mdi-note">
                        </v-text-field>
                        <v-text-field label="Description" v-model="collection.Description" prepend-icon="mdi-view-list">
                        </v-text-field>

                        <template>
                            <v-row align="center">
                                <v-col>
                                    <v-data-table :headers="headers" :items="collection.tags">
                                        <template v-slot:[`item.image`]="{ item }">
                                            <div class="p-2">
                                                <v-img :src="`/${item.image}`" height="100px" width="130px"></v-img>
                                            </div>
                                        </template>
                                        <template v-slot:[`item.actions`]="{ item }">

                                            <v-icon small @click="deleteTag(item)">mdi-delete</v-icon>

                                        </template>

                                    </v-data-table>
                                </v-col>
                            </v-row>
                        </template>



                        <v-card>
                            <!-- Main -->
                            <v-hotspot :init-options="hotspotConfig" @save-data="saveData" />

                        </v-card>


                        <v-btn type="submit" class="mt-3" color="primary"> Update Collection</v-btn>

                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
                editable: true,
                interactivity: 'hover',
                data: []
            },
            headers: [
                { text: "image", value: "image", sortable: false, value: "image" },

                { text: "Title", align: "start", sortable: false, value: "title" },
                { text: "actions", align: "start", sortable: false, value: "actions" },



            ]
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
                this.hotspotConfig.data.push({
                    Title: this.collection.tags[j].title,
                    Description: this.collection.tags[j].Description,
                    Prix: this.collection.tags[j].Prix,
                    id: this.collection.tags[j].productId,
                    link: this.collection.tags[j].productId,
                    x: this.collection.tags[j].x,
                    y: this.collection.tags[j].y
                })
            }
        },

        async updateForm() {

            console.log("dernier tag", this.hotspotConfig.data)
            const formData = new FormData();
            formData.append("title", this.collection.title);
            formData.append("image", this.collection.image);
            formData.append("Description", this.collection.Description);
            /* 
                        for (let i=0;i< this.hotspotConfig.data.length;i++){
                             this.hotspotConfig.data[i].link= this.hotspotConfig.data[i].Link
                        } */


            for (let i = 0; i < this.hotspotConfig.data.length; i++) {
                this.tagsData.push({
                    productId: this.hotspotConfig.data[i].link,
                    Description: this.hotspotConfig.data[i].Description,
                    title: this.hotspotConfig.data[i].Title,
                    Prix: this.hotspotConfig.data[i].Prix,
                    x: this.hotspotConfig.data[i].x,
                    y: this.hotspotConfig.data[i].y
                })


            }

            formData.append("tags", JSON.stringify(this.tagsData))
            console.log("formData from client", ...formData)
            if (this.$refs.form.validate()) {
                const response = await CollectionDataService.update(this.$route.params.id, formData);
                this.$router.push({ name: "home", params: { message: response.message } })
            }

        },
        async deleteTag(item) {
            console.log("col a supp", this.collection.tags[this.collection.tags.indexOf(item)])
            this.collection.tags.splice(this.collection.tags.indexOf(item), 1)
            this.hotspotConfig.data = []
            for (let j = 0; j < this.collection.tags.length; j++) {
                this.hotspotConfig.data.push({
                    Title: this.collection.tags[j].title,
                    Description: this.collection.tags[j].Description,
                    Prix: this.collection.tags[j].Prix,
                    id: this.collection.tags[j].productId,
                    link: this.collection.tags[j].productId,
                    x: this.collection.tags[j].x,
                    y: this.collection.tags[j].y
                })
            }
            console.log("hotspot a supp", this.hotspotConfig.data)

            //  console.log("index", col.tags.indexOf(item))
            /*  this.collection.tags.splice( this.collection.tags.indexOf(item),1) 
             this.hotspotConfig.data.splice( this.hotspotConfig.data.indexOf(item),1) */
            //const response = await CollectionDataService.update(col._id,col)
            // this.fetchCollection()
        },
        saveData() {
            this.updateForm()
        }
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