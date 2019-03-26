<template>
  <div>
    <div class="mb-4 mt-4" style="cursor: pointer;">
      <header class="container-fluid mb-4" style="padding-right: 7px"><!--container-fluid-->
        <div class="row align-items-center justify-content-between">
          <span>Diamonds Type</span>
          <nav class="d-inline-block">
            <nuxt-link class="link btn btn-lg btn-light"
                       :class="{pureActive: $route.params.type == 'loose' || !$route.params.type}"
                       :to="`/shop/diamonds/loose`">Loose
            </nuxt-link>
            <nuxt-link class="link btn btn-lg btn-light" :class="{pureActive: $route.params.type == 'fancy'}"
                       :to="`/shop/diamonds/fancy`">Fancy
            </nuxt-link>
          </nav>
        </div>
      </header>
      <div class="mt-4">
        <div class="row align-items-center justify-content-between">
          <!--       <div class="col">
                     Available Only With
                 </div>-->
          <div class="container-fluid col-12">
            <div class="d-flex justify-content-between">
              <icon-checkbox label="Videos Only" prop="has_diamond_video" icon="subway:video-1"
                             class="text-center"></icon-checkbox>
              <icon-checkbox label="Images Only" prop="has_real_image" icon="subway:image"
                             class="text-center"></icon-checkbox>
              <icon-checkbox label="In house" prop="in_house" icon="subway:home" class="text-center"></icon-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rangeFilters d-flex flex-column">
      <!--    <p>
              <span class="fa fa-angle-down"></span>
              <span class="fa fa-angle-down" style=""></span>
          </p>-->


      <div class="filter-group">
        <list-filter v-if="$route.params.type === 'fancy'" @change="$emit('loadGalleryData',$event)"
                     :list="$store.state.initialData.colorsArray" class="shopping-option-item"
                     @togglefilter="toggleFilter()" prop="fancy_color" :params="source.queryParams.q">

        </list-filter>
        <list-filter @change="$emit('loadGalleryData',$event)" :list="$store.state.initialData.shapesArray"
                     class="shopping-option-item" @togglefilter="toggleFilter()" prop="shape"
                     :params="source.queryParams.q">

        </list-filter>
      </div>

      <RangerFilter
        v-for="(val,filter,index) in source.filterLoopArray"
        :key="index "
        :id="filter + '_filter'"
        @togglefilter="source.toggleFilter()"
        class="mt-4" :query="source.query[filter]"
        :title="filter"
        :filter="filter"
      >
      </RangerFilter>
    </div>
  </div>

</template>

<script>
  import RangerFilter from './RangeFilter';
  import IconCheckbox from './IconCheckbox';
  import ListFilter from './ListFilter';

  export default {
    components: {RangerFilter, IconCheckbox, ListFilter},
    data() {
      return {
        source: this.$parent,
      }
    },
    mounted() {
      let source = this.source;
      let pureCarat = this.source;

      $.each(this.source.filterLoopArray, (key, value) => {
        var max = this.source[key + 'RangeSlider'].maxValue;
        var min = this.source[key + 'RangeSlider'].minValue;

        if (!('range-filter' in value)) {
          if (!('lightToVivid' in value)) {
            if ((!('fairToFinest' in value) || !('noneToVeryStrong' in value))) {
              this.source.query[key] = [max - this.source.query[key][1], max - this.source.query[key][0]];
            } else {
              this.source.query[key] = [this.source.query[key][0] - 1, this.source.query[key][1] - 1];
            }
          } else {
            this.source.query[key] = [this.source.query[key][0] - min, this.source.query[key][1] - min];
          }

          //else if(!('range-filter' in value) && !('fairToFinest' in value)){
        }
      });

      this.$nextTick(() => {
        function rangeQueryParam(data) {
          let query = [];
          for (let x = data.from; x >= data.to; x--) {
            query.push(x);
          }
          return query.join(',');
        }

        $.urlParam = name => {
          let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          if (results == null) {
            return null;
          }
          return decodeURI(results[1]) || 0;
        };

        function onFilterFinish(filter, data) {debugger;this;
          var searchParams = pureCarat.queryParams.q;
          data.from = data.from_pretty;
          data.to = data.to_pretty;
          var fromQueryString = filter in searchParams ? searchParams[filter].split('-') : false;

          if (!fromQueryString || (data.from != fromQueryString[0] || data.to != fromQueryString[1])) {
            pureCarat.loadGalleryData(filter, data.from + '-' + data.to);
          } else {
            data.input.parent().find('.editRange').toggle();
          }
          if (filter in pureCarat.query) pureCarat.query[filter] = [data.from, data.to];
        }

        let firstFilters = ['price', 'carat'];

        let source = this.source;
        $.each(source.filterLoopArray, (val, key) => {
          var slider = {
            skin: "flat",
            /*
                        step: 1,            // default 1 (set step)
            */
            grid: true,
            prettify: function (n) {
              // current position
              //debugger;
              var position = Math.floor(n / this.max * 100);

              // position will be between 0 and 100
              var minPos = source[val + 'RangeSlider'].min_pos || 0,
                maxPos = source[val + 'RangeSlider'].max_pos || 100;

              // calculate logarithms
              var minLog = Math.log(this.min),
                maxLog = Math.log(this.max);

              // calculate adjustment factor
              var scale = (maxLog-minLog) / (maxPos-minPos);

              // round numbers
              n = Math.exp(minLog + scale * (position - minPos));
              if (val === 'carat') {
                n = n.toFixed(2);
              }
              else {
                n =Math.floor(n);
              }
              //debugger;

              return n;
            },
            onStart(data) {
              // fired then range slider is ready
            },
            onChange(data) {
              // fired on every range slider update
              if (val in source.query) source.query[val] = [data.from_pretty, data.to_pretty];
            },
            onFinish(data) {
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
                onFilterFinish.call(this,val, data);
              }
            },
            onUpdate(data) {
              // fired on changing slider with Update method
            }
          };
          if ('steps' in this.source[val + 'RangeSlider']) {
            slider.values = this.source[val + 'RangeSlider'].steps;
          }
          if ('grid_num' in this.source[val + 'RangeSlider']) {debugger;
            slider.grid_num = this.source[val + 'RangeSlider'].grid_num;
          }
          if ('step' in this.source[val + 'RangeSlider']) {debugger;
            slider.step = this.source[val + 'RangeSlider'].step;
          }
          $("." + val + "-range-slider").ionRangeSlider(slider);
        });
      })
    }

  }
</script>

<style scoped>

</style>
