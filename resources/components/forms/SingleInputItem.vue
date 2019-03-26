<template>
  <div class="single-input-item d-flex flex-column">
    <!-- :placeholder="label"-->
    <label for="inp" class="inp">
      <slot>
        <input
          :data-vv-delay="delay"
          v-on="events"
          v-bind="attrs"
          placeholder=" "
          v-validate.immediate="validate"
          :data-vv-as="attrs.name"
          v-model="source[attrs.name]"
        >
      </slot>
      <span class="label text-capitalize" v-html="label">Label</span>
      <span class="border"></span>
    </label>
    <slot name="error">
      <ErrorMsg
        :name="attrs.name"
        style="    position: absolute;
                      bottom: -16px;
                  font-size: 12px;
              "
        :msg="$validator.errors.first(attrs.name,this.formScope)"      
      ></ErrorMsg>
      
    </slot>
  </div>
</template>

<script>
import ErrorMsg from "./ErrorMsg.vue";
export default {
  inject: { $validator: '$validator',formScope:'formScope' ,source:'source'},
  components: {
    ErrorMsg
  },
  created() {},
  props: {
    label: {},
    delay: { default: 0 },
    mode: { default: "" },
    validate: {},
    dref: {}


    /*    
    type: { default: "text" },
     */
  },
  inheritAttrs: false,

  mounted: function() {
    /*     this.$parent.$refs[this.attrs.name] = this.$refs.input;
     */
  },
  data: function() {
    return {};
  },
  computed: {
    events() {
      return {
        ...this.$listeners
      };
    },
    initialData() {
      return this.$store.state.initialData;
    },
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
    attrs() {
      const { label, delay, mode, dref, ...attrs } = this.$attrs;
      return attrs;
    }
  }
};
</script>

<style scoped lang="scss">
.single-input-item {
  margin-top: 23px;
  margin-bottom: 28px;
}

.inp {
  font-family: Avenir;
  position: relative;
  margin: auto;
  width: 100%;
}
.inp .label {
  position: absolute;
  top: 16px;
  left: 0;
  font-size: 16px;
  color: #9098a9;
  font-weight: 500;
  transform-origin: 0 0;
  transition: all 0.2s ease;
}
.inp .border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: #07f;
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all 0.15s ease;
}
.inp input {
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 12px 0;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #c8ccd4;
  background: none;
  border-radius: 0;
  color: #223254;
  transition: all 0.15s ease;
}
.inp input:hover {
  background: rgba(34, 50, 84, 0.03);
}
.inp input:not(:placeholder-shown) + span {
  color: #5a667f;
  transform: translateY(-26px) scale(0.75);
}
.inp input:focus {
  background: none;
  outline: none;
}
.inp input:focus + span,
input:-webkit-autofill + span {
  color: #07f;
  transform: translateY(-26px) scale(0.75);
}
.inp input:focus + span + .border {
  transform: scaleX(1);
}
@-webkit-keyframes autofill {
  to {
    color: #666;
    background: transparent;
  }
}

input:-webkit-autofill {
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}
</style>
