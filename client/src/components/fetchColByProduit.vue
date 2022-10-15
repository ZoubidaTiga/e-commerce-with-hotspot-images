<template>
    <div>
        <div class="col-lg-8">
            <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
                <template v-slot:prev="{ on, attrs }">
                    <v-btn color="info" v-bind="attrs" v-on="on">
                        <v-icon right dark>mdi-less-than</v-icon>
                    </v-btn>
                </template>
                <template v-slot:next="{ on, attrs }">
                    <v-btn color="info" v-bind="attrs" v-on="on">
                        <v-icon right dark>mdi-greater-than</v-icon>
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
            flex: '6',
            id: '62376a5fae405294393f5c3e'
        };
    },
    async created() {
       
        this.fetchContacts()
    },
    methods: {
        fetchContacts() {
            CollectionDataService.findColByProd(this.$route.params.id)
                .then(response => {
                    this.contacts = response.data;
                    for (let i = 0; i < this.contacts.length; i++) {
                        this.hotspotConfig.data.length = 0
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