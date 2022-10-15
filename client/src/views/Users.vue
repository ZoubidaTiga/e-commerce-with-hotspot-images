<template>
  <v-data-table :headers="headers" :items="list" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>All users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>


        <a href="http://localhost:8080/add-admin" class="btn mb-2 primary" role="button" aria-pressed="true" style="color: white;position: relative;
  top: 10px;">
          New User
        </a>


        <v-dialog v-model="dialog" max-width="500px">




          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="user name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.address" label="address"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.mobile" label="mobile"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="options" v-model="editedItem.isAdmin" label="is Admin" dense solo></v-select>
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
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
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
import UserDataService from "/services/UserDataService";
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      options: ['true', 'false'],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'mobile ', value: 'mobile' },
        { text: 'address ', value: 'address' },
        { text: 'is Admin', value: 'isAdmin' },
        { text: 'Actions', value: 'id', sortable: false },
      ],
      contacts: [],
      list:[],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        mobile: '',
        address: '',
        isAdmin:''
      },

      defaultItem: {
        name: '',
        email: '',
        password: '',
        mobile: '',
        address: '',
        isAdmin:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      console.log("fgggggggggggggggg")
      this.fetchContacts()
    },

    methods: {
        
       fetchContacts(){
        UserDataService.getAll()
          .then(response=>{
              console.log(response.data);
            this.contacts = response.data;
            for (let i = 0; i < this.contacts.length; i++){
              this.contacts[i].password = ''
              if (this.contacts[i].isAdmin == false) {
                //this.contacts[i].isAdmin = 'admin'
                this.list.push(this.contacts[i])
              }
            }
          })
      },
      

      editItem (item) {
        this.editedIndex = this.list.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
        this.dialog = true
      },

      deleteItem (item) {  
        console.log(item);
        const index = this.list.indexOf(item)
        confirm('Are you sure you want to delete this user?') && this.list.splice(index, 1)
          console.log('deleted data');
        this.editedIndex = this.list.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log( this.editedItem._id)
         UserDataService.delete(this.editedItem._id)
          .then(response=>{
            console.log(response);
          })
      },

      deleteItemConfirm (item) {
        this.list.splice(this.editedIndex, 1)
         console.log("asdfghjkllkjhgf "+id);
        
        
          console.log('deleted data'+item.id);
          UserDataService.delete(this.item.id)
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
          
          UserDataService.updateByAdmin(this.editedItem._id,
            {
              name: this.editedItem.name,
              email: this.editedItem.email,
              isAdmin: this.editedItem.isAdmin,
              mobile: this.editedItem.mobile,
              address: this.editedItem.address,
              password: this.editedItem.password
            }
          )
          .then(response=>{
            console.log(response);
            
          })
          
          Object.assign(this.list[this.editedIndex], this.editedItem)
        } else {
          console.log('created data');
          console.log(this.editedItem);
          UserDataService.create({name:this.editedItem.name, email: this.editedItem.email,password:this.editedItem.password})
          .then(response=>{
            console.log(response);
            
          })
          this.list.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>