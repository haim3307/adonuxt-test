<template>
  <div>
    <div class="alert alert-danger mb-5 text-center position-absolute" style="width: 100%;" v-show="showError">
      {{errorMsg}}
    </div>
    <login-register-layout>
      <form
        novalidate
        name="login_form"
        ref="login_form"
        action="/api/users/login"
        method="post"
        id="login_form"
        @submit.prevent="onSubmit"
        data-vv-scope="login_form"
      >
        <div class="row">
          <div class="col-12">
            <single-input-item
              label="Email Address"
              name="email"
              validate="required|email"
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
                <ErrorMsg name="password" :msg="$validator.errors.first('password','login_form')"></ErrorMsg>
              </template>
            </single-input-item>
          </div>
        </div>
        <a is="nuxt-link" to="/recover-password" class="forget-pwd mt-4 d-block">Forgot your password?</a>

        <div class="single-input-item">
          <button class="btn-login">Login</button>
        </div>
      </form>
    </login-register-layout>
  </div>
</template>

<script>
import LoginRegisterLayout from "~/layouts/nested/LoginRegister";
import SingleInputItem from "~/components/forms/SingleInputItem";
import ErrorMsg from "~/components/forms/ErrorMsg.vue";
export default {
  inject: { $validator: "$validator" },

  provide() {
    return {
      source: this.user,
      formScope: "login_form"
    };
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      showError:false,
      errorMsg:'Wrong email or password'
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
      this.$store
        .dispatch("login", this.user)
        .then(() => {
          debugger;
          this.$router.back();
          this.showError = false;
        })
        .catch(() => {
          debugger;
          this.showError = true;
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

<style>
</style>
