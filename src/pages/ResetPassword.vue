<template>
  <div class="login-box">
    <div class="login-logo">
      <a href>{{ env.app_name }}</a>
    </div>

    <div class="login-box-body">
      <p
        class="login-box-msg"
      >You are only one step a way from your new password, recover your password now.</p>

      <form @submit.prevent="submit">
        <div class="form-group has-feedback" :class="{'has-error': error.password}">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <p class="help help-block" v-if="error.password">
            <i class="fa fa-info-circle"></i>
            {{ error.password }}
          </p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': error.password2}">
          <input
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            v-model="form.password2"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <p class="help help-block" v-if="error.password2">
            <i class="fa fa-info-circle"></i>
            {{ error.password2 }}
          </p>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-primary btn-block">Change password</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
        <router-link :to="{name: 'login'}">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        password: "",
        password2: ""
      },
      error: {}
    };
  },
  methods: {
    submit() {
      this.error = {};
      if (!this.form.password) {
        this.error.password = "Password kamu belum diisi";
        return;
      }
      if (!this.form.password2) {
        this.error.password2 = "Password kamu belum diisi";
        return;
      }
      if (this.form.password !== this.form.password2) {
          this.error.password2 = "Password harus sama";
      }
    }
  }
};
</script>

<style>
body {
  background: #d2d6de;
}
</style>
