<template>
    <div class="row">
        <div class="col-lg-3 col-xs-6" v-for="(item, index) in items" :key="index">
            <small-box
                :color="item.color"
                :title="item.title"
                :subtitle="item.subtitle"
                :footer_text="item.footer_text"
                :href="item.href"
                :route="item.route"
                :icon="item.icon"
                @click="onClick(item)"/>
        </div>
    </div>
</template>

<script>
import SmallBox from './SmallBox.vue'
export default {
    name: 'small-box-group',
    components:{
        SmallBox
    },
    props: ['items'],
    methods: {
        onClick(item) {
            this.$emit('click', item)
        }
    }
}
</script>
