<template>
  <div id="page-content-wrapper" class="p-9">
    <!--== Checkout Page Content Area ==-->
    <div class="ruby-container">
      <div class="row">
        <div class="col-12">
          <div class="checkoutaccordion row" id="checkOutAccordion">
            <div class="col-12">
              <div class="card" v-if="!initialData.is_logged_in">
                <h3>
                  Returning Customer?
                  <span v-b-toggle.login-accordion>Click Here To Login</span>
                </h3>

                <b-collapse id="login-accordion">
                  <div class="card-body">
                    <p>
                      If you have shopped with us before, please enter your details in the boxes below. If
                      you are a new customer, please proceed to the Billing &amp; Shipping section.
                    </p>
                    <div class="login-reg-form-wrap">
                      <form action="#" method="post">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="single-input-item">
                              <input type="email" placeholder="Enter your Email" required>
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="single-input-item">
                              <input type="password" placeholder="Enter your Password" required>
                            </div>
                          </div>
                        </div>

                        <div class="single-input-item">
                          <div
                            class="login-reg-form-meta d-flex align-items-center justify-content-between"
                          >
                            <div class="remember-meta">
                              <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="rememberMe">
                                <label class="custom-control-label" for="rememberMe">
                                  Remember
                                  Me
                                </label>
                              </div>
                            </div>

                            <a href="#" class="forget-pwd">Forget Password?</a>
                          </div>
                        </div>

                        <div class="single-input-item">
                          <button class="btn-login">Login</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </b-collapse>
              </div>
              <div class="card">
                <div>
                  <h3 v-b-toggle.shipping-and-billing variant="primary">Shipping Details</h3>
                  <b-collapse
                    id="shipping-and-billing"
                    v-model="showShippingDetails"
                    v-if="showShippingDetails"
                  >
                    <b-card>
                      <div class="checkout-billing-details-wrap">
                        <h2>Shipping Details</h2>
                        <shipping-and-billing-form
                          :inputs="inputs"
                          @submit="customerPost"
                        >
                          <cart-summery :btn="'continue'" :mode="'shippingAndBilling'"></cart-summery>
                        </shipping-and-billing-form>
                      </div>
                    </b-card>
                  </b-collapse>
                </div>

                <!-- Order Summary Details -->
              </div>

              <div class="card">
                <h3 v-b-toggle.payment-method>Payment Method</h3>

                <b-collapse
                  id="payment-method"
                  v-model="showPaymentOptions"
                  v-if="showPaymentOptions"
                >
                  <div class="card-body">
                    <!-- Order Payment Method -->
                    <div class="container-fluid">
                      <form
                        class="row"
                        method="post"
                        style="    height: fit-content;"
                        @submit.prevent="paymentOptionPost"
                      >
                        <div class="order-payment-method col-lg-8">
                          <div class="single-payment-method">
                            <div class="payment-method-name">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="directbank"
                                  name="payment_option"
                                  value="ph"
                                  class="custom-control-input"
                                  :checked="!order.payment_method.code || order.payment_method.code == 'ph'"
                                >
                                <label class="custom-control-label" for="directbank">Phone Transfer</label>
                              </div>
                            </div>
                            <div class="payment-method-details" data-method="ph">
                              <p>
                                Make your payment directly into our bank account. Please use your Order ID as the
                                payment reference. Your order will not be shipped until the funds have cleared
                                in our account..
                              </p>
                            </div>
                          </div>

                          <div class="single-payment-method">
                            <div class="payment-method-name">
                              <div class="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="paypalpayment"
                                  name="payment_option"
                                  value="pp"
                                  class="custom-control-input"
                                  :checked="order.payment_method.code == 'pp'"
                                >
                                <label class="custom-control-label" for="paypalpayment">
                                  Paypal
                                  <img
                                    src="~assets/img/layout/paypal-784404.svg"
                                    class="img-fluid paypal-card"
                                    alt
                                  >
                                </label>
                              </div>
                            </div>
                            <div class="payment-method-details" data-method="pp">
                              <p>
                                Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                account.
                              </p>
                            </div>
                          </div>
                        </div>
                        <cart-summery class="col-lg-4" :btn="'continue'" :mode="'paymentMethod'"></cart-summery>
                      </form>
                    </div>
                  </div>
                </b-collapse>
              </div>
              <div class="card">
                <h3 v-b-toggle.review-order>Review Order</h3>

                <b-collapse
                  id="review-order"
                  data-parent="#checkOutAccordion"
                  v-model="showPlaceOrder"
                  v-if="showPlaceOrder"
                >
                  <form @submit.prevent="placeOrderPost" method="post" class="card-body d-flex">
                    <!-- Order Payment Method -->
                    <div class="order-payment-method col-md-8" style="padding-top: 17px">
                      <div class="mt-2 mb-4">
                        <div class="container-fluid">
                          <div class="row">
                            <div class="summery-section p-3 ship-to col-md-4">
                              <div class="info-title-wrap">
                                <div class="title uppercase">
                                  <!-- <?/*= text('ship-to-title') */?> -->
                                  Shipping Address:
                                </div>
                              </div>
                              <div class="content-wrap">
                                <div class="name">{{order.ship_first_name}} {{order.ship_last_name}}</div>
                                <div class="street">
                                  <!-- <?= $this->order->ship_address ?> -->
                                  {{order.ship_address}}
                                </div>
                                <div
                                  class="zip-code"
                                >{{order.ship_city}}, {{order.ship_state?order.ship_state.name:''}} {{order.ship_zipcode}}</div>
                                <div class>{{order.ship_country.name}}</div>
                              </div>
                              <div class="edit-det uppercase">
                                <!-- <? if($this->order->payment_method->id != 5): ?>
                                                                    <a href="<?= seo('/cart/customer', 'ssl')?>" class="edit" ><?= text('w-edit')?></a>
                                <? endif ?>-->
                              </div>
                            </div>
                            <div class="summery-section p-3 ship-to col-md-4">
                              <div class="info-title-wrap">
                                <div class="title uppercase">
                                  <!-- <?/*= text('bill-to-title') */?> -->
                                  Billing Address:
                                </div>
                              </div>
                              <div class="content-wrap">
                                <div class="name">{{order.bill_first_name}} {{order.bill_last_name}}</div>
                                <div class="street">
                                  <!-- <?= $this->order->ship_address ?> -->
                                  {{order.bill_address}}
                                </div>
                                <div
                                  class="zip-code"
                                >{{order.bill_city}}, {{order.bill_state?order.bill_state.name:''}} {{order.bill_zipcode}}</div>
                                <div class>{{order.bill_country.name}}</div>
                              </div>
                              <div class="edit-det uppercase">
                                <!-- <?/* if($this->order->payment_method->id != 5): */?>
                                                                    <a href="<?/*= seo('/cart/customer', 'ssl')*/?>" class="edit" ><?/*= text('w-edit')*/?></a>
                                <?/* endif */?>-->
                              </div>
                            </div>
                            <div class="summery-section p-3 ship-to col-md-4">
                              <div class="info-title-wrap">
                                <div class="title uppercase">
                                  <!-- <?/*= text('payment-type-title') */?> -->
                                  Payment Method:
                                </div>
                              </div>
                              <div class="content-wrap">
                                <div class="card-number">
                                  <span class="type uppercase">
                                    <!-- <?= text('pay-method-' . ($this->order->payment_method->id??1)) ?> -->
                                    {{order.payment_method.code == 'ph' || !order.payment_method.code ?'Phone Order':'Paypal'}}
                                  </span>
                                  <!-- <?php if (null !== ($cc_details = $this->order->cc_details())): ?>
                                                                        <span class="number">
                                                                            <?= $this->order->cc_type_name() ?><br/>
                                                                        </span>
                                  <?php endif; ?>-->
                                </div>
                              </div>
                              <div class="edit-det uppercase">
                                <!-- <? if($this->order->payment_method->id != 5): ?>
                                                                    <a href="<?= seo('/cart/payment', 'ssl')?>" class="edit"><?= text('w-edit')?></a>
                                <? endif ?>-->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="cart-table table-responsive">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th class="pro-thumbnail">Thumbnail</th>
                              <th class="pro-title">Product</th>
                              <th class="pro-price">Price</th>
                              <!--                            <th class="pro-quantity">Quantity</th>
                              <th class="pro-subtotal">Total</th>-->
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              is="cart-row"
                              v-for="orderItem in initialData.orderItems"
                              :key="orderItem.id"
                              :order-item="orderItem"
                              :orderMode="true"
                            ></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <cart-summery :btn="'place order'" :mode="'reviewOrder'"></cart-summery>
                  </form>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--== Checkout Page Content End ==-->
  </div>
