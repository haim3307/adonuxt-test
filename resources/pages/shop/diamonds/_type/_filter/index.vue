<template>
    <div>
        <!--DIAMONDS GALLERY-->

        <!--== Page Content Wrapper Start ==-->
        <div id="page-content-wrapper" class="p-9">
            <div class="ruby-container">
                <div class="row">
                    <!-- Sidebar Area Start -->
                    <div class="col-lg-3 mt-5 mt-lg-0">
                        <div id="sidebar-area-wrap">
                            <!-- Single Sidebar Item Start -->
                            <div class="single-sidebar-wrap">
                                <h2 class="sidebar-title" style=" border-bottom: 1px solid #c5c5c5;">Filter By</h2>
                                <div class="sidebar-body">
                                    <DiamondFilters @loadGalleryData="loadGalleryData(...$event)"></DiamondFilters>
                                </div>
                            </div>
                            <!-- Single Sidebar Item End -->

                            <!-- Single Sidebar Item Start -->
                            <!--                    <div class="single-sidebar-wrap">
                            <h2 class="sidebar-title">Most Viewed By Me</h2>
                            <div class="sidebar-body">
                                <div class="small-product-list">
                                    <aside-item v-for="item in personalViewed" :key="item.id" :item="item" inline-template>
                                        <?php /*include_with_vars(VIEW_V3_DIR . '/includes/gallery/items/aside-item.html.php'); */?>
                                    </aside-item>
                                </div>
                            </div>
                        </div>
    -->                    <!-- Single Sidebar Item End -->

                            <!-- Single Sidebar Item Start -->

                            <!--                    <div class="single-sidebar-wrap">
                            <h2 class="sidebar-title">Most Viewed By Customers</h2>
                            <div class="sidebar-body">
                                <div class="small-product-list">class="product-thumb animated fadeIn"
                                    <aside-item v-for="item in publicViewed" :key="item.id" :item="item" inline-template>
                                        <?php /*include_with_vars(VIEW_V3_DIR . '/includes/gallery/items/aside-item.html.php'); */?>
                                    </aside-item>
                                </div>
                            </div>
                        </div>
    -->
                            <!-- Single Sidebar Item End -->
                        </div>
                    </div>
                    <!-- Sidebar Area End -->

                    <!-- Shop Page Content Start -->
                    <div class="col-lg-9 order-first order-lg-last">
                        <div class="shop-page-content-wrap">
                            <div class="products-settings-option">
                                <div class="container-fluid">
                                    <div class="row justify-content-between">
                                        <div class="product-cong-left d-flex align-items-center">
                                            <ul class="product-view d-flex align-items-center">
                                                <li class="current column-gird"><i class="fa fa-bars fa-rotate-90"></i></li>
                                                <!--                                <li class="box-gird"><i class="fa fa-th"></i></li>
                                                -->
                                                                        <li class="list"><i class="fa fa-list-ul"></i></li>
                                            </ul>
<!--                                            <span class="show-items"><span v-html="server.resultsCount.min"><?= $server['resultsCount']['min'] ?></span> - <span v-html="server.resultsCount.max"><?= $server['resultsCount']['max'] ?></span>
                                                <?= text('of-label') ?>
                                            <span v-html="server.resultsCount.total"><?= $server['resultsCount']['total'] ?></span>  <span class="bold"> <?= text('results-label') ?></span>
                                            </span>-->
                                        </div>
                                        <div class="row justify-content-between align-items-center mt-3">
                                            <div v-show="cartDash.length" class="align-items-center" style="display:flex;">
                                                <div class="d-flex align-items-center">
                                                    <i class="fa fa-shopping-cart col" style="padding-bottom: 1px;"></i>
                                                    <div v-show="cartDash.length === 1">1 item selected</div>
                                                    <div v-show="cartDash.length > 1">{{cartDash.length}} items selected</div>
                                                </div>
                                            </div>
                                            <div class="product-sort_by d-flex align-items-center mt-3 mt-md-0 justify-content-md-end col">
                                                <label for="sort3" style="    min-width: 50px;">Sort By:</label>
                                                <b-form-select v-model="queryParams.sort" name="sort" id="sort3" @change="loadGalleryData('sort',queryParams.sort)" :options="sortOptions" style="    width: auto;
