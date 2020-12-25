<template>
  <div class="posts post-detail box-content">
    <div class="p-16-md" v-if="author && post">
      <h1>{{ post.title }}</h1>
      <el-tag v-for="(item, i) in post.tags" :key="i" type="info" size="small" class="mb-16 mr-8">
        #{{ item }}
      </el-tag>
      <div class="center-y mb-32" v-if="author">
        <el-avatar :src="author.photoURL"></el-avatar>
        <div class="ml-8">
          <p class="post__user">{{ author.username }}</p>
          <p class="text-small m-0"><i class="el-icon-time"></i> {{ time }}</p>
        </div>
      </div>
      <div v-html="post.html"></div>
      <div class="d-flex mt-16 justify-between">
        <vote :votes="post.votes" @vote="handleVote" @unvote="handleUnvote"></vote>

        <div class="d-flex">
          <el-tooltip content="Edit" v-if="isOwner" :open-delay="500">
            <div class="chat-bubble__button" @click="handleEdit">
              <p><i class="el-icon-edit-outline"></i></p>
            </div>
          </el-tooltip>
          <el-tooltip content="Delete" v-if="isOwner" :open-delay="500">
            <div class="chat-bubble__button" @click="handleDelete">
              <p><i class="el-icon-delete-solid"></i></p>
            </div>
          </el-tooltip>
          <el-tooltip content="Report" :open-delay="500">
            <div class="chat-bubble__button" @click="openReport = true">
              <p><i class="el-icon-s-flag"></i></p>
            </div>
          </el-tooltip>
        </div>
      </div>

      <el-divider></el-divider>

      <div v-if="user" class="mb-16">
        <h5>{{ post.totalComments }} Comments</h5>
        <input-reply @submit="handleReply" :parentID="postID" :loading="loading"></input-reply>
      </div>

      <div class="pt-16">
        <div v-for="item in post.comments" :key="item">
          <comment :id="item"></comment>
        </div>
      </div>
    </div>

    <post-skeleton v-else></post-skeleton>

    <report
      :userID="user.id"
      :visible.sync="openReport"
      :url="$route.path"
      @send="handleReport"
    ></report>
  </div>
</template>

<script>
import timeago from '@/helpers/timeago';
import report from '@/mixins/report';
import Vote from '@/components/atoms/Vote.vue';
import PostSkeleton from '@/components/atoms/Skeleton/PostSkeleton.vue';
import InputReply from '@/components/molecules/Post/InputReply.vue';
import Comment from '@/components/molecules/Post/Comment.vue';
import { mapState } from 'vuex';
import { db, FieldValue } from '@/firebase';

export default {
  name: 'PostPage',
  mixins: [report],
  components: {
    Vote,
    InputReply,
    Comment,
    PostSkeleton,
  },

  data() {
    return {
      loading: false,
      post: null,
      author: null,
      text: '',
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
    const timeout = setTimeout(() => {
      this.getData();
      clearTimeout(timeout);
    }, 500);
  },

  methods: {
    getData() {
      db.collection('posts')
        .doc(this.postID)
        .onSnapshot((doc) => {
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

    handleVote() {
      db.collection('posts')
        .doc(this.postID)
        .update({
          votes: FieldValue.arrayUnion(this.user.id),
          totalVotes: FieldValue.increment(1),
        });
    },

    handleUnvote() {
      db.collection('posts')
        .doc(this.postID)
        .update({
          votes: FieldValue.arrayRemove(this.user.id),
          totalVotes: FieldValue.increment(-1),
        });
    },

    async handleReply(input) {
      this.loading = true;
      const reply = await db.collection('post_comments').add({
        ...input,
        ownerID: this.user.id,
        votes: [],
        replies: [],
        totalReplies: 0,
        totalVotes: 0,
        createdAt: FieldValue.serverTimestamp(),
      });

      await db
        .collection('posts')
        .doc(this.postID)
        .update({
          comments: FieldValue.arrayUnion(reply.id),
          totalComments: FieldValue.increment(1),
        });

      this.loading = false;
    },

    handleReport(input) {
      this.report(input);
    },

    handleEdit() {
      this.$router.push({ name: 'edit-post', params: { id: this.postID } });
    },

    handleDelete() {
      this.$confirm('Are you sure you want to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'danger',
      }).then(async () => {
        await db
          .collection('posts')
          .doc(this.postID)
          .delete();
        await db
          .collection('post_comments')
          .where('parentID', '==', this.postID)
          .get()
          .then((querySnapshot) => {
            // Once we get the results, begin a batch
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
              // For each doc, add a delete operation to the batch
              batch.delete(doc.ref);
            });
            // Commit the batch
            return batch.commit();
          })
          .then(() => {
            this.$message({
              message: 'Delete completed',
              type: 'success',
            });
          });

        this.$router.push({ name: 'posts' });
      });
    },
  },
};
</script>
