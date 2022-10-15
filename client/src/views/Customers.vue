

<template>
  <v-data-table
    :headers="headers"
    :items="contacts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>All customers</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Customer</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.id`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import CustomerDataService from "/services/CustomerDataService";
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [],
      contacts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: ''
      },

      defaultItem: {
        name: '',
        email: ''
      },
    }),

 

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

  created() {
    this.token = localStorage.getItem("jwt");
    this.isAdmin = localStorage.getItem("isAdmin");
    if (this.token !== null && this.isAdmin == 'false') {
      this.headers = [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Created at ', value: 'createdAt' },
        { text: 'Updated at ', value: 'updatedAt' },
      ]
    }
    else {
      this.headers = [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Created at ', value: 'createdAt' },
        { text: 'Updated at ', value: 'updatedAt' },
        { text: 'Actions', value: 'id', sortable: false },
      ]
    }
      this.initialize()
    },

    methods: {
        
       fetchContacts(){
        CustomerDataService.getAll()
          .then(response=>{
              console.log(response.data);
              this.contacts=response.data;
          })
      },
      initialize(){
          this.fetchContacts();
      },

      editItem (item) {
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
        this.dialog = true
      },

      deleteItem (item) {  
        console.log(item);
        const index = this.contacts.indexOf(item)
        confirm('Are you sure you want to delete this customer?') && this.contacts.splice(index, 1)
          console.log('deleted data');
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
         CustomerDataService.delete(this.editedItem._id)
          .then(response=>{
            console.log(response);
          })
      },

      deleteItemConfirm (item) {
        this.contacts.splice(this.editedIndex, 1)
         console.log("asdfghjkllkjhgf "+id);
        
        
          console.log('deleted data'+item.id);
          customerDataService.delete(this.item.id)
          .then(response=>{
            console.log(response);
          })
        this.closeDelete()
      },

      close () {
        this.dialog = false
      },

      closeDelete () {
        this.dialogDelete = false
      },

      save () {
        if (this.editedIndex > -1) {
          console.log('edited data');
          console.log(this.editedItem);
          
          CustomerDataService.update(this.editedItem._id,{name:this.editedItem.name, email: this.editedItem.email})
          .then(response=>{
            console.log(response);
            
          })
          
          Object.assign(this.contacts[this.editedIndex], this.editedItem)
        } 
        this.close()
      },
    },
  }
</script>