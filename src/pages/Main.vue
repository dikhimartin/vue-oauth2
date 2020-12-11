<template>
    <div id="main-wrapper" class="wrapper">
        <router-view name="navbar"></router-view>
        <router-view name="sidebar"></router-view>
        <!-- Content Wrapper. Contains page content -->
        <div class="page-wrapper">
            <router-view name="header"></router-view>
            <!-- Main content -->
            <section class="content">
              <div class="container-fluid">
                  <router-view></router-view>
              </div>
            </section>
        </div>
        <!-- /.content-wrapper -->
        <router-view name="footer"></router-view>
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
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
      if(this.user.status != 1) {
        this.Api.logout()
      }
    });
  },
};
</script>