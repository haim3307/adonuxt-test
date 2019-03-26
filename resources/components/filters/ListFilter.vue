<template>
    <div :class="!showFilter?'pt-5':'pt-3'">
        <div class="mb-2 text-capitalize" style="cursor: pointer;" @click="toggleFilter()" :class="{'foldedFilterTitle':!showFilter}">
            <span class="fa fa-angle-down toggleFilterFold" :class="{foldArrow:!showFilter}"></span>
            {{prop.replace('fancy_','')}}
        </div>
        <ul class="sidebar-list p-4 ml-1 mr-1 row">
            <list-item @toggle="$emit('change',$event)" v-for="item in list" class="col-md-3 pb-4" :item='item' :key="item[0]"></list-item>
        </ul>
    </div>
</template>

<script>
    import ListItem from './ListItem';
    export default {
        name: "ListFilter",
        components: {ListItem},
        props: ['prop','params','list'],
        created() {
            this.$parent.$on('togglefilter', e => this.toggleFilter(e) );
        },
        data() {
            return {
                showFilter:true
            }
        },
        methods:{
            toggleFilter(state)
            {
                var $el = $(this.$el).find('ul');
                if(typeof state == "undefined")
                {
                    this.showFilter = !this.showFilter;
                    $el.slideToggle();
                }
                else if(state)
                {
                    this.showFilter = state;
                    $el.slideUp();
                }
                else
                {
                    this.showFilter = state;
                    $el.slideDown();
                }
            }
        }
    }
</script>

<style scoped>

</style>