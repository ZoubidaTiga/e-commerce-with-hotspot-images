<template>
  <div id="app">
  <column-chart :data="cart" label="revenue par mois"></column-chart>
 <!-- <line-chart :data="cart" label="revenue par mois" ></line-chart><br>
  <pie-chart :data="cart" ></pie-chart>-->
  </div>
</template>

<script>
import OrderDataService from "/services/OrderDataService";
export default {
  name: 'App',
  data(){
    return{
      /* chartData:{
      } */
      cart:[]
    }
  },
  created(){
    this.fetchContacts();
  },
  methods: {
       fetchContacts(){
        OrderDataService.incomes()
          .then(response=>{
              this.chartData=response.data;
                var element = [],list=[];
                for(let i=0;i<this.chartData.length;i++){
                    element=[this.chartData[i]._id,this.chartData[i].total]
                    this.cart.push(element);
                    list.push(this.chartData[i]._id)
                }
                let k=this.cart.length-1;
                console.log(k);
                for(let j=1;j<13;j++){
                    if(!list.includes(j))
                    {
                      this.cart.push([j,0]);
                    }
                  }
                this.cart.sort();
          })
      }

  }
}
</script>
<style>

</style>
