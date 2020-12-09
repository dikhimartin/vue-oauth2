<template>
<div class="register-box">
  <div class="register-logo">
    <a href="">{{ env.app_name }}</a>
  </div>

  <div class="register-box-body">
    <p class="login-box-msg">Register a new membership</p>

    <form @submit.prevent="submit">
      <div class="form-group has-feedback" :class="{'has-error': error.fullname}">
        <input type="fullname" class="form-control" placeholder="Full name" v-model="form.fullname">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
        <p class="help help-block" v-if="error.fullname">
            <i class="fa fa-info-circle"></i> {{ error.fullname }}
        </p>
      </div>

      <div class="form-group has-feedback" :class="{'has-error': error.email}">
        <input type="email" class="form-control" placeholder="Email" v-model="form.email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        <p class="help help-block" v-if="error.email">
           <i class="fa fa-info-circle"></i> {{ error.email }}
        </p>
      </div>

      <div class="form-group has-feedback" :class="{'has-error': error.password}">
        <input type="password" class="form-control" placeholder="Password" v-model="form.password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        <p class="help help-block" v-if="error.password">
            <i class="fa fa-info-circle"></i> {{ error.password }}
        </p>
      </div>

      <div class="form-group has-feedback" :class="{'has-error': error.retype_password}">
        <input type="password" class="form-control" placeholder="Retype password" v-model="form.retype_password">
        <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
        <p class="help help-block" v-if="error.retype_password">
            <i class="fa fa-info-circle"></i> {{ error.retype_password }}
        </p>
      </div>

      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox">
            <div class="icheck-primary">
                <input type="checkbox" id="Iagree" v-model="form.Iagree"/>
                <label for="Iagree"> I agree to the terms</label>
            </div>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
    <router-link :to="{ name: 'login' }">I already have a membership</router-link>   
  </div>

</div>
</template>

<script>
export default {
	data() {
        return {
            form: {
                fullname: '',
                email: '',
                password: '',
                retype_password: '',
                Iagree: true
            },
            error: {}
        }
    },

    methods: {
        submit() {
            this.error = {}
            if (!this.form.fullname) {
                this.error.fullname = 'Nama kamu masih kosong'
                return
            }
            if (!this.form.email) {
                this.error.email = 'Email kamu masih kosong'
                return
            }
            if (!this.form.password) {
                this.error.password = 'Password kamu belum diisi'
                return
            }
            if (!this.form.retype_password) {
                this.error.retype_password = 'Retype Password kamu belum diisi'
                return
            }

            if (this.form.password != this.form.retype_password) {
                this.error.retype_password = 'Password harus sama'
                return
            }

            if (this.form.password.length < 6) {
                this.error.password = 'Password harus lebih dari 6 karakter'
                return
            }
        }
    }
  
}
</script>

<style>

	body{
		background: #d2d6de;
	}

</style>
