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
            to="/questions"
            @click.native="refreshHome"
          >
            <div>
              <i class="iconfont icon-home"></i>
            </div>
            <!-- <div class="tb-navbar__item__label">Notifications</div> -->
          </router-link>
        </li>
        <li class="tb-navbar__item">
          <div
            class="tb-navbar__item__anchor"
            :class="[showSearch && 'tb-navbar__item--active']"
            @click="openSearch"
          >
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
            <div class="line-height-1">
              <el-badge v-if="notifications.length" :value="notifications.length" :max="9">
                <i class="el-icon-bell" :class="isNotificationPage && 'color-primary'"></i>
              </el-badge>
              <i v-else class="el-icon-bell" :class="isNotificationPage && 'color-primary'"></i>
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
                <router-link tag="span" to="/bookmarks">
                  <i class="el-icon-collection-tag"></i>
                  Bookmark
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

      <transition name="el-fade-in-linear">
        <div class="tb-navbar__search-popup" v-if="showSearch">
          <tb-search @close="showSearch = false"></tb-search>
        </div>
      </transition>
    </div>

    <!-- Desktop  -->
    <div class="hidden-xs-only">
      <div class="tb-navbar__wrapper tb-navbar__wrapper--desktop">
        <div class="tb-navbar__item--desktop tb-navbar__logo">
          <router-link tag="div" class="tb-navbar__item__anchor" to="/questions">
            <img :src="require('@/assets/img/logo-white.png')" alt="#" class="tb-navbar__logo" />
          </router-link>
        </div>
        <!-- search  -->
        <div class="tb-navbar__item--desktop tb-navbar__search">
          <tb-search @close="showSearch = false"></tb-search>
        </div>

        <div class="tb-navbar__item--desktop tb-navbar__right">
          <ul class="tb-navbar__operations" v-if="isLogin">
            <li class="tb-navbar__operations__item">
              <div class="tb-navbar__operations__anchor">
                <el-popover
                  placement="bottom-start"
                  popper-class="tb-navbar__popover"
                  width="400"
                  trigger="click"
                  v-model="showNotifications"
                >
                  <notifications></notifications>
                  <div slot="reference">
                    <el-badge v-if="notifications.length" :value="notifications.length" :max="9">
                      <i
                        class="el-icon-message-solid"
                        :class="showNotifications && ['color-primary']"
                      ></i>
                    </el-badge>
                    <i
                      v-else
                      class="el-icon-message-solid"
                      :class="showNotifications && ['color-primary']"
                    ></i>
                  </div>
                </el-popover>
              </div>
            </li>

            <li class="tb-navbar__operations__item">
              <el-popover
                placement="bottom-start"
                popper-class="tb-navbar__popover"
                width="400"
                trigger="click"
                v-model="showQuestionsType"
              >
                <questions-type class="p-16"></questions-type>
                <el-button slot="reference" class="px-16" type="primary" size="small" round>
                  Ask <i class="ml-8 el-icon-arrow-down"></i>
                </el-button>
              </el-popover>
            </li>

            <el-dropdown trigger="click">
              <li class="tb-navbar__operations__item">
                <el-image alt="user-image" class="tb-navbar__avatar" :src="user.photoURL" lazy />
              </li>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link tag="span" :to="`/users/${user.id}`">
                    <i class="el-icon-user"></i>
                    Profile
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link tag="span" to="/bookmarks">
                    <i class="el-icon-collection-tag"></i>
                    Bookmark
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
import QuestionsType from '@/views/QuestionsType.vue';
import Notifications from '@/views/Notifications.vue';
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  components: {
    LeftSidebar,
    QuestionsType,
    Notifications,
    TbSearch,
  },

  data() {
    return {
      isLandingPage: true,
      isSignUpPage: false,
      isNotificationPage: false,
      openSidebar: false,
      showSearch: false,
      showNotifications: false,
      showQuestionsType: false,
    };
  },

  computed: {
    ...mapState({
      isLogin: (state) => !!state.auth.user,
      user: (state) => state.auth.user,
      notifications: (state) => state.ui.notifications.filter((item) => !item.isRead),
    }),
  },

  watch: {
    $route(to) {
      this.isLandingPage = to.name === 'landing-page';
      this.isSignUpPage = to.name === 'signup';
      this.isNotificationPage = to.name === 'notifications';
      this.showNotifications = false;
      this.showQuestionsType = false;
      this.openSidebar = false;
    },
  },

  methods: {
    goTo(name) {
      if (this.$route.name === name) return;

      this.$router.push({ name });
    },

    signOut() {
      this.$store.dispatch('auth/signOut');
      this.$router.push({ name: 'landing-page' });
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
