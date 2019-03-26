// Vue app
(function(window,Vue,$) {
    function initVueApp() {
        var pureCarat = new Vue({
            data: $.extend(pureCaratData,{
                button:{
                    toggleFilter : 'Fold filters'
                },
                ajaxDataIsLoading:false,
                email:'',
                password:'',
                documentLoaded: document.readyState == "complete",
                cartDash:[]
            }),
            created:function(){
                var self = this;
                this.$on('loadGalleryData',function (prop,val) {
                    self.loadGalleryData(prop,val);
                });
                document.addEventListener('DOMContentLoaded',function () {
                    self.documentLoaded = true;
                });
                if(dataToFrontEnd.pageType === 'gallery' && !('q' in this.queryParams))
                {
                    this.queryParams['q'] = {};
                }

            },
            methods: {
                loadGalleryData: function (prop, val) {
                    this.ajaxDataStatus = 'loading';
                    this.products = [];
                    this.cartDash = [];

                    if(!('q' in this.queryParams))
                    {
                        this.queryParams['q'] = {};
                    }

                    if(typeof prop == "number"){
                        this.queryParams['page'] = prop;
                    }
                    if(prop === 'sort' || prop === 'RPP'){
                        this.queryParams[prop] = val;
                    }
                    else {
                        this.queryParams['q'][prop] = val;
                    }

                    if(typeof prop !== "number")
                    {
                        this.queryParams['page'] = 1;
                    }

                    for (let param in this.queryParams.q)
                    {
                        if(isNaN(param) && param in this.queryParams.q && !this.queryParams.q[param].length || (typeof this.queryParams.q[param] == "undefined"))
                        {
                            delete this.queryParams.q[param];
                        }
                    }

                    var queryString = '?' + jQuery.param(this.queryParams);

                    if(prop === 'fancy_color') this.matchRouteAndFilterUrl(prop,'/fancy-colored-diamonds' ,queryString);
                    if(prop === 'shape') this.matchRouteAndFilterUrl(prop,'/diamonds' ,queryString);

                    var self = this;
                    var baseUrl = '//'+location.host;

                    $.get(baseUrl + self.ajaxJsonUrl + queryString).then(function (data) {
                        self.products = data.products;
                        self.server = data.server;
                        self.ajaxDataStatus = 'loaded';
                        history.pushState(null, null, queryString);
                    });
                },
                matchRouteAndFilterUrl: function(prop,baseCategory,queryString){
                    if(location.pathname.includes(baseCategory) && location.pathname !== baseCategory)
                    {
                        /*                var lastCrumb = document.querySelector('#last-breadcrumb');
                                        lastCrumb.parentNode.parentNode.removeChild(lastCrumb.parentNode);
                                        document.querySelector('.breadcrumb li:last-child a').id = 'last-breadcrumb';*/
                        history.replaceState(null, null, baseCategory+queryString);
                    }

                },
                addToCart: function(product,element){
                    var baseUrl = '//'+location.host;
                    var self = this;

                    $.ajax({
                        url: baseUrl+'/cart/add/product_id/'+product.id+'.json?no-redirect=1',
                        method: 'post'
                    }).then(function (product) {
                        if(product){
                            $('.mini-cart').addClass('hover');
                            setTimeout(function () {
                                $('.mini-cart').removeClass('hover');
                            },3 * 1000);
                            self.orderItems.push(product);
                            window.location = self.seo.cart;
                        }
                    });
                    if(element) element.inDash = false;
                },
                removeFromCart : function(id) {
                    var baseUrl = '//'+location.host;
                    var suffix, deleteUrl;
                    var self = this;
                    /*            if(this.isDyoe) {
                                    deleteUrl = '/cart/remove_dyoe';
                                } else if(this.isDyo) {
                                    deleteUrl = '/cart/remove_dyo/product_id/'+this.id+'/category_id/'+this.dyoCategory;
                                } else {
                                }*/
                    deleteUrl = baseUrl + '/cart/' + id + '/remove.json';
                    $.ajax({
                        url: deleteUrl,
                        method: 'GET'
                    })
                        .then(function (res) {
                            self.orderItems = self.orderItems.filter(function (item) {
                                return item.productOrderId != id;
                            });
                        },function (e) {
                            console.log(e);
                        });
                },
                addToCartDash:function (element) {
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
                sendCartDash: function (element){
                    var self = this;
                    this.cartDash.forEach(function (DashProductElement) {
                        self.addToCart(DashProductElement.product,DashProductElement);
                        DashProductElement.inDash = false;
                    });
                    element.inDash = false;
                    self.cartDash = [];
                },
                toggleFilters: function () {
                    this.foldedFilters = !this.foldedFilters;
                    if(!this.foldedFilters){
                        this.button.toggleFilter = 'Fold filters';
                    }
                    else{
                        this.button.toggleFilter = 'Unfold filters';
                    }
                    this.$emit('togglefilter',this.foldedFilters);
                },
                register: function (self) {
                    self.$validator.validateAll().then(function () {
                        if (!self.errors.any()) {
                            if (self.$refs.full_name.value) {
                                var nameArr = self.$refs.full_name.value.split(' ');
                                self.accountReg.fname = nameArr.length > 1 ? nameArr.shift() : nameArr[0];
                                self.accountReg.lname = nameArr.join(' ');
                            }
                            self.$refs['bill_first_name'].value = self.accountReg.fname;
                            self.$refs['bill_last_name'].value = self.accountReg.lname;
                            self.$refs.account_reg_form.submit();
                        }
                        else {
                            for (var inputIndex in self.fields) self.$validator.flag(inputIndex, {touched: true});
                        }

                    });
                },
                login: function (self) {
                    self.$validator.validateAll().then(function () {
                        if (!self.errors.any()) {
                            $(function() {

                                if (localStorage.chkbx && localStorage.chkbx != '') {
                                    $('#remember_me').attr('checked', 'checked');
                                    $('#username').val(localStorage.usrname);
                                    $('#pass').val(localStorage.pass);
                                } else {
                                    $('#remember_me').removeAttr('checked');
                                    $('#username').val('');
                                    $('#pass').val('');
                                }

                                $('#remember_me').click(function() {

                                    if ($('#remember_me').is(':checked')) {
                                        // save username and password
                                        localStorage.usrname = $('#username').val();
                                        localStorage.pass = $('#pass').val();
                                        localStorage.chkbx = $('#remember_me').val();
                                    } else {
                                        localStorage.usrname = '';
                                        localStorage.pass = '';
                                        localStorage.chkbx = '';
                                    }
                                });
                            });
                            self.$refs.login_form.submit();
                        }
                        else {
                            for (var inputIndex in self.fields) self.$validator.flag(inputIndex, {touched: true});
                        }

                    });
                }

            },
            computed:{
                /*
                        fields:{}
                */
            }
            /*    validations: {
                    email: {
                        email:window.validators.email,
                    },
                    password:{
                        required:window.validators.required,
                    },
                    full_name:{
                    }
                },*/
        }).$mount('#app');
        window.pureCarat = pureCarat;
    }
    window.initVueApp = initVueApp;
})(window,Vue,jQuery);