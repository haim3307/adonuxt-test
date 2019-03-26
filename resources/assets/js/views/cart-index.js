function beforeVueApp() {
    Vue.component('cart-row', {
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
            toggleDescription:function () {
                this.DescTabState = this.DescTabState == 'open' ? 'closed' : 'open';
            }
        },
        template:'#cartRow'
    });
}