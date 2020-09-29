<template>
  <div>
    <bubble>
      <div class="chat-bubble__language">
        <div class="center-y"><i class="el-icon-s-comment mr-8"></i>Korea</div>
        <level-icon :level="1">
          <template #prefix>
            <i class="el-icon-edit mr-8"></i>
            English (US)
          </template>
        </level-icon>
      </div>

      <p>
        It could mean he has a criminal record, or a lot of past relationships, or he has some
        secrets from his past.
      </p>

      <div class="chat-bubble__command">
        <div class="chat-bubble__social">
          <div class="chat-bubble__button">
            <p><i class="iconfont icon-share"></i></p>
            <p class="text-small">Share</p>
          </div>
          <div class="chat-bubble__button">
            <p><i class="iconfont icon-bookmark"></i></p>
            <p class="text-small">Save</p>
          </div>
          <div class="chat-bubble__button">
            <p><i class="iconfont icon-like"></i></p>
            <p class="text-small">Upvote</p>
          </div>
          <div class="chat-bubble__button">
            <p><i class="iconfont icon-dislike"></i></p>
            <p class="text-small">Downvote</p>
          </div>
        </div>

        <div class="chat-bubble__button">
          <p><i class="iconfont icon-ellipsis"></i></p>
          <p class="text-small">More</p>
        </div>
      </div>
    </bubble>
  </div>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';
import LevelIcon from '@/components/atoms/LevelIcon.vue';

export default {
  components: {
    Bubble,
    LevelIcon,
  },
};
</script>
