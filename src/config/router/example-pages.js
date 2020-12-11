const DatatableStatic = () => import('@pages/examples/DatatableStatic.vue')
const DatatableDynamic = () => import('@pages/examples/DatatableDynamic.vue')
const DatatableClick = () => import('@pages/examples/DatatableClick.vue')
const DatatablePartial = () => import('@pages/examples/DatatablePartial.vue')
const DatatableAjax = () => import('@pages/examples/DatatableAjax.vue')

module.exports = [
    {
        path: "datatable/static",
        name: "datatable_static",
        component: DatatableStatic,
        meta: {
            title: 'Datatable Static',
            subtitle: '<code>source: src/pages/examples/DatatableStatic.vue</code>'
        }
    }, {
        path: "datatable/dynamic",
        name: "datatable_dynamic",
        component: DatatableDynamic,
        meta: {
            title: 'Datatable Dynamic',
            subtitle: '<code>source: src/pages/examples/DatatableDynamic.vue</code>'
        }
    }, {
        path: "datatable/click",
        name: "datatable_click",
        component: DatatableClick,
        meta: {
            title: 'Clickable Row',
            subtitle: '<code>source: src/pages/examples/DatatableClick.vue</code>'
        }
    }, {
        path: "datatable/partial",
        name: "datatable_partial",
        component: DatatablePartial,
        meta: {
            title: 'Partial Config',
            subtitle: '<code>source: src/pages/examples/DatatablePartial.vue</code>'
        }
    }, {
        path: "datatable/ajax",
        name: "datatable_ajax",
        component: DatatableAjax,
        meta: {
            title: 'Ajax',
            subtitle: '<code>source: src/pages/examples/DatatableAjax.vue</code>'
        }
    }
]
