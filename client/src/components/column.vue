<template>
  <div id="app">
  <column-chart :data="cart" label="revenue par mois"></column-chart>
 <!-- <line-chart :data="cart" label="revenue par mois" ></line-chart><br>
  <pie-chart :data="cart" ></pie-chart>-->
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
                for(let j=1;j<10;j++){
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

