<template>
  <div class="user-tag" @click="goTo">
    <el-image :src="user.photoURL" class="user-tag__image" lazy></el-image>
    <div class="user-tag__content">
      <p class="user-tag__username"><i class="iconfont icon-user mr-8"></i>{{ user.username }}</p>
      <p class="user-tag__country">
        <i class="iconfont icon-earth mr-8"></i>{{ user.knowingCountry | countryName }}
      </p>
      <p class="user-tag__country">
        <i class="iconfont icon-edit mr-8"></i>{{ user.interestLanguage | languageName }}
      </p>
      <div class="user-tag__heart"><i class="iconfont icon-heart mr-8"></i> {{ user.points }}</div>
    </div>
  </div>
</template>

<script>
import countries from '@/data/countries';
import languages from '@/data/languages';

export default {
  name: 'UserTag',
  props: {
    user: {
      type: Object,
      required: true,
      default: null,
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

  methods: {
    goTo() {
      this.$router.push({ name: 'profile', params: { id: this.user.id } });
    },
  },
};
</script>
