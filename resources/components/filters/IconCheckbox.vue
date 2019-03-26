<template>
    <div @click="toggleAvailableWith()" :class="{'brand-text': isActive}" class="d-flex align-items-center justify-content-between">
        <span class="iconify" :data-icon="icon" data-inline="false" style="font-size: 1em;"> </span>
        &nbsp;&nbsp;<span v-html="label"></span>
    </div>
</template>

<script>
    export default {
        props: ['prop','label','icon'],
        data() {
            let source = this.$parent.$parent;

            return {
                source,
                isActive : (this.prop in source.queryParams.q) && source.queryParams.q[this.prop] === '1'
            }
        },
        methods:{
            toggleAvailableWith(){
                let {source} = this;
                let val = !(this.prop in source.queryParams.q) || source.queryParams.q[this.prop] === ''?'1':'';
                source.loadGalleryData(this.prop,val);
                this.isActive = this.toggleIsActive();
            },
            toggleIsActive() {
                return (this.prop in this.source.queryParams.q) && this.source.queryParams.q[this.prop] === '1'
            }
        }
    }
</script>

<style scoped>

</style>