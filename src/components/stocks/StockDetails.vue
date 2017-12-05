<template>
  <div class="">
    <h3>
      Stock Details
    </h3>
    <h2>
      {{ stock.name }}
    </h2>

    <h3>
      {{ stock.price | currency }}
    </h3>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data: () => {
      return {
        quantity: 0,
        stock: {},
        paramID: 0,
      }
    },
    // use computed to watch the store 
    computed: {
      ...mapGetters({
        stocks: 'stocks',
      }),
      funds(){
        return this.$store.getters.funds;
      },
      insufficientFunds(){
        return this.quantity * this.stock.price > this.funds;
      }
    },
    created(){
      this.paramID = this.$route.params.id;
    },
    mounted(){
      this.stock = this.stocks.find(element => element.id == this.paramID);
    },
    methods: {
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: parseInt(this.quantity)
        }
        this.$store.dispatch('buyStock',order);
        this.quantity = 0;
      }
    }
  }
</script>