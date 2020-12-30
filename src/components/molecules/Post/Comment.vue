<template>
  <div class="post-comment">
    <base-skeleton v-if="!author"></base-skeleton>

    <template v-else>
      <el-avatar :src="author.photoURL" class="post-comment__avatar" :size="32"></el-avatar>
      <div class="post-comment__content border">
        <p>
          <span class="post-comment__username" @click="goToProfile()">{{ author.username }} </span>

          <span class="text-small"><i class="el-icon-time"></i> {{ time }}</span>
        </p>
        <div v-if="editVisible" class="mb-16">
          <el-input type="textarea" v-model="editContent" class="mb-8"></el-input>
          <el-button size="mini" type="primary" @click="updateContent">Save</el-button>
          <el-button size="mini" @click="editVisible = false">Dismiss</el-button>
        </div>
        <p v-else class="mb-16">{{ comment.content }}</p>
        <img
          v-if="comment.photoURL"
          :src="comment.photoURL"
          style="max-width:300px;"
          class="w-100 mb-16 round"
        />
        <div class="post-comment__handle">
          <vote :votes="comment.votes" @vote="handleVote" @unvote="handleUnvote"></vote>

          <el-dropdown trigger="click" @command="handleCommand">
            <div class="chat-bubble__button">
              <p><i class="iconfont icon-ellipsis"></i></p>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                v-if="isOwner && comment.content"
                command="edit"
              >
                Edit
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" v-if="isOwner" command="delete">
                Delete
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-warning-outline" command="report">
                Report
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <report
        v-if="user"
        :userID="user.id"
        :visible.sync="openReport"
        :url="`${$route.path}/comments/${comment.id}`"
        @send="report"
      ></report>
    </template>
  </div>
</template>

<script>
import { db, FieldValue } from '@/firebase';
import timeago from '@/helpers/timeago';
import report from '@/mixins/report';
import Vote from '@/components/atoms/Vote.vue';
import BaseSkeleton from '@/components/atoms/Skeleton/BaseSkeleton.vue';
import { mapState } from 'vuex';

export default {
  name: 'Comment',
  mixins: [report],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Vote,
    BaseSkeleton,
  },

  data() {
    return {
      author: null,
      comment: null,
      editVisible: false,
      editContent: '',
    };
  },

  computed: {
    ...mapState({
      listUsers: (state) => state.ui.listUsers,
      user: (state) => state.auth.user,
    }),

    time() {
      if (this.comment.createdAt) return timeago(this.comment.createdAt.toDate());
      return timeago(new Date());
    },

    isOwner() {
      if (this.user) {
        return this.user.id === this.author.id;
      }
      return false;
    },
  },

  async created() {
    const res = await db
      .collection('post_comments')
      .doc(this.id)
      .get();

    this.comment = { id: res.id, ...res.data() };

    const user = this.listUsers.find((item) => item.id === this.comment.ownerID);
    let data;
    if (user) {
      data = user;
    } else {
      const doc = await db
        .collection('users')
        .doc(this.comment.ownerID)
        .get();
      if (doc.exists) {
        data = { id: doc.id, ...doc.data() };
        this.$store.dispatch('ui/addUser', data);
      }
    }

    this.author = data;
  },

  methods: {
    handleVote() {
      db.collection('post_comments')
        .doc(this.comment.id)
        .update({
          votes: FieldValue.arrayUnion(this.user.id),
          totalVotes: FieldValue.increment(1),
        });
    },

    handleUnvote() {
      db.collection('post_comments')
        .doc(this.comment.id)
        .update({
          votes: FieldValue.arrayRemove(this.user.id),
          totalVotes: FieldValue.increment(-1),
        });
    },

    updateContent() {
      db.collection('post_comments')
        .doc(this.comment.id)
        .update({
          content: this.editContent,
        });
      this.editVisible = false;
      this.$message({
        type: 'success',
        message: 'Edit successfully',
      });
    },

    handleCommand(command) {
      switch (command) {
        case 'edit':
          this.$emit('edit');
          this.editVisible = true;
          this.editContent = this.comment.content;
          break;
        case 'delete':
          this.handleDelete();
          break;
        case 'report':
          this.openReport = true;
          break;
        default:
          break;
      }
    },

    handleDelete() {
      this.$confirm('Are you sure you want to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'danger',
      }).then(async () => {
        await db
          .collection('posts')
          .doc(this.comment.parentID)
          .update({
            comments: FieldValue.arrayRemove(this.comment.id),
            totalComments: FieldValue.increment(-1),
          });

        await db
          .collection('post_comments')
          .doc(this.comment.id)
          .delete();

        this.$message({
          message: 'Delete completed',
          type: 'success',
        });
      });
    },

    goToProfile() {
      this.$router.push({
        name: 'profile',
        params: {
          id: this.author.id,
        },
      });
    },
  },
};
</script>
