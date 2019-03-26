<template>
  <login-register-layout>
    <form
      id="account_reg_form"
      @submit.prevent="onSubmit"
      ref="account_reg_form"
      name="account_reg_form"
      novalidate="true"
      data-vv-scope="reg_form"
    >
      <div class="row">
        <div class="col-md-6">
          <single-input-item
            label="First Name"
            name="bill_first_name"
            validate="required"
            mode
            :delay="1000"
            @input="onInput"
          ></single-input-item>
        </div>
        <div class="col-md-6">
          <single-input-item
            label="Last Name"
            name="bill_last_name"
            validate="required"
            mode
            :delay="1000"
            @input="onInput"
          ></single-input-item>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <single-input-item
            label="Email Address"
            name="email"
            validate="required|email|email_exists"
            mode
            :delay="1000"
            @input="onInput"
          ></single-input-item>
        </div>
        <div class="col-12">
          <single-input-item label="Password" name="password" mode type="password">
            <input
              type="password"
              v-validate.immediate="'required|min:6'"
              placeholder=" "
              ref="password"
              name="password"
              @input="onInput"
            >
            <template v-slot:error>
              <ErrorMsg name="password" :msg="$validator.errors.first('password','reg_form')"></ErrorMsg>
            </template>
          </single-input-item>
        </div>
        <div class="col-12">
          <single-input-item label="Confirm Password" name="password-again" mode type="password">
            <input
              type="password"
              placeholder=" "
              v-validate.immediate="'confirmed:password'"
              name="password-again"
              @input="onInput"
            >
            <template v-slot:error>
              <ErrorMsg name="password-again" :msg="$validator.errors.first('password-again','reg_form')"></ErrorMsg>
            </template>
          </single-input-item>
        </div>
      </div>
      <div class="single-input-item">
        <div class="login-reg-form-meta">
          <div class="remember-meta">
            <div class="custom-control custom-checkbox" style="display: none;">
              <input
                type="checkbox"
                class="custom-control-input"
                id="registerAgreeCheckBox"
                name="registerAgreeCheckBox"
                v-model="user.registerAgreeCheckBox"
                checked
              >
              <label class="custom-control-label" for="subnewsletter">agree_gdpr
                <!-- <?= text('agree_gdpr') ?> -->
              </label>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link to="/sign-in" class="forget-pwd">Already have a user?</nuxt-link>

      <div class="single-input-item">
        <button class="btn-login" type="submit">Register</button>
      </div>
    </form>
  </login-register-layout>
</template>

<script>
import LoginRegisterLayout from "~/layouts/nested/LoginRegister";
import SingleInputItem from "~/components/forms/SingleInputItem";
import ErrorMsg from "~/components/forms/ErrorMsg.vue";
export default {
  inject: { $validator: "$validator"},

  provide(){
    return {
      formScope:'reg_form',
      source: this.user
    };
  },
  data() {
    return {
      user: {
        bill_first_name: "",
        bill_last_name: "",
        email: "",
        password: "",
        "password-again": "",
        registerAgreeCheckBox: "on"
      }
    };
  },
  components: {
    ErrorMsg,
    SingleInputItem,
    LoginRegisterLayout
  },
  methods: {
    onSubmit(e) {
      this.forms.onSubmit(this, e, false);
      this.$store.dispatch("register", this.user)
      .then(()=>{debugger;
        this.$router.back();  
      })
      .catch(()=>{
          debugger;
      });

    },
    onInput(e) {
      if (e) {
        this.user[e.target.name] = e.target.value;
      }
    }
  }
};
</script>
