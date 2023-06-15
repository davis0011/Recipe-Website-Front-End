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
           recipes: [
                        {
                            id: 641726,
                            title: "Dulce De Leche Brownies",
                            readyInMinutes: 45,
                            image: "https://spoonacular.com/recipeImages/641726-556x370.jpg",
                            aggregateLikes: 29
                        },
                        {
                            id: 651389,
                            title: "Medenjaci - Croatian Honey Spice Cookies",
                            readyInMinutes: 45,
                            image: "https://spoonacular.com/recipeImages/651389-556x370.jpg",
                            aggregateLikes: 6
                        }
                        ],
        }
    }
};
</script>

<style lang="scss" scoped>

</style>