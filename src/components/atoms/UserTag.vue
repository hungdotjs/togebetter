<template>
  <div class="user-tag" @click="goTo">
    <el-image :src="user.photoURL" class="user-tag__image" lazy></el-image>
    <div class="user-tag__content">
      <p class="user-tag__username">
        <el-tag :type="rank === 1 ? 'success' : 'info'" size="mini" effect="dark">
          {{ rank }}
        </el-tag>
        {{ user.username }}
        <el-tag
          v-if="$store.state.auth.user && user.id === $store.state.auth.user.id"
          type="success"
          size="mini"
          effect="dark"
          class="ml-8"
        >
          me
        </el-tag>
      </p>
      <p class="user-tag__country">
        <i class="iconfont icon-earth mr-8"></i>{{ user.knowingCountry | countryName }}
      </p>
      <!-- <p class="user-tag__country">
        <i class="iconfont icon-edit mr-8"></i>{{ user.interestLanguage | languageName }}
      </p> -->
      <div v-if="type === 'points'" class="user-tag__heart">
        <i class="iconfont icon-heart-solid mr-8"></i>{{ user.points }} points
      </div>
      <div v-else-if="type === 'totalAnswers'" class="user-tag__answers">
        <i class="iconfont icon-answer mr-8"></i>{{ user.totalAnswers }} answers
      </div>
      <div v-else class="user-tag__questions">
        <i class="iconfont icon-question-solid mr-8"></i>{{ user.totalQuestions }} questions
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
    type: {
      type: String,
      default: 'points',
    },
    rank: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'profile', params: { id: this.user.id } });
    },
  },
};
</script>
