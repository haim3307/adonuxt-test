<template>
  <b-modal v-model="showQuickItem" size="xl">
    <div class="quick-view-content single-product-page-content">
      <div class="row">
        <!-- Product Thumbnail Start -->
        <div class="col-lg-5 col-md-6">
          <div class="product-thumbnail-wrap">
            <ItemSwiper :product="product"/>
          </div>
        </div>
        <!-- Product Thumbnail End -->
        <!-- Product Details Start -->
        <div class="col-lg-7 col-md-6 mt-5 mt-md-0">
          <div class="product-details">
            <section>
              <div class="row" style="    font-family: 'Montserrat'; ">
                <h2 class="mb-3 col-md-9 productTitle">
                  <a
                    :href="product.url"
                    v-html="product.title"
                    class="text-dark text-capitalize"
                    style="    font-family: 'Montserrat';
"
                  ></a>
                </h2>

                <span
                  class="price mb-3 d-block col-md-3 d-flex justify-content-center align-items-center"
                  v-html="product.price"
                  style="    font-family: 'Montserrat';
"
                ></span>
              </div>
            </section>

            <div class="product-info-stock-sku mb-1 mt-1">
              <!--                                            <span class="product-sku-status mr-5"><strong>GIA ID</strong> {{product.certId}}</span>
                                                                     <span class="product-stock-status" v-if="product.in_stock">In Stock</span>
              <span class="product-stock-status text-danger" v-else>Out Of Stock</span>-->
            </div>

            <!--                                        <p class="products-desc">Ideal for cold-weathered training worked lorem ipsum outdoors,
                                                                    the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out
                                                                    the wind as ribbed cuffs and bottom band seal in body heat Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Enim, reprehenderit.</p>-->
            <div>
              <social-sharing
                :url="product.url"
                title="The Progressive JavaScript Framework"
                description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                quote="Vue is a progressive framework for building user interfaces."
                hashtags="vuejs,javascript,framework"
                twitter-user="vuejs"
                inline-template
              >
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
            </div>
            <div class="shopping-option-item mt-4">
              <item-attrs :product="product"></item-attrs>
            </div>

            <div class="product-quantity d-flex align-items-center" style="    margin-top: 17px;">
              <a
                class="btn btn-add-to-cart"
                @click.self="addToCart(product)"
                href="javascript:void(0)"
              >+ Add to Cart</a>
            </div>
          </div>
        </div>
        <!-- Product Details End -->
      </div>
    </div>

    <!--
        <div class="modal-content">
    -->
    <!--            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><img src="~assets/img/cancel.png" alt="Close" class="img-fluid"/></span>
    </button>-->
    <!--
        </div>
    -->
  </b-modal>
</template>

<script>
import ItemSwiper from "~/components/ItemSwiper.vue";

export default {
  components: {
    ItemSwiper
  },
  data() {
    return {
      item: false,
      product: false,
      showQuickItem: false
    };
  },
  mounted() {
    this.$root.$on("quickItemChange", item => {
      this.getItemForQuickView(item);
      this.showQuickItem = true;
    });
  },
  methods: {
    getItemForQuickView: function(item) {
      var url =
        "/api/products/show_json.json/?slug=" +
        item.url.split("/")[2].split("-pid-")[0] +
        "&id=" +
        item.id;

      /*                $('#quickViewOwl .owl-thumbs').remove();
                $('#quickViewOwl').owlCarousel('destroy');*/

      this.item = item;
      this.product = item;

      /*
                this.$nextTick(function(){                });
*/

      /*                    $('#quickViewOwl').owlCarousel({
                                        loop: true,
                                        items: 1,
                                        dots: false,
                                        smartSpeed: 500,
                                        nav: true,
                                        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                                        thumbs: true,
                                        thumbImage: true,
                                        thumbContainerClass: 'owl-thumbs',
                                        thumbItemClass: 'owl-thumb-item'
                                    });*/
    },
    addToCartDash: function() {
      this.$root.addToCartDash(this);
    },
    addToCart: function() {
      this.$root.addToCart(this.product, this);
    },
    sendCartDash: function(e) {
      e.stopPropagation();
      this.$root.sendCartDash(this);
    }
  }
};
</script>

<style lang="scss">
.quick-view-content {
  .product-carousel {
    .swiper-wrapper,
    .swiper-slide {
      min-height: 500px;
      /*            display: flex;
            justify-content: center;
            align-items: center;*/
    }
  }
}
.modal-dialog {
  height: 92vh;
  display: flex;
  align-items: center;
}
.modal-footer {
  min-height: 50px;

  & > * {
    display: none;
  }
}
</style>