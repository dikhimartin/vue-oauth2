const Dashboard = () => import('@pages/Dashboard.vue')
const Profile = () => import('@pages/Profile.vue')
const ProfileForm = () => import('@pages/ProfileForm.vue')
const Question = () => import('@pages/Question.vue')
const QuestionForm = () => import('@pages/QuestionForm.vue')
const QuestionDetail = () => import('@pages/QuestionDetail.vue')
const QuestionAdd = () => import('@pages/QuestionAdd.vue')
const MasterSchedule = () => import('@pages/MasterSchedule.vue')
const MasterScheduleDetail = () => import('@pages/MasterScheduleDetail.vue')
const MasterScheduleDetailPeserta = () => import('@pages/MasterScheduleDetailPeserta.vue')
const MasterScheduleAdd = () => import('@pages/MasterScheduleAdd.vue')
const MasterScheduleForm = () => import('@pages/MasterScheduleForm.vue')
const MasterScheduleAssign = () => import('@pages/MasterScheduleAssign.vue')
const Pengguna = () => import('@pages/Pengguna.vue')
const PenggunaAdd = () => import('@pages/PenggunaAdd.vue')
const PenggunaDetail = () => import('@pages/PenggunaDetail.vue')
const PenggunaForm = () => import('@pages/PenggunaForm.vue')
const Peserta = () => import('@pages/Peserta.vue')
const PesertaDetail = () => import('@pages/PesertaDetail.vue')
const PesertaForm = () => import('@pages/PesertaForm.vue')
const PesertaAdd = () => import('@pages/PesertaAdd.vue')
const UserSchedule = () => import('@pages/UserSchedule.vue')
const UserScheduleAdd = () => import('@pages/UserScheduleAdd.vue')
const UserScheduleForm = () => import('@pages/UserScheduleForm.vue')
const UserScheduleDetail = () => import('@pages/UserScheduleDetail.vue')
const ExamSchedule = () => import('@pages/ExamSchedule.vue')
const ExamScheduleList = () => import('@pages/ExamScheduleList.vue')
const OnlineTest = () => import('@pages/OnlineTest.vue')
const Examples = require('./example-pages')

module.exports = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            title: 'Profile'
        }
    }, {
        path: '/profile/form',
        name: 'profile_form',
        component: ProfileForm,
        meta: {
            title: 'Ubah Profile'
        }
    },
    {
        path: '/examples',
        component: { render: h => h('router-view') },
        children: Examples
    }, {
        path: '/master/questions',
        name: 'master_questions',
        component: Question,
        meta: {
            title: 'Bank Soal',
            subtitle: 'Master data'
        }
    }, {
        path: '/master/questions/form/:id?',
        name: 'question_form',
        component: QuestionForm,
        meta: {
            title: 'Bank Soal',
            subtitle: 'Master data'
        }
    }, {
        path: '/master/questions/add',
        name: 'question_add',
        component: QuestionAdd,
        meta: {
            title: 'Bank Soal',
            subtitle: 'Master data'
        }
    }, {
        path: '/master/questions/detail/:id?',
        name: 'question_detail',
        component: QuestionDetail,
        meta: {
            title: 'Bank Soal',
            subtitle: 'Master data'
        }
    }, {
        path: '/exam/schedule',
        name: 'exam_schedule',
        component: ExamSchedule,
        meta: {
            title: 'Jadwal Ujian',
            subtitle: 'Peserta'
        }
    },{
        path: '/exam/schedule-list',
        name: 'exam_schedule_list',
        component: ExamScheduleList,
        meta: {
            title: 'Jadwal Ujian (List View)',
            subtitle: 'Peserta'
        }
    }, {
        path: '/test/:id',
        name: 'test',
        component: OnlineTest,
        meta: {
            title: 'Ujian',
            subtitle: 'Peserta'
        }
    },{
        path: '/master/schedules',
        name: 'master_schedules',
        component: MasterSchedule,
        meta: {
            title: 'Jadwal Ujian',
            subtitle: 'Master data'
        }
    },{
        path: '/master/schedules/detail/:id?',
        name: 'schedule_detail',
        component: MasterScheduleDetail,
        meta: {
            title: 'Jadwal Ujian',
            subtitle: 'Master data'
        }
    },{
        path: '/master/schedules/form/:id?',
        name: 'schedule_form',
        component: MasterScheduleForm,
        meta: {
            title: 'Jadwal Ujian',
            subtitle: 'Master data'
        }
    },{
        path: '/master/schedules/assign/:id?',
        name: 'schedule_assign',
        component: MasterScheduleAssign,
        meta: {
            title: 'Assign Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/schedules/peserta/:id?',
        name: 'schedule_detail_peserta',
        component: MasterScheduleDetailPeserta,
        meta: {
            title: 'Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/schedules/add',
        name: 'schedule_add',
        component: MasterScheduleAdd,
        meta: {
            title: 'Jadwal Ujian',
            subtitle: 'Master data'
        }
    }, {
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
    }, {
        path: '/master/peserta',
        name: 'master_peserta',
        component: Peserta,
        meta: {
            title: 'Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/peserta/detail/:id?',
        name: 'peserta_detail',
        component: PesertaDetail,
        meta: {
            title: 'Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/peserta/form/:id?',
        name: 'peserta_form',
        component: PesertaForm,
        meta: {
            title: 'Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/peserta/add',
        name: 'peserta_add',
        component: PesertaAdd,
        meta: {
            title: 'Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/jadwal-peserta',
        name: 'master_jadwal_peserta',
        component: UserSchedule,
        meta: {
            title: 'Jadwal Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/jadwal-peserta/add',
        name: 'jadwal_peserta_add',
        component: UserScheduleAdd,
        meta: {
            title: 'Jadwal Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/jadwal-peserta/form/:id?',
        name: 'jadwal_peserta_form',
        component: UserScheduleForm,
        meta: {
            title: 'Jadwal Peserta',
            subtitle: 'Master data'
        }
    },{
        path: '/master/jadwal-peserta/detail/:id?',
        name: 'jadwal_peserta_detail',
        component: UserScheduleDetail,
        meta: {
            title: 'Jadwal Peserta',
            subtitle: 'Master data'
        }
    }
]
