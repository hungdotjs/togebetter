<template>
  <div class="tb-navbar">
    <!-- Mobile  -->
    <div class="hidden-sm-and-up">
      <ul class="tb-navbar__wrapper">
        <li class="tb-navbar__item">
          <router-link class="tb-navbar__item__anchor" to="/">
            <div>
              <i class="el-icon-s-home"></i>
            </div>
            <div class="tb-navbar__item__label">Home</div>
          </router-link>
        </li>
        <li class="tb-navbar__item">
          <router-link class="tb-navbar__item__anchor" to="/notifications">
            <div>
              <i class="el-icon-message-solid"></i>
            </div>
            <div class="tb-navbar__item__label">Notifications</div>
          </router-link>
        </li>
        <li class="tb-navbar__item ">
          <router-link class="tb-navbar__item__anchor" to="/questions/type">
            <div>
              <i class="el-icon-question"></i>
            </div>
            <div class="tb-navbar__item__label">Ask</div>
          </router-link>
        </li>
        <li class="tb-navbar__item">
          <router-link class="tb-navbar__item__anchor" to="/profile">
            <div>
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="tb-navbar__item__label">Profile</div>
          </router-link>
        </li>
        <li class="tb-navbar__item">
          <router-link class="tb-navbar__item__anchor" to="/settings">
            <div>
              <i class="el-icon-s-tools"></i>
            </div>
            <div class="tb-navbar__item__label">Settings</div>
          </router-link>
        </li>
      </ul>

      <!-- <div class="tb-navbar__container">
      <tb-search></tb-search>
    </div> -->
    </div>

    <!-- Desktop  -->
    <div class="hidden-xs-only">
      <div class="tb-navbar__wrapper tb-navbar__wrapper--desktop">
        <div class="tb-navbar__item--desktop tb-navbar__logo">
          <router-link tag="div" class="tb-navbar__item__anchor" to="/">
            Togebetter
          </router-link>
        </div>

        <!-- search  -->
        <div class="tb-navbar__item--desktop tb-navbar__search">
          <tb-search></tb-search>
        </div>

        <div class="tb-navbar__item--desktop">
          <ul class="tb-navbar__operations">
            <li class="tb-navbar__operations__item">
              <router-link class="tb-navbar__operations__anchor" to="/">
                <i class="el-icon-s-home"></i>
              </router-link>
            </li>
            <li class="tb-navbar__operations__item rspec-nav_activity">
              <router-link class="tb-navbar__operations__anchor" to="/notifications">
                <i class="el-icon-message-solid"></i>
              </router-link>
            </li>
            <li class="tb-navbar__operations__item">
              <div class="tb-navbar__operations__anchor">
                <el-dropdown>
                  <img
                    alt="user image"
                    class="tb-navbar__avatar"
                    src="https://cdn.hinative.com/photos/5811857/d4d7f5f714a3975d37bf104853ef6d5c1b31f436/thumb.jpg?1600090881"
                    width="32"
                    height="32"
                  />
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <router-link tag="span" to="/profile">
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
                    <el-dropdown-item>
                      <span>
                        <i class="el-icon-switch-button"></i>
                        Sign out
                      </span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </li>
            <li class="tb-navbar__operations__item">
              <router-link to="/questions/type" class="tb-navbar__operations__anchor">
                <el-button type="primary" class="text-bold" round>Ask</el-button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TbSearch from '@/components/molecules/Search.vue';

export default {
  name: 'Navbar',
  components: {
    TbSearch,
  },

  data() {
    return {};
  },
};
</script>
