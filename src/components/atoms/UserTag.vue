<template>
  <div class="user-tag">
    <el-image :src="user.photoURL" class="user-tag__image" lazy></el-image>
    <div class="user-tag__content">
      <router-link :to="`users/${user.id}`" class="user-tag__username">
        {{ user.username }}
      </router-link>
      <p class="user-tag__country">
        {{ user.knowingCountry | countryName }}
      </p>
      <div class="user-tag__heart">
        <i class="iconfont icon-heart-solid mr-8"></i> {{ user.points }}
      </div>
    </div>
  </div>
</template>

<script>
import countries from '@/data/countries';

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
  },
};
</script>
