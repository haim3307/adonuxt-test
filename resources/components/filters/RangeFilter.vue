<template>
    <div class="mt-4" :class="{'mt-4': !source.documentLoaded}">
        <div class="mb-2" style="cursor: pointer;" @click="toggleFilter()" :class="{'foldedFilterTitle':!showFilter}">
            <span class="fa fa-angle-down toggleFilterFold" :class="{foldArrow:!showFilter}"></span>
            <span class="text-capitalize">{{filter.replace('fancy_','').replace('_',' ')}}</span>
        </div>
        <div class="animated fadeIn"  style="display: none;" v-show="source.documentLoaded">
            <input type="text" class="js-range-slider" :class="filter+'-range-slider'" name="my_range"
                   data-type="double"
                   :data-from="query[0]"
                   :data-to="query[1]"
                   :data-min="rangeSlider.minValue"
                   :data-max="rangeSlider.maxValue"
                   data-grid="true"
                   style="opacity: 0;min-height: 60px" :style="'opacity:'+ (source.documentLoaded? '1':'0')"
            />
            <div v-if="title == 'price' || title == 'carat'">
                <div style="display:none;" class="editRange">
                    <div class="d-flex justify-content-between mt-3 mb-3">
                        <input class="text-center" type="number" v-model.number="query[0]" @change="updateRange('from',0,$event)" @keyup.enter="handleKeyUp()" :min="rangeSlider.minValue" :max="rangeSlider.maxValue" style="border-radius: 22px;font-size: 11px;">
                        <input class="text-center" type="number" v-model.number="query[1]" @change="updateRange('to',1,$event)" @keyup.enter="handleKeyUp()" :min="rangeSlider.minValue" :max="rangeSlider.maxValue" style="border-radius: 22px;font-size: 11px;">
                    </div>
                </div>
            </div>

        </div>

        <!-- Fake filter until document is loaded -->
        <span v-show="!source.documentLoaded" class="irs irs--flat js-irs-2 irs-with-grid"><span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min" style="visibility: visible;">Min</span><span class="irs-max" style="visibility: visible;">Max</span><span class="irs-from" style="visibility: visible; left: 31.781%;">From</span><span class="irs-to" style="visibility: visible; left: 74.5902%;">To</span><span class="irs-single" style="visibility: hidden; left: 50.2744%;"></span></span><span class="irs-grid" style="width: 96.0094%; left: 1.89532%;"><span class="irs-grid-pol" style="left: 0%"></span><span class="irs-grid-text js-grid-text-0" style="left: 0%; margin-left: -1.55884%;"></span><span class="irs-grid-pol small" style="left: 7.4074074074074066%"></span><span class="irs-grid-pol small" style="left: 3.7037037037037033%"></span><span class="irs-grid-pol" style="left: 11.11111111111111%"></span><span class="irs-grid-text js-grid-text-1" style="left: 11.1111%; visibility: visible; margin-left: -1.49844%;"></span><span class="irs-grid-pol small" style="left: 18.51851851851852%"></span><span class="irs-grid-pol small" style="left: 14.814814814814813%"></span><span class="irs-grid-pol" style="left: 22.22222222222222%"></span><span class="irs-grid-text js-grid-text-2" style="left: 22.2222%; visibility: visible; margin-left: -1.43414%;"></span><span class="irs-grid-pol small" style="left: 29.629629629629626%"></span><span class="irs-grid-pol small" style="left: 25.925925925925924%"></span><span class="irs-grid-pol" style="left: 33.33333333333333%"></span><span class="irs-grid-text js-grid-text-3" style="left: 33.3333%; visibility: visible; margin-left: -1.62314%;"></span><span class="irs-grid-pol small" style="left: 40.74074074074074%"></span><span class="irs-grid-pol small" style="left: 37.03703703703703%"></span><span class="irs-grid-pol" style="left: 44.44444444444444%"></span><span class="irs-grid-text js-grid-text-4" style="left: 44.4444%; margin-left: -1.55884%;"></span><span class="irs-grid-pol small" style="left: 51.851851851851855%"></span><span class="irs-grid-pol small" style="left: 48.148148148148145%"></span><span class="irs-grid-pol" style="left: 55.55555555555556%"></span><span class="irs-grid-text js-grid-text-5" style="left: 55.5556%; visibility: visible; margin-left: -1.06196%;"></span><span class="irs-grid-pol small" style="left: 62.962962962962955%"></span><span class="irs-grid-pol small" style="left: 59.25925925925926%"></span><span class="irs-grid-pol" style="left: 66.66666666666666%"></span><span class="irs-grid-text js-grid-text-6" style="left: 66.6667%; visibility: visible; margin-left: -1.30943%;"></span><span class="irs-grid-pol small" style="left: 74.07407407407406%"></span><span class="irs-grid-pol small" style="left: 70.37037037037037%"></span><span class="irs-grid-pol" style="left: 77.77777777777777%"></span><span class="irs-grid-text js-grid-text-7" style="left: 77.7778%; visibility: visible; margin-left: -1.49844%;"></span><span class="irs-grid-pol small" style="left: 85.18518518518518%"></span><span class="irs-grid-pol small" style="left: 81.48148148148148%"></span><span class="irs-grid-pol" style="left: 88.88888888888889%"></span><span class="irs-grid-text js-grid-text-8" style="left: 88.8889%; margin-left: -1.37373%;"></span><span class="irs-grid-pol small" style="left: 96.29629629629629%"></span><span class="irs-grid-pol small" style="left: 92.5925925925926%"></span><span class="irs-grid-pol" style="left: 100%"></span><span class="irs-grid-text js-grid-text-9" style="left: 100%; visibility: visible; margin-left: -1.68355%;"></span></span><span class="irs-bar" style="left: 33.9984%; width: 42.6708%;"></span><span class="irs-shadow shadow-from" style="display: none;"></span><span class="irs-shadow shadow-to" style="display: none;"></span><span class="irs-handle from" style="left: 32.0031%;"><i></i><i></i><i></i></span><span class="irs-handle to type_last" style="left: 74.6739%;"><i></i><i></i><i></i></span></span>
    </div>

