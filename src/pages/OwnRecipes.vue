<template>
    <div class="row" id="recipes">
    <div class="recipe-container" v-for="r in recipes" :key="r.id">
      <RecipePreview
        :recipe="{
          id: r.id,
          title: r.title,
          readyInMinutes: r.readyInMinutes,
          image: r.image,
          aggregateLikes: r.aggregateLikes,
            viewed:r.viewed,
            favorite:r.favorite,
            glutenFree:r.glutenFree,
            vegan:r.vegan,
            vegetarian:r.vegetarian,
            own:true,
          key: r.id
        }"
      ></RecipePreview>
    </div>
    </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue';
export default {
    name: 'OwnRecipes',
    components:{
        RecipePreview,
    },
    data() {
        return{
           recipes: [],
        }
    },

    mounted() {
        this.updateRecipes()
    },

    methods: {
        async updateRecipes(){
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
                this.recipes = [];
                this.recipes.push(...recipes);
                console.log(recipes)
            }catch(error){
                console.log(error);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
#recipes {
        height: 50%;
    justify-content: center;
}
.recipe-container {
  width: 20%;
  height: auto; 
  margin: 20px;
}
</style>