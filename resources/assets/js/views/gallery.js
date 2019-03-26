'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if ('pageType' in dataToFrontEnd && dataToFrontEnd.pageType.indexOf('gallery') !== -1) {
    (function queryAdapter() {

        $.each(dataToFrontEnd.filterLoopArray, function (key, value) {
            var max = dataToFrontEnd[key + 'RangeSlider'].maxValue;
            var min = dataToFrontEnd[key + 'RangeSlider'].minValue;

            if (!('range-filter' in value)) {
                if (!('lightToVivid' in value)) {
                    if (!('fairToFinest' in value) || !('noneToVeryStrong' in value)) {
                        dataToFrontEnd.query[key] = [max - dataToFrontEnd.query[key][1], max - dataToFrontEnd.query[key][0]];
                    } else {
                        dataToFrontEnd.query[key] = [dataToFrontEnd.query[key][0] - 1, dataToFrontEnd.query[key][1] - 1];
                    }
                } else {
                    dataToFrontEnd.query[key] = [dataToFrontEnd.query[key][0] - min, dataToFrontEnd.query[key][1] - min];
                }

                //else if(!('range-filter' in value) && !('fairToFinest' in value)){
            }
        });
    })();
}

//pagination
new VuePaginate().init([]);

function rangeQueryParam(data) {
    var query = [];
    for (var x = data.from; x >= data.to; x--) {
        query.push(x);
    }
    return query.join(',');
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
};
function onFilterFinish(filter, data) {
    var searchParams = pureCarat.queryParams.q;

    var fromQueryString = filter in searchParams ? searchParams[filter].split('-') : false;

    if (!fromQueryString || data.from != fromQueryString[0] || data.to != fromQueryString[1]) {
        pureCarat.loadGalleryData(filter, data.from + '-' + data.to);
    } else {
        data.input.parent().find('.editRange').toggle();
    }
    if (filter in pureCarat.query) pureCarat.query[filter] = [data.from, data.to];
}

var firstFilters = ['price', 'carat'];

