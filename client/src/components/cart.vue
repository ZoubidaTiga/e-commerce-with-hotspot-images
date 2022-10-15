<template>
   <v-btn icon :to="{name : 'cart'}">
      <v-icon large color="white">mdi-cart</v-icon>
      <p> {{cartItemCount}}</p>
   </v-btn>

</template>


<script>
export default {
   data() {
      return {

      }
   },
   computed: {
      cartItemCount() {
         localStorage.setItem("count", this.$store.state.cartItemCount)

         if (this.$store.state.cartItemCount === "undefined") {
            console.log(this.$store.state.cartItemCount == "undefined")
            this.$store.state.cartItemCount = 0;
         }
         return this.$store.state.cartItemCount


      },
   }
}
</script>
