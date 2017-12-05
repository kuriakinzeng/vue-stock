<template>
  <div class="stocks-list__wrapper" v-bind:class="pageMode === 'multi' ? 'stocks-list__wrapper--multiple' : ''">
    <StocksTools v-on:changeShowMode="handleShowModeChange" v-on:changePageMode="handlePageModeChange"></StocksTools>

    <Stocks :stocks="stocks" v-if="pageMode === 'single'" :showMode="showMode"></Stocks>

    <div class="stocks-multiple-window" v-if="pageMode === 'multi'">
      <drop class="stocks-multiple-window__view"
        v-bind:class="dropStocksActive ? 'drop-allowed' : ''"
        @drop="handleDropPortfolio"
      >
        <h2 class="stocks-multiple-window__title">
          Stocks
        </h2>
        <Stocks :stocks="stocks" :showMode="showMode"></Stocks>

        <div class="stocks-multiple-window__drop-overlay">
          <span>Sell</span>
        </div>
      </drop>
      
      <drop class="stocks-multiple-window__view"
        v-bind:class="dropPortfolioActive ? 'drop-allowed' : ''"
        @drop="handleDropStocks"
      >
        <h2 class="stocks-multiple-window__title">
          Portfolio
        </h2>
        <Portfolio :stocks="portfolio" :showMode="showMode"></Portfolio>

        <div class="stocks-multiple-window__drop-overlay">
          <span>Buy</span>
        </div>
      </drop>

    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import Stocks from './Stocks.vue';
  import Portfolio from '../portfolio/Portfolio.vue';
  import StocksTools from '../StocksTools.vue';
  import { Drop } from '../../library/vue-drag-drop.browser';
  export default {
    data () {
      return {
        pageMode: sessionStorage.getItem('pageMode') === 'multi' ? 'multi' : 'single',
        showMode: sessionStorage.getItem('showMode') === 'list' ? 'list' : 'grid',
        dropStocksActive: false,
        dropPortfolioActive: false,
      }
    },
    components: {
      Stocks,
      StocksTools,
      Portfolio,
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
.stocks-list__wrapper--multiple {
  position: relative;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
}

.stocks-multiple-window__drop-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 50px;
  text-align: center;
  background: #999;
  opacity: .8;
  color: #fff;
}

.drop-allowed .stocks-multiple-window__drop-overlay span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.drop-allowed .stocks-multiple-window__drop-overlay {
  display: block;
}

.stocks-list__wrapper--multiple .stocks-list__tools {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.stocks-list__wrapper--multiple .stocks-multiple-window {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex: 1 0 0;
  flex: 1 0 0;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
}

.stocks-multiple-window__view {
  height: 50%;
  padding: 0 0 10px;
  overflow-y: auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.stocks-multiple-window__view + .stocks-multiple-window__view {
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.stocks-multiple-window__view:after {
  display:block;clear:both;content:"";
}

.stocks-multiple-window__title {
  margin: 0 0 15px;
  padding-left: 15px;
  font-size: 16px;
}
</style>