font-size: 12px;"></b-form-select>
                                            </div>
                                            <div class="product-sort_by d-flex align-items-center mt-3 mt-md-0 justify-content-md-end col">
                                                <label for="sort" style=" min-width: 70px;">Per Page:</label>
                                                <b-form-select v-model="rpp" name="rpp" id="rpp" @change="loadGalleryData('RPP',rpp)" :options="countOptions" class="col-md-5" style="font-size: 12px;"></b-form-select>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="shop-page-products-wrap">
                                <div class="products-wrapper">
                                    <div v-if="products.length && ajaxDataStatus == 'loaded'" class="row">
                                        <div class="col-lg-4 col-sm-6" v-for="(product, i) in products" :key="'p-' + i + '-' + product.id">
                                            <gallery-item :DashMode="true" :product="product" @addToCart="addToCartDash($event);sendCartDash($event);">
                                            </gallery-item>
                                        </div>
                                    </div>
                                    <div v-else-if="ajaxDataStatus != 'loading' && ajaxDataStatus == 'loaded'">
                                        <h2 class="text-center col-md-12 display-4 pt-5" style="min-height: 400px;">
                                            No products were found
                                        </h2>
                                    </div>
                                    <div v-else class="row">
                                        <div class="col-lg-4 col-sm-6" v-for="(loadingItem,prop) in [1,2,3,4,6,7,8,9,10,11]" :key="prop">
                                            <label class="single-product-item text-center w-100">
                                                <figure class="product-thumb d-flex justify-content-center align-items-center" style="min-width: 168px;">
                                                    <a style="    margin: 27px;">
                                                        <div class="lds-ripple"><div></div><div></div></div>
                                                    </a>
                                                </figure>
                                                <div class="product-details col">
                                                    <div class="product-headline" style="margin: 0px;"><h2 class="d-block">
                                                        <a href="/diamonds/cushion-brown-vs1-pid-5554541">
                                                            Loading </a></h2> <span
                                                            class="price d-block">...</span></div>
                                                    <div class="products-desc row p-2 col-md-12">
                                                        <ul class="row product-desc-table col-12">
                                                            <li class="color col"><span>color</span>
                                                                <hr>
                                                                ...
                                                            </li> <!---->
                                                            <li class="color col"><span>clarity</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                            <li class="color col"><span>shape</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                            <li class="color col"><span>symmetry</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                            <li class="color col"><span>polish</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                            <li class="color col"><span>table</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                            <li class="color col"><span>depth</span>
                                                                <hr>
                                                                ...
                                                            </li> <!---->
                                                            <li class="color col"><span>fluorescence</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                            <li class="color col"><span>measurements</span>
                                                                <hr>
                                                                ...
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="gallery-product-actions"><a class="btn btn-add-to-cart" href="javascript:void(0)">+
                                                        Add to Cart</a></div>
                                                </div>
                                                <div class="product-meta">
                                                    <button type="button" data-toggle="modal" data-target="#quickView"><span
                                                            data-toggle="tooltip" data-placement="left" title=""
                                                            data-original-title="Quick View"><i
                                                            class="fa fa-compress"></i></span></button>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="products-settings-option d-block d-md-flex">
                                <nav class="page-pagination col-md-9">
                                    <div class="pagination col-xs-12 col-md-6">
                                        <div class="pages">
<!--                                            <paginate v-model.number="queryParams.page"
                                                      :page-count="server.totalPages"
                                                      :click-handler="$store.dispatch('loadGalleryData')"
                                            ></paginate>-->
                                            <b-pagination size="md" :total-rows="server.totalPages" v-model.number="queryParams.page" :per-page="10" @input="loadGalleryData('page',queryParams.page)"/>
                                        </div>
                                    </div>
                                </nav>

                                <div class="product-per-page d-flex align-items-center mt-3 mt-md-0">
                                    <!--                            <label for="show-per-page">Show Per Page</label>
                                                                <select name="sort" id="show-per-page">
                                                                    <option value="9">9</option>
                                                                    <option value="15">15</option>
                                                                    <option value="21">21</option>
                                                                    <option value="6">27</option>
                                                                </select>-->
                                </div>


                            </div>
                        </div>
                    </div>
                    <!-- Shop Page Content End -->
                </div>
            </div>
        </div>
        <!--== Page Content Wrapper End ==-->
    </div>
</template>

