const Sidebar = () => import('@components/Sidebar.vue')
const Navbar = () => import('@components/Navbar.vue')
const Header = () => import('@components/Header.vue')
const Footer = () => import('@components/Footer.vue')
const Main = () => import('@pages/Main.vue')
const Login = () => import('@pages/Login.vue')
const Register = () => import('@pages/Register.vue')
const ForgotPassword = () => import('@pages/ForgotPassword.vue')
const ResetPassword = () => import('@pages/ResetPassword.vue')

const MainPages = require('./main-pages')

export default {
    routes: [
        {
            path: '',
            component: {
                template: '<router-view></router-view>'
            },
            children: [
                {
                    path: '',
                    component: Main,
                    children: [
                        {
                            path: '',
                            components: {
                                default: {
                                    template: '<router-view></router-view>'
                                },
                                sidebar: Sidebar,
                                navbar: Navbar,
                                header: Header,
                                footer: Footer
                            },
                            children: MainPages
                        }
                    ]
                },
                {
                    path: '/login',
                    name: 'login',
                    component: Login,
                },
                {
                    path: '/register',
                    name: 'register',
                    component: Register,
                },
                {
                    path: '/forgotpassword',
                    name: 'forgot_password',
                    component: ForgotPassword,
                },
                {
                    path: '/resetpassword',
                    name: 'recover_password',
                    component: ResetPassword,
                }
            ]
        }
    ]
}