</template>

<script>
import ShippingAndBillingForm from "~/components/forms/ShippingAndBillingForm";
import CartSummery from "~/components/CartSummery";
import CartRow from "~/components/CartRow";
export default {
  scrollToTop: true,
  provide(){
    return {
      source:this.userData
    }
  },
  data() {
    return {
      orderSteps: {
        shippingDetails: false,
        paymentOptions: false,
        placeOrder: false
      }
    };
  },

  components: {
    CartRow,
    ShippingAndBillingForm,
    CartSummery
  },
  computed: {
    initialData() {
      return this.$store.state.initialData;
    },
    showShippingDetails: {
      get() {
        debugger;

        return !this.orderSteps.shippingDetails;
      },
      set(newVal) {
        /*  debugger;
          this.orderSteps.shippingDetails = oldVal; */
      }
    },
    showPaymentOptions: {
      get() {
        return (
          !this.orderSteps.paymentOptions && this.orderSteps.shippingDetails
        );
      },
      set() {}
    },
    showPlaceOrder: {
      get() {
        return (
          !this.orderSteps.placeOrder &&
          this.orderSteps.paymentOptions &&
          this.orderSteps.shippingDetails
        );
      },
      set(newVal) {
        debugger;
      }
    }
  },
  async asyncData({ $axios, redirect }) {
    let data = await $axios.$get("/api/cart/one_page_checkout.json", {});
    if (!data) redirect(301, "/cart");
    return data;
  },
  methods: {
    async customerPost(e) {
      debugger;
      let result = await this.$store.$axios.$post(
        "/api/cart/one_page_checkout_post",
        { ...this.userData, same_shipping: this.userData.same_shipping }
      );
      if (result) {debugger;
        this.orderSteps.shippingDetails = result.orderSteps.shippingDetails;
        this.orderSteps.paymentOptions = result.orderSteps.paymentOptions;
        this.orderSteps.placeOrder = result.orderSteps.placeOrder;
        this.userData = result.userData;
        this.initialData.is_logged_in = result.is_logged_in;
        this.initialData.user = result.user;
      }
    },
    async paymentOptionPost(e) {
      let result = await this.$store.$axios.$post(
        "/api/cart/payment_post",
        new FormData(e.target)
      );
      debugger;
      if (result) {
        this.orderSteps.shippingDetails = result.orderSteps.shippingDetails;
        this.orderSteps.paymentOptions = result.orderSteps.paymentOptions;
        this.orderSteps.placeOrder = result.orderSteps.placeOrder;
        this.order = result.order;
      }
    },
    async placeOrderPost(e) {
      let result = await this.$store.$axios.$post("/api/cart/review_post");
      debugger;

      if (result) {
        debugger;
        this.initialData.orderItems = [];
        await this.$router.push("/thank-you");
      }
    }
  }
};
</script>

<style>
</style>
