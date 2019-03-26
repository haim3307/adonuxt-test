<template>
  <div>
    <div class="product-carousel" style="    max-height: 500px;" v-swiper:swiperTop="swiperOption" ref="swiperTop">
      <div class="swiper-wrapper">
        <!--  v-if="product.img"-->
        <div
          class="swiper-slide single-carousel-wrap slide-item-1"
          key="1"
          style="border: 2px solid #e2e2e2;"
          v-show="product.img"
        >
          <a :href="product.img" target="_blank">
            <img class="img-fluid" :src="product.img" alt="Product's main image">
          </a>
        </div>
        <!--v-if="product.videoDataLink"-->
        <div
          class="swiper-slide single-carousel-wrap slide-item-2"
          style="pointer-events: none;"
          key="10"
          v-show="product.videoDataLink"
        >
          <b-embed
            type="iframe"
            aspect="16by9"
            :src="product.videoDataLink"
            allowfullscreen
            class="h-100"
          />
        </div>
        <!-- v-if="product.certLink"-->
        <div
          class="swiper-slide single-carousel-wrap slide-item-3"
          key="3"
          v-show="product.certLink"
        >
          <a :href="product.certLink" target="_blank">
            <img class="img-fluid" :src="product.certLink" alt="Certificate">
          </a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div
      class="product-thumb-carousel"
      v-swiper:swiperThumbs="swiperThumbOption"
      ref="swiperThumbs"
    >
      <div class="swiper-wrapper">
        <!-- -->
        <div class="swiper-slide single-carousel-wrap slide-item-1" v-show="product.img">
          <img class="img-fluid" :src="product.img" alt="Product's main image">
        </div>
        <!---->
        <div
          class="swiper-slide single-carousel-wrap slide-item-2"
          key="2"
          v-show="product.videoDataLink"
        >
          <div class="d-flex justify-content-center align-items-center h-100">
            <span class="iconify" data-icon="uil:video" data-inline="false" style="font-size: 6em"></span>
          </div>
        </div>
        <!-- -->
        <div
          class="swiper-slide single-carousel-wrap slide-item-3"
          key="3"
          v-show="product.certLink"
        >
          <img class="img-fluid" :src="product.certLink" alt="Certificate">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['product'],
    data(){
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                autoplay: false,
                speed: 1300,
                loop: false,
                height:'500px',
                // some swiper options...
                updateOnImagesReady:true
            }   ,
            swiperThumbOption: {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            }
        }
    },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop;
      const swiperThumbs = this.$refs.swiperThumbs;
  
      if (
        swiperTop &&
        swiperThumbs &&
        "swiper" in swiperTop &&
        "swiper" in swiperThumbs
      ) {
        swiperTop.swiper.controller.control = swiperThumbs.swiper;
        swiperThumbs.swiper.controller.control = swiperTop.swiper;
      }
    });
  }
};
</script>

<style lang="scss">
.product-carousel {
  .slide-item-1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.product-thumb-carousel {
  .swiper-wrapper,
  .swiper-slide {
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-slide {
    width: 25%;
  }
}
.embed-responsive {
  height: 700px;
}
</style>
