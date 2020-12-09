<template>
    <li :class="{'treeview': item.items, 'menu-open active': containChild($route.name), 'header': item.header}">

        <span v-if="item.header" v-html="item.title"></span>

         <a v-if="!item.header && !item.route"
            :target="item.target" :href="item.href || '#'" :class="{'active': containChild($route.name)}">
            <i v-if="item.icon" :class="item.icon"></i>
            <span v-html="item.title"></span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right" v-if="item.items"></i>
                <span v-if="item.icon_right" class="pull-right" :id="item.id_icon_right" :class="item.icon_right">{{item.icon_right_text}}</span>
            </span>
        </a>

        <router-link v-if="!item.header && item.route" :to="item.route"
            :class="{'active': containChild($route.name)}">
            <i v-if="item.icon" :class="item.icon"></i>
            <span v-html="item.title"></span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right" v-if="item.items"></i>
                <span v-if="item.icon_right" class="pull-right" :id="item.id_icon_right" :class="item.icon_right">{{item.icon_right_text}}</span>
            </span>
        </router-link>

        <ul v-if="!item.header && item.items" v-show="containChild($route.name)" class="treeview-menu">
            <nav-item v-for="(it, index) in item.items" :key="index" @routeAdd="routeAdd" :item="it"></nav-item>
        </ul>
    </li>
</template>


<script>
import NavItem from './NavItem.vue'
export default {
    name: 'nav-item',
    props: ['item'],
    components: {
        NavItem
    },
    data() {
        return {
            childs: [],
            selected_on: []
        }
    },
    mounted() {
        this.selected_on = this.item.selected_on || []
        if (this.selected_on) {
            this.childs = this.childs.concat(this.selected_on)
        }
        if (this.item.route) {
            this.childs.push(this.item.route.name)
        }

        for (let c in this.childs) {
            this.routeAdd(this.childs[c])
        }
    },
    methods: {
        routeAdd(name) {
            this.$emit('routeAdd', name)
            if (typeof this.item.items != 'undefined' && !this.containChild(name)) {
                this.childs.push(name)
            }
        },
        containChild(name) {
            return this.childs.indexOf(name) >= 0
        }
    }
}
</script>
