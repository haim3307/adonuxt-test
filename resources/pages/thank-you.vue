<template>
  <div class="layout_checkout container mb-5">
    <div class="thanks mt-5">
      <div class="container">
        <div class="row" style="line-height:2">
          <a class="continue uppercase col-12" href="/">{{texts['continue-shopping-label']}}</a>
          <div class="title uppercase col-12"></div>
          <div class="order-number-wrap col-12">
            <p>
              {{texts['order-number']}}
              <span class="order-num">{{order.id}}</span>
            </p>
            <p>
              {{texts['confirmation-email']}}
              <span class="link">{{user.email}}</span>
            </p>
            <a class="link click uppercase" href="/orders/">{{texts['view-print-order']}}</a>
          </div>
          <div
            class="content col-md-7"
          >{{'thank-you-wire-payment' in texts?texts['thank-you-wire-payment']:''}}</div>
        </div>
      </div>
    </div>
    <div class="insuring-wrap col-12" style="line-height:2.2">
      <div class="insuring-box">
        <div class="info-title-wrap">
          <div class="mini-title uppercase" v-html="texts['insurance-title']"></div>
        </div>
        <div class="content-wrap-box">
          <div class="row">
            <div class="content-wrap col-md-12">
              <p class="paragraph" v-html="texts['insuring-purchase-cont']"></p>
              <div class="bottom-info" v-html="texts['thankyou-bottom-cont']"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  async asyncData({ $axios, redirect }) {
    return await $axios.$get("/api/cart/thankyou.json", {});
  },
  computed: {
    initialData() {
      return this.$store.state.initialData;
    },
    order() {
      return this.initialData.order;
    },
    user() {
      return this.initialData.user;
    }
  }
};
</script>

<style>
</style>
