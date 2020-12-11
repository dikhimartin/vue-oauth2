<template>
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="alert alert-success"> <i class="ti-user"></i>&nbsp;&nbsp;<strong>Welcome {{user.fullname}}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span> </button>
            </div>
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