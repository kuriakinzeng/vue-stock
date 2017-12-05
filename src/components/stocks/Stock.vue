<template>
  <drag class="col-sm-6 col-md-4" :transferData="{
    type: 'stock',
    stock: stock,
    quantity: quantity,
  }"
  :draggable="(insufficientFunds || quantity<=0) ? false : true"
  @dragend="quantity=0"
  >
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          <router-link :to="{
            path: '/stock-details/' + stock.id,
          }">
            {{stock.name}}
            <small>@ {{stock.price | currency}}</small>
          </router-link>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" min="0" />
        </div>
        <div class="pull-right">
          <button class="btn btn-info" @click="buyStock" :disabled="insufficientFunds || quantity<=0">Buy</button>
        </div>
      </div>
    </div>
  </drag>
</template>

<script>
  import { Drag } from '../../library/vue-drag-drop.browser';
  export default {
    props: ['stock'],
    data: () => {
      return {
        quantity: 0
      }
    },
    components: {
      Drag,
    },
    // use computed to watch the store 
    computed: {
      funds(){
        return this.$store.getters.funds;
      },
      insufficientFunds(){
        return this.quantity * this.stock.price > this.funds;
      }
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