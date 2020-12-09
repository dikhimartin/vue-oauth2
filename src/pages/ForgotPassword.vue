<template>
  <div class="login-box">
    <div class="login-logo">
      <a href>{{ env.app_name }}</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p
        class="login-box-msg"
      >You forgot your password? Here you can easily retrieve a new password.</p>

      <form @submit.prevent="submit">
        <div class="form-group has-feedback" :class="{'has-error': error.username}">
          <input type="email" class="form-control" placeholder="Email" v-model="form.username" />
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          <p class="help help-block" v-if="error.username">
            <i class="fa fa-info-circle"></i>
            {{ error.username }}
          </p>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-primary btn-block">Request new password</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

        <router-link :to="{name: 'login'}">Login</router-link>
    </div>
    <!-- /.login-card-body -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                remember: true
            },
            error: {}
        }
    },
    methods: {
        submit() {
            this.error = {}
            if (!this.form.username) {
                this.error.username = 'Email kamu masih kosong'
                return
            }
        }
    }
}
</script>

<style>
body {
  background: #d2d6de;
}
</style>
