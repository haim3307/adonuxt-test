<template>
  <div class="single-product-page single-product-page-content pb-5 mt-5">
    <div class="row">
      <!-- Product Thumbnail Start -->
      <div class="col-lg-5">
        <div class="product-thumbnail-wrap pr-5 pl-5 pt-0">
          <ItemSwiper :product="product"/>
        </div>
      </div>
      <!-- Product Thumbnail End -->
      <!-- Product Details Start -->
      <div class="col-lg-7 mt-5 mt-lg-0">
        <div class="product-details">
          <div class="d-flex justify-content-between">
            <h2>
              <a>{{product.title}}</a>
            </h2>
            <social-sharing
              :url="product.url"
              :title="product.title"
              :description="product.description"
              quote
              hashtags
              twitter-user
              inline-template
            >
              <div class="vue-social-sharing">
                <!--
                                                                <?php include VIEW_V3_DIR . '/includes/gallery/items/includes/social-share-list.html.php' ?>
                -->
              </div>
            </social-sharing>
          </div>
          <!--                                <div class="rating">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star-half"></i>
                                                        <i class="fa fa-star-o"></i>
          </div>-->
          <span class="price" v-html="product.price"></span>

          <div class="product-info-stock-sku">
            <span class="product-stock-status">{{product.stock_txt}}</span>
            <span class="product-sku-status ml-5">
              <strong>GIA</strong>
              {{product.certId }}
            </span>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <!-- Product Full Description Start -->
              <div class="product-full-info-reviews">
                <!-- Single Product tab Menu -->
                <nav class="nav" id="nav-tab">
                  <a
                    class="active"
                    id="description-tab"
                    data-toggle="tab"
                    href="#description"
                  >SPECIFICATIONS</a>
                  <!--                                    <a id="reviews-tab" data-toggle="tab" href="#reviews">Reviews</a>
                  -->
                </nav>
                <!-- Single Product tab Menu -->
                <!-- Single Product tab Content -->
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="description"
                    style="font-family: Montserrat"
                  >
                    <div class="row justify-content-around">
                      <section class="col-md-12">
                        <h3>Description</h3>
                        <hr>
                        <p>{{product.description}}</p>
                      </section>

                      <section class="col-md-12">
                        <h3>Information</h3>
                        <hr>
                        <ul class="row product-desc-table pl-5">
                          <item-attrs :product="product"></item-attrs>
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
                <!-- Single Product tab Content -->
              </div>
              <!-- Product Full Description End -->
            </div>
          </div>

          <!--                                <p class="products-desc">
                                                        <?/*= $product->description */?>

          </p>-->
          <div class="product-quantity mt-5 d-flex align-items-center cta-button">
            <a href="#" class="btn btn-add-to-cart" @click.prevent="addToCart(product)">
              <i class="fa fa-cart-plus pr-1" aria-hidden="true"></i>
              Add to Cart
            </a>
          </div>

          <div class="product-btn-group d-none d-sm-block">
            <a href="single-product.html" class="btn btn-add-to-cart btn-whislist">
              + Add to
              Wishlist
            </a>
            <a href="single-product.html" class="btn btn-add-to-cart btn-whislist">
              + Add to
              Compare
            </a>
            <!--                                    <a href="single-product.html" class="btn btn-add-to-cart btn-compare">Email</a>
            -->
          </div>
        </div>
      </div>
      <!-- Product Details End -->
    </div>
  </div>
</template>

<script>
import ItemSwiper from "~/components/ItemSwiper.vue";
export default {
  components: {
    ItemSwiper
  },
  async asyncData({ params, $axios }) {
    let data = await $axios.$get(`/api/products/product/${params.slug}`);
    //console.log(data);
    return data;
  },
  methods:{
    addToCart(product) {
        this.$store.dispatch('saveToCart',product);
        this.$router.push('/cart');
    },
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/views/products-product";
.single-product-page {
  .product-carousel {
    .swiper-wrapper,
    .swiper-slide {
      min-height: 700px;
      /*            display: flex;
            justify-content: center;
            align-items: center;*/
    }
  }
}
</style>
