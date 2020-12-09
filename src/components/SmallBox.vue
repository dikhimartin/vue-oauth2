<template>
    <div :class="'small-box '+color">
        <div class="inner">
            <h3>{{ title }}</h3>
            <p>{{ subtitle }}</p>
        </div>
        <div class="icon">
            <i :class="icon || 'fa fa-circle-o'"></i>
        </div>
        <a :href="href || '#'" class="small-box-footer" v-if="!route" @click="onClick">
            {{ footer_text || 'More Info' }} <i class="fa fa-arrow-circle-right"></i>
        </a>
        <router-link v-if="!!route" :to="route" class="small-box-footer">
            {{ footer_text || 'More Info' }} <i class="fa fa-arrow-circle-right"></i>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'small-box',
    props: ['title', 'subtitle', 'icon', 'route', 'href', 'color', 'footer_text'],
    methods: {
        onClick(e) {
            this.$emit('click', e)
        }
    }
}
</script>
