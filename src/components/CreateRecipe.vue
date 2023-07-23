<template>
        <b-modal
        id="modal"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="$emit('close')"
        @ok="handleOk"
        >
        <form ref="form" @submit.prevent="handleSubmit">
            <b-form-group label="title" label-for="name-input" invalid-feedback="title is required">
            <b-form-input
                id="title-input"
                :state=isInputEmpty(title)
                v-model="title"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-group label="image" label-for="image-input" invalid-feedback="image is required">
            <b-form-input
                id="image-input"
                :state=isInputEmpty(image)
                v-model="image"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-group label="Time To Make:" label-for="readyInMinutes" invalid-feedback="time is required">
            <b-form-input
                type="number"
                id="readyInMinutes"
                v-model="readyInMinutes"
                :state=isInputEmptyNum(readyInMinutes)
                min="1"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-checkbox id="1" v-model="vegan" name="vegan" value="true" unchecked-value=false>Vegan</b-form-checkbox>
            <b-form-checkbox id="2" v-model="vegetarian" name="vegetarian" value=true unchecked-value=false>vegetarian</b-form-checkbox>
            <b-form-checkbox id="3" v-model="glutenFree" name="glutenFree" value="true" unchecked-value=false>gluten Free</b-form-checkbox>
            <b-form-group label="Servings" label-for="Servings" invalid-feedback="Servings is required">
            <b-form-input
                type="number"
                id="servings"
                :state=isInputEmptyNum(servings)
                min="1"
                v-model="servings"
                required
            ></b-form-input>
            </b-form-group>
            Ingredients
            <b-form-textarea
                id="ingredients"
                placeholder="Ingredients"
                v-model="ingredients"
                ref="ingredients"
                rows="3"
            ></b-form-textarea>
            Instructions
            <b-form-textarea
                id="instructions"
                placeholder="Instructions"
                v-model="instructions"
                ref="instructions"
                rows="3"
            ></b-form-textarea>
            
        </form>
        <div id="success" v-if="this.show">Recipe created</div>
        </b-modal>
</template>

<script>
export default {
    name: 'CreateRecipe',

    data() {
        return {
            title:null,
            image:null,
            readyInMinutes:null,
            vegan:false,
            vegetarian:false,
            glutenFree:false,
            servings:null,
            ingredients:null,
            instructions:null,
            listing:[],
            listinst:[],
            show:false

        };
    },

    mounted() {
        this.$nextTick(() => {
      this.$refs.modal.show();
    });
    },
      props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.modal.show();
        });
      } else {
        this.$refs.modal.hide();
      }
    },
  },

    methods: {
      isInputEmpty(inputValue) {
      if(inputValue === null){
        return null;
      };
      return inputValue !== "";
    },
    isInputEmptyNum(inputValue) {
      if(inputValue === null){
        return null;
      };
      return inputValue !== "" && inputValue > 0;
    },
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.title=null
        this.image=null
        this.readyInMinutes=null
        this.vegan = false
        this.vegetarian = false
        this.servings = null
        this.glutenFree = false
        this.ingredients =null
        this.instructions = null
        this.listing=[]
        this.listinst=[]
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      modalshow() {
        this.$bvModal.show()
      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.listing = this.ingredients.split('\n').filter(Boolean);
        this.listinst = this.instructions.split('\n').filter(Boolean);
        try {
        
        const response = await this.axios.post(
          "http://localhost:3000/users/createRecipe",
          {
            title: this.title,
            image: this.image,
            readyInMinutes: this.readyInMinutes,
            vegetarian: this.vegetarian,
            vegan: this.vegan,
            glutenFree: this.glutenFree,
            ingredients: this.listing,
            instructions: this.listinst,
            servings: this.servings,
            description: ""
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err.response);
        window.alert("This recipe name already exists, please try the name more specific");
        this.title=null
        return;
        // this.form.submitError = err.response.data.message;
      }
        // Hide the modal manually
        this.$nextTick(() => {
          this.show=true;
          setTimeout(() => {
            this.show=false;
            this.$bvModal.hide('modal');
          }, 1000);

        })
      }
    },
};
</script>

<style lang="scss" scoped>

</style>