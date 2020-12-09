import Vue from 'vue'
// import 'datatables.net-bs4/css/dataTables.bootstrap4.css'
// import 'datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.css'
// import 'datatables.net-colreorder-bs4/css/colReorder.bootstrap4.css'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import 'datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css'
import 'datatables.net-colreorder-bs/css/colReorder.bootstrap.css'

import 'datatables.net'
import 'jszip';
import 'pdfmake';
import 'datatables.net-bs';
import 'datatables.net-buttons-bs';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-colreorder-bs';
import 'datatables.net-fixedcolumns-bs';
import 'datatables.net-fixedheader-bs';
import 'datatables.net-keytable-bs';
import 'datatables.net-responsive-bs';
import 'datatables.net-rowgroup-bs';
import 'datatables.net-rowreorder-bs';
import 'datatables.net-scroller-bs';

// import 'datatables.net-autofill-bs';
// import 'datatables.net-searchpanes-bs';
// import 'datatables.net-select-bs';

// import DataTable from 'datatables.net'
// import 'jszip'
// import 'pdfmake'
// import 'datatables.net-bs4'
// import 'datatables.net-buttons-bs4'
// import 'datatables.net-buttons/js/buttons.colVis.js'
// import 'datatables.net-buttons/js/buttons.flash.js'
// import 'datatables.net-buttons/js/buttons.html5.js'
// import 'datatables.net-buttons/js/buttons.print.js'
// import 'datatables.net-colreorder-bs4'
// import 'datatables.net-fixedcolumns-bs4'
// import 'datatables.net-fixedheader'
// import 'datatables.net-fixedheader-bs4'
// import 'datatables.net-responsive-bs4'
// import 'datatables.net-rowgroup-bs4'
// import 'datatables.net-rowreorder-bs4'
// import 'datatables.net-scroller-bs4'
// import 'datatables.net-select-bs4'
const {console} = window
$.fn.dataTable.ext.errMode = 'none'

