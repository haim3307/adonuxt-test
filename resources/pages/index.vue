<template>
  <div>
    <!--== Banner // Slider Area Start ==-->
    <section id="banner-area" class="banner__2">
      <div class="ruby-container">
        <div class="row">
          <div class="col-lg-12">
            <div id="banner-carousel" v-swiper:mySwiper="swiperOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide single-carousel-wrap slide-item-1">
                  <div class="banner-caption text-center text-lg-left">
                    <h4>Rubby Store</h4>
                    <h2>Ring Solitaire Princess</h2>
                    <p>Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>
                    <a href="#" class="btn-long-arrow">Shop Now</a>
                  </div>
                </div>
                <div class="swiper-slide single-carousel-wrap slide-item-2">
                  <div class="banner-caption text-center text-lg-left">
                    <h4>New Collection 2017</h4>
                    <h2>Beautiful Earrings</h2>
                    <p>Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>
                    <a href="#" class="btn-long-arrow">Shop Now</a>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <!--== Banner Slider End ==-->

    <!--  Products Area Start -->
    <div id="featured-products-wrapper" class="p-9">
      <div class="ruby-container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <!-- Section Title Start -->
            <div class="section-title">
              <h2>Featured Products</h2>
              <p>Trending stunning Unique</p>
            </div>
            <!-- Section Title End -->
          </div>
        </div>

        <div class="products-wrapper products-gird">
          <div class="row custom-padding">
            <!-- Single Product Start -->

            <gallery-item class="col-sm-6 col-lg-3" v-for="featuredItem in featuredItems"  @addToCart="$event.addToCart(featuredItem)" :key="featuredItem.id" :product="featuredItem">

            </gallery-item>
            <!-- Single Product End -->
          </div>
        </div>
      </div>
    </div>
    <!--  Products Area End -->

    <!--== Testimonial Area Start ==-->
    <section id="testimonial-area">
      <div class="ruby-container">
        <div class="testimonial-wrapper">
          <div class="row">
            <div class="col-lg-12 text-center">
              <!-- Section Title Start -->
              <div class="section-title">
                <h2>What People Say</h2>
                <p>Testimonials</p>
              </div>
              <!-- Section Title End -->
            </div>
          </div>

          <div class="row">
            <div class="col-lg-7 m-auto text-center">
              <div class="testimonial-content-wrap">
                <div id="testimonialCarousel" class="owl-carousel">
                  <div class="single-testimonial-item">
                    <p>
                      These guys have been absolutely outstanding. When I needed them they came through in
                      a big way! I know that if you buy this theme, you'll get the one thing we all look
                      for when we buy on Themeforest, and that's real support for the craziest of
                      requests!
                    </p>

                    <h3 class="client-name">
                      Luis Manrata
                    </h3>
                    <span class="client-email">you@email.here</span>
                  </div>

                  <div class="single-testimonial-item">
                    <p>
                      These guys have been absolutely outstanding. When I needed them they came through in
                      a big way! I know that if you buy this theme, you'll get the one thing we all look
                      for when we buy on Themeforest, and that's real support for the craziest of
                      requests!
                    </p>

                    <h3 class="client-name">
                      John Dibba
                    </h3>
                    <span class="client-email">you@email.here</span>
                  </div>

                  <div class="single-testimonial-item">
                    <p>
                      These guys have been absolutely outstanding. When I needed them they came through in
                      a big way! I know that if you buy this theme, you'll get the one thing we all look
                      for when we buy on Themeforest, and that's real support for the craziest of
                      requests!
                    </p>

                    <h3 class="client-name">
                      Alex Tuntuni
                    </h3>
                    <span class="client-email">you@email.here</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--== Testimonial Area End ==-->

    <!--== Newsletter Area Start ==-->
    <section id="newsletter-area" class="p-9">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <!-- Section Title Start -->
            <div class="section-title">
              <h2>Join The Newsletter</h2>
              <p>Sign Up for Our Newsletter</p>
            </div>
            <!-- Section Title End -->
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 m-auto">
            <div class="newsletter-form-wrap">
              <form id="subscribe-form" action="~assets/php/subscribe.php" method="post">
                <input id="subscribe" type="email" name="email" placeholder="Enter your Email  Here" required>
                <button type="submit" class="btn-long-arrow">
                  Subscribe
                </button>
                <div id="result" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--== Newsletter Area End ==-->
  </div>
</template>

<script>


import galleryItem from '~/components/GalleryItem.vue';


export default {
  data () {

      return {
          swiperOption: {
              pagination: {
                  el: '.swiper-pagination'
              },
              autoplay: {
                  delay:5000
              },
              speed: 1300,
              loop: true
              // some swiper options...
          }
      }
  },
  methods:{

  },
  mounted() {
/*
      this.$initialData;
*/
/*
      this.mySwiper.slideTo(3, 1000, false)
*/
  },
  components: {galleryItem},
  async asyncData ({ $axios }) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      return await $axios.$get('/api/main/index.json',    {});
  },

};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/views/main-index.scss";
</style>
