<template>
  <div class="clearfix">
    <Stock v-for="stock in stocks" :stock="stock" v-if="showMode === 'grid'"></Stock>
    <table class="table" v-if="showMode === 'list'">
      <tbody>
        <StockList v-for="stock in stocks" :stock="stock"></StockList>
      </tbody>
    </table>
  </div>
</template>
<script>
  import Stock from './Stock.vue';
  import StockList from './StockList.vue';
  export default {
    props: ['stocks', 'showMode'],
    components: {
      Stock,
      StockList
    },
  }
</script>