<template>
	<div class="container">
		<div class="main-body">
			<div class="row">
				<div class="col-lg-4">
					<div class="card">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">

								<div class="mt-3">
									<h4> {{user.name}} </h4>
									<p class="text-secondary mb-1">Full Stack Developer</p>
									<p class="text-muted font-size-sm">{{ user.address}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div class="col-lg-8">
					<div class="card">
						<div class="card-body">
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Full Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" v-model="user.name">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="email" class="form-control" v-model="user.email">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Mobile</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" v-model="user.mobile">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Address</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" v-model="user.address">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">new password</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" v-model="user.passwordNew">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">old password</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" v-model="user.passwordOld">
								</div>
							</div>
							<div class="row">
								<div class="col-sm-3"></div>
								<div class="col-sm-9 text-secondary">
									<input type="button" class="btn btn-primary px-4" @click="save"
										value="Save Changes">
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

</template>
<script>
//import Contact from '@/components/Contact.vue'
import Swal from 'sweetalert2'
import UserDataService from "/services/UserDataService";
import VueJwtDecode from "vue-jwt-decode";
  export default {
    data: () => ({
       user:{
		   id:'',
		   name:'',
		   email:'',
		   mobile:'',
		   address:'',
		   password:'',
		   passwordNew:'',
		   passwordNew:''
	   },
	 }),  	
    created () {
      console.log("fgggggggggggggggg")
	  
      this.initialize()
    },
  		methods:{
			me(){
				let token = localStorage.getItem("jwt");
				console.log("ytyyyyyyyyyyyyyyyyyyyyyyyyyy   "+token)
				try {
				let decoded = VueJwtDecode.decode(token);
				this.list = decoded;  
				console.log("his.list = decoded;  "+this.list.id)  
				UserDataService.me()
					.then(response => {
						this.user=response.data;
						console.log("this.user==" + this.user.email)
						
						
					}) 

				} catch (error) {
					// return error in production env
					this.user=null;
					console.log(error, 'error from decoding token')
				}
			}
			,
			initialize(){
				this.me();
				console.log(this.user.image)
			},
			save(){
				console.log(this.user._id);
				console.log("old=" + this.user.passwordOld);
				console.log("new=" + this.user.passwordNew);
				 UserDataService.update(this.user._id,
				 		{name:this.user.name, 
						email: this.user.email,
						passwordNew:this.user.passwordNew,
						passwordOld: this.user.passwordOld,
						address: this.user.address,
						mobile: this.user.mobile})
					.then(response=>{
						console.log(response);
						this.user.passwordNew='';
						this.user.passwordOld = '';
						Swal.fire(
							'Updated!',
							'Your profil has been updated..',
							'success'
						);
					}).catch(
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Your profil has been does\'t updated..',
							footer: 'verify your old password'
						})
					)
					
				
			}
		},
    

}
</script>
<style>
body{
    background: #f7f7ff;
    margin-top:20px;
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
    margin-right: .5rem!important;
}
</style>