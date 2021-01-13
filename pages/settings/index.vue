<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password"/>
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="updateUser"
              >Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  data() {
    return {
      user: {
        image: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },
  async mounted() {
    const { data } = await getUser();
    this.user = data.user;
  },
  methods: {
    async updateUser() {
      const { data } = await updateUser({ user: this.user });
      if (data) {
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push(`/profile/${data.user.username}`);
      }
    },
    logout() {
      this.$store.commit("setUser", null);
      Cookie.remove("user");
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
