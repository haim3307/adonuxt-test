<template>
  <form
    ref="billingAndShippingForm"
    @submit.prevent="onSubmit($event)"
    novalidate
    id="billingAndShippingForm"
    data-vv-scope="ship_bill_form"
  >
    <div class="row">
      <div class="billing-form-wrap col-lg-8">
        <div class="row">
          <div
            class="col-md-6"
            v-for="(inputVal,inputKey) in inputs.input"
            :key="'ship_' +inputKey"
          >
            <!-- {{JSON.stringify(userData['ship_'+inputKey])}} -->
            <single-input-item
              :label="typeof inputVal == 'object' &&  ('label' in  inputVal) ? inputVal.label:inputKey.replace('_',' ')"
              :name="'ship_'+inputKey"
              :validate="inputVal.validate"
              :mode="'ship'"
            ></single-input-item>
          </div>
          <div class="col-md-6">
            <single-input-item
              v-if="!initialData.is_logged_in"
              label="Email Address"
              name="email"
              validate="required|email|email_exists"
              mode
              :delay="1000"
            ></single-input-item>
          </div>
          <!-- {{JSON.stringify(userData)}} -->
          <div
            class="col-md-6"
            v-for="(selectVal,selectKey) in inputs.select"
            :key="'ship_' + selectKey"
          >
            <single-select-item
              :options="selectVal.options"
              :name="'ship_' + selectKey"
              :label="selectVal.label"
              :parent="selectVal.parent"
              :parent-id="selectVal.parent_id"
              :mode="'ship'"
            ></single-select-item>
          </div>
          <div class="checkout-box-wrap col-12" v-if="!initialData.is_logged_in">
            <div class="single-input-item">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="create_pwd"
                  name="create_pwd"
                  v-model="create_pwd"
                >
                <label class="custom-control-label" for="create_pwd">Create an account?</label>
              </div>
            </div>
            <div class="account-create single-form-row row">
              <p class="col-md-12">
                Create an account by entering the information below. If you are a returning
                customer please login at the top of the page.
              </p>
              <div class="col-md-6">
                <single-input-item
                  v-if="create_pwd"
                  label="Account Password"
                  name="password"
                  validate="required|min:6"
                  mode
                  type="password"
                ></single-input-item>
              </div>
            </div>
          </div>
          <div class="checkout-box-wrap col-12">
            <div class="single-input-item">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="same_shipping"
                  v-model="source.same_shipping"
                  name="same_shipping"
                >
                <label
                  class="custom-control-label"
                  for="same_shipping"
                >Billing Address is the same as shipping?</label>
              </div>
            </div>
            <div class="ship-to-different single-form-row" v-if="!source.same_shipping">
              <div class="row">
                <div
                  class="col-md-6"
                  v-for="(inputVal,inputKey) in inputs.input"
                  :key="'bill_' + inputKey"
                >
                  <single-input-item
                    :label="typeof inputVal == 'object' &&  ('label' in  inputVal) ? inputVal.label:inputKey.replace('_',' ')"
                    :name="'bill_'+inputKey"
                    :validate="inputVal.validate"
                    :mode="'bill'"
                  ></single-input-item>
                </div>
                <div
                  class="col-md-6"
                  v-for="(selectVal,selectKey) in inputs.select"
                  :key="'bill_' + selectKey"
                >
                  <single-select-item
                    :options="selectVal.options"
                    :name="'bill_' + selectKey"
                    :label="selectVal.label"
                    :parent="selectVal.parent"
                    :parent-id="selectVal.parent_id"
                    :mode="'bill'"
                  ></single-select-item>
                </div>
              </div>
            </div>
            <div class="custom-control custom-checkbox" v-if="!initialData.is_logged_in">
              <input
                type="checkbox"
                class="custom-control-input"
                id="terms"
                name="checkout_agree_checkBox"
                v-validate.immediate
                ref="checkout_agree_checkBox"
                required="true"
                v-model="source.checkout_agree_checkBox"
              >
              
              <label
                class="custom-control-label"
                :class="{'text-danger':agree_touched && errors.has('checkout_agree_checkBox','ship_bill_form') }"
                @click="agree_touched = true"
                for="terms"
              >
                I have read and agree to the website
                <a
                  href="#" style="color:blue"
                >terms and conditions.</a>
                <span class="text-danger">*</span>
              </label>
            </div>
          </div>

          <!--                                                <div class="single-input-item col-md-6">
                                                                                                                        <label for="ordernote">Order Note</label>
                                                                                                                        <textarea name="ordernote" id="ordernote" cols="30" rows="1"
                                                                                                                                    placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
          </div>-->
        </div>
      </div>
      <slot></slot>
    </div>
  </form>
</template>

<script>
import SingleInputItem from "~/components/forms/SingleInputItem";
import SingleSelectItem from "~/components/forms/SingleSelectItem";
import { debug } from "util";

export default {
  inject: ["$validator",'source'],
  data(){
      return {
        create_pwd:false,
        agree_touched:false
      };
  },
  provide() {
    return {
      formScope: "ship_bill_form"
    };
  },
  props: ["inputs"],
  mounted(){debugger;this.$refs},
  components: { SingleInputItem, SingleSelectItem },
  computed: {
    initialData() {
      return this.$store.state.initialData;
    }
  },
  methods: {
    onSubmit(e) {
      debugger;
      this.agree_touched = true;
      this.forms.onSubmit(this, e, false);
    },
    onSelectChange(e, mode = "ship", selectKey) {
      this.source[`${mode}_${selectKey}`] = e;
    }
  }
};
</script>

<style>
</style>
