<template>
  <div style=" ">
    <div class="login-register-wrapper container" style="max-width:800px">
      <nav class="nav login-reg-tab-menu mt-5">
          <nuxt-link id="login-tab" to="/sign-in">Sign In</nuxt-link>
          <nuxt-link id="register-tab" to="/join-us">Join Us</nuxt-link>
      </nav>
      <div style="   min-height: 50vh;" class="tab-content d-flex align-items-center justify-content-center" id="login-reg-tabcontent">
        <div class="login-reg-form-wrap">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  @import "~assets/scss/pages/login-register";
</style>
