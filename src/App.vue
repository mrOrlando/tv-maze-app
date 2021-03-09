<template>
  <div id="app">
    <div id="nav">
      <router-link :to="homeUrl">Home</router-link> |
      <router-link :to="aboutUrl">About</router-link>
    </div>
    <NotificationContainer />
    <router-view />
  </div>
</template>

<script>
import { ROUTE_NAMES } from '@/router';
import NotificationContainer from '@/components/NotificationContainer.vue';

export default {
  name: 'App',

  components: {
    NotificationContainer,
  },

  computed: {
    homeUrl() {
      return { name: ROUTE_NAMES.HOME };
    },

    aboutUrl() {
      return { name: ROUTE_NAMES.ABOUT };
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.-text-error {
  color: tomato;
}

-text-success {
  color: lightgreen;
}
</style>
