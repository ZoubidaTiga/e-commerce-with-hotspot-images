<template>
  <v-app>
    <div>
      <div class="mx-auto mt-10">
        <v-card-title class="pb-0">
          <h1>Add new user</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Name" prepend-icon="mdi-account-circle" v-model="user.name" />
            <v-text-field label="Email" prepend-icon="mdi-account-circle" v-model="user.email" />
            <v-text-field :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
              v-model="user.password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="mx-auto" width="100" @click="saveUser">Register</v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-app>
</template>
<script>
import Swal from 'sweetalert2'
import UserDataService from "/services/UserDataService";
export default {
  name: "add-user",
  data() {
    return {
      showPassword: false,
      user: {
        id: null,
        name: "",
        email: "",
        password:""
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      };
      console.log(data);
      UserDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          Swal.fire(
            'Created!',
            'the user has been created..',
            'success'
          );
          this.$router.push("/users");
        })
        .catch(
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'the user does not created..',
            footer:'invalid email'
          })
        );
    },
  }
}
</script>
<style>

.mx-auto{
  width: 800px;
}
</style>