<template>
  <div id="page-content-wrapper" class="p-9">
    <div class="container">
      <!-- Cart Page Content Start -->
      <div class="row">
        <div class="col-lg-12">
          <!-- Cart Table Area -->
          <div class="cart-table table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="pro-thumbnail">Thumbnail</th>
                  <th class="pro-title">Product</th>
                  <th class="pro-price">Price</th>
                  <!--                            <th class="pro-quantity">Quantity</th>
                  <th class="pro-subtotal">Total</th>-->
                  <th class="pro-remove">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  is="cart-row"
                  v-for="orderItem in $store.state.initialData.orderItems"
                  :key="orderItem.id"
                  :order-item="orderItem"
                ></tr>
              </tbody>
            </table>
          </div>

          <!-- Cart Update Option -->
          <!--                <div class="cart-update-option d-block d-lg-flex">
                    <div class="apply-coupon-wrapper">
                        <form action="#" method="post" class=" d-block d-md-flex">
                            <input type="text" placeholder="Enter Your Coupon Code"/>
                            <button class="btn-add-to-cart">Apply Coupon</button>
                        </form>
                    </div>
                    <div class="cart-update">
                        <a href="#" class="btn-add-to-cart">Update Cart</a>
                    </div>
          </div>-->
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 ml-auto">
          <!-- Cart Calculation Area -->
          <div class="cart-calculator-wrapper">
            <h3>Cart Totals</h3>
            <div class="cart-calculate-items">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <td>Sub Total</td>
                    <td>${{order.subtotal_price}}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>{{order.insuranceAndHandlingPrice}}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="total-amount" v-html="order.total_price"></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="cta-button">
              <nuxt-link to="/checkout" class="btn-add-to-cart">Proceed To Checkout</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Cart Page Content End -->
    </div>
  </div>
</template>

<script>
import CartRow from "~/components/CartRow";
export default {
  components: {
    CartRow
  },
  async asyncData({ $axios, state }) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return await $axios.$get("/api/cart/index.json", {});
  },
  computed: {
    initialData() {
      return this.$store.state.initialData;
    },
    order(){
        return this.initialData.order;
    }
  }
};
</script>

<style lang="scss">
    @import '~assets/scss/pages/page-imports';
    @import '~assets/scss/pages/cart';
</style>
