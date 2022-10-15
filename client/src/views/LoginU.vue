<template>
<v-app>
 <div v-if="!submitted">
    <v-card width="600" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Email" 
            prepend-icon="mdi-account-circle"
            v-model="user.email"
          />
          <v-text-field 
            :type="showPassword ? 'text' : 'password'" 
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="user.password"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions >
        <v-btn color="success" class="mx-auto"  width="100" @click="saveUser">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  </v-app>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import UserDataService from "/services/UserDataService";
export default {
  name: "login_user",
  data() {
    return {
      showPassword: false,
      user: {
        id: null,
        email: "",
        password:""
      },
      submitted: false
    };
  },
  methods: {
      saveUser() {
      var data = {
        email: this.user.email, 
        password: this.user.password,
         //email: "zoubida.tiga@gmail.com",
        //email: "zoubida.tiga@gmail.commm",//true
        //email: "bbbbbb@gmail.com",//false
        //password: "1234567890"
      };
      UserDataService.loginUser(data)
        .then(response => {
          this.user.id = response.data.id;
          let token=response.data.accessToken;
          localStorage.setItem("jwt", token);
          let decoded = VueJwtDecode.decode(token);
          this.list = decoded; 
          let isAdmin = this.list.isAdmin;
          localStorage.setItem("isAdmin", isAdmin);
          let is = localStorage.getItem("isAdmin");
          console.log("this.list++" +is)
          this.$router.push("/");
          this.$router.go();

        })
        .catch(e => {
          console.log(e);
        });
    },
    
  }
}
</script>
