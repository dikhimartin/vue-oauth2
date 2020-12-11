<template>
  <aside class="left-sidebar">
    <div class="scroll-sidebar">
      <section class="sidebar">
          <div class="user-profile">
              <div class="profile-img">
                  <img
                    src="/img/avatar.webp"
                    v-if="!user_image"
                    class="img-circle"
                    alt="User Image"
                  />
                  <div class="notify setpos"> <span class="heartbit"></span> <span class="point"></span> </div>
              </div>
              <div class="profile-text">
                <h5>
                  <router-link
                  :to="{ name: 'profile' }"
                  class="ellipsis capitalize"
                  >{{ user.fullname }}
                  </router-link
                ></h5>
                  <h6 class="text-muted">Online</h6>
                  <a href="javascript:void(0)" class="dropdown-toggle u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><i class="mdi mdi-settings"></i></a>
                  <a href="javascript:void(0)"><router-link :to="{ name: 'login' }" data-toggle="tooltip" title="Logout"><i class="mdi mdi-power"></i></router-link ></a>
                  
                  <div class="dropdown-menu animated flipInY">
                      <a href="javascript:void:0" class="dropdown-item"><i class="ti-user"></i> My Profile</a>
                      <div class="dropdown-divider"></div>
                      <a href="javascript:void(0)" class="dropdown-item"><router-link :to="{ name: 'login' }" data-toggle="tooltip" title="Logout"></router-link><i class="fa fa-power-off"></i> Logout</a>
                  </div>

              </div>
          </div>

        <!-- Current Nav -->
        <nav class="sidebar-nav">
          <ul class="sidebar-menu" data-widget="tree">
            <nav-item
              v-for="(item, index) in items"
              :key="index"
              :item="item"
            ></nav-item>
          </ul>
        </nav>
        
      </section>
     </div>
  </aside>
</template>

<script>
import NavItem from "./NavItem.vue";
import SidebarConfig from "@config/sidebar.json";

export default {
  components: {
    NavItem,
  },
  data() {
    return {
      items: [],
      user: [],
      user_image: "",
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
    
    this.items = JSON.parse(JSON.stringify(SidebarConfig[this.user.role]));
    if (this.env.environment == "development") {
      this.items = SidebarConfig.developer.concat(this.items);
    }
    $("body").attr(
      "class",
      "sidebar-mini wysihtml5-supported skin-purple-light"
    );
    this.setTitle(this.$route);
    this.$router.afterHooks = [];
    this.$router.afterEach((nw, old) => {
      $(".modal-backdrop").remove();
      $("body").removeClass("modal-open").css({
        paddingRight: "",
      });
      this.setTitle(nw);
    });
    /*var intv = setInterval(() => {
            var layout = $('body').data('lte.layout')
            if (layout) {
                try {
                    this.pushMenu = $('[data-toggle="push-menu"]').data('lte.pushmenu')
                    this.pushMenu.init()
                    // this.pushMenu.expandOnHover()
                    layout.activate()
                } catch (e) {}
                clearInterval(intv)
            }
        }, 500)*/
    // $('body').layout.call($('body'))
    $(window).trigger("load");
    $(window).trigger("resize");
    
    
    });
    
    

    
  },
  methods: {
    setTitle(route) {
      if (this.$route.meta && this.$route.meta.title) {
        this.$store.state.title = this.$route.meta.title;
        if (this.$route.meta.subtitle) {
          this.$store.state.subtitle = this.$route.meta.subtitle;
        } else {
          this.$store.state.subtitle = null;
        }
      } else {
        this.$store.state.title = this.$route.name;
        this.$store.state.subtitle = null;
      }
    },
  },
};
</script>