const props = ['url', 'buttons', 'title', 'icon', 'border', 'hover', 'striped',
'sm', 'rowNumbers', 'autocommit', 'filters', 'fixedHeader', 'pageStartAt', 'searchKey',
'searchDefault', 'simpleSort']
const regx = /^(_|ao|i|b|fn|aa|ai|a|o|s)([A-Z][A-z0-9_]+)$/
for (let i in $.fn.dataTable.defaults) {
    props.push(i)
    if (i.match(regx)) {
        let str = i.replace(regx, '$2')
        let keyName = str[0].toLowerCase()+str.substring(1)
        if (props.indexOf(keyName) < 0)
            props.push(keyName)
    }
}
const watchers = {}
watchers.config = {
    deep: true,
    handler: function(config) {
        for (var v in config) {
            this.setup(v, config[v], false)
        }

        this.commit()

        // this.init(this.cnf)
    }
}
for (var i in props) {
    watchers[props[i]] = {
        deep: true,
        handler: (function(p){
            return function(value) {
                this.setup(p, value, true)
            }
        })(props[i])
    }
}
props.push('config')
const baseConfig = () => {
    return {
        pagingType: 'full_numbers',
        colReorder: true,
        fixedHeader: false,
        responsive: true,
        destroy: true,
        stateSave: true,
        stateDuration: -1,
        serverSide: false,
        processing: true,
        keys: true,
        displayLength: 10,
        displayStart: 0,
        autoWidth: false,
        language: {
            paginate: {
                first: '&laquo;',
                previous: '&lsaquo;',
                next: '&rsaquo;',
                last: '&raquo;'
            },
            // search: "Cari",
            // info: "Menampilkan _START_ s/d _END_ dari _TOTAL_ data",
            // infoEmpty: "Menampilkan 0 s/d 0 dari 0 data",
            infoFiltered: "",
            loadingRecords: "Loading ...",
            // loadingRecords: "Memuat data...",
            processing: "<i class='fa fa-spin fa-circle-notch'></i> Loading...",
            // processing: "<i class='fa fa-spin fa-circle-notch'></i> Memuat data...",
            // zeroRecords: "Tidak ada data",
            // emptyTable: "Tidak ada data ditemukan",
            lengthMenu: "_MENU_"
        },
        select: {
            style: 'os',
            info: false,
            items: 'row'
        },
        buttons: [],
        dom: "<'box box-primary'"+
                "<'box-header with-border'"+
                    "<'row'"+
                        "<'col-sm-12 col-md-8'B<'table-title'>>"+
                        "<'col-sm-12 col-md-4'f>"+
                        // "<'col-sm-12 col-md-4'l>"+
                    ">"+
                ">"+
                "<'box-body'"+
                    "tr"+
                ">"+
                "<'box-footer'"+
                    "<'row'<'col-sm-12 col-md-8'li><'col-sm-12 col-md-4'p>>"+
                ">"+
            ">",
        ajax: {
            cache: true,
            dataSrc: (json) => {
                var recordTotal = 0
                var recordFiltered = 0
                try {
                    if (typeof json.number_of_elements == 'number') {
                        recordTotal = json.number_of_elements
                    }
                    if (typeof json.total_elements == 'number') {
                        recordFiltered = json.total_elements
                    }
                } catch (e) {}

                try {
                    if (typeof json.data.data.items == 'object') {
                        recordTotal = json.data.data.items.length
                    }
                } catch (e) {}

                try {
                    if (typeof json.data.items == 'object') {
                        recordTotal = json.data.items.length
                    }
                } catch (e) {}

                try {
                    if (typeof json.data.total_items == 'number') {
                        recordFiltered = json.data.total_items
                    }
                } catch (e) {}

                try {
                    if (typeof json.data.total == 'number') {
                        recordFiltered = json.data.total
                    }
                } catch (e) {}

                try {
                    if (typeof json.total == 'number') {
                        recordFiltered = json.total
                    }
                } catch (e) {}

                try {
                    if (typeof json.total_count == 'number') {
                        recordFiltered = json.total_count
                    }
                } catch (e) {}

                var items = []
                if (typeof json.content == 'object') {
                    items = json.content
                }

                if (!items.length) {
                    try {
                        if (typeof json.data.data.items == 'object') {
                            items = json.data.data.items
                        }
                    } catch (e) {}
                }

                if (!items.length) {
                    try {
                        if (typeof json.data.items == 'object') {
                            items = json.data.items
                        }
                    } catch (e) {}
                }

                if (!items.length) {
                    try {
                        if (typeof json.items == 'object' && typeof json.items.length == 'number') {
                            items = json.items
                        }
                    } catch (e) {}
                }

                if (!items.length) {
                    try {
                        if (typeof json.data == 'object' && typeof json.data.length == 'number') {
                            items = json.data
                        }
                    } catch (e) {}
                }

                if (!items.length) {
                    try {
                        if (typeof json.data.data == 'object' && typeof json.data.data.length == 'number') {
                            items = json.data.data
                        }
                    } catch (e) {}
                }

                if (!recordTotal) {
                    recordTotal = items.length
                }

                json.recordsTotal = recordTotal
                json.recordsFiltered = recordFiltered

                return items
            },
            data(params, settings) {
                let overrideParams = {
                    per_page: params.length,
                    search: params.search ? (params.search.value || '') : ''
                }
                let pageStartAt = 0
                let searchKey = null
                let searchDefault = ''
                let simpleSort = true
                // let extraFilters = []
                try {
                    pageStartAt = settings.oInstance.data('page-start-at')
                    if (!pageStartAt) {
                        pageStartAt = 0
                    }
                } catch (e) {}
                try {
                    searchKey = settings.oInstance.data('search-key')
                    if (!searchKey) {
                        searchKey = null
                    }
                } catch (e) {}
                try {
                    searchDefault = settings.oInstance.data('search-default')
                    if (!searchDefault) {
                        searchDefault = ''
                    }
                } catch (e) {}
                try {
                    simpleSort = settings.oInstance.data('simple-sort')
                    simpleSort = simpleSort == 'true' || simpleSort == true
                } catch (e) {}

                if (searchKey) {
                    overrideParams[searchKey] = searchDefault
                }

                try {
                    overrideParams.page = !params.start ? 0 : Math.round(params.start / params.length)
                    overrideParams.size = params.length

                    overrideParams.page += parseInt(pageStartAt)

                    if (params.order.length > 0) {
                        let order = params.order[0]
                        if (params.columns[order.column].orderable != false) {
                            overrideParams.sort = ''
                            if (simpleSort == true) {
                                overrideParams.sort = order.dir != 'desc' ? '' : '-'
                            } else {
                                overrideParams.order = order.dir
                            }
                            overrideParams.sort+= params.columns[order.column].data
                        }
                    }
                    if (params.search.value) {
                        let searchValue = params.search.value.replace(/^\s+|\s+$/g, '')
                        if (searchKey) {
                            overrideParams[searchKey] = searchValue
                        } else {
                            let columns = []
                            for (let c in params.columns) {
                                let col = params.columns[c]
                                if (col.searchable == false) {
                                    continue
                                }
                                columns.push(JSON.stringify(
                                    [col.data, "like", searchValue]
                                ))
                            }
                            overrideParams.filters = '['+columns.join(',["OR"],')+']'
                        }
                    }
                } catch(e){
                }

                return overrideParams
            }
        }
    }
}
$.extend(true, $.fn.dataTable.defaults, baseConfig())

