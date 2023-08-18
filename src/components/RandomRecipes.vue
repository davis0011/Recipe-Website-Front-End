<template>
    <div class="row">
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
    name: 'RandomRecipes',
    components:{
        RecipePreview,
    },
    data(){
        return{
           recipes: [],
        }
    },
    mounted(){
        this.updateRecipes();
    },
    methods:{
        async updateRecipes(){
            try{
                const response = await this.axios.get("http://localhost:3000/recipes/rand",
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
            }catch(error){
                console.log(error);
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>