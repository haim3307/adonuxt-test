// Override vue app script cycles
(function(window) {
    window.beforeVueApp = new Function();
    window.afterVueApp = new Function();
})(window);

Vue.use(SocialSharing);

jQuery.extend(pureCaratData, dataToFrontEnd);

// Components
Vue.component('gallery-item', {
    props: ['product'],
    data() {
        return {
            inDash : false,
            itemImage : false,
            imageStatus: false
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
            this.$root.addToCartDash(this,product);
        },
        addToCart() {
            this.$root.addToCart(this.product,this);
        },
        sendCartDash(e) {
            e.stopPropagation();
            this.$root.sendCartDash(this);
        },
        quickItemChange(e){
            $('#quickView').modal('show');
            this.$root.$emit('quickItemChange',this.product);
        },
        itemImageHandler() {
            this.imageStatus = 'defaultLoading';
            this.itemImage = this.product.default_img;
        }

    }
});
Vue.component('item-quick-view', {
    data: function () {
        return {
            item:false,
            product:false
        }
    },
    mounted: function() {
        this.$root.$on('quickItemChange', function(item){
            this.getItemForQuickView(item);
        }.bind(this))
    },
    methods:{
        getItemForQuickView: function (item)
        {
            var url = '/products/show_json.json/?slug='+item.url.split('/')[2].split('-pid-')[0]+'&id='+item.id;

            $('#quickViewOwl .owl-thumbs').remove();
            $('#quickViewOwl').owlCarousel('destroy');

            this.item = item;
            this.product = item;

            Vue.nextTick(function(){
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
        addToCartDash:function () {
            this.$root.addToCartDash(this);
        },
        addToCart: function () {
            this.$root.addToCart(this.product,this);
        },
        sendCartDash: function (e) {
            e.stopPropagation();
            this.$root.sendCartDash(this);
        }
    }
});
Vue.component('cart-item', {
    props: ['product'],
    data: function () {
        return {}
    },
});

Vue.component('item-attrs', {
    props: {'product':{},'gridClass':{default:'col-md-6'}},
    data: function () {
        return {
        }
    },
    template: `
    <ul class="row product-desc-table" style="    font-family: 'Montserrat'; ">
        <li class="color pb-3" :class="gridClass">
            <span class="text-capitalize font-weight-bold" style="    font-family: 'Montserrat';">
                GIA ID</span><br>
            <hr>
            
            <span class="propValue">
            {{product.certId}}
            </span>
        </li>
        <li class="color pb-3" :class="gridClass" v-for="prop in product.description_attrs">
            <span class="text-capitalize font-weight-bold" style="    font-family: 'Montserrat';">
                {{prop.replace('_',' ')}}</span><br>
            <hr>
            <span class="propValue">
            {{product[prop]}}
            </span>
        </li>
    </ul>
    `
});

// Forms
Vue.component('register-form', {
    props:['accountReg'],
    mounted: function(){

    },
    data: function () {
        return {

        }
    },
    methods:{
        register: function(){
            this.$root.register(this);
        }
    }
});
Vue.component('login-form', {
    mounted: function(){

    },
    data: function () {
        return {

        }
    },
    methods:{
        login:function(){
            this.$root.login(this);
        }
    }

});