function beforeVueApp() {

    // Components
    Vue.component('aside-item', {
        props: ['item'],
        data: function data() {
            return {
                inDash: false
            };
        },
        methods: {
            addToCart: function addToCart() {
                this.$root.addToCart(this.item, this);
            }
        }
    });

    Vue.component('range-filter', {
        props: ['query', 'rangeSlider', 'title'],
        created: function created() {
            var _this = this;

            this.$parent.$on('togglefilter', function (e) {
                return _this.toggleFilter(e);
            });
        },

        data: function data() {
            return {
                showFilter: true
            };
        },
        methods: {
            toggleFilter: function toggleFilter(state) {
                var $el = $(this.$el).find('input').parent();
                if (typeof state == "undefined") {
                    this.showFilter = !this.showFilter;
                    $el.slideToggle();
                } else if (state) {
                    this.showFilter = state;
                    $el.slideUp();
                } else {
                    this.showFilter = state;
                    $el.slideDown();
                }
            },
            updateRange: function updateRange(dir, index) {
                var update = _defineProperty({}, dir, this.query[index]);
                $('.' + this.title + '-range-slider').data('ionRangeSlider').update(update);
            },
            handleKeyUp: function handleKeyUp(data) {
                var searchParams = pureCarat.queryParams.q;

                var fromQueryString = this.title in searchParams ? searchParams[this.title].split('-') : false;

                if (!fromQueryString || this.query[0] != fromQueryString[0] || this.query[1] != fromQueryString[1]) {
                    this.$root.loadGalleryData(this.title, this.query[0] + '-' + this.query[1]);
                }
            }
        }
    });
    Vue.component('list-filter', {
        props: ['prop', 'params'],
        created: function created() {
            var _this2 = this;

            this.$parent.$on('togglefilter', function (e) {
                return _this2.toggleFilter(e);
            });
        },
        data: function data() {
            return {
                showFilter: true
            };
        },

        methods: {
            toggleFilter: function toggleFilter(state) {
                var $el = $(this.$el).find('ul');
                if (typeof state == "undefined") {
                    this.showFilter = !this.showFilter;
                    $el.slideToggle();
                } else if (state) {
                    this.showFilter = state;
                    $el.slideUp();
                } else {
                    this.showFilter = state;
                    $el.slideDown();
                }
            }
        }
    });
    Vue.component('list-item', {
        props: ['item'],
        data: function data() {
            return {
                isActive: this.$parent.prop in this.$parent.params && this.$parent.params[this.$parent.prop].indexOf(this.item[0]) !== -1
            };
        },

        methods: {
            toggleItem: function toggleItem() {
                var prop = this.$parent.prop,
                    params = this.$parent.params,
                    val = this.item[0];
                params[prop] = prop in params && params[prop].length ? params[prop].split(',') : [];

                if (params[prop].indexOf(val.toString()) !== -1) {
                    params[prop] = params[prop].filter(function (shape) {
                        return shape != val;
                    });
                } else {
                    params[prop].push(val);
                }
                val = params[prop].join(',');
                //if(val.length)
                this.$root.loadGalleryData(prop, val);
                this.isActive = this.$parent.prop in this.$parent.params && this.$parent.params[this.$parent.prop].indexOf(this.item[0]) !== -1;
            }
        }
    });
    Vue.component('icon-checkbox', {
        props: ['prop', 'label', 'icon'],
        data: function data() {
            return {
                isActive: this.prop in this.$root.queryParams.q && this.$root.queryParams.q[this.prop] === '1'
            };
        },

        methods: {
            toggleAvailableWith: function toggleAvailableWith() {
                var val = !(this.prop in this.$root.queryParams.q) || this.$root.queryParams.q[this.prop] === '' ? '1' : '';
                this.$root.loadGalleryData(this.prop, val);
                this.isActive = this.toggleIsActive();
            },
            toggleIsActive: function toggleIsActive() {
                return this.prop in this.$root.queryParams.q && this.$root.queryParams.q[this.prop] === '1';
            }
        },
        template: '#icon-checkbox'
    });
}

function afterVueApp() {
    $.each(dataToFrontEnd.filterLoopArray, function (val, key) {
        var slider = {
            skin: "flat",
            /*
                        step: 1,            // default 1 (set step)
            */
            onStart: function onStart(data) {
                // fired then range slider is ready
            },
            onChange: function onChange(data) {
                // fired on every range slider update
                if (val in pureCarat.query) pureCarat.query[val] = [data.from, data.to];
            },
            onFinish: function onFinish(data) {
                // fired on pointer release
                if (firstFilters.indexOf(val) === -1) {
                    var toQueryParam = '';
                    if (!('fairToFinest' in key) && !('range-filter' in key)) {
                        data.from = pureCarat[val + 'RangeSlider'].maxValue - data.from;
                        data.to = pureCarat[val + 'RangeSlider'].maxValue - data.to;
                        toQueryParam = rangeQueryParam(data);
                    } else if (!('range-filter' in key) || 'noneToVeryStrong' in key) {
                        data.from = [data.to + pureCarat[val + 'RangeSlider'].minValue, data.to = data.from + pureCarat[val + 'RangeSlider'].minValue][0];
                        toQueryParam = rangeQueryParam(data);
                    } else {
                        toQueryParam = data.from + '-' + data.to;
                    }
                    pureCarat.loadGalleryData(val, toQueryParam);
                } else {
                    onFilterFinish(val, data);
                }
            },
            onUpdate: function onUpdate(data) {
                // fired on changing slider with Update method
            }
        };
        if ('steps' in dataToFrontEnd[val + 'RangeSlider']) {
            slider.values = dataToFrontEnd[val + 'RangeSlider'].steps;
        }
        $("." + val + "-range-slider").ionRangeSlider(slider);
    });
}
