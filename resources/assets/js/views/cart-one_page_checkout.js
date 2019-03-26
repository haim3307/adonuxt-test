function beforeVueApp() {
    Vue.component('summeryItemRow', {
        props: ['orderItem'],
        created:function(){
        },
        mounted: function(){
        },
        data: function () {
            return {
                DescTabState:false
            }
        },
        methods:{
        },
        template:'#summeryItemRow'
    });
    Vue.component('single-input-item', {
        props: {'label':{},'type':{default:'text'},'name':{}},

        created:function(){
        },
        mounted: function(){
        },
        data: function () {
            return {
            }
        },
        methods:{
        },
        template:'#singleInputItem'
    });
    Vue.component('single-select-item', {
        props: {'label':{},'name':{},options:{},parent:{default:false},'parent-id':{default:false},'mode':{}},

        created:function(){
        },
        mounted: function(){
        },
        data: function () {
            return {
            }
        },
        methods:{
        },
        computed:{
            parentModel : function () {
                return this.$parent['bill_' + this.parent];
            }
        },
        template:'#singleSelectItem'
    });
}
