<template>
    <div class="">
        <input type="checkbox" class="d-none productCheckBox" :id="'p-' + product.id">
        <label :for="'p-' + product.id" class="single-product-item text-center w-100" @click="addToCartDash(this,product)" :class="{selectedDashItem:inDash}">
            <!--style="min-height: 283px;"-->
            <figure class="product-thumb animated fadeIn" v-show="imageStatus" style="display: none;">
                <nuxt-link :to="product.url">
                <img class="img-fluid" :src="itemImage"  alt="" @error="itemImageHandler" @load="imageStatus = imageStatus == 'loaded' ? 'defaultLoaded' : 'loaded'">
                </nuxt-link>
                <figcaption
                        v-show="itemImage == product.default_img"
                        class="text-capitalize"
                >
                    sample image
                </figcaption>
            </figure>

            <figure v-show="imageStatus == 'defaultLoading'" class="product-thumb justify-content-center align-items-center animated fadeIn" style="min-width: 168px;display: flex">
                <a style="    margin: 27px;">
                    <div class="lds-ripple"><div></div><div></div></div>
                </a>
            </figure>

            <div class="product-details col">
                <div class="product-headline" style="margin: 0;">
                    <h2 class="d-block">
                        <a style="color: black;" :href="product.url">
                        {{product.title}}
                        </a>
                    </h2>
                    <span class="price d-block" v-html="product.price" >{{product.price}}</span>
                </div>
                <!--<div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half"></i>
                    <i class="fa fa-star-o"></i>
                </div>-->

                <div class="products-desc row p-2 col-md-12">

                    <ul class="row product-desc-table col-12">
                        <li class="color col"><span>color</span>         <hr>{{product.color}}</li>
                        <li class="color col" v-if="product.cut"><span>cut</span>           <hr>{{product.cut}}</li>
                        <li class="color col"><span>clarity</span>       <hr>{{product.clarity}}</li>
                        <li class="color col"><span>shape</span>         <hr>{{product.shape}}</li>
                        <li class="color col"><span>symmetry</span>      <hr>{{product.symmetry}}</li>
                        <li class="color col"><span>polish</span>        <hr>{{product.polish}}</li>
                        <li class="color col"><span>table</span>         <hr>{{product.table}}</li>
                        <li class="color col"><span>depth</span>         <hr>{{product.depth}}</li>
                        <!--                            <li class="color col"><span>girdle</span>        <hr>{{product.girdle}}</li>
                        -->                         <li class="color col" v-if="product.culet"><span>culet</span>        <hr>{{product.culet}}</li>
                        <li class="color col"><span>fluorescence</span>  <hr>{{product.fluorescence}}</li>
                        <li class="color col"><span>measurements</span>  <hr>{{product.measurements}}</li>
                    </ul>
                </div>
                <div class="gallery-product-actions">
                    <a class="btn btn-add-to-cart" @click.self="emitAddToCart();$event.stopPropagation()" href="javascript:void(0)">+ Add to Cart</a>

                    <!--                    <a href="single-product.html" class="btn btn-add-to-cart btn-whislist">+
                                            Wishlist</a>
                                        <a href="single-product.html" class="btn btn-add-to-cart btn-compare">+
                                            Compare</a>-->
                </div>
            </div>

            <div class="product-meta">
                <button type="button" @click.stop="quickItemChange($event)">
                    <span data-toggle="tooltip" data-placement="left" title="Quick View">
                        <i class="fa fa-compress"></i>
                    </span>
                </button>
                <button type="button" @click.stop="quickItemChange($event)">
                    <span data-toggle="tooltip" data-placement="left" class="socialShareProduct">
                        <i class="fa fa-share-alt" title="Social Share"></i>
                        <social-sharing :url="product.url"
                                        title="The Progressive JavaScript Framework"
                                        description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                                        quote="Vue is a progressive framework for building user interfaces."
                                        hashtags="vuejs,javascript,framework"
                                        twitter-user="vuejs"
                                        inline-template>
                            <div class="vue-social-sharing">
                                <network network="facebook" class="socialItem">
                                    <i class="fa fa-facebook"/>
                                </network>
                                <network network="whatsapp" class="socialItem">
                                    <i class="fa fa-whatsapp"/>
                                </network>
                                <network network="googleplus" class="socialItem">
                                    <i class="fa fa-google-plus"/>
                                </network>
                                           
                            </div>
                        </social-sharing>

                    </span>
                </button>
                <!--            <a href="#" data-toggle="tooltip" data-placement="left"
                               title="Add to Wishlist"><i
                                        class="fa fa-heart-o"></i></a>
                            <a href="#" data-toggle="tooltip" data-placement="left" title="Compare"><i
                                        class="fa fa-tags"></i></a>-->
            </div>
            <!--        <span class="product-bedge sale">Sale</span>-->
        </label>
    </div>
</template>

<script>
    import ApiService from '../services/apiService';


    export default {
        name: "gallery-item",
        props: {product:{},DashMode:{default:false}},
        data() {
            return {
                inDash : false,
                itemImage : false,
                imageStatus: false,
                source:this.$parent,
            }
        },
        created(){
            if(typeof this.product !== "undefined")
            {
                this.itemImage = this.product.img;
            }
        },
        methods:{
            addToCartDash(product) {
                if(this.DashMode) this.source.addToCartDash(this,product);
            },
            addToCart() {
                this.$store.dispatch('saveToCart',this.product);
            },
            sendCartDash(e) {
                e.stopPropagation();
                this.source.sendCartDash(this);
            },
            quickItemChange(e){
                this.$root.$emit('quickItemChange',this.product);
            },
            itemImageHandler() {
                this.imageStatus = 'defaultLoading';
                this.itemImage = this.product.default_img;
            },
            emitAddToCart(){
                this.$emit('addToCart',this);
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>