</template>
<script>
    export default {
        props: ['query', 'title','filter'],
        created: function created() {
            this.$parent.$on('togglefilter',  (e) =>
                this.toggleFilter(e)
            );
        },

        data: function data() {
            const source = this.$parent.$parent;

            return {
                showFilter: true,
                source,
                rangeSlider : source[this.filter + 'RangeSlider']
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
            updateRange (dir,index,e)
            {
                let update = {
                    [dir+'_pretty'] : this.query[index]
                };
                let {minValue,maxValue} = this.rangeSlider;
                let $el = $('.'+this.title+'-range-slider').data('ionRangeSlider'),value=this.query[index];

              var minPos = this.rangeSlider.min_pos || 0,
                maxPos = this.rangeSlider.max_pos || 100;

              var minLog = Math.log($el.result.min),
                maxLog = Math.log($el.result.max);

              // calculate adjustment factor
              var scale = (maxLog-minLog) / (maxPos-minPos);

              //let test = Math.exp((position - this.minpos) * this.scale + this.minlval);
              let to_pretty = minPos + (Math.log(value) - minValue) / scale;debugger;
              $el.update({to_pretty});
            },
            handleKeyUp(data)
            {
                var searchParams = this.source.queryParams.q;

                var fromQueryString = this.title in searchParams ? searchParams[this.title].split('-') : false;

                if (!fromQueryString || this.query[0] != fromQueryString[0] || this.query[1] != fromQueryString[1]) {
                    this.source.loadGalleryData(this.title, this.query[0] + '-' + this.query[1]);
                }
            }
        },
        computed:{
          min(){

          }
        }
    }
</script>

<style lang="scss">
    @import "../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css";
</style>
