<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img
            src="~admin-lte/dist/img/user3-128x128.jpg"
            v-if="!user_image"
            class="img-circle"
            alt="User Image"
          />
          <img
            :src="user_image"
            v-if="user_image"
            class="img-circle"
            alt="User Image"
          />
        </div>
        <div class="pull-left info">
          <p>
            <router-link
              :to="{ name: 'profile' }"
              class="ellipsis capitalize"
              >{{ user.fullname }}</router-link
            >
          </p>
          <small>
            <i class="fa fa-circle text-success"></i>
            Online
          </small>
        </div>
      </div>
      <ul class="sidebar-menu" data-widget="tree">
        <nav-item
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        ></nav-item>
      </ul>
    </section>
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
