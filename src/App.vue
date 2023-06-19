<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">RecipeSite</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'main' }">Vue Recipes</b-nav-item>
            <b-nav-item :to="{ name: 'search' }" >Search</b-nav-item>
            <!-- <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
            <router-link :to="{ name: 'search' }">Search</router-link>    -->
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" right>
            <span v-if="!$root.store.username" >
              <b-navbar-nav >
                <b-navbar-brand>Hello Guest</b-navbar-brand>
                <b-nav-item :to="{ name: 'register' }" >Register</b-nav-item>
                <b-nav-item :to="{ name: 'login' }" >Login</b-nav-item>
              </b-navbar-nav>
            </span>
            <span v-else>
              {{ $root.store.username }}: <button @click="Logout">Logout</button>|
            </span>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <router-view />
  </div>
  
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #002fff;
  min-height: 100vh;
}

.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link:focus{
      color:#e43b08!important
    }
#nav a.router-link-exact-active {
  color: #191df7;
}
</style>
