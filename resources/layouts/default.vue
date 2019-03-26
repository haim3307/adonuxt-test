<template>
  <div>
    <!--== Header Area Start ==-->
    <b-navbar class="header pt-0" sticky>
      <header id="header-area" class="header__3 w-100">
        <div class="ruby-container">
          <div class="row">
            <!-- Logo Area Start -->
            <div class="col-3 col-lg-1 col-xl-2 m-auto">
              <a href="index.html" class="logo-area">
                <img src="~assets/img/logo-black.png" alt="Logo" class="img-fluid">
              </a>
            </div>
            <!-- Logo Area End -->
            <!-- Navigation Area Start -->
            <div class="col-3 col-lg-9 col-xl-8 m-auto">
              <div class="main-menu-wrap">
                <nav id="mainmenu">
                  <ul>
                    <li>
                      <nuxt-link to="/">Home</nuxt-link>
                    </li>

                    <li class="dropdown-show">
                      <a href="#">Diamonds</a>
                      <ul class="mega-menu-wrap dropdown-nav" style="    min-width: 219px;">
                        <li class="mega-menu-item row d-flex">
                          <div class="col-md-6">
                            <nuxt-link :to="'/shop/diamonds/loose/'" class="mega-item-title">Loose</nuxt-link>
                            <ul>
                              <template v-for="navItem in initialData.shapesArray">
                                <li :key="navItem[2]">
                                  <nuxt-link
                                    :to="`/shop/diamonds/loose/${navItem[2].toLocaleLowerCase()}`"
                                  >{{navItem[2]}}</nuxt-link>
                                </li>
                              </template>
                            </ul>
                          </div>
                          <div class="col-md-6">
                            <nuxt-link :to="'/shop/diamonds/fancy/'" class="mega-item-title">Fancy</nuxt-link>
                            <ul>
                              <template v-for="navItem in initialData.colorsArray">
                                <li :key="navItem[2]">
                                  <nuxt-link
                                    :to="`/shop/diamonds/fancy/${navItem[2].toLocaleLowerCase()}`"
                                  >{{navItem[2]}}</nuxt-link>
                                </li>
                              </template>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <nuxt-link to="/contact-us">Contact Us</nuxt-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <!-- Navigation Area End -->
            <!-- Header Right Meta Start -->
            <div class="col-6 col-lg-2 m-auto">
              <div class="header-right-meta text-right">
                <ul>
                  <li>
                    <a href="#" class="modal-active">
                      <i class="fa fa-search"/>
                    </a>
                  </li>
                  <li class="settings">
                    <a href="#">
                      <i class="fa fa-cog"/>
                    </a>
                    <div class="site-settings d-block d-sm-flex">
                      <dl class="currency">
                        <dt>Currency</dt>
                        <dd class="current">
                          <a href="javascript:void(0);">USD</a>
                        </dd>
                        <!--                                <dd><a href="#">AUD</a></dd>-->
                        <!--                                <dd><a href="#">CAD</a></dd>-->
                        <!--                                <dd><a href="#">BDT</a></dd>-->
                      </dl>

                      <dl class="my-account">
                        <dt>My Account</dt>
                        <dd v-if="is_logged_in">
                          <nuxt-link to="/account">Panel</nuxt-link>
                        </dd>
                        <dd v-if="is_logged_in">
                          <a href="/account/orders/">Orders</a>
                        </dd>
                        <dd v-if="!is_logged_in">
                          <nuxt-link to="/sign-in">Sign In</nuxt-link>
                        </dd>
                        <dd v-if="!is_logged_in">
                          <nuxt-link to="/join-us">Join Us</nuxt-link>
                        </dd>
                        <dd v-if="is_logged_in">
                          <a href="#" @click.prevent="logout()">Sign Out</a>
                        </dd>
                      </dl>

                      <dl class="language">
                        <dt>Language</dt>
                        <dd class="current">
                          <a href="javascript:void(0);">English (US)</a>
                        </dd>
                        <!--                                <dd><a href="#">English (UK)</a></dd>-->
                        <!--                                <dd><a href="#">Chinees</a></dd>-->
                        <!--                                <dd><a href="#">Bengali</a></dd>-->
                        <!--                                <dd><a href="#">Hindi</a></dd>-->
                        <!--                                <dd><a href="#">Japanees</a></dd>-->
                      </dl>
                    </div>
                  </li>
                  <li class="shop-cart">
                    <nuxt-link to="/cart">
                      <i class="fa fa-shopping-bag"></i>
                      <span class="count" v-html="initialData.orderItems.length"></span>
                    </nuxt-link>
                    <div class="mini-cart" ref="miniCart">
                      <div class="mini-cart-body">
                        <div
                          v-if="initialData.orderItems.length"
                          v-show="initialData.orderItems.length"
                          style="display: none"
                        >
                          <cart-item
                            class="single-cart-item d-flex"
                            v-for="product in initialData.orderItems"
                            :product="product"
                            :key="'p-'+product.id"
                          ></cart-item>
                        </div>
                        <div v-else>
                          <h6 class="h4 text-center">Cart is empty.</h6>
                        </div>
                      </div>
                      <div class="mini-cart-footer">
                        <nuxt-link to="/checkout" class="btn-add-to-cart">Checkout</nuxt-link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Header Right Meta End -->
          </div>
        </div>
      </header>
    </b-navbar>

    <!--== Header Area End ==-->
    <div
      v-if="breadcrumbs && ('showBreadcrumbs' in $router.currentRoute.meta && $router.currentRoute.meta.showBreadcrumbs) || !('showBreadcrumbs' in $router.currentRoute.meta)"
    >
      <div
        id="page-title-area"
        class="d-flex justify-content-center align-items-center"
        style="min-height: 106.5px"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="page-title-content">
                <!--                <?php if(templatesHelper::has_section('bread_title')): ?>
                <h1><?= templatesHelper::yield('bread_title') ?></h1>
                <?php elseif(isset($bread_title)): ?>
                <h1><?= $bread_title ?></h1>
                <?php endif; ?>-->
                <b-breadcrumb :items="breadcrumbs"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--== Search Box Area Start ==-->
    <div class="body-popup-modal-area">
      <span class="modal-close">
        <img src="~assets/img/cancel.png" alt="Close" class="img-fluid">
      </span>
      <div class="modal-container d-flex">
        <div class="search-box-area">
          <div class="search-box-form">
            <form action="#" method="post">
              <input type="search" placeholder="type keyword and hit enter">
              <button class="btn" type="button">
                <i class="fa fa-search"/>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--== Search Box Area End ==-->
    <nuxt :key="$router.fullPath"/>

    <!--    <pre>
        {{$router.currentRoute.name}}
    </pre>-->
    <!--     <router-view :key="$route.fullPath"></router-view> -->
    <!-- Footer Area Start -->
    <footer id="footer-area">
      <!-- Footer Call to Action Start -->
      <div class="footer-callto-action">
        <div class="ruby-container">
          <div class="callto-action-wrapper">
            <div class="row">
              <div class="col-lg-3 col-md-6">
                <!-- Single Call-to Action Start -->
                <div class="single-callto-action d-flex">
                  <figure class="callto-thumb">
                    <img src="~assets/img/air-plane.png" alt="WorldWide Shipping">
                  </figure>
                  <div class="callto-info">
                    <h2>Free Shipping Worldwide</h2>
                    <p>On order over $150 - 7 days a week</p>
                  </div>
                </div>
                <!-- Single Call-to Action End -->
              </div>

              <div class="col-lg-3 col-md-6">
                <!-- Single Call-to Action Start -->
                <div class="single-callto-action d-flex">
                  <figure class="callto-thumb">
                    <img src="~assets/img/support.png" alt="Support">
                  </figure>
                  <div class="callto-info">
                    <h2>24/7 CUSTOMER SERVICE</h2>
                    <p>Call us 24/7 at 000 - 123 - 456k</p>
                  </div>
                </div>
                <!-- Single Call-to Action End -->
              </div>

              <div class="col-lg-3 col-md-6">
                <!-- Single Call-to Action Start -->
                <div class="single-callto-action d-flex">
                  <figure class="callto-thumb">
                    <img src="~assets/img/money-back.png" alt="Money Back">
                  </figure>
                  <div class="callto-info">
                    <h2>MONEY BACK Guarantee!</h2>
                    <p>Send within 30 days</p>
                  </div>
                </div>
                <!-- Single Call-to Action End -->
              </div>

              <div class="col-lg-3 col-md-6">
                <!-- Single Call-to Action Start -->
                <div class="single-callto-action d-flex">
                  <figure class="callto-thumb">
                    <img src="~assets/img/cog.png" alt="Guide">
                  </figure>
                  <div class="callto-info">
                    <h2>SHOPPING GUIDE</h2>
                    <p>Quis Eum Iure Reprehenderit</p>
                  </div>
                </div>
                <!-- Single Call-to Action End -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer Call to Action End -->
      <!-- Footer Follow Up Area Start -->
      <div class="footer-followup-area">
        <div class="ruby-container">
          <div class="followup-wrapper">
            <div class="row">
              <div class="col-lg-12 text-center">
                <div class="follow-content-wrap">
                  <nuxt-link to="/" class="logo">
                    <img
                      src="~assets/img/layout/pure-carat.png"
                      class="img-fluid"
                      style="max-width: 87px"
                      alt="Logo"
                    >
                  </nuxt-link>

                  <social-sharing
                    :url="$root.baseUrlSSL"
                    title="The Progressive JavaScript Framework"
                    description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                    quote="Vue is a progressive framework for building user interfaces."
                    hashtags="vuejs,javascript,framework"
                    twitter-user="vuejs"
                    inline-template
                  >
                    <div class="footer-social-icons">
                      <!--
                                                      <network network="twitter">
                                                          <i class="fa fa-twitter"></i> Twitter
                                                      </network>
                                                      <network network="pinterest">
                                                          <i class="fa fa-pinterest"></i> Pinterest
                                                      </network>
                                                      <a href="#"><i class="fa fa-instagram"></i></a>
                      <a href="#"><i class="fa fa-flickr"></i></a>-->
                      <!--                                <network network="email">-->
                      <!--                                    <i class="fa fa-envelope"></i>-->
                      <!--                                </network>-->
                      <network network="facebook">
                        <i class="fa fa-facebook"></i>
                      </network>
                      <!--                                <network network="googleplus">-->
                      <!--                                    <i class="fa fa-google-plus"></i>-->
                      <!--                                </network>-->
                      <!--                                <network network="line">
                                                          <i class="fa fa-line"></i>
                      </network>-->
                      <!--                                <network network="linkedin">-->
                      <!--                                    <i class="fa fa-linkedin"></i>-->
                      <!--                                </network>-->
                      <!--                                <network network="odnoklassniki">
                                                          <i class="fa fa-odnoklassniki"></i> Odnoklassniki
                      </network>-->
                      <network network="pinterest">
                        <i class="fa fa-pinterest"></i>
                      </network>
                      <!--                                <network network="reddit">-->
                      <!--                                    <i class="fa fa-reddit"></i>-->
                      <!--                                </network>-->
                      <network network="twitter">
                        <i class="fa fa-twitter"></i>
                      </network>
                      <!--                                <network network="vk">
                                                          <i class="fa fa-vk"></i> VKontakte
                                                      </network>
                                                      <network network="weibo">
                                                          <i class="fa fa-weibo"></i> Weibo
                      </network>-->
                      <!--                                <network network="whatsapp">-->
                      <!--                                    <i class="fa fa-whatsapp"></i>-->
                      <!--                                </network>-->
                    </div>
                  </social-sharing>

                  <!--                        <a href="#"><img src="<?/*= img_base() */?>/payment.png" alt="Payment Method"/></a>-->
                  <img style="max-width: 137px;" src="~assets/img/layout/paypal-784404.svg" alt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer Follow Up Area End -->
      <!-- Footer Image Gallery Area Start -->
      <div class="footer-image-gallery">
        <div class="ruby-container">
          <div class="image-gallery-wrapper">
            <div class="row">
              <div class="col-lg-12">
                <div class="imgage-gallery-carousel owl-carousel">
                  <div class="gallery-item">
                    <a href="#">
                      <img src="~assets/img/gallery-img-1.jpg" alt="Gallery">
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="#">
                      <img src="~assets/img/gallery-img-2.jpg" alt="Gallery">
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="#">
                      <img src="~assets/img/gallery-img-3.jpg" alt="Gallery">
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="#">
                      <img src="~assets/img/gallery-img-4.jpg" alt="Gallery">
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="#">
                      <img src="~assets/img/gallery-img-3.jpg" alt="Gallery">
                    </a>
                  </div>
                  <div class="gallery-item">
                    <a href="#">
                      <img src="~assets/img/gallery-img-2.jpg" alt="Gallery">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer Image Gallery Area End -->
      <!-- Copyright Area Start -->
      <div class="copyright-area">
        <div class="ruby-container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="copyright-text">
                <p>Copyright © {{(new Date()).getFullYear()}} Pure Carat. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Copyright Area End -->
    </footer>
    <!-- Footer Area End -->
    <!-- Scroll to Top Start -->
    <a href="#" class="scrolltotop">
      <i class="fa fa-angle-up"/>
    </a>

    <!-- Scroll to Top End -->
    <QuickItemModal></QuickItemModal>
  </div>
</template>

<style lang="scss">
.nuxt-progress {
  z-index: 999999999999;
  background-color: #4d94db;
}
.breadcrumb-item {
  text-transform: capitalize;
  &.active {
    color: white;
  }
}
.breadcrumb-item + .breadcrumb-item::before {
  content: none;
}
.breadcrumb li {
  font-size: 1.5rem;
  font-style: initial;
}
</style>
<script lang="ts" src="./default.ts"></script>

