<template>
  <box title="Form Profile" footer="true" :back="{ name: 'profile' }">
    <div class="row">
      <div v-if="profile != null" class="col-md-4">
        <form @submit.prevent="updateProfile">
          <input type="hidden" v-model="profile.user_id" />
          <div class="form-group">
            <label>Jobtitle</label>
            <input
              type="text"
              class="form-control"
              v-model="profile.jobtitle"
            />
          </div>
          <div class="form-group">
            <label>Gender</label><br />
            <label
              style="margin-left: 5px; text-transform: capitalize"
              v-for="gent in genders"
              :key="gent.name"
            >
              <input
                type="radio"
                v-model="profile.gender"
                name="gender"
                :value="gent.name"
              />
              {{ gent.name }}
            </label>
          </div>
          <div class="form-group">
            <label>Religion</label>
            <select2
              class="form-control"
              v-model="profile.religion"
              style="text-transform: capitalize"
            >
              <option value="">Select Agama</option>
              <option
                v-for="agama in religions"
                :key="agama.name"
                :value="agama.name"
              >
                {{ agama.name }}
              </option>
            </select2>
          </div>
          <div class="form-group">
            <label>Status Pernikahan</label>
            <select
              class="form-control"
              v-model="profile.maritalstatus"
              style="text-transform: capitalize"
            >
              <option value="" disabled="disabled">
                Select Status Pernikahan
              </option>
              <option
                v-for="status in maritalstatuses"
                :key="status.name"
                :value="status.name"
              >
                {{ status.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>ID Type</label>
            <select
              class="form-control"
              v-model="profile.id_type"
              style="text-transform: capitalize"
            >
              <option value="" disabled="disabled">Select Tipe ID Card</option>
              <option
                v-for="idcard in id_type"
                :key="idcard.name"
                :value="idcard.name"
              >
                {{ idcard.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>ID Number</label>
            <input
              type="number"
              class="form-control"
              v-model="profile.id_number"
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="profile.email" />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              v-model="profile.phone"
              @keyup="focusOut"
              @blur="focusOut"
            />
          </div>
          <div class="form-group">
            <label>Weight</label>
            <input
              type="number"
              class="form-control"
              v-model="profile.weight"
            />
          </div>
          <div class="form-group">
            <label>Height</label>
            <input
              type="number"
              class="form-control"
              v-model="profile.height"
            />
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea class="form-control" v-model="profile.address" />
          </div>
          <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" class="form-control" v-model="profile.dob" />
          </div>
          <div class="form-group">
            <label>Place of Birth</label>
            <input type="text" class="form-control" v-model="profile.pob" />
          </div>
          <div class="form-group">
            <label>Bio</label>
            <textarea class="form-control" v-model="profile.bio" />
          </div>
          <div class="form-group">
            <label>Photo</label>
            <input type="file" ref="inputan1" class="form-control" />
          </div>
          <div class="form-group">
            <label>Provinsi</label>
            <select2
              v-model="profile.province_id"
              @change="initCity()"
              :config="provinceConfig"
            >
              <option value="0">---</option>
              <option v-if="profile.province_id" :value="profile.province_id">
                {{ profile.province_name }}
              </option>
            </select2>
          </div>
          <div class="form-group">
            <label>Kota</label>
            <select2
              id="select_id"
              v-model="profile.city_id"
              @change="changeCity()"
              :config="cityConfig"
            >
              <option value="0">---</option>
              <option v-if="profile.city_id" :value="profile.city_id">
                {{ profile.city_name }}
              </option>
            </select2>
          </div>

          <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
      </div>
      <div class="col-md-4" v-else>
        <form @submit.prevent="addProfile">
          <input type="hidden" v-model="addprofile.user_id" />
          <div class="form-group">
            <label>Jobtitle</label>
            <input
              type="text"
              class="form-control"
              v-model="addprofile.jobtitle"
            />
          </div>
          <div class="form-group">
            <label>Gender</label><br />
            <label
              style="margin-left: 5px; text-transform: capitalize"
              v-for="gent in genders"
              :key="gent.name"
            >
              <input
                type="radio"
                v-model="addprofile.gender"
                name="gender"
                :value="gent.name"
              />
              {{ gent.name }}
            </label>
          </div>
          <div class="form-group">
            <label>Religion</label>
            <select2
              class="form-control"
              v-model="addprofile.religion"
              style="text-transform: capitalize"
            >
              <option value="" disabled="disabled">Select Agama</option>
              <option
                v-for="agama in religions"
                :key="agama.name"
                :value="agama.name"
              >
                {{ agama.name }}
              </option>
            </select2>
          </div>
          <div class="form-group">
            <label>Status Pernikahan</label>
            <select
              class="form-control"
              v-model="addprofile.maritalstatus"
              style="text-transform: capitalize"
            >
              <option value="" disabled="disabled">
                Select Status Pernikahan
              </option>
              <option
                v-for="status in maritalstatuses"
                :key="status.name"
                :value="status.name"
              >
                {{ status.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>ID Type</label>
            <select
              class="form-control"
              v-model="addprofile.id_type"
              style="text-transform: capitalize"
            >
              <option value="" disabled="disabled">Select Tipe ID Card</option>
              <option
                v-for="idcard in id_type"
                :key="idcard.name"
                :value="idcard.name"
              >
                {{ idcard.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>ID Number</label>
            <input
              type="number"
              class="form-control"
              v-model="addprofile.id_number"
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              v-model="addprofile.email"
            />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              v-model="addprofile.phone"
              @keyup="focusOut"
              @blur="focusOut"
            />
          </div>
          <div class="form-group">
            <label>Weight</label>
            <input
              type="number"
              class="form-control"
              v-model="addprofile.weight"
            />
          </div>
          <div class="form-group">
            <label>Height</label>
            <input
              type="number"
              class="form-control"
              v-model="addprofile.height"
            />
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea class="form-control" v-model="addprofile.address" />
          </div>
          <div class="form-group">
            <label>Date of Birth</label>
            <input
              required="required"
              type="date"
              class="form-control"
              v-model="addprofile.dob"
            />
          </div>
          <div class="form-group">
            <label>Place of Birth</label>
            <input type="text" class="form-control" v-model="addprofile.pob" />
          </div>
          <div class="form-group">
            <label>Bio</label>
            <textarea class="form-control" v-model="addprofile.bio" />
          </div>
          <div class="form-group">
            <label>Photo</label>
            <input type="file" ref="inputan2" class="form-control" />
          </div>
          <div class="form-group">
            <label>Provinsi</label>
            <select2
              v-model="addprofile.province_id"
              @change="initCity2()"
              :config="provinceConfig2"
            >
              <option value="0">---</option>
              <option v-if="addprofile.province_id" :value="addprofile.province_id">
                {{ addprofile.province_name }}
              </option>
            </select2>
          </div>
          <div class="form-group">
            <label>Kota</label>
            <select2
              id="select_id"
              v-model="addprofile.city_id"
              @change="changeCity2()"
              :config="cityConfig2"
            >
              <option value="0">---</option>
              <option v-if="addprofile.city_id" :value="addprofile.city_id">
                {{ addprofile.city_name }}
              </option>
            </select2>
          </div>

          <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  </box>
</template>

<script>
export default {
  data() {
    return {
      // profiles: [],
      profile: {
        user_id: null,
        jobtitle: "",
        phone: "0",
        province_id: 0,
        province_name: "",
        city_id: 0,
        city_name: "",
      },
      addprofile: {
        user_id: 0,
        photo: "",
        gender: "",
        religion: "",
        maritalstatus: "",
        id_type: "",
        id_number: "",
        email: "",
        phone: 0,
        weight: 0,
        height: 0,
        address: "",
        dob: null,
        pob: "",
        jobtitle: "",
        bio: "",
        province_id: 0,
        province_name: "",
        city_id: 0,
        city_name: "",
      },
      genders: [
        { id: 1, name: "Pria" },
        { id: 2, name: "Wanita" },
      ],
      religions: [
        { id: 1, name: "Islam" },
        { id: 2, name: "Kristen" },
        { id: 3, name: "Katholik" },
        { id: 4, name: "Hindhu" },
        { id: 5, name: "Budha" },
        { id: 6, name: "Konghuchu" },
        { id: 7, name: "Lainnya" },
      ],
      maritalstatuses: [
        { id: 1, name: "Menikah" },
        { id: 2, name: "Belum Menikah" },
      ],
      id_type: [
        { id: 1, name: "KTP" },
        { id: 2, name: "SIM" },
      ],
      user: [],
      phoneValue: 0,
      preventNextIteration: false,
      provinces: [],
      cities: [],
      provinceConfig: null,
      cityConfig: null,
      provinceConfig2: null,
      cityConfig2: null
    };
  },

  created() {
    if (this.profile) {
      this.initProvince();
      this.initCity();
      // this.initSubdistrict();
      // this.initVillage();
    }

    if (this.addprofile) {
      this.initProvince2();
      this.initCity2();
      // this.initSubdistrict();
      // this.initVillage();
    }
    
  },

  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    this.Api.get("/profiles_logged").then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.profile = res.data.profiles[0];
      // window.console.log(this.profile)
      // window.console.log(this.$refs.inputan1[0].files[0])
    });

    // this.onFileChanged
    
  },
  methods: {
    // onFileChanged(event) {
    //   // window.console.log(event.target.files[0].name);
    //   this.profile.image = event.target.files[0].name;
    // },
    updateProfile() {
      var form = new FormData();
      form.append("user_id", this.user.id);
      form.append("jobtitle", this.profile.jobtitle);
      form.append("gender", this.profile.gender);
      form.append("religion", this.profile.religion);
      form.append("maritalstatus", this.profile.maritalstatus);
      form.append("id_type", this.profile.id_type);
      form.append("id_number", this.profile.id_number);
      form.append("email", this.profile.email);
      form.append("phone", this.profile.phone);
      form.append("weight", this.profile.weight);
      form.append("height", this.profile.height);
      form.append("address", this.profile.address);
      form.append("dob", this.profile.dob);
      form.append("pob", this.profile.pob);
      form.append("bio", this.profile.bio);
      form.append("province_id", this.profile.province_id);
      form.append("province_name", this.profile.province_name);
      form.append("city_id", this.profile.city_id);
      form.append("city_name", this.profile.city_name);
      form.append("photo", this.$refs.inputan1.files[0]);
      form.append("_method", "PUT");

      this.Api.post("/profiles/" + this.profile.id, form).then((response) => {
        this.$router.replace({ name: "profile" });
      });
      // e.preventDefault();
    },

    addProfile() {
      var form = new FormData();
      form.append("user_id", this.user.id);
      form.append("jobtitle", this.addprofile.jobtitle);
      form.append("gender", this.addprofile.gender);
      form.append("religion", this.addprofile.religion);
      form.append("maritalstatus", this.addprofile.maritalstatus);
      form.append("id_type", this.addprofile.id_type);
      form.append("id_number", this.addprofile.id_number);
      form.append("email", this.addprofile.email);
      form.append("phone", this.addprofile.phone);
      form.append("weight", this.addprofile.weight);
      form.append("height", this.addprofile.height);
      form.append("address", this.addprofile.address);
      form.append("dob", this.addprofile.dob);
      form.append("pob", this.addprofile.pob);
      form.append("bio", this.addprofile.bio);
      form.append("province_id", this.addprofile.province_id);
      form.append("province_name", this.addprofile.province_name);
      form.append("city_id", this.addprofile.city_id);
      form.append("city_name", this.addprofile.city_name);
      form.append("photo", this.$refs.inputan2.files[0]);

      this.Api.post("/profiles", form).then((response) => {
        this.$router.push({ name: "profile" });
      });
      // e.preventDefault();
    },

    focusOut: function (event) {
      if (["Arrow", "Backspace", "Shift"].includes(event.key)) {
        this.preventNextIteration = true;
        return;
      }
      if (this.preventNextIteration) {
        this.preventNextIteration = false;
        return;
      }
      this.phoneValue = this.profile.phone
        .replace(/-/g, "")
        .match(/(\d{1,14})/g)[0];

      // Format display value based on calculated currencyValue
      this.profile.phone = this.phoneValue.replace(
        /(\d{1,4})(\d{1,4})(\d{1,4})/g,
        "$1-$2-$3"
      );
    },

    initProvince() {
      this.provinceConfig = {
        ajax: {
          url: this.Api.endpoint_outside(
            "https://koperasi.monsterar.co.id/api/v1/location/provinces"
          ),
          data: (params) => {
            var filters = [["name", "like", params.term]];
            if (this.profile.id) {
              filters.push(["AND"]);
              filters.push(["id", "!=", this.profile.id + ""]);
            }
            var query = {
              filters: params.term ? JSON.stringify(filters) : "",
              page: params.page && params.page - 1 ? params.page - 1 : 0,
            };

            return query;
          },
          processResults: (data, params) => {
            data.items.forEach((item) => {
              item.text = item.name;
            });
            return {
              results: data.items,
              pagination: {
                more: data.last == false,
              },
            };
          },
        },
      };
    },
    initCity() {
      $("#select_id").val("").trigger("change");

      this.cityConfig = {
        ajax: {
          url: this.Api.endpoint_outside(
            "https://koperasi.monsterar.co.id/api/v1/location/provinces/" +
              this.profile.province_id +
              "/cities"
          ),
          data: (params) => {
            var filters = [["name", "like", params.term]];
            if (this.profile.id) {
              filters.push(["AND"]);
              filters.push(["id", "!=", this.profile.id + ""]);
            }
            var query = {
              filters: params.term ? JSON.stringify(filters) : "",
              page: params.page && params.page - 1 ? params.page - 1 : 0,
            };

            return query;
          },
          processResults: (data, params) => {
            data.items.forEach((item) => {
              item.text = item.name;
            });
            return {
              results: data.items,
              pagination: {
                more: data.last == false,
              },
            };
          },
        },
      };
      if (this.profile.province_id) {
        this.Api.get(
          "https://koperasi.monsterar.co.id/api/v1/location/provinces/" +
            this.profile.province_id
        )
          .then((res) => {
            this.profile.province_name = res.data.name;
            // window.console.log(this.profile.province_name)
          })
          .catch((e) => {
            bootbox.alert(e.message);
          });
      }
    },

    changeCity() {
      if (this.profile.city_id) {
        this.Api.get(
          "https://koperasi.monsterar.co.id/api/v1/location/cities/" +
            this.profile.city_id
        )
          .then((res) => {
            this.profile.city_name = res.data.name;
            this.profile.province_name = res.data.province.name;
          })
          .catch((e) => {
            bootbox.alert(e.message);
          });
      }
    },
    initProvince2() {
      this.provinceConfig2 = {
        ajax: {
          url: this.Api.endpoint_outside(
            "https://koperasi.monsterar.co.id/api/v1/location/provinces"
          ),
          data: (params) => {
            var filters = [["name", "like", params.term]];
            if (this.addprofile.id) {
              filters.push(["AND"]);
              filters.push(["id", "!=", this.addprofile.id + ""]);
            }
            var query = {
              filters: params.term ? JSON.stringify(filters) : "",
              page: params.page && params.page - 1 ? params.page - 1 : 0,
            };

            return query;
          },
          processResults: (data, params) => {
            data.items.forEach((item) => {
              item.text = item.name;
            });
            return {
              results: data.items,
              pagination: {
                more: data.last == false,
              },
            };
          },
        },
      };
    },
    initCity2() {
      $("#select_id").val("").trigger("change");

      this.cityConfig2 = {
        ajax: {
          url: this.Api.endpoint_outside(
            "https://koperasi.monsterar.co.id/api/v1/location/provinces/" +
              this.addprofile.province_id +
              "/cities"
          ),
          data: (params) => {
            var filters = [["name", "like", params.term]];
            if (this.addprofile.id) {
              filters.push(["AND"]);
              filters.push(["id", "!=", this.addprofile.id + ""]);
            }
            var query = {
              filters: params.term ? JSON.stringify(filters) : "",
              page: params.page && params.page - 1 ? params.page - 1 : 0,
            };

            return query;
          },
          processResults: (data, params) => {
            data.items.forEach((item) => {
              item.text = item.name;
            });
            return {
              results: data.items,
              pagination: {
                more: data.last == false,
              },
            };
          },
        },
      };
      if (this.addprofile.province_id) {
        this.Api.get(
          "https://koperasi.monsterar.co.id/api/v1/location/provinces/" +
            this.addprofile.province_id
        )
          .then((res) => {
            this.addprofile.province_name = res.data.name;
            // window.console.log(this.profile.province_name)
          })
          .catch((e) => {
            bootbox.alert(e.message);
          });
      }
    },

    changeCity2() {
      if (this.addprofile.city_id) {
        this.Api.get(
          "https://koperasi.monsterar.co.id/api/v1/location/cities/" +
            this.addprofile.city_id
        )
          .then((res) => {
            this.addprofile.city_name = res.data.name;
            this.addprofile.province_name = res.data.province.name;
          })
          .catch((e) => {
            bootbox.alert(e.message);
          });
      }
    },
  }
};
</script>
