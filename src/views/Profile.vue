<template>
  <div class="profile">
    <div class="profile__header">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="80"
      ></el-avatar>
      <div class="ml-16">
        <p class="profile__header__username">hungteddy98</p>
        <el-button icon="el-icon-edit" plain>Edit</el-button>
      </div>
    </div>

    <div class="profile__points">
      <p class="profile__points__title">Quick Points</p>
      <div>
        <i class="el-icon-trophy"></i>
      </div>

      <p class="profile__points__title">Quality Points</p>
      <div class="profile__point-box profile__point-box--native">
        <div class="profile__point-box__header profile__point-box__header--native">
          <i class="el-icon-chat-dot-round"></i>
          Vietnamese <span class="color-secondary ml-8">Fluent</span>
        </div>
        <div class="profile__point-box__content">
          <i class="el-icon-star-on"></i>
          <p>
            <span class="text-bold"> 0 </span>
            <span class="text-small color-secondary">Pts</span>
          </p>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="profile__point-box">
            <div class="profile__point-box__header">
              Question
            </div>
            <div class="profile__point-box__content">
              <i class="el-icon-question"></i> <span class="text-bold color-primary">0</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="profile__point-box">
            <div class="profile__point-box__header">
              Answer
            </div>
            <div class="profile__point-box__content">
              <i class="el-icon-question"></i> <span class="text-bold color-primary">0</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';

export default {
  name: 'Profile',
  components: {},

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
