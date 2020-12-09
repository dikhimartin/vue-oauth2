<template>
    <div class="box" :class="boxClass">
        <div class="box-header" :class="headerClass" v-if="isTrue(header)">
            <slot name="header">
                <div class="box-tools pull-left">
                    <router-link :to="back" class="btn btn-info btn-sm" v-if="back">
                        <i class="fa fa-chevron-left"></i> Kembali
                    </router-link>
                    <slot name="btn-top-left"></slot>
                </div>
                <h3 class="box-title text-center" v-if="title">
                    <span v-html="title"></span>
                </h3>
                <div class="box-tools pull-right">
                    <slot name="btn-top-right"></slot>
                </div>
            </slot>
        </div>
        <div class="box-body">
            <slot></slot>
        </div>
        <div class="box-footer" v-if="isTrue(footer)">
            <slot name="footer">
                <div class="btn-group" v-if="isTrue(actions)">
                    <button class="btn btn-primary btn-sm"><i class="fa fa-check"></i> Simpan</button>
                    <button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Hapus</button>
                    <slot name="btn-bottom"></slot>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'box',
    props: ['border', 'header', 'footer', 'color', 'title', 'back', 'actions'],
    data() {
        return {
        }
    },
    computed: {
        boxClass() {
            return {
                'box-primary': this.color == 'primary' || !this.color,
                'box-success': this.color == 'success',
                'box-warning': this.color == 'warning',
                'box-danger': this.color == 'danger',
                'box-info': this.color == 'info',
            }
        },
        headerClass() {
            return {
                'with-border': this.isTrue(this.border, true)
            }
        }
    },
    methods: {
        isTrue(value, defaultValue) {
            return (value == 'true' || value == true) ? true : (defaultValue || false)
        }
    }
}
</script>
