<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <img v-if="recipe.favorite" class="heart-icon" src="https://icon-library.com/images/small-heart-icon/small-heart-icon-0.jpg">
            <img v-else class="heart-icon-hollow" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Heart_icon_red_hollow.svg/497px-Heart_icon_red_hollow.svg.png">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
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
            <!-- <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol> -->

          </div>
        </div>
      </div>
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
      let response;
      // response = this.$route.params.response;

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
