<template>
  <header class="main-header">
    <!-- Logo -->
    <router-link :to="{ name: 'dashboard' }" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"
        ><b>{{ env.app_name[0] }}</b></span
      >
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">{{ env.app_name }}</span>
    </router-link>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="javascript:void(0)" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="javascript:void(0" class="dropdown-toggle" data-toggle="dropdown">
              <img
                src="~admin-lte/dist/img/user3-128x128.jpg"
                class="user-image"
                alt="User Image"
              />
              <span class="hidden-xs">{{ this.user.fullname }}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img
                  src="~admin-lte/dist/img/user3-128x128.jpg"
                  class="img-circle"
                  alt="User Image"
                />

                <p>
                  {{ this.user.fullname }} - <span style="text-transform: capitalize;">{{ this.user.role }}</span>
                  <small>Member since {{ user_since.formatEventTimestamp }}</small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="javascript:void(0">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="javascript:void(0">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="javascript:void(0">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <router-link :to="{name:'profile'}" class="btn btn-default btn-flat">Profile</router-link>
                </div>
                <div class="pull-right">
                  <router-link
                    :to="{ name: 'login' }"
                    class="btn btn-default btn-flat"
                    >Sign out</router-link
                  >
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      user_since: {
        eventTimestamp: null
      }
      //user_image: "",
      //role: "user",
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)

      this.user_since.eventTimestamp = res.data.user.created_at;
      this.user_since.formatEventTimestamp = Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(this.user_since.eventTimestamp));
    });
  },
};
</script>