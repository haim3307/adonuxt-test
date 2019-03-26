<template>
  <span
    class="alert alert-danger"
    v-show="msg && field && field.touched && !field.valid"
  >{{msg|msgFilter}}</span>
</template>

<script>
export default {
  inject: { $validator: "$validator", formScope: "formScope" },
  props: {
    mode: { default: "" },
    name: {},
    msg: {}
  },
  computed: {
    formFields() {
      return this.fields["$" + this.formScope]
        ? this.fields["$" + this.formScope]
        : {};
    },
    field() {
      return this.formFields[this.name];
    },
    formErrors() {
      return this.$validator.errors;
    }
  },
  filters: {
    msgFilter(value) {
      return value
        ? value
            .replace("bill_", "")
            .replace("ship_", "")
            .replace("_", " ")
        : "";
    }
  }
};
</script>

<style>
.alert {
  width: fit-content;
}
</style>
