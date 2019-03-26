<template>
  <tr class="table-row">
    <td>{{ order.id }}</td>
    <td>{{ $moment(order.created_at.date).fromNow() }}</td>
    <td>{{order.shipping_status}}</td>
    <td v-html="order.total_price"></td>
    <td>
      <button class="btn-add-to-cart" variant="primary"
              @click="$emit('toggleOrder')">View
      </button>

    </td>
  </tr>
</template>

<script>
  export default {
    props: ['order'],
    name: "OrderRow"
  }
</script>

<style scoped>

</style>
