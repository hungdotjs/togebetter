<template>
  <div class="profile main-layout" v-loading="loading">
    <div v-if="currentUser">
      <div class="profile__overview">
        <div class="profile__header">
          <el-image class="profile__avatar" :src="currentUser.photoURL"></el-image>
          <div>
            <p class="profile__header__username">{{ currentUser.username }}</p>
            <router-link
              v-if="user && currentUser.id === user.id"
              :to="{ name: 'edit-profile', params: { id: user.id } }"
            >
              <el-button size="mini" icon="iconfont icon-edit">
                Edit Profile
              </el-button>
            </router-link>
          </div>
        </div>

        <div class="profile__bio" v-if="currentUser.bio">
          {{ currentUser.bio }}
        </div>
        <div v-else>
          (Your bio is currently blank.)
        </div>

        <div class="profile__points">Points: {{ currentUser.points }}</div>
        <div class="profile__questions">{{ currentUser.totalQuestions }} questions</div>
      </div>

      <div class="container">
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="el-icon-s-comment"></i>
            Native language
          </p>
          <p>{{ currentUser.nativeLanguage | languageName }}</p>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="el-icon-edit"></i>
            Language of interest
          </p>
          <level-icon :level="currentUser.interestLanguageLevel">{{
            currentUser.interestLanguage | languageName
          }}</level-icon>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="iconfont icon-earth"></i>
            Country or region they know well
          </p>
          <p>{{ currentUser.knowingCountry | countryName }}</p>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="iconfont icon-earth"></i>
            Countries and regions of interest
          </p>
          <p>{{ currentUser.interestCountry | countryName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import { mapState } from 'vuex';
import { db } from '@/firebase';
import languages from '@/data/languages';
import countries from '@/data/countries';

export default {
  name: 'Profile',
  components: { LevelIcon },

  data() {
    return {
      currentUser: null,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      const userID = this.$route.params.id;
      this.loading = true;
      db.collection('users')
        .doc(userID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = {
              id: doc.id,
              ...doc.data(),
            };
            this.currentUser = user;
            console.log(user);
            this.loading = false;
          } else {
            this.$router.push({ name: '404' });
          }
        });
    },
  },

  filters: {
    countryName(value) {
      return countries.find((item) => item.code === value).name;
    },

    languageName(value) {
      return languages.find((item) => item.code === value).name;
    },
  },
};
</script>
