<template>
    <li style="cursor: pointer;">
        <a style="transition: 0.7 all;font-style: normal;font-size: 12px;" class="text-capitalize" :class="{ 'brand-text': isActive }" @click.prevent="toggleItem()">{{(item[2]?item[2]:item[1])}}</a>
    </li>
</template>

<script>
    export default {
        name: "ListItem",
        props: ['item'],
        data() {
            return {
                isActive: this.$parent.prop in this.$parent.params && this.$parent.params[this.$parent.prop].indexOf(this.item[0]) !== -1
            }
        },
        methods: {
            toggleItem() {
                let prop = this.$parent.prop, params = this.$parent.params, val = this.item[0];
                params[prop] = prop in params && params[prop].length ? params[prop].split(',') : [];

                if (params[prop].indexOf(val.toString()) !== -1) {
                    params[prop] = params[prop].filter(shape => shape != val);
                }
                else {
                    params[prop].push(val);
                }
                val = params[prop].join(',');
                //if(val.length)
                this.$emit('toggle',[prop, val]);
                this.isActive = this.$parent.prop in this.$parent.params && this.$parent.params[this.$parent.prop].indexOf(this.item[0]) !== -1;
            }
        }
    }
</script>

<style scoped>

</style>
