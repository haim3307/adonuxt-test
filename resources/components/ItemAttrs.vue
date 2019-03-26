<template>
    <ul class="row product-desc-table" style="    font-family: 'Montserrat'; ">
        <li class="color pb-3" :class="gridClass">
            <span class="text-capitalize font-weight-bold" style="    font-family: 'Montserrat';">
                GIA ID</span><br>
            <hr>

            <span class="propValue">
            {{product.certId}}
            </span>
        </li>
        <li class="color pb-3" :class="gridClass" v-for="prop in product.description_attrs">
            <span class="text-capitalize font-weight-bold" style="    font-family: 'Montserrat';">
                {{prop.replace('_',' ')}}</span><br>
            <hr>
            <span class="propValue">
            {{product[prop]}}
            </span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {'product':{},'gridClass':{default:'col-md-6'}}
    }
</script>

<style scoped>

</style>