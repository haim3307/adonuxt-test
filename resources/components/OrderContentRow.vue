<template>
  <tr>
    <td colspan="5">
      <b-collapse v-model="$parent.showOrder" id="OrderCOll">
        <b-card>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th class="pro-thumbnail">Thumbnail</th>
              <th class="pro-title">Product</th>
              <th class="pro-price">Price</th>
              <!--                            <th class="pro-quantity">Quantity</th>
                                          <th class="pro-subtotal">Total</th>-->
<!--
              <th class="pro-remove">Remove</th>
-->
            </tr>
            </thead>
            <tbody class="cart-rows">
            <tr is="cart-row" v-for="orderProduct in order.order_products" v-if="orderProduct" :order-item="orderProduct" :key="orderProduct.id" :orderMode="true">

            </tr>
            </tbody>
          </table>
        </b-card>
      </b-collapse>
    </td>
  </tr>
</template>

<script>
  import CartRow from './CartRow.vue';
  export default {
    components:{CartRow},
    props: ['order'],
    mounted() {

    },
    data(){
      return {

      }
    },
    computed:{

    }
  }
</script>

<style>
  .cart-rows td:first-child{
    width: 10%;
  }
  .cart-rows td:nth-child(2){
    width: 60%;
  }
  .cart-rows td:nth-child(3){
    width: 15%;
  }
</style>
