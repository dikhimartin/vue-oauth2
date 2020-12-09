<template>
<div v-if="user.role === 'admin'">
  <box title="Form Pengguna" footer="true" :back="{ name: 'master_pengguna' }">
    <div class="col-md-4">
      <div class="row">
        <form @submit.prevent="updatePengguna" enctype="multipart/form-data">
          <div class="form-group">
            <div class="form-group">
              <!-- <label>Fullname</label> -->
              <input
                type="hidden"
                class="form-control"
                v-model="users.fullname"
              />
            </div>
            <div class="form-group">
              <!-- <label>Email</label> -->
              <input
                type="hidden"
                class="form-control"
                v-model="users.email"
              />
            </div>
            <div class="form-group">
              <!-- <label>City</label> -->
              <input
                type="hidden"
                class="form-control"
                v-model="users.city"
              />
            </div>
            <div class="form-group">
              <!-- <label>Role</label> -->
              <input
                type="hidden"
                class="form-control"
                v-model="users.role"
              />
            </div>
            <label>Status</label>
            <select class="form-control" v-model="users.status">
              <!-- <option value="">Select Status</option> -->
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Update Pengguna</button>
        </form>
      </div>
    </div>
  </box>
</div>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);

export default {
  data() {
    return {
      users: [],
      user: []
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    this.Api.get("/users/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.users = res.data.users;
      //   window.console.log(this.question[0]);
      //   return this.question.title;
    });
  },
  methods: {
    updatePengguna(e) {
      this.Api.put("/users/" + this.$route.params.id, {
        // <== use axios.post
        // headers:{'Content-Type' : 'multipart/form-data'},
        // fd,
        // title: this.schedules[0].title,
        // start: this.schedules[0].start,
        // end: this.schedules[0].end,
        fullname: this.users.fullname,
        email: this.users.email,
        city: this.users.city,
        role: this.users.role,
        status: this.users.status,
        // _method: "put", // <== add this field
      }).then((res) => {
        // window.console.log(res.data.schedules)
        //window.console.log(this.$route.params.id)
        //this.questions = res.data.questions;
        // window.console.log(this.questions[0])
        this.$router.push({ name: "master_pengguna" });
        e.preventDefault();
      });
    },
    // getData(id) {
    //   let data = this.users;
    //   return data.filter((pengguna) => {
    //     return pengguna.id == id;
    //   });
    // },
  },
};
</script>
