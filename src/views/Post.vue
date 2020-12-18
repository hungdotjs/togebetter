<template>
  <div class="posts post-detail" v-if="post">
    <el-row>
      <el-col :xs="24" :md="16">
        <div class="p-16">
          <h1>{{ post.title }}</h1>
          <el-tag v-for="(item, i) in post.tags" :key="i" type="success" size="small" class="mb-16">
            {{ item }}
          </el-tag>
          <div class="center-y mb-32" v-if="user">
            <el-avatar :src="user.photoURL"></el-avatar>
            <div class="ml-8">
              <p class="post__user">{{ user.username }}</p>
              <p class="text-small m-0">
                {{ time }}
              </p>
            </div>
          </div>
          <div v-html="post.html"></div>
        </div>
      </el-col>
      <el-col :xs="24" :md="8"> </el-col>
    </el-row>
  </div>
</template>

<script>
import { db } from '@/firebase';
import timeago from '@/helpers/timeago';

export default {
  name: 'PostPage',

  data() {
    return {
      post: null,
      user: null,
    };
  },

  computed: {
    postID() {
      return this.$route.params.id;
    },

    time() {
      if (this.post.createdAt) return timeago(this.post.createdAt.toDate());
      return timeago(new Date());
    },
  },

  created() {
    db.collection('posts')
      .doc(this.postID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.post = doc.data();

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
        }
      });
  },
};
</script>
