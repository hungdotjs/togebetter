<template>
  <div class="notifications__item" v-if="user" @click="go">
    <div class="notifications__item__left">
      <el-avatar :size="54" :src="user.photoURL"></el-avatar>
      <img :src="notification.message | iconType" alt="#" class="notifications__item__icon" />
    </div>
    <div class="notifications__item__right">
      <p>
        <b>{{ user.username }}</b> {{ notification.message | messageFull }}
      </p>
      <p class="text-small" :class="[!notification.isRead && 'color-primary text-bold']">
        <i class="el-icon-timer"></i> {{ time }}
      </p>
      <span class="notifications__item__dot" v-if="!notification.isRead"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { db } from '@/firebase';
import timeago from '@/helpers/timeago';

export default {
  name: 'NotificationItem',
  props: {
    notification: {
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
    ...mapState({
      listUsers: (state) => state.ui.listUsers,
    }),

    time() {
      if (this.notification.createdAt) return timeago(this.notification.createdAt.toDate());
      return timeago(new Date());
    },
  },

  async created() {
    const user = this.listUsers.find((item) => item.id === this.notification.senderID);
    let data;
    if (user) {
      data = user;
    } else {
      const doc = await db
        .collection('users')
        .doc(this.notification.senderID)
        .get();
      if (doc.exists) {
        data = doc.data();
      } else return;
    }
    this.$store.dispatch('ui/addUser', { id: this.notification.senderID, ...data });
    this.user = data;
  },

  methods: {
    go() {
      // User haven't read this notification -> change isRead status
      if (!this.notification.isRead) {
        db.collection('notifications')
          .doc(this.notification.id)
          .update({
            isRead: true,
          });
      }

      this.$router.push({ name: 'questions-detail', params: { id: this.notification.questionID } });
    },
  },

  filters: {
    messageFull(value) {
      switch (value) {
        case 'answer':
          return 'answered your question.';
        case 'like':
          return 'liked your post.';
        default:
          return '';
      }
    },

    iconType(value) {
      switch (value) {
        case 'answer':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/icon%2Fchat.svg?alt=media&token=12714774-642c-4ca4-8010-7891f050af5b';
        case 'like':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/icon%2Fheart.svg?alt=media&token=eb5b8b12-66eb-462f-b844-928275ebc047';
        default:
          return '';
      }
    },
  },
};
</script>
