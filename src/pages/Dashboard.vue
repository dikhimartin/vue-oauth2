<template>
  <div>
    <div v-if="this.user.role != 'admin'" class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Selamat datang!</h3>
      </div>
      <div class="box-body">
        <h1>{{ env.app_name }}</h1>
      </div>
    </div>
    <div v-if="this.user.role === 'admin'">
     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      //user_image: "",
      //role: "user",
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      this.user = res.data.user;
      if (this.user.status != 1) {
        this.Api.logout();
      }
    });

  },
};
</script>