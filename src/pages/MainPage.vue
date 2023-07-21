<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RandomRecipes></RandomRecipes>
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    <!-- {{ !$root.store.username }} -->
    <span v-else >
      <div class="last">last viewed recipes:</div>
      
      <LastViewed></LastViewed>
    </span>
  </div>
</template>

<script>
import LastViewed from '../components/LastViewed.vue';
import RandomRecipes from '../components/RandomRecipes.vue';
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name:"MainPage",
  components: {
    // RecipePreviewList,
    RandomRecipes,
    LastViewed,
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.last{
  font-size: 30px;
}
</style>
