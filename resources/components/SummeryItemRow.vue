<template>
  <tr>
    <td class="text-center">
      <a href="#" class="d-block text-center" v-html="orderItem.title"></a>
    </td>
    <td>
      <strong v-html="orderItem.price"></strong>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["orderItem"],
  created: function() {},
  mounted: function() {},
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
