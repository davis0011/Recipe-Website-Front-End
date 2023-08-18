<template>
        <div :class="dynamicNum">
        <RecipePreview
        v-for="r in recipes"
        :recipe="{
            id:r.id,
            title:r.title,
            readyInMinutes:r.readyInMinutes,
            image:r.image,
            aggregateLikes:r.aggregateLikes,
            viewed:r.viewed,
            favorite:r.favorite,
            glutenFree:r.glutenFree,
            vegan:r.vegan,
            vegetarian:r.vegetarian,
            own:false,
            key:r.id}"
        :key="r.id"
        
        >
        </RecipePreview>
        </div>
</template>

<script>
import RecipePreview from './RecipePreview.vue'
export default {
    name: 'LastViewed',
    components:{
        RecipePreview,
    },
    data(){
        return{
            recipes: [],
            dynamicNum: 'row',

        }
    },
    mounted(){
        this.updateRecipes();
    },
    methods:{
        async updateRecipes(){
            try{
                const response = await this.axios.get("http://localhost:3000/users/last",
                );
                const recipes = response.data.map((r)=>{
                    return{
                        id:r.id,
                        title: r.title,
                        readyInMinutes:r.readyInMinutes,
                        image:r.image,
                        aggregateLikes:r.popularity,
                        viewed:r.viewed,
                        favorite:r.favorite,
                        glutenFree:r.glutenFree,
                        vegan:r.vegan,
                        vegetarian:r.vegetarian
                    };
                });
                this.recipes = [];
                this.recipes.push(...recipes);
                if(this.recipes.length != 3){
                    this.dynamicNum = "recipe-grid"
                }
                else{
                    this.dynamicNum = "row"
                }
            }catch(error){
                console.log(error);
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}
</style>