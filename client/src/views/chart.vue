<template>
  <div>

    <br>
    <br>
    <v-btn x-large color="success" dark type="button" class="button-18" @click="bar();">
      diagramme en bâtons
    </v-btn>&nbsp;&nbsp;&nbsp;
    <v-btn x-large color="success" dark type="button" class="button-18" @click="lin();">
      Diagramme linéaire
    </v-btn>&nbsp;&nbsp;&nbsp;
    <v-btn x-large color="success" dark type="button" class="button-18" @click="pie();">
      Diagramme circulaire
    </v-btn>
    <br>
    <br>
    <div id="lin" style="display:block">
      <h3>diagramme en bâtons</h3>
      <line-chart :data="cart" label="revenue par mois"></line-chart>
    </div>

    <div id="bar" style="display:block">
      <h3>Diagramme linéaire</h3>
      <columnVue />

    </div>

    <div id="pie" style="display:block">
      <h3 text="center">Diagramme circulaire</h3>
      <pie-chart :data="cart" label="revenue par mois"></pie-chart><br>

    </div>
  </div>
</template>
<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderDataService from "/services/OrderDataService";
import columnVue from "@/components/column.vue"
export default {
  name: 'App',
  data() {
    return {
      /* chartData:{
      } */
      cart: []
    }
  },
  components: {
    columnVue
  },
  created() {
    this.fetchContacts();
  },

  methods: {
    lin() {
      document.getElementById("lin").style.display = "block";
      document.getElementById("bar").style.display = "none";
      document.getElementById("pie").style.display = "none";
    }, bar() {
      document.getElementById("bar").style.display = "block";
      document.getElementById("lin").style.display = "none";
      document.getElementById("pie").style.display = "none";
    }, pie() {
      document.getElementById("lin").style.display = "none";
      document.getElementById("bar").style.display = "none";
      document.getElementById("pie").style.display = "block";
    }, fetchContacts() {
      OrderDataService.incomes()
        .then(response => {
          this.chartData = response.data;
          console.log('this.chartData', this.chartData)
          var element = [], list = [];
          for (let i = 0; i < this.chartData.length; i++) {
            element = [this.chartData[i]._id, this.chartData[i].total]
            this.cart.push(element);
            list.push(this.chartData[i]._id)
          }
          let k = this.cart.length - 1;
          console.log(k);
          for (let j = 1; j < 10; j++) {
            if (!list.includes(j)) {
              this.cart.push([j, 0]);
            }
          }
          this.cart.sort();
        })
    }
  }
}
</script>
