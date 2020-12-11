<template>
  <div class="row">
    <div class="col-md-3">
      <!-- Profile Image -->
      <div class="box box-primary">
        <div class="box-body box-profile">
          <router-link
            class="btn btn-default btn-sm"
            :to="{ name: 'profile_form' }"
            >Ubah Profile</router-link
          >
          <br />
          <img
            v-if="profile && profile.photo"
            class="profile-user-img img-responsive img-circle"
            :src="path + '/' + profile.photo"
            alt="User profile picture"
          />
          <img
            v-else
            class="profile-user-img img-responsive img-circle"
            src="dist/img/user3-128x128.jpg"
            alt="User profile picture"
          />

          <h3 class="profile-username text-center">{{ this.user.fullname }}</h3>

          <p class="text-muted text-center" v-if="this.profile != null">
            {{ this.profile.jobtitle }}
          </p>

          <!-- <ul class="list-group list-group-unbordered">
            <li class="list-group-item">
              <b>Followers</b> <a class="pull-right">1,322</a>
            </li>
            <li class="list-group-item">
              <b>Following</b> <a class="pull-right">543</a>
            </li>
            <li class="list-group-item">
              <b>Friends</b> <a class="pull-right">13,287</a>
            </li>
          </ul> -->

         
          <div v-if="this.profile">
            <ul class="list-group list-group-unbordered">
            <p v-if="this.profile.pob || this.profile.dob">
              <i class="fa fa-birthday-cake margin-r-5"></i>
              <b>{{ this.profile.pob }}</b
              ><span v-if="this.profile.pob">,</span> {{ this.profile.dob }}
            </p>

            <p
              style="text-transform: capitalize"
              v-if="
                this.profile.gender ||
                this.profile.religion ||
                this.profile.maritalstatus
              "
            >
              <i class="fa fa-user fa-lg margin-r-5"></i>
              {{ this.profile.gender }} {{ this.profile.religion }}
              {{ this.profile.maritalstatus }}
            </p>

            <p
              style="text-transform: capitalize"
              v-if="this.profile.id_type || this.profile.id_number"
            >
              <i class="fa fa-address-card margin-r-5"></i
              ><b>{{ this.profile.id_type }}</b> {{ this.profile.id_number }}
            </p>

            <p
              style="text-transform: capitalize"
              v-if="this.profile.phone && this.profile.phone != 0"
            >
              <i class="fa fa-phone fa-lg margin-r-5"></i>
              {{ this.profile.phone }}
            </p>

            <p style="text-transform: lowercase" v-if="this.profile.email">
              <i class="fa fa-envelope margin-r-5"></i> {{ this.profile.email }}
            </p>

            <p v-if="this.profile.height || this.profile.weight">
              <i class="fa fa-male fa-lg margin-r-5"></i>
              {{ this.profile.height }}
              <b v-if="this.profile.height != null">cm</b>
              {{ this.profile.weight }}
              <b v-if="this.profile.height != null">kg</b>
            </p>
            </ul>
          </div>

          <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->

      <!-- About Me Box -->
      <div class="box box-primary">
        <!-- /.box-header -->
        <div class="box-body">
          <div v-if="this.profile">
            <div v-if="this.profile.address">
              <strong><i class="fa fa-home margin-r-5"></i> Address</strong>

              <p class="text-muted">
                {{ this.profile.address }}
              </p>

              <hr />
            </div>

            <strong><i class="fa fa-book margin-r-5"></i> Education</strong>

            <p v-if="educations" class="text-muted">
              {{ educations.jenjang }} {{ educations.prodi_name }} from
              {{ educations.school_name }} {{ educations.school_address }}
            </p>

            <hr />

            <strong v-if="this.profile.province_id || this.profile.city_id"
              ><i class="fa fa-map-marker margin-r-5"></i> Location</strong
            >

            <p
              v-if="this.profile.province_id || this.profile.city_id"
              class="text-muted"
            >
              {{ cities.name }}<b v-if="this.profile.city_id != null">,</b>
              {{ provinces.name }}
            </p>

            <hr />

            <strong><i class="fa fa-pencil margin-r-5"></i> Skills</strong>

            <p>
              <span class="label label-danger">UI Design</span>
              <span class="label label-success">Coding</span>
              <span class="label label-info">Javascript</span>
              <span class="label label-warning">PHP</span>
              <span class="label label-primary">Node.js</span>
            </p>

            <hr />

            <strong><i class="fa fa-file-text-o margin-r-5"></i> Bio</strong>

            <p v-if="this.profile != null">
              {{ this.profile.bio }}
            </p>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
    <div class="col-md-9">
      <div class="box box-primary">
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <h3>Educations</h3>
              <div v-if="profile">
              <button
                type="button"
                class="btn btn-default pull-left"
                data-toggle="modal"
                data-target="#modaladd"
              >
                <i class="fa fa-plus-circle"></i> Add Education
              </button>
              </div>
            </div>
          </div>
          <br />
          <div v-for="education in all_educations" :key="education.id" style="border-bottom: 1px dotted #ccc; margin-bottom: 1%;">
            <div class="row no-gutters" style="margin: 0; padding: 0">
              <div class="col-md-1" style=" padding: 5px">
                <i
                  class="fa fa-graduation-cap fa-2x"
                  style="
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    color: #000;
                  "
                ></i>
              </div>
              <div class="col-md-11">
                <div class="card-body">
                  <h4
                    class="card-title"
                    style="padding: 0; margin: 0; color: #333"
                  >
                    {{ education.school_name }}

                  <button
                    type="button"
                    class="btn btn-default pull-right"
                    @click="deleteEducation(education.id)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>

                   <button
                    type="button"
                    class="btn btn-default pull-right"
                    data-toggle="modal"
                    data-target="#modalupdate"
                    @click="editEducation(education.id)"
                  >
                    <i class="fa fa-pencil"></i>
                  </button>

                  </h4> 
                  <h5>{{ education.prodi_name }} <b v-if="education.jenjang">({{ education.jenjang }})</b></h5>
                  <h6>
                    <b>{{ education.year_start }} - {{ education.year_end }}</b> <i class="fa fa-certificate"></i> {{ education.nilai }}
                  </h6>
                  <p class="card-text">
                    {{ education.description }}
                  </p>
                  <p class="card-text">
                    <small class="text-muted"
                      ><i class="fa fa-map-marker"></i>
                      {{ education.school_address }}</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.col -->
    <div
      class="modal fade"
      id="modaladd"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Tambah Education</h4>
          </div>
          <div class="modal-body">
            <form>
              <input type="hidden" v-model="addeducation.profile_id" />
              <div class="form-group">
                <label>Nama Sekolah</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukkan Nama Sekolah"
                  v-model="addeducation.school_name"
                />
              </div>
              <div class="form-group">
                <label>Jenjang</label>
                <select
                  class="form-control"
                  v-model="addeducation.jenjang"
                  style="text-transform: capitalize"
                >
                  <option value="" disabled="disabled">
                    Select Jenjang Pendidikan
                  </option>
                  <option
                    v-for="jenjang in qualifications"
                    :key="jenjang.name"
                    :value="jenjang.name"
                  >
                    {{ jenjang.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Nama Program Studi</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukkan Nama Prodi"
                  v-model="addeducation.prodi_name"
                />
              </div>
              <div class="form-group">
                <label>Tahun Mulai</label>
                <input
                  type="number"
                  min="1900"
                  max="2999"
                  class="form-control"
                  placeholder="Masukkan Tahun Mulai"
                  v-model="addeducation.year_start"
                />
              </div>
              <div class="form-group">
                <label>Tahun Selesai</label>
                <input
                  type="number"
                  min="1900"
                  max="2999"
                  class="form-control"
                  placeholder="Masukkan Tahun Selesai"
                  v-model="addeducation.year_end"
                />
              </div>
              <div class="form-group">
                <label>Nilai/GPA</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Masukkan NIlai/GPA"
                  v-model="addeducation.nilai"
                />
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea
                  class="form-control"
                  v-model="addeducation.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label>Alamat/Lokasi Sekolah</label>
                <textarea
                  class="form-control"
                  v-model="addeducation.school_address"
                ></textarea>
              </div>              
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal">
              Batal
            </button>
            <button type="button" @click="addEducation()" class="btn btn-primary" data-dismiss="modal">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>


    <div
      class="modal fade"
      id="modalupdate"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Edit Education</h4>
          </div>
          <div class="modal-body">
            <form>
              <input type="hidden" v-model="educations_by_id.id" />
              <input type="hidden" v-model="educations_by_id.profile_id" />
              <div class="form-group">
                <label>Nama Sekolah</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukkan Nama Sekolah"
                  v-model="educations_by_id.school_name"
                />
              </div>
              <div class="form-group">
                <label>Jenjang</label>
                <select
                  class="form-control"
                  v-model="educations_by_id.jenjang"
                >
                  <option value="" disabled="disabled">
                    Select Jenjang Pendidikan
                  </option>
                  <option
                    v-for="jenjang in qualifications"
                    :key="jenjang.name"
                    :value="jenjang.name"
                  >
                    {{ jenjang.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Nama Program Studi</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukkan Nama Prodi"
                  v-model="educations_by_id.prodi_name"
                />
              </div>
              <div class="form-group">
                <label>Tahun Mulai</label>
                <input
                  type="number"
                  min="1900"
                  max="2999"
                  class="form-control"
                  placeholder="Masukkan Tahun Mulai"
                  v-model="educations_by_id.year_start"
                />
              </div>
              <div class="form-group">
                <label>Tahun Selesai</label>
                <input
                  type="number"
                  min="1900"
                  max="2999"
                  class="form-control"
                  placeholder="Masukkan Tahun Selesai"
                  v-model="educations_by_id.year_end"
                />
              </div>
              <div class="form-group">
                <label>Nilai/GPA</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Masukkan NIlai/GPA"
                  v-model="educations_by_id.nilai"
                />
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea
                  class="form-control"
                  v-model="educations_by_id.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label>Alamat/Lokasi Sekolah</label>
                <textarea
                  class="form-control"
                  v-model="educations_by_id.school_address"
                ></textarea>
              </div>              
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal">
              Batal
            </button>
            <button type="button" @click="updateEducation()" class="btn btn-primary" data-dismiss="modal">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      profile: {
        jobtitle: "",
        photo: "",
      },
      path: "http://192.168.1.20/api-lumen-test-online/public",
      //   user_since: {
      //     eventTimestamp: null
      //   }
      //user_image: "",
      //role: "user",
      provinces: [],
      cities: [],
      educations: [],
      all_educations: [],
      educations_by_id: [],
      edu_id: null,
      addeducation: {
        profile_id: 0,
        school_name: "",
        prodi_name: "",
        nilai: 0,
        year_start: 0,
        year_end: 0,
        school_address: "",
        description:  ""
      },
      qualifications: [
        { id: 1, name: "SD" },
        { id: 2, name: "SMP" },
        { id: 3, name: "SMA" },
        { id: 4, name: "SMK" },
        { id: 5, name: "D1" },
        { id: 6, name: "D2" },
        { id: 7, name: "D3" },
        { id: 8, name: "D4" },
        { id: 9, name: "S1" },
        { id: 10, name: "S2" },
        { id: 11, name: "S3" },
        { id: 12, name: "Profesi" },
      ],
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)

      //   this.user_since.eventTimestamp = res.data.user.created_at;
      //   this.user_since.formatEventTimestamp = Intl.DateTimeFormat("en-US", {
      //     year: "numeric",
      //     month: "short",
      //     day: "2-digit",
      //     hour: "numeric",
      //     minute: "2-digit",
      //     second: "2-digit",
      //   }).format(new Date(this.user_since.eventTimestamp));

      this.Api.get("/profiles_logged").then((res) => {
        // window.console.log(res.data.schedules)
        //window.console.log(this.$route.params.id)
        this.profile = res.data.profiles[0];
        if (this.profile != null) {
          this.profile.dob = res.data.profiles[0].dob;
          this.profile.dob = Intl.DateTimeFormat("ID", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(this.profile.dob));

          if (this.profile.city_id || this.profile.province_id) {
            this.Api.get(
              "https://koperasi.monsterar.co.id/api/v1/location/provinces/" +
                this.profile.province_id
            ).then((res) => {
              // window.console.log(res.data.schedules)
              this.provinces = res.data;
              // window.console.log(this.provinces.name)
            });

            this.Api.get(
              "https://koperasi.monsterar.co.id/api/v1/location/cities/" +
                this.profile.city_id
            ).then((res) => {
              // window.console.log(res.data.schedules)
              this.cities = res.data;
              // window.console.log(this.cities.name)
            });
          }
          this.Api.get("/profile_educations/" + this.profile.id).then((res) => {
            // window.console.log(res.data.schedules)
            this.educations = res.data.profile_educations[0];
            this.all_educations = res.data.profile_educations;
            // window.console.log(this.educations)
          });
        }
        // window.console.log(this.profile)
      });
    });
  },
  methods: {
    addEducation() {
      this.Api.post("/profile_educations", {
        profile_id: this.profile.id,
        school_name: this.addeducation.school_name,
        prodi_name:  this.addeducation.prodi_name,
        jenjang:  this.addeducation.jenjang,
        nilai:  this.addeducation.nilai,
        year_start:  this.addeducation.year_start,
        year_end:  this.addeducation.year_end,
        school_address:  this.addeducation.school_address,
        description:  this.addeducation.description
      }).then(
        (response) => {
          // this.$router.push({ name: "profile" });
          this.$router.go()
        }
      );
      // e.preventDefault();
    },
    editEducation(id_edu) {
      this.edu_id = id_edu;
      // window.console.log(this.edu_id)
      
      this.Api.get("/profile_educations_id/" + id_edu).then((res) => {
              // window.console.log(res.data.schedules)
              this.educations_by_id = res.data.profile_educations[0];
              // this.all_educations = res.data.profile_educations;
              // window.console.log(this.educations_by_id)
      });
    },
    updateEducation() {
      this.Api.post("/profile_educations/" + this.edu_id, {
        id: this.edu_id,
        profile_id: this.profile.id,
        school_name: this.educations_by_id.school_name,
        prodi_name:  this.educations_by_id.prodi_name,
        jenjang:  this.educations_by_id.jenjang,
        nilai:  this.educations_by_id.nilai,
        year_start:  this.educations_by_id.year_start,
        year_end:  this.educations_by_id.year_end,
        school_address:  this.educations_by_id.school_address,
        description:  this.educations_by_id.description,
        _method: "PUT"
      }).then(
        (response) => {
          // this.$router.push({ name: "profile" });
          this.$router.go()
        }
      );
      // e.preventDefault();
    },
    deleteEducation(id) {
      if(confirm("Do you really want to delete?")){
      this.Api.delete("/profile_educations/" + id)
        .then((response) => {
          // let i = this.schedules.map((item) => item.id).indexOf(id); // find index of your object
          // this.schedules.splice(i, 1);
          // this.$router.push({ name: "master_schedules" });
          this.$router.go()
        });
      }
    },
  }
};
</script>