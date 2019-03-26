<template>
  <tr>
    <td colspan="5" class="p-0">
      <table class="w-100 table table-borderless" border="0" style="    border-collapse: collapse;
    border-spacing: 0;">
        <order-row :order="order" @toggleOrder="toggleOrderDetails"></order-row>
        <order-content-row :order="order"></order-content-row>
      </table>
    </td>
  </tr>
</template>

<script>
  import OrderRow from "./OrderRow";
  import OrderContentRow from "./OrderContentRow";

  export default {
    props: ['order'],
    name: "SingleOrderRows",
    components: {OrderContentRow, OrderRow},
    data(){
      return {
        showOrder: false
      }
    },
    methods: {
      toggleOrderDetails()
      {
        this.showOrder = !this.showOrder;
      }
    }
  }
</script>

<style scoped>

</style>
