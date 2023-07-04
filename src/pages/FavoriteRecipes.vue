<template>
    <div>
        <RecipePreview
        v-for="r in recipes"
        :recipe="{
            id:r.id,
            title:r.title,
            readyInMinutes:r.readyInMinutes,
            image:r.image,
            aggregateLikes:r.aggregateLikes,
            key:r.id}"
        :key="r.id"></RecipePreview>
    </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue';
export default {
    name: 'FavoriteRecipes',
    components:{
        RecipePreview,
    },
    data() {
        return{
           recipes: [],
        }
    },

    mounted() {
        updateRecipes()
    },

    methods: {
        async updateRecipes(){
            try{
                const response = await this.axios.get("http://localhost:3000/users/favorite",
                );
                const recipes = response.data.map((r)=>{
                    return{
                        id:r.id,
                        title: r.title,
                        readyInMinutes:r.readyInMinutes,
                        image:r.image,
                        aggregateLikes:r.aggregateLikes,
                    };
                });
                this.recipes = [];
                this.recipes.push(...recipes);
            }catch(error){
                console.log(error);
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>