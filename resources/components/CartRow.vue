<template>
    <tr>
        <td class="pro-thumbnail">
            <nuxt-link to="orderItem.url">
                <img class="img-fluid" :src="orderItem.img" alt="Product"/>
            </nuxt-link>
        </td>
        <td class="pro-title">

            <div class="d-flex justify-content-between align-items-center" :class="DescTabState == 'open'?'pb-5 pt-5':'pb-3'" style="cursor: pointer;">
                <div class="col-md-1"></div>
                <nuxt-link :to="(typeof orderItem.url == 'string'?orderItem.url:'/')" class="col d-block text-center text-capitalize" v-html="orderItem.title + ' ( Clarity: ' + orderItem.clarity + ' , Polish: ' + orderItem.polish + ' , color: ' + orderItem.color + ' )'">

                </nuxt-link>
                <!--                                            <hr class="animated fadeIn" v-show="DescTabState != 'open'">
                -->
                <div @click="toggleDescription()" style="margin-top: 1px;">
                    <span v-show="DescTabState != 'open'"><span class="fa fa-plus"></span></span>
                    <span v-show="DescTabState == 'open'"><span class="fa fa-minus"></span></span>
                </div>
                <hr class="animated fadeIn" v-show="DescTabState == 'open'">
            </div>
            <item-attrs style="overflow: hidden;transition: 0.4s all" :product="orderItem" grid-class="col-md-3" :style="DescTabState == 'open' ? 'height:300px;overflow-y:scroll;' : 'height:0;padding:0 !important;'" class="animate slideInUp"></item-attrs>

        </td>
        <td class="pro-price"><span v-html="orderItem.price"></span></td>

        <!--                            <td class="pro-quantity">
                                        <div class="pro-qty"><input type="text" value="1"></div>
                                    </td>
                                    <td class="pro-subtotal"><span>$295.00</span></td>-->
        <td class="pro-remove" v-if="!orderMode"><!--<a :href="'/api/cart/' + orderItem.productOrderId + '/remove?redirect=cart/index'"><i class="fa fa-trash-o"></i></a>--></td>
    </tr>
</template>

<script>
export default {
    props: {'orderItem':{},'orderMode':{default:false}},
    created(){
    },
    mounted(){
    },
    data () {
        return {
            DescTabState:false
        }
    },
    methods:{
        toggleDescription () {
            this.DescTabState = this.DescTabState == 'open' ? 'closed' : 'open';
        }
    },
}
</script>

<style>

</style>
