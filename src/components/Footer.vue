<template>
    <footer class="footer">
        <div class="pull-right hidden-xs" v-if="version">
            <b>Version</b> {{ version }}
        </div>
        <strong>Copyright &copy; 2019-{{ year }} <a href="">{{ env.app_name }}</a>.</strong>
        All rights reserved.
    </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
            version: this.env.version
        }
    }
}
</script>
