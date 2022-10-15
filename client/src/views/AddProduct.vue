<template>
    <v-container>
        <v-row>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Add new Product</v-card-title>

                        <v-divided></v-divided>

                            <v-form ref="form"  @submit.prevent="submitForm"  class="pa-5" enctype="multipart/form-data">
                                <v-text-field label="title"  v-model="product.title" prepend-icon="mdi-note" :rules="rules">
                                </v-text-field>
                                  <v-text-field label="category"  v-model="product.category" prepend-icon="mdi-view-list" :rules="rules">
                                </v-text-field>
                                  <v-text-field label="Price" v-model="product.Price" 
                                  prepend-icon="mdi-view-list" :rules="rules">
                                </v-text-field>
                                  <v-text-field label="Quantity" 
                                  v-model.number="product.Quantity" prepend-icon="mdi-view-list" :rules="rules">
                                </v-text-field>
                                  <v-textarea label="Description"
                                  v-model="product.Description"  prepend-icon="mdi-note-plus" :rules="rules">
                                </v-textarea>
                                <v-file-input  @change="selectFile" :rules="rules" show-size counter multiple  label="select image" ></v-file-input>
                                <v-btn type="submit" class="mt-3" color="primary"> Add Product</v-btn>
                            </v-form>
                </v-card>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script>
 import ProductDataService from "/services/ProductDataService";
export default {

    data() {
        return{
            rules: [(value)=> !!value || "this field is required! "],
            product:{
                title:"",
                category:"",
                Description:"",
                Price:"",
                image:"",
                Quantity:""
            },
            image:"",
        };
    },
    methods: {
        selectFile(file){
            this.image=file[0]
        },
        async submitForm(){

            const formData= new FormData();
            formData.append("image",this.image);
             formData.append("title",this.product.title);
            formData.append("category",this.product.category);
            formData.append("Price",this.product.Price);
            formData.append("Description",this.product.Description);
            formData.append("Quantity",this.product.Quantity);
           if(this.$refs.form.validate()){      
            console.log(this.$refs.form)

                const response = await  ProductDataService.addProduct(formData);
                this.$router.push({name:"home", params:{ message: response.message}})
            
           }

            
        }
    }
}
</script>
