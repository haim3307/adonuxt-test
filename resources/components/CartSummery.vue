<template>
  <div class="col-lg-4 mt-5 mt-lg-0 pb-5">
    <div class="order-summary-details">
      <h2>Your Order Summary</h2>
      <div class="order-summary-content">
        <!-- Order Summary Table -->
        <div class="order-summary-table table-responsive text-center">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Products</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr
                is="SummeryItemRow"
                v-for="orderItem in initialData.orderItems"
                :key="orderItem.id"
                :order-item="orderItem"
              ></tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Sub Total</td>
                <td>
                  <strong>${{order.subtotal_price}}</strong>
                </td>
              </tr>

              <tr>
                <td>Shipping</td>
                <td>
                  FREE
                </td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>
                  <strong v-html="order.total_price"></strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="order-payment-method">
        <div class="summary-footer-area">
          <button class="btn-add-to-cart text-capitalize" v-html="btn" type="submit"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SummeryItemRow from "~/components/SummeryItemRow";
export default {
  components: {
    SummeryItemRow
  },
  props: ["btn", "mode"],
  created: function() {},
  mounted: function() {},
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    initialData() {
      return this.$store.state.initialData;
    },
    order() {
      return this.initialData.order;
    }
  }
};
</script>

<style>
</style>
