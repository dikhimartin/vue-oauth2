<template>
    <header class="topbar">
        <nav class="navbar top-navbar navbar-expand-md navbar-light">
            <!-- ============================================================== -->
            <!-- Logo -->
            <!-- ============================================================== -->
            <!-- NAVBAR IS HERE -->
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <!-- Logo icon -->
                    <b><img src="/static/images/logo-icon-small.png" alt="homepage" class="dark-logo" /></b>
                    <!--End Logo icon -->

                    <!-- Logo text -->
                    <span>
                     <img src="/static/images/logo-text.png" alt="homepage" class="dark-logo" />
                     <img src="/static/images/logo-light-text.png" class="light-logo" alt="homepage" />
                    </span>
                </a>
            </div>
            <!-- ============================================================== -->
            <!-- End Logo -->
            <!-- ============================================================== -->
            <div class="navbar-collapse">
                <!-- ============================================================== -->
                <!-- toggle and nav items -->
                <!-- ============================================================== -->
                <ul class="navbar-nav mr-auto mt-md-0">
                     <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                    <li class="nav-item m-l-10"> <a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>

                    <!-- notifications -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="mdi mdi-message"></i>
                            <div class="notify"> 
                                <span class="heartbit"></span> <span class="point"></span> 
                            </div>
                        </a>
                        <div class="dropdown-menu mailbox animated slideInUp">
                            <ul>
                                <li>
                                    <div class="drop-title">Notifications</div>
                                </li>
                                <li>
                                    <div class="message-center">
                                        <!-- Message -->
                                        <a href="/">
                                            <div class="mail-contnet">
                                             <h5>Out of Stock</h5> 
                                                <span class="mail-desc">Romano Force Anti..</span> 
                                                <span class="time">9:30 AM</span> 
                                            </div>
                                        </a>
                                        <a href="/">
                                            <div class="mail-contnet">
                                             <h5>Incoming Goods</h5> 
                                                <span class="mail-desc">Romano Force Anti..</span> 
                                                <span class="time">9:30 AM</span> 
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <a class="nav-link text-center" href="javascript:void(0);"> <strong>Check all notifications</strong> <i class="fa fa-angle-right"></i> </a>
                                </li>
                            </ul>
                        </div>
                    </li>


                </ul>
                <!-- ============================================================== -->
                <!-- User profile and search -->
                <!-- ============================================================== -->
                <ul class="navbar-nav my-lg-0">
                    <li class="nav-item">
                        <body onload="startTime()">
                              <div class="clockdate-wrapper">
                                <div id="clock" class="text-white"></div>
                                <div id="date" class="text-white"></div>
                              </div>
                        </body>
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