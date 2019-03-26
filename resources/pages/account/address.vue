<template>
 <AccountPanel>
   <div id="account-info">
     <div class="myaccount-content">
       <h3 class="d-flex justify-content-between align-items-center" v-b-toggle.shipping variant="primary">
         Shipping Address
       </h3>
       <div class="account-details-form">
         <b-collapse id="shipping" v-model="showShippingForm">
           <b-card>
             <div class="checkout-billing-details-wrap">
               <form @submit.prevent="onsubmit" method="post" data-vv-scope="address_form">
                 <div class="row">
                   <div class="col-md-6" v-for="(inputVal,inputKey) in inputs.input"
                        :key="'ship_' +inputKey">
                     <single-input-item
                       :label="typeof inputVal == 'object' &&  ('label' in  inputVal) ? inputVal.label:inputKey.replace('_',' ')"
                       :name="'ship_'+inputKey"
                       :validate="inputVal.validate"
                       :mode="'ship'"
                     ></single-input-item>
                   </div>
                   <div v-for="(selectVal,selectKey) in inputs.select"
                        :key="'ship_' + selectKey"
                        class="col-md-6"
                   >
                     <single-select-item
                       :options="selectVal.options"
                       :name="'ship_' + (selectVal.alias?selectVal.alias:selectKey)"
                       :label="selectVal.label"
                       :parent="selectVal.parent"
                       :parent-id="selectVal.parent_id"
                       :mode="'ship'"
                       :source="userData"
                     ></single-select-item>

                   </div>
                 </div>
                 <div class="single-input-item">
                   <button class="btn-login btn-add-to-cart">Save Changes</button>
                 </div>
               </form>

             </div>
           </b-card>
         </b-collapse>
       </div>
     </div>
   </div>
 </AccountPanel>
</template>

<script>
    import AccountPanel from "../../layouts/nested/AccountPanel";
    import SingleInputItem from "../../components/forms/SingleInputItem";
    import SingleSelectItem from "../../components/forms/SingleSelectItem";
    export default {
      provide(){
        return {
          formScope:'address_form',
          source:this.userData
        }
      },
      components: {SingleInputItem, SingleSelectItem,AccountPanel},
      data(){
        return {
          showShippingForm: true,
          inputs:[]
        }
      },
      async asyncData({$axios, state}) {
        return await $axios.$get("/api/users/address.json", {});
      },
      methods:{
        async onsubmit(e){
           await this.$store.dispatch('address_form',this.userData);
        }
      }
    }
</script>

<style scoped>

</style>
