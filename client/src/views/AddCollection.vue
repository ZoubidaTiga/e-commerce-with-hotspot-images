<template>
    <v-container>
      <div v-if="!submitted">
        <v-row>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Add new Collection</v-card-title>

                            <v-form ref="form"  @submit.prevent="submitForm1"  class="pa-5" enctype="multipart/form-data">
                                <v-text-field label="title"  v-model="collection.title" prepend-icon="mdi-note" :rules="rules">
                                </v-text-field>
                                <v-text-field label="Description"  v-model="collection.Description" prepend-icon="mdi-note" :rules="rules">
                                </v-text-field> 
                                
                                  <v-file-input  @change="selectFile" :rules="rules" show-size counter multiple  label="select image" ></v-file-input>
                                <v-btn type="submit" class="mt-3" color="primary"> select tags</v-btn>
                            </v-form>
                </v-card>
            </v-col>
        </v-row>
        </div>
        <div v-if="submitted">
            
           <v-form ref="form"  @submit.prevent="submitForm"  class="pa-5" enctype="multipart/form-data">
                                <v-text-field label="Title"  v-model="collection.title" prepend-icon="mdi-note" :rules="rules">
                                </v-text-field> 
                                <v-text-field label="Description"  v-model="collection.Description" prepend-icon="mdi-note" :rules="rules">
                                </v-text-field>    
                                <div class="contain">
        <!-- Main -->
        <v-hotspot
                :init-options="hotspots"
                @save-data="saveData"
                @after-delete="afterDelete" />
        </div>
                                <v-btn type="submit" class="mt-3" color="primary"> Add collection</v-btn>
          </v-form>
        </div>
    </v-container>
</template>

<script>
import VueHotspot from '../components/AddVueHotspot.vue'
import CollectionDataService from "/services/CollectionDataService";
import MediaDataService from "/services/MediaDataService";

export default {
    components: {
    'v-hotspot': VueHotspot
    },
    data() {
        return{
            rules: [(value)=> !!value || "this field is required! "],
            submitted:false,
            collection:{
                title:"",
                image:"",
                Description:"",
                tags:[
                ],
            },
            tagsData:{
              x:'22',
              y:'33',
              productId:'6231fb88f388f94218e5dc93'
            },
            image: '',
           hotspots: {
                image: '',
                editable: true,
                //interactivity: 'hover',
                data: [
                        //{Title:'nnn',Description:'',link:'',Prix:'',x:'22',y:'22'}
                        //{productId:'',x:'',y:''}
                    ],  
            },
        };
    },
    created(){
       this.hotspotConfig.data.splice(0, this.hotspotConfig.data.length);
       console.log('leng',this.hotspotConfig.data)
    },
    methods: {
    saveData (data) {
     
      console.log('jjjjjjjjjjjjjjjjjjj',hotspots.data)
    },
    afterDelete () {
      // Do something after delete
      console.log('Do something after delete ...')
    },
        selectFile(file){
            this.collection.image=file[0]
            
        },
        async submitForm(){
            console.log('jjjjjjjjjjjjjjjjjjj',this.hotspots.data)
            for(var i=0;i<this.hotspots.data.length;i++){
                console.log('jjjjjjjjjjjjjjjjjjj',this.hotspots.data[i])
                this.tagsData.productId=this.hotspots.data[i].link
                this.tagsData.x=this.hotspots.data[i].x
                this.tagsData.y=this.hotspots.data[i].y
                this.collection.tags.push(this.tagsData)
                this.tagsData={
                            x:'',
                            y:'',
                            productId:''
                }
            }

            const formData= new FormData();
            formData.append("image",this.collection.image);
            formData.append("title",this.collection.title);
            formData.append("Description",this.collection.Description);
            formData.append('tags',JSON.stringify(this.collection.tags));
            
            console.log(...formData)
           if(this.$refs.form.validate()){  
                const response = await  CollectionDataService.create(formData);
                this.image=response.data.image
                this.submitted=true;
                console.log("response",response) 
                this.$router.push({name:"home", params:{ message: response.data.message}})
           }
            
        },
        async submitForm1(){
            const formData= new FormData();
            formData.append("image",this.collection.image);
           if(this.$refs.form.validate()){  
                const response = await  MediaDataService.create(formData);
                this.hotspots.image=response.data.image
                this.submitted=true;
           }
            
        }
    }
}
</script>
