<template>
  <drag class="stocks-list__item" :transferData="{
    type: 'portfolio',
    stock: stock,
    quantity: quantity,
  }" :draggable="(quantity<=0 || quantity>stock.quantity) ? false : true">
    <td>
      <h3 class="panel-title">
        <router-link to="/stock-details/{stock.id}">
          {{stock.name}}
          ({{ stock.quantity }} @ {{stock.price | currency}})
          <span v-html="getStockMargin(stock.id, stock.quantity, stock.price)"></span>
        </router-link>
      </h3>
    </td>
    <td class="text-right">
      <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" min="0" />
      <button class="btn btn-success" @click="sellStock" :disabled="quantity<=0 || quantity>stock.quantity">Sell</button>
    </td>
  </drag>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { Drag } from '../../library/vue-drag-drop.browser';
  export default {
    props: ['stock'],
    data: () => {
      return {
        quantity: 0,
        drag: true,
      }
    },
    components: {
      Drag,
    },
    computed: {
      ...mapGetters({
        stocks: 'stocks',
      })
    },
    methods: {
      ...mapActions({ sellStockAction: 'sellStock' }),
      sellStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: parseInt(this.quantity)
        }

        // use mapActions as alternative to dispatch
        this.sellStockAction(order);
        // which is the same as:
        // this.$store.dispatch('sellStock',order);
        this.quantity = 0;
      },
      getStockMargin(id, quantity, ownedPrice) {
        const currentPrice = this.stocks.find(element => element.id === this.stock.id).price;
        const marginNum = (ownedPrice - currentPrice) / ownedPrice * 100;
        const marginText = marginNum !== 0 ?
                          '<span class="' + (marginNum < 0 ? 'text-danger' : '') + '">' + Number(marginNum).toFixed(2)  + '%</span>' :
                          '';

        return marginText;
      }
    }
  }
</script>

<style>
  .stocks-list__item {
    display: table-row;
  }

  .stocks-list__item > td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
  }

  .stocks-list__item .form-control {
    display: inline-block;
    zoom: 1;
    width: 200px;
  }
</style>