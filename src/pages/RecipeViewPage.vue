<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <b-card class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div class="recipe-favorite" v-if="$root.store.username">
            <img v-if="this.heart" class="heart-icon" :src="require('../assets/h1.png')">
            <img v-else class="heart-icon-hollow" :src="require('../assets/h2.png')" @click="makeFavorite()">
            </div>
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
            <div>servings: {{ recipe.servings }}</div>
            <i class="gluten">{{ recipe.glutenFree ? 'Gluten-Free' : 'Has Gluten' }}</i>
            <span align="center" class="veg">
            <i v-if="recipe.vegan">vegan</i>
            <i v-else-if="recipe.vegetarian">vegetarian</i>
            </span>
          </div>
          <div class="wrapped">
            Instructions:
            <!-- {{recipe.instructions}} -->
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>

          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      heart:false
    };
  },
  methods:{
    async makeFavorite() {
          console.log(this.recipe)
          try {
            const response = await this.axios.post("http://localhost:3000/users/favorites",

              {
                recipeId:this.$route.params.recipeId
              }
            );
            this.recipe.favorite = true
            this.heart = true
            console.log(response);
          } catch (err) {
            console.log(err.response);
          }
        },
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        console.log(this.$route.params.recipeId)
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          "http://localhost:3000/recipes/"+this.$route.params.recipeId,
          {
            // params: { recipeId: this.$route.params.recipeId }
          }
        );
        console.log(response.data);
        // console.log("response.status", response.status);
        // if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log(response.data)
      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        favorite
      } = response.data;
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        favorite
      };

      this.recipe = _recipe;
      this.heart = this.recipe.favorite;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
  margin-right: 20px;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.heart-icon{
  width: 10%;
  /* height: 5vh; */
  float: right;
}
.heart-icon-hollow{
  width: 10%;
  /* height: 5vh; */
  float: right;
  cursor: pointer;

}
.recipe-body{
  opacity: 0.8;
}
</style>
