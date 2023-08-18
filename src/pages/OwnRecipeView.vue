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
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe._ingredients"
                :key="index"
              >
                {{ r }}
              </li>
            </ul>
            <div>servings: {{ recipe.servings }}</div>
            <i class="gluten">{{ recipe.glutenFree ? 'Gluten-Free' : 'Has Gluten' }}</i>
            <br>
            <span align="center" class="veg">
            <i v-if="recipe.vegan">vegan</i>
            <i v-else-if="recipe.vegetarian">vegetarian</i>
            </span>
          </div>
          <div class="wrapped">
            Instructions:
            <!-- {{recipe.instructions}} -->
            <ul>
              <li
                v-for="(r, index) in recipe.listinst"
                :key="index"
              >
                {{ r }}
              </li>
            </ul>

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
      recipe: null
    };
  },
  async created() {
    try {

      try{
                const response = await this.axios.get("http://localhost:3000/users/own",
                );
                const recipes = response.data.map((r)=>{
                    return{
                        id:r.recipe_id,
                        title: r.title,
                        readyInMinutes:r.readyInMinutes,
                        image:r.image,
                        aggregateLikes:r.popularity,
                        viewed:r.viewed,
                        servings:r.servings,
                        favorite:r.favorite,
                        glutenFree:r.glutenFree,
                        vegan:r.vegan,
                        vegetarian:r.vegetarian,
                        ingredients:r.ingredients,
                        instructions:r.instructions
                    };
                });
                recipes.forEach(element => {
                    console.log(element)
                    if(element.id == this.$route.params.recipeId)
                    {
                        this.recipe = element
                    }
                });
                // console.log(this.recipe)
            }catch(error){
                console.log(error);
            }
            console.log(this.recipe)
      let {
        instructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        favorite,
        vegetarian,
        vegan,
        glutenFree
      } = this.recipe;

        const _ingredients = ingredients.map((step, index) => {
        // const ingredientName = `${index + 1} `;
        return step;
        });

        const listinst = instructions.split(',').filter(Boolean);
        console.log(listinst)
        console.log(_ingredients)
      let _recipe = {
        listinst,
        instructions,
        _ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        vegetarian,
        vegan,
        glutenFree,
        favorite
      };

      this.recipe = _recipe;
      console.log(this.recipe)
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
}
.recipe-body{
  opacity: 0.8;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.heart-icon{
  width: 30%;
  /* height: 5vh; */
  /* float: right; */
}
.heart-icon-hollow{
  width: 10%;
  /* height: 5vh; */
  /* float: right; */
}
/* .recipe-header{

} */
</style>
