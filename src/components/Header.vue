<template>
    <section class="content-header">
      <!-- Bread crumb and right sidebar toggle -->
      <div class="row page-titles">
          <div class="col-md-5 align-self-center">
              <h3 v-html="title" class="text-themecolor"></h3>
          </div>
          <div class="col-md-7 align-self-center">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }">Dashboard</router-link></li>
                  <li v-html="subtitle" class="breadcrumb-item"><a href="javascript:void(0)"></a></li>
                  <li v-html="title" class="breadcrumb-item active"></li>
              </ol>
          </div>
      </div>
      <!-- End Bread crumb and right sidebar toggle -->
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
