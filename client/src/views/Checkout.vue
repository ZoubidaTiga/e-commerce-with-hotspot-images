<template>
    <v-container>
        <v-row>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>CheckOut </v-card-title>

                        <v-divided></v-divided>

                            <v-form ref="form"  @submit.prevent="checkout"  class="pa-5" enctype="multipart/form-data">
                                <v-text-field label="Email"  v-model="order.email" prepend-icon="mdi-note" :rules="rules" >
                                </v-text-field>
                            <v-text-field label="Adresse"  v-model="order.address" prepend-icon="mdi-view-list" :rules="rules" >
                                </v-text-field>
                                  <v-text-field label="Amount" 
                                  v-model="order.amount" prepend-icon="mdi-view-list" >
                                </v-text-field>
                            <v-btn type="submit" class="mt-3" color="primary">checkout</v-btn>

                            </v-form>
                </v-card>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script>
 import OrderDataService from "/services/OrderDataService";

export default {

    data() {
        return{
            rules: [(value)=> !!value || "this field is required! "],
            order:{
                email:"",
                address:"",
                products:"",
                amount:"",
            },
        };
    },
    methods: {
        async submitForm(){

            const formData= new FormData();
            formData.append("email",this.order.email);
            formData.append("address",this.order.address);
            formData.append("products",this.$store.state.products);
            formData.append("amount",this.order.amount);
           if(this.$refs.form.validate()){      
            console.log(this.$refs.form)

                const response = await  OrderDataService.create(formData);
                this.$router.push({name:"home", params:{ message: response.message}})
           }
        },

    },
    
}
</script>
