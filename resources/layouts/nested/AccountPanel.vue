<template>
  <div id="page-content-wrapper" class="p-9">
    <div class="ruby-container">
      <div class="row">
        <div class="col-lg-12">
          <!-- My Account Page Start -->
          <div class="myaccount-page-wrapper">
            <!-- My Account Tab Menu Start -->
            <div class="row">
              <div class="col-lg-3">
                <div class="myaccount-tab-menu nav" role="tablist">
                  <nuxt-link exact to="/account"><i class="fa fa-dashboard"></i>
                    Panel
                  </nuxt-link>

                  <nuxt-link exact to="/account/details"><i class="fa fa-user"></i> Account Details</nuxt-link>
                  <nuxt-link exact to="/account/orders"><i class="fa fa-cart-arrow-down"></i>Orders</nuxt-link>
                  <!--                                <a href="#payment-method" data-toggle="tab"><i class="fa fa-credit-card"></i> Payment
                                                      Method</a>

                                                  -->
                  <nuxt-link to="/account/address"><i class="fa fa-map-marker"></i> address</nuxt-link>
                  <a href="#" @click="$store.dispatch('logout')"><i class="fa fa-sign-out"></i> Logout</a>
                  <a style="min-height: 55px;"></a>
                  <a style="min-height: 55px;"></a>
                  <a style="min-height: 55px;"></a>
                </div>
              </div>
              <!-- My Account Tab Menu End -->

              <!-- My Account Tab Content Start -->
              <div class="col-lg-9 mt-5 mt-lg-0">
                <div class="tab-content" id="myaccountContent">
                  <slot>

                  </slot>
                </div>
              </div>
              <!-- My Account Tab Content End -->
            </div>
          </div>
          <!-- My Account Page End -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AccountPanel"
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/_variables";
  .nuxt-link-active{
    background-color: $brand-color;
    color: white;
  }
</style>
