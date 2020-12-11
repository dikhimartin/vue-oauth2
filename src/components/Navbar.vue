<template>
  <header class="topbar">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
        <!-- NAVBAR IS HERE -->
          <div class="navbar-header">
            <router-link :to="{ name: 'dashboard' }" class="navbar-brand">
              <span class="logo-mini"><b>{{ env.app_name }}</b></span>
            </router-link>
        </div>

        <div class="navbar-collapse">
              <ul class="navbar-nav mr-auto mt-md-0">
                  <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                  <li class="nav-item m-l-10"><a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>

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
                                      <a href="javascriot:void(0)">
                                          <div class="mail-contnet">
                                            <h5>Message</h5> 
                                              <span class="mail-desc">Dikhi Martin..</span> 
                                              <span class="time">9:30 AM</span> 
                                          </div>
                                      </a>
                                      <a href="javascriot:void(0)">
                                          <div class="mail-contnet">
                                            <h5>Message</h5> 
                                              <span class="mail-desc">Dikhi Martin..</span> 
                                              <span class="time">9:30 AM</span> 
                                          </div>
                                      </a>
                                      <a href="javascriot:void(0)">
                                          <div class="mail-contnet">
                                            <h5>Message</h5> 
                                              <span class="mail-desc">Dikhi Martin..</span> 
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

              <ul class="navbar-nav my-lg-0">
                  <li class="nav-item">
                      <div class="realtime-clock">10 : 10 <span>AM</span></div>
                      <div class="realtime-date">Friday, 11 December 2020</div>
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