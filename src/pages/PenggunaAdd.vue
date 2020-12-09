<template>
<div v-if="user.role === 'admin'">
  <box title="Form Pengguna" footer="true" :back="{ name: 'master_pangguna' }">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="addPengguna">
          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.fullname }"
          >
            <label>Fullname</label>
            <input type="text" class="form-control" v-model="users.fullname" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.fullname">
              <i class="fa fa-info-circle"></i> {{ error.fullname }}
            </p>
          </div>
          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.email }"
          >
            <label>Email</label>
            <input type="email" class="form-control" v-model="users.email" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.email">
              <i class="fa fa-info-circle"></i> {{ error.email }}
            </p>
          </div>
          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.password }"
          >
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="users.password"
            />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.password">
              <i class="fa fa-info-circle"></i> {{ error.password }}
            </p>
          </div>
          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.city }"
          >
            <label>City</label>
            <input type="text" class="form-control" v-model="users.city" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.city">
              <i class="fa fa-info-circle"></i> {{ error.city }}
            </p>
          </div>
          <div class="form-group">
            <!-- <label>Role</label> -->
            <input type="hidden" class="form-control" v-model="users.role" />
          </div>
          <div class="form-group">
            <!-- <label>Status</label> -->
            <input type="hidden" class="form-control" v-model="users.status" />
          </div>
          <button type="submit" class="btn btn-primary">Add Pengguna</button>
        </form>
      </div>
    </div>
  </box>
</div>
</template>

<script>
export default {
  data() {
    return {
      users: {
        fullname: "",
        email: "",
        password: "",
        city: "",
        role: "admin",
        status: 1,
      },
      error: {
        fullname: null,
        email: null,
        password: null,
        city: null,
        role: null,
        status: null,
      },
      user:[]
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });
    // this.Api.get("/users").then((res) => {
    //   // window.console.log(res.data.users)
    //   //window.console.log(this.$route.params.id)
    //   this.question = res.data.users;
    //   //   window.console.log(this.question[0]);
    //   //   return this.question.title;
    // });
    // this.Api.get("/questionlevels").then((res) => {
    //   // window.console.log(res.data.users)
    //   //window.console.log(this.$route.params.id)
    //   this.questionlevels = res.data.question_levels;
    //   //   window.console.log(this.question[0])
    // });
    // this.onFileChanged
  },
  methods: {
    clearError() {
      this.error.fullname = null;
      this.error.email = null;
      this.error.password = null;
      this.error.city = null;
      this.error.role = null;
      this.error.status = null;
    },
    addPengguna(e) {
      this.clearError();
      if (!this.users.fullname) {
        this.error.fullname = "Fullname masih kosong";
        return;
      }
      if (!this.users.email) {
        this.error.email = "Email masih kosong";
        return;
      }

      if (!this.users.password) {
        this.error.password = "Password masih kosong";
        return;
      }
      if (!this.users.city) {
        this.error.city = "City masih kosong";
        return;
      }
      if (!this.users.role) {
        this.error.role = "Role masih kosong";
        return;
      }
      if (!this.users.status) {
        this.error.status = "Status masih kosong";
        return;
      }

      this.Api.post("/users_cek_email", this.users).then((response) => {
        if(response.data.message ==  false){
          this.error.email = "Email sudah digunakan";
        }
      });

      this.Api.post("/register", this.users).then((response) => {
        this.$router.push({ name: "master_pengguna" });
      });

      // this.errors = [];

      e.preventDefault();
    },
  },
};
</script>
