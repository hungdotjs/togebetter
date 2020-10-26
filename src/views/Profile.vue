<template>
  <div class="profile">
    <div class="profile__overview container">
      <div class="profile__header">
        <el-avatar :src="user.photoURL" :size="80"></el-avatar>
        <div class="ml-16">
          <p class="profile__header__username">{{ user.displayName }}</p>
          <el-link type="primary">Edit</el-link>
        </div>
      </div>

      <div class="profile__points">
        <p class="profile__points__title">Quick Points</p>
        <div class="profile__point-box">
          <el-row class="profile__point-box__content">
            <el-col :span="6">
              <i class="el-icon-trophy"></i>
            </el-col>
            <el-col :span="18">
              <div class="d-flex grow-1 flex-column">
                <div class="quick-point">
                  <span>
                    Lv <span class="quick-point__value"> {{ 1 }} </span>
                  </span>
                  <span>0 / 3</span>
                </div>
                <div class="line"></div>
              </div>
            </el-col>
          </el-row>
          <el-row class="profile__point-box__footer">
            <el-col :span="6"><br /></el-col>
            <el-col :span="18">
              Total Points: <span class="profile__point-box__footer__value">0</span>
            </el-col>
          </el-row>
        </div>

        <p class="profile__points__title">Quality Points</p>
        <div class="profile__point-box">
          <div class="profile__point-box__header">
            <i class="el-icon-chat-dot-round"></i>
            Vietnamese <span class="color-secondary ml-8">Fluent</span>
          </div>
          <div class="profile__point-box__content">
            <i class="iconfont icon-graduate"></i>
            <div>
              <span class="profile__point-box__point color-pink"> 0 </span>
              <span class="text-small color-secondary">Pts</span>
            </div>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="profile__point-box">
              <div class="profile__point-box__content">
                <div>
                  <span>Questions</span> <br />
                  <i class="iconfont icon-ask-question"></i>
                </div>
                <p class="profile__point-box__point">0</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="profile__point-box">
              <div class="profile__point-box__content">
                <div>
                  <span>Answers</span> <br />
                  <i class="iconfont icon-answer"></i>
                </div>
                <p class="profile__point-box__point">0</p>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="profile__point-box">
          <div class="profile__point-box__content">
            <div class="profile__point-box__title">
              <i class="iconfont icon-bookmark mr-8"></i>
              <span>Bookmarks</span>
            </div>
            <p class="profile__point-box__point">0</p>
          </div>
        </div>

        <div class="profile__point-box">
          <div class="profile__point-box__content">
            <div class="profile__point-box__title">
              <i class="iconfont icon-like mr-8"></i>
              <span>Like</span>
            </div>
            <p class="profile__point-box__point">0</p>
          </div>
        </div>

        <div class="profile__point-box">
          <div class="profile__point-box__content">
            <div class="profile__point-box__title">
              <i class="iconfont icon-crown mr-8"></i>
              <span>Feature answers</span>
            </div>
            <p class="profile__point-box__point">0</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="profile__detail">
        <p class="profile__detail__title">
          <i class="el-icon-s-comment"></i>
          Native language
        </p>
        <p>Vietnamese</p>
      </div>
      <el-divider></el-divider>
      <div class="profile__detail">
        <p class="profile__detail__title">
          <i class="el-icon-edit"></i>
          Language of interest
        </p>
        <level-icon level="2">English (US)</level-icon>
      </div>
      <el-divider></el-divider>
      <div class="profile__detail">
        <p class="profile__detail__title">
          <i class="iconfont icon-earth"></i>
          Country or region they know well
        </p>
        <p>Vietnam</p>
      </div>
      <el-divider></el-divider>
      <div class="profile__detail">
        <p class="profile__detail__title">
          <i class="iconfont icon-earth"></i>
          Countries and regions of interest
        </p>
        <p>United States</p>
      </div>
      <el-divider></el-divider>
      <div class="profile__detail">
        <p class="profile__detail__title">
          <i class="el-icon-user-solid"></i>
          Self-introduction
        </p>
        <p>Hi, my name is Hung</p>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  components: { LevelIcon },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style lang="scss" scoped>
.icon-graduate {
  color: #ff47aa;
  margin-right: 16px;
}

.color-pink {
  color: #ff47aa;
}

.quick-point {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: baseline;

  &__value {
    color: #0eb077;
    font-size: 24px;
  }
}

.el-icon-trophy {
  color: #fff;
  background-color: #0eb077;
  padding: 8px;
  border-radius: 50%;
}

.line {
  height: 2px;
  width: 100%;
  background-color: #999;
}
</style>
