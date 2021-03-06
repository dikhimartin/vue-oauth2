const Dashboard = () => import('@pages/Dashboard.vue')
const Profile = () => import('@pages/Profile.vue')
const ProfileForm = () => import('@pages/ProfileForm.vue')
const Pengguna = () => import('@pages/Pengguna.vue')
const PenggunaAdd = () => import('@pages/PenggunaAdd.vue')
const PenggunaDetail = () => import('@pages/PenggunaDetail.vue')
const PenggunaForm = () => import('@pages/PenggunaForm.vue')
const Examples = require('./example-pages')

module.exports = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    },{
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            title: 'Profile'
        }
    },{
        path: '/profile/form',
        name: 'profile_form',
        component: ProfileForm,
        meta: {
            title: 'Ubah Profile'
        }
    },{
        path: '/examples',
        component: { render: h => h('router-view') },
        children: Examples
    },{
        path: '/master/pengguna',
        name: 'master_pengguna',
        component: Pengguna,
        meta: {
            title: 'Pengguna',
            subtitle: 'Master data'
        }
    },{
        path: '/master/pengguna/add',
        name: 'pengguna_add',
        component: PenggunaAdd,
        meta: {
            title: 'Pengguna',
            subtitle: 'Master data'
        }
    },{
        path: '/master/pengguna/detail/:id?',
        name: 'pengguna_detail',
        component: PenggunaDetail,
        meta: {
            title: 'Pengguna',
            subtitle: 'Master data'
        }
    },{
        path: '/master/pengguna/form/:id?',
        name: 'pengguna_form',
        component: PenggunaForm,
        meta: {
            title: 'Pengguna',
            subtitle: 'Master data'
        }
    }
]