$.fn.dataTable.Buttons.defaults.dom = {
    container: {
        tag: "div",
        className: "btn-group"
    },
    collection: {
        tag: "div",
        className: "dt-button-collection"
    },
    button: {
        tag: "button",
        className: "btn",
        active: "active",
        disabled: "disabled"
    },
    buttonLiner: {
        tag: "",
        className: ""
    }
}

const DataTable = {
    template: '<div><table class="table"></table><slot></slot></div>',
    name: 'data-table',
    props: props,
    data() {
        return {
            table: null,
            dataTables: null,
            cnf: {},
        }
    },
    created() {
        this.cnf = {}
        for (var i in this.$props) {
            if (i != 'config' && typeof this.$props[i] != 'undefined') {
                this.setup(i, this.$props[i], false)
            } else if (i == 'config' && typeof this.$props[i] != 'undefined') {
                for (var v in this.$props[i]) {
                    this.setup(v, this.$props[i][v], false)
                }
            }
        }
    },
    mounted() {
        var me = this

        this.cnf.initComplete = function(settings) {
            var t = this.api()
            if (me.cnf.rowNumbers) {
                t.on('order.dt search.dt draw.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        cell.innerHTML = '<span class="float-right">'+(i+1)+'</span>'
                    });
                }).draw()
            }
            if (me.cnf.title) {
                var icon = ''
                if (me.cnf.icon) {
                    icon = '<i class="fa '+me.cnf.icon+'"></i> '
                }
                $(settings.nTableWrapper).find('.table-title').html('<h4 class="box-title">'+icon + me.cnf.title+'</h4>')
            }
            try {
                var disableSorts = 0
                for (var i in settings.aoColumns) {
                    if (settings.aoColumns[i].bSortable == false) {
                        disableSorts++
                    }
                }
                if (disableSorts == settings.aoColumns.length) {
                    $(settings.nTable).addClass('sorting_disabled')
                } else {
                    $(settings.nTable).removeClass('sorting_disabled')
                }
            } catch (e) {
                $(settings.nTable).removeClass('sorting_disabled')
            }
            try {
                t.responsive.rebuild()
                t.responsive.recalc()
            } catch (e) {}
            this.trigger('created', settings)
        }

        this.table = $('table', this.$el).eq(0)
        this.table.off('click', 'tbody tr').on('click', 'tbody tr', function() {
            if (me.dataTable) {
                var row = me.dataTable.row(this)
                me.clickRow(row)
            }
        })

        this.init(this.cnf)
        const resizeTable = () => {
            var hasModal = false
            var isModalVisible = false
            try {
                var modal = this.table.closest('.modal')
                hasModal = modal.length > 0
                isModalVisible = modal.is(':visible')
            } catch (e) {}
            if ((hasModal && isModalVisible) || !hasModal) {
                setTimeout(() => {
                    if (this.dataTable) {
                        try {
                            this.dataTable.responsive.rebuild()
                            this.dataTable.responsive.recalc()
                        } catch (e) {}
                        this.dataTable.columns.adjust().draw()
                    }
                }, 500)
            }
        }
        $(window).on('resize', resizeTable)
        $(document).on('collapsed.lte.pushmenu shown.lte.pushmenu collapsed.pushMenu expanded.pushMenu', resizeTable)
    },
    methods: {
        clickRow(row) {
            this.$emit('click', row)
        },
        init(config) {
            if (!config.columns && this.cnf.columns) {
                config.columns = this.cnf.columns
            }
            if (!config.ajax) {
                config.ajax = {}
            }
            var hasDefaults = !!config.columns && (!!config.data || !!config.ajax.url)
            if (!hasDefaults) {
                hasDefaults = !!config.columns
            }
            if (!hasDefaults) {
                return
            }

            config.destroy = true
            config.serverSide = !config.data && !!config.ajax.url
            config.ajax = config.serverSide ? config.ajax : null

            if (this.autocommit !== false) {
                this.cnf = config;
                this.commit()
            }
        },
        commit() {
            this.$nextTick(() => {
                try {
                    var fixedHeader = this.cnf.fixedHeader != false
                    this.cnf = $.extend(true, {}, baseConfig(), this.cnf)
                    if (this.table.closest('.modal').length || this.table.closest('tr').length || fixedHeader == false) {
                        this.cnf.fixedHeader = false
                    } else {
                        this.cnf.fixedHeader = fixedHeader
                        if ($('body').hasClass('layout-navbar-fixed')) {
                            $.fn.dataTable.FixedHeader.defaults.headerOffset = $('.main-header').innerHeight()
                        } else {
                            $.fn.dataTable.FixedHeader.defaults.headerOffset = 0
                        }
                    }
                    // console.log(JSON.stringify(this.cnf, null, 4))
                    if (this.cnf.pageStartAt) {
                        this.table.data('page-start-at', this.cnf.pageStartAt)
                    } else {
                        this.table.removeData('page-start-at')
                    }
                    if (this.cnf.searchKey) {
                        this.table.data('search-key', this.cnf.searchKey)
                        this.table.data('search-default', this.cnf.searchDefault || '')
                    } else {
                        this.table.removeData('search-default')
                        this.table.removeData('search-key')
                    }
                    if (this.cnf.simpleSort) {
                        this.table.data('simple-sort', this.cnf.simpleSort)
                    } else {
                        this.table.removeData('simple-sort')
                    }
                    if (!this.cnf.columns || (this.cnf.columns && !this.cnf.columns.length)) {
                        return
                    }
                    this.dataTable = this.table.DataTable(this.cnf)
                    if (this.cnf.border) {
                        this.table.addClass('table-bordered')
                    } else {
                        this.table.removeClass('table-bordered')
                    }
                    if (!this.cnf.hover) {
                        this.table.removeClass('table-hover')
                    } else {
                        this.table.addClass('table-hover')
                    }
                    this.dataTable.columns.adjust()
                } catch (e){
                    console.log(e)
                }
            })
        },
        setup(key, value, reRender) {
            var cnf = {}
            cnf[key] = value
            if (key == 'url') {
                cnf = {
                    ajax: {},//this.baseConfig.ajax,
                    processing: true,
                    bProcessing: true,
                    serverSide: true,
                    bServerSide: true,
                    searchDelay: 1000
                };
                cnf.ajax.url = value
            } else if (key == 'data') {
                cnf = {
                    data: value,
                    sAjaxSource: undefined,
                    processing: false,
                    bProcessing: false,
                    serverSide: false,
                    bServerSide: false,
                    searchDelay: 500
                };
            }
            $.extend(this.cnf, cnf)

            // console.log(JSON.parse(JSON.stringify(this.cnf)))

            if (reRender && this.columns && this.columns.length > 0) {
                this.init(this.cnf)
            }
        }
    },
    watch: {
        ...watchers,
    },
    beforeDestroy() {
        // console.log('destroy')
        try {
            if (this.dataTable) {
                this.dataTable.destroy()
            }
            if (this.table) {
                this.table.off()
            }
        } catch(e) {}
        this.dataTable = undefined
        this.table = undefined
    },
    destroyed() {
        // console.log('destroyed')
    }
}

Vue.component('data-tables', DataTable)
Vue.component('datatable', DataTable)
export default DataTable
