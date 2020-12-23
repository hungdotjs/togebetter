<template>
  <div class="notifications" :class="mode === 'page' && 'box-content'">
    <div class="notifications__content" v-if="notifications.length">
      <div>
        <h1>
          Notifications
          <!-- <el-button icon="el-icon-check" class="ml-16 float-right" size="mini">
            Mark all as read
          </el-button> -->
        </h1>
      </div>
      <el-divider></el-divider>
      <div v-for="item in notifications" :key="item.id">
        <notification :notification="item"></notification>
      </div>
    </div>

    <div class="text-center" v-else>
      <div class="notifications__image">
        <el-image
          src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fhugo-no-messages.png?alt=media&token=47fe31b7-0c4c-45f1-8cb1-7df7c6cbb4b2"
          lazy
        ></el-image>
      </div>
      <p class="text-bold">You don't have any notifications yet.</p>
      <p class="color-secondary">If you receive an answer of a like, it will be shown here.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Notification from '@/components/atoms/Notification.vue';

export default {
  name: 'Notifications',
  components: {
    Notification,
  },

  props: {
    mode: {
      type: String,
      default: 'page',
    },
  },

  computed: {
    ...mapState({
      notifications: (state) => state.ui.notifications,
    }),
  },
};
</script>
