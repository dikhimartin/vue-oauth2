<template>
  <div v-if="user.role === 'admin'">
    <box title="Form Peserta" footer="true" :back="{ name: 'master_peserta' }">
      <div class="row">
        <div class="col-md-4">
           <div class="form-group">
              <label>Peserta TRMS</label>
              <!-- <select class="form-control" v-model="question.level_name"></select> -->
              <select2 class="form-control" @change="changeNama($event)">
                <option value="">Select Peserta</option>
                <option v-for="data in profiles" :key="data.id" :value="data.id">
                  {{ data.fullname }}
                </option>
              </select2>
            </div>
            <form @submit.prevent="addPeserta">
            <div
              class="form-group has-feedback"
              :class="{ 'has-error': error.fullname }"
            >
              <label>Fullname</label>
              <input
                type="text"
                class="form-control"
                v-model="profile.fullname"
                disabled="disabled"
              />
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
              <input type="email" class="form-control" v-model="profile.email" disabled="disabled" />
              <span class="form-control-feedback"></span>
              <p class="help help-block" v-if="error.email">
                <i class="fa fa-info-circle"></i> {{ error.email }}
              </p>
            </div>

            <div
              class="form-group has-feedback"
              :class="{ 'has-error': error.city }"
            >
              <label>City</label>
              <input type="text" class="form-control" v-model="profile.city" disabled="disabled" />
              <span class="form-control-feedback"></span>
              <p class="help help-block" v-if="error.city">
                <i class="fa fa-info-circle"></i> {{ error.city }}
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
                v-model="profile.password"
              />
              <span class="form-control-feedback"></span>
              <p class="help help-block" v-if="error.password">
                <i class="fa fa-info-circle"></i> {{ error.password }}
              </p>
            </div>
            
            <div class="form-group">
              <!-- <label>Role</label> -->
              <input type="hidden" class="form-control" v-model="profile.role" />
            </div>
            <div class="form-group">
              <!-- <label>Status</label> -->
              <input
                type="hidden"
                class="form-control"
                v-model="profile.status"
              />
            </div>
            <button type="submit" class="btn btn-primary">Add Peserta</button>
          </form>

        </div>
      </div>
    </box>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profile: {
        fullname: "",
        email: "",
        password: "",
        city: "",
        role: "user",
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
      user: [],
      profiles: [],
      // kota: null,
      // profile: []
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    axios
      .get("http://192.168.1.20:9999/api/trms/profiles", {
        headers: { "token-key": "key75074540" },
      })
      .then((response) => {
        this.profiles = response.data.profiles;
        // console.log(response.data.profiles);
      });
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
    addPeserta() {
      this.clearError();
      if (!this.profile.fullname) {
        this.error.fullname = "Fullname masih kosong";
        return;
      }
      if (!this.profile.email) {
        this.error.email = "Email masih kosong";
        return;
      }

      if (!this.profile.password) {
        this.error.password = "Password masih kosong";
        return;
      }
      if (!this.profile.city) {
        this.error.city = "City masih kosong";
        return;
      }
      

      this.Api.post("/users_cek_email", this.profile).then((response) => {
        if (response.data.message == false) {
          this.error.email = "Email sudah digunakan";
        }
      });

      var form = new FormData()
      form.append('fullname', this.profile.fullname)
      form.append('email', this.profile.email)
      form.append('city', this.profile.city)
      form.append('password', this.profile.password)
      form.append('role', "user")
      form.append('status', 1)

      this.Api.post("/register", form).then((response) => {
        this.$router.push({ name: "master_peserta" });
      });

      // this.errors = [];

      // e.preventDefault();
    },
    changeNama(what) {
      // console.log(what);
      axios
      .get("http://192.168.1.20:9999/api/trms/profiles/" + what, {
        headers: { "token-key": "key75074540" },
      })
      .then((response) => {
        this.profile = response.data.profiles[0];
        // console.log(this.profile);
      });
    },
    
  },
};
</script>
