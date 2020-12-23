<template>
  <div class="posts post-detail box-content" v-if="post">
    <div class="p-16">
      <h1>{{ post.title }}</h1>
      <el-tag v-for="(item, i) in post.tags" :key="i" type="info" size="small" class="mb-16 mr-8">
        #{{ item }}
      </el-tag>
      <div class="center-y mb-32" v-if="author">
        <el-avatar :src="author.photoURL"></el-avatar>
        <div class="ml-8">
          <p class="post__user">{{ author.username }}</p>
          <p class="text-small m-0">
            {{ time }}
          </p>
        </div>
      </div>
      <div v-html="post.html"></div>

      <div class="post-detail__button-wrapper">
        <div class="chat-bubble__button">
          <vote :votes="post.votes" @vote="handleVote" @unvote="handleUnvote"></vote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import timeago from '@/helpers/timeago';
import Vote from '@/components/atoms/Vote.vue';
import { mapState } from 'vuex';

export default {
  name: 'PostPage',
  components: {
    Vote,
  },

  data() {
    return {
      post: null,
      author: null,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      listUsers: (state) => state.ui.listUsers,
    }),

    postID() {
      return this.$route.params.id;
    },

    time() {
      if (this.post.createdAt) return timeago(this.post.createdAt.toDate());
      return timeago(new Date());
    },

    isOwner() {
      return this.user.id === this.post.author;
    },
  },

  created() {
    db.collection('posts')
      .doc(this.postID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.post = doc.data();

          const user = this.listUsers.find((item) => item.id === this.post.author);

          if (user) {
            this.author = user;
          } else {
            db.collection('users')
              .doc(this.post.author)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  this.author = {
                    id: this.post.author,
                    ...doc.data(),
                  };

                  this.$store.dispatch('ui/addUser', this.author);
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!');
                }
              });
          }
        }
      });
  },

  methods: {
    handleVote() {},
    handleUnvote() {},
  },
};
</script>
