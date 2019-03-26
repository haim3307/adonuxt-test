<template>
  <div class="single-input-item" v-if="showChildSelect">
    <label :for="attrs.name" class="required text-capitalize" v-html="label"></label>
    <!--       v-model="$parent.selects[name]"
    -->
    <b-form-select
      :options="options"
      size="sm"
      style="background-color: #f4f5f7;height: 55.63px;font-size: 1.4rem;padding-left: 15px;"
      v-on="events"
      v-bind="attrs"
      v-model="source[attrs.name]"
      :state="validateState(attrs.name)"
      v-validate="{ required: true }"
    />


  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: ["$validator",'source','formScope'],

  props: {
    label: {},
    options: {},
    parent: { default: false },
    "parent-id": { default: false },
    mode: {}
  },
  created: function() 
  {
    this.$parent.$on('validate',()=>{
      debugger;
    });
    if(!this.source[this.attrs.name])
    {debugger;
      this.source[this.attrs.name] = '';
    }

/*    for (var e in this.events)
    {
      e = this.events[e];
      this.$on(e.name, e.callback); // Add event listeners
    }*/
  },
  mounted: function() {debugger;this.source[this.attrs.name]},
  data: function() {
    return {};
  },
  methods: {

    validateState(ref)
    {
      if('$'+this.formScope in this.fields){
        let fields = this.fields['$'+this.formScope];debugger;
        if (ref in fields && fields[ref] && (fields[ref].dirty || fields[ref].validated)) {
          debugger;
          return !this.errors.has(ref)
        }
      }

      return null
    }
  },
  computed: {
    showChildSelect() 
    {
      let { parent, parentId } = this;
      return !parent || (parent && parentId == this.parentModel);
    },
    parentModel()
    {debugger;
      return 'source' in (this) ?this.source[this.mode + "_" + this.parent]:null;
    },
    events() 
    {
      return {
        ...this.$listeners
      };
    },
    initialData() 
    {
      return this.$store.state.initialData;
    },
    listeners() 
    {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
    attrs() 
    {
      const { label, delay, mode, dref, ...attrs } = this.$attrs;
      return attrs;
    }
  }
};
</script>

<style>
.single-input-item {
  margin-top: 18px;
  margin-bottom: 18px;
}
</style>
