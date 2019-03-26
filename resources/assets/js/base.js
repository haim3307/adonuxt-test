'use strict';

// Override vue app script cycles
(function (window) {
    window.beforeVueApp = new Function();
    window.afterVueApp = new Function();
})(window);

Vue.use(SocialSharing);

jQuery.extend(pureCaratData, dataToFrontEnd);

// Components
Vue.component('gallery-item', {
    props: ['product'],
    data: function data() {
        return {
            inDash: false,
            itemImage: false,
            imageStatus: false
        };
    },
    created: function created() {
        if (typeof this.product !== "undefined") {
            this.itemImage = this.product.img;
        }
    },

    methods: {
        addToCartDash: function addToCartDash(product) {
            this.$root.addToCartDash(this, product);
        },
        addToCart: function addToCart() {
            this.$root.addToCart(this.product, this);
        },
        sendCartDash: function sendCartDash(e) {
            e.stopPropagation();
            this.$root.sendCartDash(this);
        },
        quickItemChange: function quickItemChange(e) {
            $('#quickView').modal('show');
            this.$root.$emit('quickItemChange', this.product);
        },
        itemImageHandler: function itemImageHandler() {
            this.imageStatus = 'defaultLoading';
            this.itemImage = this.product.default_img;
        }
    }
});
Vue.component('item-quick-view', {
    data: function data() {
        return {
            item: false,
            product: false
        };
    },
    mounted: function mounted() {
        this.$root.$on('quickItemChange', function (item) {
            this.getItemForQuickView(item);
        }.bind(this));
    },
    methods: {
        getItemForQuickView: function getItemForQuickView(item) {
            var url = '/products/show_json.json/?slug=' + item.url.split('/')[2].split('-pid-')[0] + '&id=' + item.id;

            $('#quickViewOwl .owl-thumbs').remove();
            $('#quickViewOwl').owlCarousel('destroy');

            this.item = item;
            this.product = item;

            Vue.nextTick(function () {
                $('#quickViewOwl').owlCarousel({
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
                });
            }.bind(this));
        },
        addToCartDash: function addToCartDash() {
            this.$root.addToCartDash(this);
        },
        addToCart: function addToCart() {
            this.$root.addToCart(this.product, this);
        },
        sendCartDash: function sendCartDash(e) {
            e.stopPropagation();
            this.$root.sendCartDash(this);
        }
    }
});
Vue.component('cart-item', {
    props: ['product'],
    data: function data() {
        return {};
    }
});

Vue.component('item-attrs', {
    props: { 'product': {}, 'gridClass': { default: 'col-md-6' } },
    data: function data() {
        return {};
    },
    template: '\n    <ul class="row product-desc-table" style="    font-family: \'Montserrat\'; ">\n        <li class="color pb-3" :class="gridClass">\n            <span class="text-capitalize font-weight-bold" style="    font-family: \'Montserrat\';">\n                GIA ID</span><br>\n            <hr>\n            \n            <span class="propValue">\n            {{product.certId}}\n            </span>\n        </li>\n        <li class="color pb-3" :class="gridClass" v-for="prop in product.description_attrs">\n            <span class="text-capitalize font-weight-bold" style="    font-family: \'Montserrat\';">\n                {{prop.replace(\'_\',\' \')}}</span><br>\n            <hr>\n            <span class="propValue">\n            {{product[prop]}}\n            </span>\n        </li>\n    </ul>\n    '
});

// Forms
Vue.component('register-form', {
    props: ['accountReg'],
    mounted: function mounted() {},
    data: function data() {
        return {};
    },
    methods: {
        register: function register() {
            this.$root.register(this);
        }
    }
});
Vue.component('login-form', {
    mounted: function mounted() {},
    data: function data() {
        return {};
    },
    methods: {
        login: function login() {
            this.$root.login(this);
        }
    }

});