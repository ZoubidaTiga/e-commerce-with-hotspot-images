<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="cartItems.length==0">
          <h3 class="text-center text-danger">Your Cart is Empty !</h3>
        </div>
        <div v-else>
          <table class="table stripped ">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item._id">
                <td>{{ item.title }}</td>
                <td>{{ item.Price }}</td>
                <td>
                  <v-icon @click="minQty(item)">mdi-minus-circle</v-icon> {{ item.qty }}
                  <v-icon @click="addQty(item)">mdi-plus-circle</v-icon>
                </td>
                <td>{{ item.subTotal }}</td>
                <td>
                  <v-icon small @click="remove(item)" align="center">mdi-delete</v-icon>
                </td>
              </tr>


            </tbody>
          </table>

          <h3>Total: {{total}}Dh</h3>


          <template>
            <v-row justify="center">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn max-width="200px" color="light-blue darken-4" depressed dark v-bind="attrs" v-on="on">
                    Checkout</v-btn>
                </template>
                <v-card>
                  <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                    <v-card-title>
                      <span class="text-h5">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field label="name*" v-model="order.name" required></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field label="Email" v-model="order.email" hint="example of helper text only on focus"
                            required></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field label="Card Number" hint="example of persistent helper text" persistent-hint
                            required></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field label="Address" v-model="order.address" hint="example of persistent helper text"
                            persistent-hint required></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field label="Amount" v-model="total" persistent-hint required disabled></v-text-field>
                        </v-row>

                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="light-blue darken-4" text type="submit" @click="dialog = false">
                        Pay
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
  
</div>
</template>



<script>
import { mapGetters, mapActions } from 'vuex'
import OrderDataService from "/services/OrderDataService";
export default {

  data() {
    return {
      dialog: false,
      som: 0,
      //total:JSON.parse(localStorage.getItem('amount')),
      rules: [(value) => !!value || "this field is required! "],
      order: {
        name: "",
        email: "",
        address: "",
        products: "",
        amount: "",
      },
    };
  },

  watch: {
    dialog(val) {
      val
    }
  },
  computed: {

    total() {
      this.som = 0
      this.$store.state.cartItems.map(item => {
        this.som += item.Price * item.qty
      });
      return this.som
    },



    ...mapGetters(['cartItems'])

  },
  created() {
    //localStorage.clear()

  },

  methods: {
    // mapActions([
    // 'remove(item)'
    // ]),
    remove(item) {
      this.$store.commit("remove", item)
    },
    addQty(item) {
      this.$store.commit("addQty", item)
      this.$store.commit("setPrice", item)
    },
    minQty(item) {
      this.$store.commit("minQty", item)
      this.$store.commit("setPrice", item)
    },

    close() {
      this.dialog = false
    },
    save() { },



    async submitForm() {


      if (this.$refs.form.validate()) {
        const response = await OrderDataService.create({ name: this.order.name, email: this.order.email, address: this.order.address, products: JSON.parse(localStorage.getItem('cart')), amount: this.som });
        this.$router.push({ name: "home", params: { message: response.message } })
        localStorage.clear()
        this.$store.replaceState({})
        this.$router.go()
      }
    },

  },


}

</script>