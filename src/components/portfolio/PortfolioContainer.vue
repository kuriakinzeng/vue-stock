<template>
  <div class="stocks-list__wrapper" v-bind:class="pageMode === 'multi' ? 'stocks-list__wrapper--multiple' : ''">
    <StocksTools v-on:changeShowMode="handleShowModeChange" v-on:changePageMode="handlePageModeChange"></StocksTools>

    <Portfolio :stocks="portfolio" v-if="pageMode === 'single'" :showMode="showMode"></Portfolio>

    <div class="stocks-multiple-window" v-if="pageMode === 'multi'">
      <drop class="stocks-multiple-window__view"
        v-bind:class="dropPortfolioActive ? 'drop-allowed' : ''"
        @drop="handleDropStocks"
      >
        <h2 class="stocks-multiple-window__title">
          Portfolio
        </h2>
        <Portfolio :stocks="portfolio" :showMode="showMode"></Portfolio>
      </drop>
      <drop class="stocks-multiple-window__view"
        v-bind:class="dropStocksActive ? 'drop-allowed' : ''"
        @drop="handleDropPortfolio"
      >
        <h2 class="stocks-multiple-window__title">
          Stocks
        </h2>
        <Stocks :stocks="stocks" :showMode="showMode"></Stocks>
      </drop>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import Portfolio from './Portfolio.vue';
  import Stocks from '../stocks/Stocks.vue';
  import StocksTools from '../StocksTools.vue';
  import { Drop } from '../../library/vue-drag-drop.browser';
  export default {
    data () {
      return {
        pageMode: sessionStorage.getItem('pageMode') === 'multi' ? 'multi' : 'single',
        showMode: sessionStorage.getItem('showMode') === 'list' ? 'list' : 'grid',
        over: false,
        dropStocksActive: false,
        dropPortfolioActive: false,
      }
    },
    components: {
      Portfolio,
      StocksTools,
      Stocks,
      Drop
    },
    computed: {
      ...mapGetters({
        portfolio: 'portfolio',
        stocks: 'stocks',
      })
    },
    methods: {
      ...mapActions({ sellStockAction: 'sellStock' }),

      handlePageModeChange(newPageMode){
        this.pageMode = newPageMode;
      },
      handleShowModeChange(newShowMode){
        this.showMode = newShowMode;
      },

      handleDropStocks(data) {

        this.over = false;
        this.dropPortfolioActive = false;

        if(data.type !== 'stock') return false;

        this.buyStock(data);
      },

      handleDropPortfolio(data) {

        this.over = false;

        if(data.type !== 'portfolio') return false;

        this.sellStock(data);
      },

      buyStock(data) {
        const order = {
          stockId: data.stock.id,
          stockPrice: data.stock.price,
          quantity: parseInt(data.quantity)
        }
        this.$store.dispatch('buyStock',order);
        data.quantity = 0;
      },
      sellStock(data) {
        const order = {
          stockId: data.stock.id,
          stockPrice: data.stock.price,
          quantity: parseInt(data.quantity)
        }

        // use mapActions as alternative to dispatch
        this.sellStockAction(order);
        // which is the same as:
        // this.$store.dispatch('sellStock',order);
        data.quantity = 0;
      }
    }
  }
</script>

<style>
</style>