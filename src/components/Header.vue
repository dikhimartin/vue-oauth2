<template>
    <section class="content-header">
      <h1>
        <span v-html="title"></span>
        <small v-html="subtitle"></small>
      </h1>
      <ol class="breadcrumb">
        <li><router-link :to="{ name: 'dashboard' }">Home</router-link></li>
        <li class="active">{{ title }}</li>
      </ol>
    </section>
</template>

<script>
export default {
    computed: {
        title() {
            let title = this.$store.state.title || 'Dashboard'
            window.document.title = [this.env.app_name, title].join(' | ')

            return title
        },
        subtitle() {
            return this.$store.state.subtitle || ''
        }
    }
}
</script>
