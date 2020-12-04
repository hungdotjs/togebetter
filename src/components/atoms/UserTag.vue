<template>
  <div class="user-tag" @click="goTo">
    <el-image :src="user.photoURL" class="user-tag__image" lazy></el-image>
    <div class="user-tag__content">
      <p class="user-tag__username"><i class="iconfont icon-user mr-8"></i>{{ user.username }}</p>
      <p class="user-tag__country">
        <i class="iconfont icon-earth mr-8"></i>{{ user.knowingCountry | countryName }}
      </p>
      <!-- <p class="user-tag__country">
        <i class="iconfont icon-edit mr-8"></i>{{ user.interestLanguage | languageName }}
      </p> -->
      <div class="user-tag__heart">
        <i class="iconfont icon-heart-solid mr-8"></i> {{ user.points }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserTag',
  props: {
    user: {
      type: Object,
      required: true,
      default: null,
    },
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'profile', params: { id: this.user.id } });
    },
  },
};
</script>
