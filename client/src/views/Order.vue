

<template>
  <v-data-table :headers="headers" :items="contacts" sort-by="Name" class="elevation-1">
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
      v-if="this.$route.params.message">{{this.$route.params.message}}</v-alert>
    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title>List of Orders </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>



        <v-dialog v-model="dialog" max-width="500px">

          <v-card>
            <v-card-title>
              <span class="text-h5"> Edit Order</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Customer"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.address" label="address"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.amount" label="amount"></v-text-field>
                  </v-col>


                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetail" max-width="500px">

          <v-card>
            <v-card-title>
              <span class="text-h5"> Details of Order</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in products" :key="prod.id">
                      <td>{{prod.title}}</td>
                      <td>{{prod.qty}}</td>
                      <td>{{prod.Price}}</td>
                    </tr>

                  </tbody>
                </table>
                <h4>Total: {{somme}}</h4>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDetail">
                Ok
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>





      </v-toolbar>
    </template>
    <template v-slot:[`item.id`]="{ item }">

      <v-icon v-if="token !==null && isAdmin==='true'" small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="detailItem(item)">
        mdi-file-table-box-outline
      </v-icon>
      <v-icon small @click="deleteItem(item)" v-if="token !==null && isAdmin==='true'">
        mdi-delete
      </v-icon>



    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import OrderDataService from "/services/OrderDataService";
  export default {
    data: () => ({
      name:"orders",
      dialog: false,
      somme:'',
      dialogDetail: false,
      token: '',
      isAdmin:'',
      options: ['pending', 'Awaiting Payment', 'Completed','Shipped '],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Address', value: 'address' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date de creation ', value: 'createdAt' },
        { text: 'Date de modification', value: 'updatedAt' },
        { text: 'Actions', value: 'id', sortable: false }
      ],
      products:{
        Price:'',
        qty:'',
        title:''
      },
      contacts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        address: '',
        amount:'',
        status:'',
      },

      defaultItem: {
         name: '',
        address: '',
        amount:'',
        status:'',
      },
    }),
    //components: { dialogDetail },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogDetail (val) {
        val || this.closeDetail()
      },
    },

  created() {
    this.token = localStorage.getItem("jwt");
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log("this.list: " + this.isAdmin)
      console.log("fgggggggggggggggg")
      this.initialize()
    },

    methods: {
       fetchContacts(){
        OrderDataService.getAll()
          .then(response=>{
              console.log(response.data);
              this.contacts=response.data;
              console.log(response.data)
          })
      },
      initialize() {
        this.token = localStorage.getItem("jwt");
        this.isAdmin = localStorage.getItem("isAdmin");
        /* if (this.token !== null && this.isAdmin == 'false') {
          this.headers=[
            { text: 'Name', value: 'name' },
            { text: 'Address', value: 'address' },
            { text: 'Amount', value: 'amount' },
            { text: 'Date de creation ', value: 'createdAt' },
            { text: 'Date de modification', value: 'updatedAt' }
          ]
        }
        else  {
          this.headers=[
            { text: 'Name', value: 'name' },
            { text: 'Address', value: 'address' },
            { text: 'Amount', value: 'amount' },
            { text: 'Date de creation ', value: 'createdAt' },
            { text: 'Date de modification', value: 'updatedAt' },
            { text: 'Actions', value: 'id', sortable: false }
          ]
        } */
          this.fetchContacts();
      },

      editItem (item) {
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
        this.dialog = true
      },
      detailItem(item){
      this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
        this.listerProd(this.editedItem._id)
        this.dialogDetail = true

      },
      listerProd(id){
         OrderDataService.find(id)
          .then(response=>{
              console.log(response.data);
              this.products=response.data.products;
              this.somme=response.data.amount;
              console.log(this.somme)
              
          })
      },

      

      deleteItem (item) {  
        console.log(item);
        const index = this.contacts.indexOf(item)
        confirm('Are you sure you want to delete this order?') && this.contacts.splice(index, 1)
          console.log('deleted data');
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
         OrderDataService.delete(this.editedItem._id)
          .then(response=>{
            console.log(response);
                this.$router.push({name:"home", params:{ message: response.data.message}})
          })
      },

     
      closeDetail(){
        this.dialogDetail = false
      },
      close () {
        this.dialog = false
      },

      closeDelete () {
        this.dialogDelete = false
      },

      save () {
        if (this.editedIndex > -1) {
          
          OrderDataService.update(this.editedItem._id,{name:this.editedItem.name, 
                                  address: this.editedItem.address,
                                  status:this.editedItem.status,
                                  amount:this.editedItem.amount})
          .then(response=>{
            console.log(response);
             this.$router.push({name:"home", params:{ message: response.data.message}})
          })
          .catch(e => {
          console.log(e);
        });
          
          Object.assign(this.contacts[this.editedIndex], this.editedItem)
        } 
        this.close()
      },
    },
  }
</script>
