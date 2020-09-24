<template>
  <div>
    <bubble>
      <p>
        It could mean he has a criminal record, or a lot of past relationships, or he has some
        secrets from his past.
      </p>

      <i class="iconfont icon-share"></i>
      <i class="iconfont icon-bookmark"></i>
      <i class="iconfont icon-like"></i>
      <i class="iconfont icon-dislike"></i>
      <i class="iconfont icon-ellipsis"></i>
    </bubble>
  </div>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';

export default {
  components: {
    Bubble,
  },
};
</script>
