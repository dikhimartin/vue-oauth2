import Vue from 'vue'

import Datatable from '@components/Datatable'
import Box from '@components/Box'
import SmallBox from '@components/SmallBox'
import SmallBoxGroup from '@components/SmallBoxGroup'
import Select2 from "@components/Select2";


Vue.use(Datatable)

Vue.component('box', Box)
Vue.component('small-box', SmallBox)
Vue.component('small-box-group', SmallBoxGroup)
Vue.component("select2", Select2)