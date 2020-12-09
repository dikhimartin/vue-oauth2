<template>
    <select class="form-control" style="width: 100%;">
        <slot></slot>
    </select>
</template>

<script>
export default {
    props: ['options', 'config', 'value'],
    name: 'select2',
    data() {
        return {
            conf: undefined
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if (this.config) {
                this.conf = this.config
            }
            var i = setInterval(() => {
                if (!this.loading) {
                    this.create()
                    clearInterval(i)
                }
            }, 100)
        },
        create() {
            var el = $(this.$el)
            .select2(this.conf || undefined)
            .on('change', () => {
                var val = el.val()
                if (val && val.toString().match(/^[0-9]+$/)) {
                    val = parseInt(val)
                }
                if (this.loading) {
                    return
                }
                this.$emit('input', val)
                this.$emit('change', val)
            })
            .on('change.select2', (o) => this.$emit('changeSelect2', o))
            .on('select2:closing', (o) => this.$emit('select2Closing', o))
            .on('select2:close', (o) => this.$emit('select2Close', o))
            .on('select2:opening', (o) => this.$emit('select2Opening', o))
            .on('select2:open', (o) => this.$emit('select2Open', o))
            .on('select2:selecting', (o) => this.$emit('select2Selecting', o))
            .on('select2:select', (o) => this.$emit('select2Select', o))
            .on('select2:unselecting', (o) => this.$emit('select2Unselecting', o))
            .on('select2:unselect', (o) => this.$emit('select2Unselect', o))
            .on('select2:clearing', (o) => this.$emit('select2Clearing', o))
            .on('select2:clear', (o) => this.$emit('select2Clear', o))
            if (this.value && !this.loading) {
                el.val(this.value)
                el.trigger('change')
            }
        },
        destroy() {
            try {
                $(this.$el)
                .off()
                .select2("destroy")
            } catch (e) {}
        }
    },
    computed: {
        loading() {
            try {
                return this.$store.state.loading
            } catch(e) {}

            return false
        }
    },
    watch: {
        value(value) {
            if (this.loading) {
                return
            }
            $(this.$el)
            .val(value)
            .trigger("change")
        },
        options(options) {
            $(this.$el)
            .empty()
            .select2({ data: options })
        },
        config: {
            deep: true,
            handler: function(val) {
                if ($(this.$el).hasClass('select2-hidden-accessible')) {
                    this.destroy()
                }
                this.init()
            }
        }
    },
    destroyed: function() {
        this.destroy()
    }
}
</script>
