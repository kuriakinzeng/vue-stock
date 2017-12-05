<template>
  <nav class="navbar navbar-default stocks-list__tools">
    <div class="container-fluid">
      <div class="pull-left">
        <button class="btn btn-default btn-sm btn-view-single" v-bind:class="pageMode === 'single' ? 'active' : ''" @click="setPageMode('single')"></button>
        <button class="btn btn-default btn-sm btn-view-grid" v-bind:class="pageMode === 'multi' ? 'active' : ''" @click="setPageMode('multi')"></button>
      </div>
      <div class="pull-right">
        <button class="btn btn-default btn-sm" v-bind:class="showMode === 'grid' ? 'active' : ''" @click="setShowMode('grid')">
          <i class="fa fa-th-large" aria-hidden="true"></i>
        </button>
        <button class="btn btn-default btn-sm" v-bind:class="showMode === 'list' ? 'active' : ''" @click="setShowMode('list')">
          <i class="fa fa-th-list" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        pageMode: sessionStorage.getItem('pageMode') === 'multi' ? 'multi' : 'single',
        showMode: sessionStorage.getItem('showMode') === 'list' ? 'list' : 'grid',
      }
    },
    components: {
    },
    computed: {
    },
    methods: {
      setPageMode(newPageMode){
        this.pageMode = newPageMode;
        this.$emit('changePageMode', newPageMode);

        sessionStorage.setItem('pageMode', newPageMode);
      },
      setShowMode(newShowMode){
        this.showMode = newShowMode;
        this.$emit('changeShowMode', newShowMode);

        sessionStorage.setItem('showMode', newShowMode);
      }
    }
  }
</script>