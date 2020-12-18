<template>
  <div v-if="user" class="post">
    <div class="d-flex">
      <el-avatar :src="user.photoURL"></el-avatar>
      <div class="ml-8">
        <p class="post__user">{{ user.username }}</p>
        <p class="text-small m-0">
          {{ time }}
        </p>
      </div>
    </div>
    <div class="post__info">
      <p class="text-small"></p>
      <h1 class="post__title" @click="goTo(`/posts/${post.id}`)">{{ post.title }}</h1>
      <div class="mb-8">
        <el-tag v-for="(item, i) in post.tags" :key="i" type="success" size="small">
          {{ item }}
        </el-tag>
      </div>
      <div class="color-secondary">
        <span class="mr-16">
          <i class="iconfont icon-heart mr-4"></i> {{ post.totalVotes }}
          <span class="text-small"> votes</span>
        </span>
        <span>
          <i class="el-icon-chat-round mr-4"></i>{{ post.replies.length }}
          <span class="text-small"> comments</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import timeago from '@/helpers/timeago';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      user: null,
    };
  },

  computed: {
    time() {
      if (this.post.createdAt) return timeago(this.post.createdAt.toDate());
      return timeago(new Date());
    },
  },

  created() {
    db.collection('users')
      .doc(this.post.author)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.user = {
            id: this.post.author,
            ...doc.data(),
          };
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  },

  methods: {
    goTo(link) {
      this.$router.push(link);
    },
  },
};
</script>
