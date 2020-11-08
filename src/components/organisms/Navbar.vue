<template>
  <div class="landing-page__header hidden-xs-only" v-if="isLandingPage">
    <div>
      <label for="language">Interface language</label>
      <select name="language" id="language">
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
    <router-link tag="button" class="landing-page__sign-in" to="/login">Get started</router-link>
  </div>

  <div class="tb-navbar" v-else>
    <!-- Mobile  -->
    <div class="hidden-sm-and-up">
      <ul class="tb-navbar__wrapper">
        <li class="tb-navbar__item">
          <div @click="openSidebar = true">
            <i class="iconfont icon-menu"></i>
          </div>
          <el-drawer :visible.sync="openSidebar" :append-to-body="true" size="60%" direction="ltr">
            <left-sidebar class="tb-navbar__item__sidebar"></left-sidebar>
          </el-drawer>
        </li>
        <li class="tb-navbar__item">
          <router-link
            class="tb-navbar__item__anchor"
            active-class="tb-navbar__item--active"
            to="/home"
            @click.native="refreshHome"
          >
            <div>
              <i class="iconfont icon-home"></i>
            </div>
            <!-- <div class="tb-navbar__item__label">Notifications</div> -->
          </router-link>
        </li>
        <li class="tb-navbar__item">
          <div class="tb-navbar__item__anchor" @click="openSearch">
            <i class="iconfont icon-search"></i>
          </div>
        </li>
        <li class="tb-navbar__item ">
          <router-link
            class="tb-navbar__item__anchor"
            active-class="tb-navbar__item--active"
            to="/questions/type"
          >
            <div>
              <i class="iconfont icon-question"></i>
            </div>
            <!-- <div class="tb-navbar__item__label">Ask</div> -->
          </router-link>
        </li>
        <li class="tb-navbar__item" v-if="isLogin">
          <router-link
            class="tb-navbar__item__anchor"
            active-class="tb-navbar__item--active"
            to="/notifications"
          >
            <div>
              <i class="iconfont icon-bell"></i>
            </div>
            <!-- <div class="tb-navbar__item__label">Notifications</div> -->
          </router-link>
        </li>
        <li class="tb-navbar__item" v-if="isLogin">
          <el-dropdown>
            <el-image alt="user-image" class="tb-navbar__avatar" :src="user.photoURL" lazy />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link tag="span" :to="`/users/${user.id}`">
                  <i class="el-icon-user"></i>
                  Profile
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link tag="span" to="/settings">
                  <i class="el-icon-setting"></i>
                  Settings
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span @click="signOut">
                  <i class="el-icon-switch-button"></i>
                  Sign out
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>

      <div class="tb-navbar__search-popup" v-if="showSearch">
        <el-input prefix-icon="el-icon-search" :autofocus="true"></el-input>
      </div>
    </div>

    <!-- Desktop  -->
    <div class="hidden-xs-only">
      <div class="tb-navbar__wrapper tb-navbar__wrapper--desktop">
        <div class="tb-navbar__item--desktop tb-navbar__logo">
          <router-link tag="div" class="tb-navbar__item__anchor" to="/home">
            <img :src="require('@/assets/img/logo-black.png')" alt="#" class="tb-navbar__logo" />
          </router-link>
        </div>
        <!-- search  -->
        <div class="tb-navbar__item--desktop tb-navbar__search">
          <tb-search></tb-search>
        </div>

        <div class="tb-navbar__item--desktop">
          <ul class="tb-navbar__operations" v-if="isLogin">
            <li class="tb-navbar__operations__item rspec-nav_activity">
              <router-link class="tb-navbar__operations__anchor" to="/notifications">
                <i class="el-icon-bell"></i>
              </router-link>
            </li>
            <li class="tb-navbar__operations__item">
              <div class="tb-navbar__operations__anchor center-y">
                <el-dropdown>
                  <el-image alt="user-image" class="tb-navbar__avatar" :src="user.photoURL" lazy />
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <router-link tag="span" :to="`/users/${user.id}`">
                        <i class="el-icon-user"></i>
                        Profile
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link tag="span" to="/settings">
                        <i class="el-icon-setting"></i>
                        Settings
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <span @click="signOut">
                        <i class="el-icon-switch-button"></i>
                        Sign out
                      </span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
            <li class="tb-navbar__operations__item">
              <router-link
                tag="div"
                to="/questions/type"
                class="tb-navbar__operations__anchor center-y"
              >
                <el-button type="primary" class="text-bold" round>Ask</el-button>
              </router-link>
            </li>
          </ul>

          <router-link to="/login" v-else-if="isSignUpPage">
            <el-button type="primary">Sign in</el-button>
          </router-link>

          <router-link to="/signup" v-else>
            <el-button type="primary">Sign up</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TbSearch from '@/components/molecules/Search.vue';
import LeftSidebar from '@/components/molecules/LeftSidebar.vue';
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  components: {
    LeftSidebar,
    TbSearch,
  },

  data() {
    return {
      isLandingPage: true,
      isSignUpPage: false,
      openSidebar: false,
      showSearch: false,
    };
  },

  computed: {
    ...mapState({
      isLogin: (state) => !!state.auth.user,
      user: (state) => state.auth.user,
    }),
  },

  watch: {
    $route(to) {
      this.isLandingPage = to.name === 'landing-page';
      this.isSignUpPage = to.name === 'signup';
    },
  },

  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut');
      this.$router.push('/');
    },

    openSearch() {
      this.showSearch = !this.showSearch;
    },

    refreshHome() {
      this.$store.dispatch('ui/refreshHome', true);
    },
  },
};
</script>
