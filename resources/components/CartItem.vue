<template>
    <div>
        <figure class="product-thumb">
            <a :href="product.url">
                <img class="img-fluid" :src="product.img" alt="Products"/>
            </a>
        </figure>

        <div class="product-details">
            <h2><a :href="product.url" v-html="product.title"></a></h2>
            <div class="cal d-flex align-items-center">
                <span class="quantity">1</span>
                <span class="multiplication">X</span>
                <span class="price" v-html="product.price"></span>
            </div>
        </div>
        <a href="#" class="remove-icon" @click.prevent="$store.dispatch('removeFromCart',product.productOrderId)"><i class="fa fa-trash-o"></i></a>
    </div>
</template>

<script>
    export default {
        name: "cart-item",
        props: ['product'],
        data: function () {
            return {}

        }
    }
</script>

<style scoped>

</style>