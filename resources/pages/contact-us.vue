<template>
  <!--== Page Title Area End ==-->
  <div id="page-content-wrapper" class="p-9">
    <div class="container">
      <div class="row">
        <!-- Contact Page Content Start -->
        <div class="col-lg-12">
          <!-- Contact Method Start -->
          <div class="contact-method-wrap">
            <div class="row">
              <!-- Single Method Start -->
              <div class="col-lg-3 col-sm-6 text-center">
                <div class="contact-method-item">
                  <span class="method-icon">
                    <i class="fa fa-map-marker"/>
                  </span>
                  <div class="method-info">
                    <h3>Street Address</h3>
                    <p>Address : No 40 Baria Sreet 133/2
                      <br>NewYork City, NY, United States.
                    </p>
                  </div>
                </div>
              </div>
              <!-- Single Method End -->
              <!-- Single Method Start -->
              <div class="col-lg-3 col-sm-6 text-center">
                <div class="contact-method-item">
                  <span class="method-icon">
                    <i class="fa fa-phone"/>
                  </span>
                  <div class="method-info">
                    <h3>Phone Number</h3>
                    <a href="tel:0(1234)56789012">0(1234) 567 89012</a>
                    <a href="tel:0(1234)56789012">0(1323) 466 89012</a>
                  </div>
                </div>
              </div>
              <!-- Single Method End -->
              <!-- Single Method Start -->
              <div class="col-lg-3 col-sm-6 text-center">
                <div class="contact-method-item">
                  <span class="method-icon">
                    <i class="fa fa-envelope-open-o"/>
                  </span>
                  <div class="method-info">
                    <h3>Number Fax</h3>
                    <p>+1 323 555 1234
                      <br>+1 267 555 12342
                    </p>
                  </div>
                </div>
              </div>
              <!-- Single Method End -->
              <!-- Single Method Start -->
              <div class="col-lg-3 col-sm-6 text-center">
                <div class="contact-method-item">
                  <span class="method-icon">
                    <i class="fa fa-envelope"/>
                  </span>
                  <div class="method-info">
                    <h3>Email Address</h3>
                    <a href="mailto:your@email.here">your@email.here</a>
                    <a href="mailto:your@email.here">your@email.here</a>
                  </div>
                </div>
              </div>
              <!-- Single Method End -->
            </div>
          </div>
          <!-- Contact Method End -->
        </div>
        <!-- Contact Page Content End -->
      </div>

      <div class="row">
        <!-- Contact Form Start -->
        <div class="col-lg-9 m-auto">
          <div class="contact-form-wrap">
            <h2>Request a Quote</h2>

            <form id="contact-form" action method="post" @submit.prevent data-vv-scope="contact_form">
              <div class="row">
                <div class="col-lg-6">
                  <single-input-item
                    :label="'first name'"
                    :name="'ship_'+'first_name'"
                    :validate="''"
                    :mode="'ship'"
                  ></single-input-item>
                </div>

                <div class="col-lg-6">
                  <single-input-item
                    :label="'last name'"
                    :name="'ship_'+'last_name'"
                    :validate="''"
                    :mode="'ship'"
                  ></single-input-item>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="single-input-item">
                    <single-input-item
                      :label="'email'"
                      :name="'email'"
                      :validate="'email'"
                    ></single-input-item>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="single-input-item">
                    <single-input-item
                      :label="'subject'"
                      :name="'subject'"
                      :validate="'email'"
                    ></single-input-item>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <div class="single-input-item">
                    <b-textarea rows="15"></b-textarea>
                  </div>

                  <div class="single-input-item text-center">
                    <button type="submit" name="submit" class="btn-add-to-cart">Send Meassage</button>
                  </div>

                  <!-- Form Notification -->
                  <!--<div class="form-messege"/>-->
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- Contact Form End -->
      </div>
    </div>
  </div>
</template>

<script>
import SingleInputItem from "~/components/forms/SingleInputItem";

export default {
  components: { SingleInputItem },
  provide(){
    return {
      formScope:'contact_form',
      source: {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/views/users-contact_us.scss";
</style>
