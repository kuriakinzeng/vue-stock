<template>
  <div class="container">
    <AppHeader></AppHeader>
    <div class="row">
      <div class="col-md-12">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
export default {
  components: {
    AppHeader
  }, 
  created(){
    // Vue instance is created in the lifecycle
    this.$store.dispatch('initStocks');
  },
  mounted(){
    // sessionStorage.clear();
  }
}
</script>

<style>

html,
body,
.container,
.container > .row > div,
.stocks-list__wrapper {
  height: 100%;
}

body {
}

.header {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.container {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  min-height: 576px;
}

.container > .row {
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

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}
@keyframes slide-in {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-30px); opacity: 0; }
}

.stocks-list__tools {
  min-height: 0;
  padding: 10px 0;
}

.btn-view-single:before,
.btn-view-grid:before,
.btn-view-grid:after {
  content: '';
  display: block;
  background: #999;
}

.btn-view-single:before {
  width: 15px;
  height: 17px;
}

.btn-view-grid:before {
  width: 15px;
  height: 8px;
  margin-bottom: 1px;
}

.btn-view-grid:after {
  width: 15px;
  height: 8px;
}
</style>