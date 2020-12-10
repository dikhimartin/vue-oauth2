<template>
    <div class="login-box">
        <div class="login-logo">
            <a href="">{{ env.app_name }}</a>
        </div>
        <!-- /.login-logo -->
        <div class="login-box-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <form @submit.prevent="submit">
                <div class="for`m-group has-feedback" :class="{'has-error': error.email}">
                    <input type="email" class="form-control" placeholder="Email" v-model="form.email">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                    <p class="help help-block" v-if="error.email">
                        <i class="fa fa-info-circle"></i> {{ error.email }}
                    </p>
                </div>

                <br/>
                
                <div class="form-group has-feedback" :class="{'has-error': error.password}">
                    <input type="password" class="form-control" placeholder="Password" v-model="form.password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    <p class="help help-block" v-if="error.password">
                        <i class="fa fa-info-circle"></i> {{ error.password }}
                    </p>
                </div>
                <div class="row">
                    <div class="col-xs-8">
                        <div class="icheck-primary">
                            <input type="checkbox" id="remember-me" v-model="form.remember"/>
                            <label for="remember-me"> Remember Me</label>
                        </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-xs-4">
                        <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

                <router-link :to="{name: 'forgot_password'}">I forgot my password</router-link><br>
                <router-link :to="{name: 'register' }">Register a new membership</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                remember: true
            },
            error: {
                email: null,
                password: null
            },
        }
    },
    mounted() {
        $('body').attr('class', 'hold-transition login-page')
        this.Api.logout()
    },
    methods: {
        clearError() {
            this.error.email = null
            this.error.password = null
        },
        submit() {
            this.clearError()
            if (!this.form.email) {
                this.error.email = 'Email kamu masih kosong'
                return
            }
            if (!this.form.password) {
                this.error.password = 'Password kamu belum diisi'
                return
            }
            this.Api.login(this.form.email, this.form.password)
            .then(res => {
                this.Api.setToken(res, this.form.remember)
                this.$router.replace({name: 'dashboard'})
            }).catch(e => {
                if (e.response == undefined) {
                    this.error.email = null;
                } else {
                    this.error.email = e.response.data.message
                }
            })
        }
    }
}
</script>
