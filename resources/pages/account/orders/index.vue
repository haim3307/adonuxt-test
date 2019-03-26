<template>
  <!-- Single Tab Content Start -->
  <AccountPanel>
    <div class="myaccount-content">
      <h3>Orders</h3>

      <div class="myaccount-table table-responsive text-center">
        <table class="table table-bordered">
          <thead class="thead-light">
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <template v-for="order in orders">
            <single-order-rows :order="order"></single-order-rows>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </AccountPanel>

</template>

<script>
  import AccountPanel from "../../../layouts/nested/AccountPanel";
  import CartRow from "~/components/CartRow";
  import SingleOrderRows from "../../../components/SingleOrderRows";

  export default {
    components: {SingleOrderRows, AccountPanel, CartRow},
    mounted(){
    },
    async asyncData({$axios, state}) {
      return await $axios.$get("/api/orders/list.json", {});
    }
  }
</script>

<style>
  .myaccount-table table td, .myaccount-table .table td{

  }
  myaccount-table .table-row{
    margin: 0 -15px;
    display: table-row;
  }
  .myaccount-table td{
    width: 20%;
  }
</style>
