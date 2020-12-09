<template>
<div v-if="user.role === 'admin'">
  <box
    title="Detail Peserta"
    footer="true"
    :back="{ name: 'master_peserta' }"
  >
    <router-link
      class="btn btn-primary"
      :to="{ name: 'peserta_form', params: { id: this.$route.params.id } }"
      ><span class="fa fa-pencil"></span>&nbsp;Edit</router-link
    > 
    <!-- <button class="btn btn-danger" href="javascript:;" @click="deleteuser(users[0].id)"><span class="fa fa-trash"></span> Delete</button> -->
    <table
      id="w0"
      class="table" style="width:100%;"
    >
      <h3>{{ users.fullname }}</h3>
      <tr>
        <th>ID</th>
        <td>: {{ users.id }}</td>
      </tr>
      <tr>
        <th>Fullname</th>
        <td>: {{ users.fullname }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>: {{ users.email }}</td>
      </tr>
      <tr>
        <th>City</th>
        <td>: {{ users.city }}</td>
      </tr>
      <tr>
        <th>Role</th>
        <td>: {{ users.role }}</td>
      </tr>
      <tr>
        <th>Created at</th>
        <td>: {{ users.created_at }}</td>
      </tr>
      <tr>
        <th>Updated at</th>
        <td>: {{ users.updated_at }}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td v-if="users.status === 1">: <span class="label label-success">ACTIVE</span></td>
        <td v-else>: <span class="label label-danger">INACTIVE</span></td>
      </tr>
    </table>
  </box>
</div>
</template>

<script>
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
    
    return this.Api.get("/users/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.users)
      //window.console.log(this.$route.params.id)
      this.users = res.data.users;
      // window.console.log(this.users.fullname)
    });
  },

  // methods: {
  //   getData(id) {
  //     let data = this.users;
  //     return data.filter((user) => {
  //       return user.id == id;
  //     });
  //   },
    // deleteuser(id) {
    //   if(confirm("Do you really want to delete?")){
    //   this.Api.delete("/users/" + this.$route.params.id)
    //     .then((response) => {
    //       let i = this.users.map((item) => item.id).indexOf(id); // find index of your object
    //       this.users.splice(i, 1);
    //       this.$router.push({ name: "master_users" });
    //     });
    //   }
    // },
  // },
};
</script>

<style>
tr {
  width: 100%;
}
th {
  width: 40%;
}
td {
  width: 60%;
}
</style>