import Vue from "vue";
import
    'swiper/dist/css/swiper.css';
import VeeValidate from 'vee-validate';

if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');

    Vue.use(VueAwesomeSwiper, /* { default global options } */)

}

Vue.use(require('vue-social-sharing'));

Vue.component('cart-item',require('~/components/CartItem').default);
Vue.component('item-attrs', require('~/components/ItemAttrs').default);

const axios = require('axios');
VeeValidate.Validator.extend('email_exists', {
    getMessage: field => 'The email is already in the system.',
    validate: email =>
    new Promise( (resolve,reject) => {
        axios.post(
            '/api/users/validate_email_post',
            {
                email
            }
        ).then(({data}) => resolve(data) ).catch(reject);
    })

});


const formHelpers = {
    onSubmit (self,e,immidate = true) 
    {   const scope = e.target.dataset.vvScope;debugger;
        self.$validator.validateAll().then( result => {                debugger;
          if (!self.errors.any(scope)) {
                debugger;
                if(immidate){
                    e.target.submit();
                }
                else{
                    self.$emit('submit',e);
                }
            }
            else {
                for (let inputIndex in self.fields['$' + scope]) 
                {debugger;
                    self.$validator.flag(`${scope}.${inputIndex}`, {touched: true});
                }
            }
        });
    }
};

const formService = {
    install () {
        Vue.forms = formHelpers;
        Vue.prototype.forms = formHelpers;
    }
};

Vue.use(formService);
/*
Vue.use(new apiService());
*/

