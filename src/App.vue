<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">RecipeSite</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'main' }">Main Page Recipes</b-nav-item>
            <b-nav-item :to="{ name: 'search' }" >Search</b-nav-item>
            <span v-if="$root.store.username">
              <b-nav-item-dropdown text="My Cookbook" right>
                <b-dropdown-item :to="{ name: 'favorites' }" >Favorites</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'own' }" >own</b-dropdown-item>
                <b-dropdown-item :to="{ name:'family' }">family</b-dropdown-item>
              </b-nav-item-dropdown>
            </span>
            <b-nav-item @click="showModal">Create Recipe</b-nav-item>
            <b-nav-item :to="{ name: 'about' }" >About</b-nav-item>
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
     <CreateRecipe v-if="isModalVisible" @close="closeModal" />
  </div>
  
</template>

<script>
import CreateRecipe from './components/CreateRecipe.vue';
export default {
  name: "App",
  components: {
      CreateRecipe,
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
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
  color: #000000;
  min-height: 100vh;
  background-image: url('./assets/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow-x: hidden;

}

.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link:focus{
      color:#e43b08!important
    }
#nav a.router-link-exact-active {
  color: #191df7;
}
</style>
