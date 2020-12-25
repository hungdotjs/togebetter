<template>
  <div
    class="posts"
    v-infinite-scroll="load"
    infinite-scroll-immediate-check="false"
    infinite-scroll-throttle-delay="500"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance="100"
  >
    <el-row>
      <el-col :xs="24" :md="16">
        <div class="center-y justify-between">
          <h1 class="pt-16">Discussions</h1>
          <el-button type="primary" @click="createPost" size="small">Create a Post</el-button>
        </div>
        <div v-if="loading">
          <facebook-content-loader></facebook-content-loader>
          <facebook-content-loader></facebook-content-loader>
          <facebook-content-loader></facebook-content-loader>
        </div>
        <template v-else>
          <post v-for="post in posts" :key="post.id" :post="post"> </post>
        </template>
        <div class="text-center">
          <p v-if="noMore">No more posts</p>
          <div v-if="scrollLoading">
            <facebook-content-loader></facebook-content-loader>
            <facebook-content-loader></facebook-content-loader>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="8"> </el-col>
    </el-row>
  </div>
</template>

<script>
import { db } from '@/firebase';
import FacebookContentLoader from '@/components/atoms/FacebookContentLoader.vue';
import Post from '@/components/atoms/Post.vue';

export default {
  name: 'Posts',
  components: { FacebookContentLoader, Post },

  data() {
    return {
      loading: false,
      scrollLoading: false,
      noMore: false,
      limit: 5,
      lastDoc: null,
      posts: [],
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async load() {
      if (this.loading) return;

      this.scrollLoading = true;
      if (!this.lastDoc) {
        this.noMore = true;
        this.scrollLoading = false;
        return;
      }

      let ref = db.collection('posts');

      ref = ref
        .orderBy('createdAt', 'desc')
        .startAfter(this.lastDoc)
        .limit(this.limit);

      const querySnapshot = await ref.get();

      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const timeout = setTimeout(() => {
        this.posts = this.posts.concat(posts);
        if (querySnapshot.docs.length < this.limit) {
          this.noMore = true;
        }
        this.scrollLoading = false;
        clearTimeout(timeout);
      }, 1000);
    },

    async getData() {
      this.loading = true;
      let ref = db.collection('posts');
      ref = ref.orderBy('createdAt', 'desc').limit(this.limit);

      const querySnapshot = await ref.get();

      const posts = [];
      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(posts);

      const timeout = setTimeout(() => {
        this.posts = posts;
        this.loading = false;
        clearTimeout(timeout);
      }, 500);
    },

    createPost() {
      this.$router.push({ name: 'create-post' });
    },
  },
};
</script>