<script>
    import GalleryItem from '~/components/GalleryItem.vue';
    import DiamondFilters from '~/components/filters/DiamondFilters.vue';

    export default {
        components:{
            GalleryItem,
            DiamondFilters
        },
        mounted(){
            var view_style_wrap = $('.shop-page-products-wrap > .products-wrapper');

            $('.product-view li.column-gird').on('click', function () {
                view_style_wrap.removeClass('products-gird products-list-view');
            });

            $('.product-view li.box-gird').on('click', function () {
                view_style_wrap.addClass('products-gird');
                view_style_wrap.removeClass('products-list-view');
            });

            $('.product-view li.list').on('click', function () {
                view_style_wrap.addClass('products-list-view');
                view_style_wrap.removeClass('products-gird');
            });

            $('.product-view li').on('click', function () {
                $('.product-view li').removeClass('current');
                $(this).addClass('current');
            });
/*           document.addEventListener('DOMContentLoaded', () => {
            });
            this.documentLoaded = true;*/

        },
        head() {
            console.log(this,'head');
/*            let breadcrumb =  this.$route.matched;
            console.log(breadcrumb,'breadcrumb');
            breadcrumb = breadcrumb.map(item => ({text:item,href:item}) );*/

          return {
              title: `Shop - ${this.$route.params.type?this.$route.params.type:''} Diamonds`.replace(/\b\w/g, l => l.toUpperCase()),
              meta: [
                  { hid: 'description', name: 'description', content: 'Page 1 description' }
              ],
              breadcrumbTitle : 'Diamonds Gallery',
          }
        },
        data(){
            return {
                countOptions : [
                    {'value':'18','text':'20'},
                    {'value':'48','text':'50'},
                    {'value':'98','text':'100'},
                ],
                cartDash:[],
                ajaxDataStatus:'loaded',
                documentLoaded:true

            /*
                            countOptionsVal:{'field':'18','label':'20'}
            */
            };
        },
        async asyncData ({ $axios,query,route}) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            let data = await $axios.$get(`/api/dyo/${route.params.type === 'fancy'?'color_':''}diamond${'filter' in route.params && route.params.filter?'/'+route.params.filter:''}`,    {params:query});

            console.log('aaaaa',data,query);
            return data;
        },
        methods:{
            loadGalleryData (prop, val)
            {
                this.ajaxDataStatus = 'loading';
                this.products = [];
                this.cartDash = [];

                if(!('q' in this.queryParams))
                {
                    this.queryParams['q'] = {};
                }

                if(prop === 'sort' || prop === 'RPP' || prop === 'page'){
                    this.queryParams[prop] = val;
                }
                else {
                    this.queryParams['q'][prop] = val;
                }

                let params = {...this.queryParams};

                let deleteEmpty = (obj) => {
                    for (let param in obj)
                    {
                        if(param in obj && (!obj[param] && obj[param] !== '0' && obj[param] !== 0) )
                        {
                            delete obj[param];
                        }
                        /*if(param && isNaN(param) && param in obj && ((typeof obj[param] == 'object' && obj[param] !== null &&  !Object.keys(obj[param]).length) && !obj[param].length) || (typeof obj[param] == "undefined"))
                        {

                        }*/
                    }
                };
                deleteEmpty(params);
                deleteEmpty(params.q);

                if(Object.keys(params.q).length === 0) delete params.q;
                var queryString = '?' + jQuery.param(params);

                if(prop === 'fancy_color') this.matchRouteAndFilterUrl(prop,'/shop/diamonds/fancy' ,queryString);
                if(prop === 'shape') this.matchRouteAndFilterUrl(prop,'/shop/diamonds/loose' ,queryString);

                this.$store.$axios.$get('/api/' + this.ajaxJsonUrl,{params}).then( (data) => {
                    this.products = data.products;
                    this.server = data.server;
                    this.ajaxDataStatus = 'loaded';
                    history.pushState(null, null, queryString);
                });
            },
            matchRouteAndFilterUrl(prop,baseCategory,queryString){
                if(location.pathname.includes(baseCategory) && location.pathname !== baseCategory)
                {
                    /*                var lastCrumb = document.querySelector('#last-breadcrumb');
                                    lastCrumb.parentNode.parentNode.removeChild(lastCrumb.parentNode);
                                    document.querySelector('.breadcrumb li:last-child a').id = 'last-breadcrumb';*/
                    history.replaceState(null, null, baseCategory+queryString);
                }

            },
            addToCart(product) {
                this.$store.dispatch('saveToCart',product);
            },
            addToCartDash (element) {
                var isExist = false,product = element.product;
                this.cartDash.forEach(function (DashProductElement) {
                    if(product.id === DashProductElement.product.id) {
                        isExist = true;
                    }
                });
                if(!isExist) {
                    this.cartDash.push(element);
                    element.inDash = true;
                }
                else {
                    this.cartDash = this.cartDash.filter(function (DashProductElement) {
                        return product.id !== DashProductElement.product.id;
                    });
                    element.inDash = false;
                }
            },
            sendCartDash (element){
                var self = this;
                this.cartDash.forEach( DashProductElement => {
                    self.addToCart(DashProductElement.product,DashProductElement);
                    DashProductElement.inDash = false;
                });
                element.inDash = false;
                self.cartDash = [];
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/pages/page-imports";
    @import "~assets/scss/layout/product";
    @import "~assets/scss/views/dyo-diamond.scss";
</style>