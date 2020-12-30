<template>
  <div class="users-page box-content">
    <h1>Leaderboards</h1>
    <div class="text-center">
      <el-radio-group v-model="filter" size="small" @change="handleChangeFilter">
        <el-radio-button label="points">Points</el-radio-button>
        <el-radio-button label="totalQuestions">Questions</el-radio-button>
        <el-radio-button label="totalAnswers">Answers</el-radio-button>
      </el-radio-group>
    </div>
    <div class="users__wrapper" v-loading="loading">
      <el-row v-if="users.length">
        <el-col :xs="24" :md="12" :lg="8" v-for="(user, index) in users" :key="user.id">
          <user-tag :user="user" :type="filter" :rank="index + 1"></user-tag>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button
          v-if="!noMoreUser"
          type="primary"
          size="small"
          :loading="loadingMore"
          @click="loadMore"
        >
          Load more
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UserTag from '@/components/atoms/UserTag.vue';
import { db } from '@/firebase';
import { mapState } from 'vuex';

export default {
  name: 'Users',
  components: {
    UserTag,
  },

  data() {
    return {
      users: [],
      loadingMore: false,
      loading: false,
      noMoreUser: false,
      lastDoc: null,
      limit: 10,
      filter: 'points',
    };
  },

  computed: {
    ...mapState({
      listUsers: (state) => state.ui.listUsers,
    }),
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.loading = true;
      const usersRef = db.collection('users');
      usersRef
        .orderBy(this.filter, 'desc')
        .limit(this.limit)
        .get()
        .then((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push({
              id: doc.id,
              ...doc.data(),
            });

            const user = this.listUsers.find((item) => item.id === doc.id);
            if (!user) {
              this.$store.dispatch('ui/addUser', { id: doc.id, ...doc.data() });
            }
          });

          this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          if (querySnapshot.docs.length < this.limit) {
            this.noMoreUser = true;
          } else {
            this.noMoreUser = false;
          }

          this.users = users;
          console.log(users);
        });
      const timeout = setTimeout(() => {
        this.loading = false;
        clearTimeout(timeout);
      }, 500);
    },

    async loadMore() {
      this.loadingMore = true;

      const querySnapshot = await db
        .collection('users')
        .orderBy(this.filter, 'desc')
        .startAfter(this.lastDoc)
        .limit(this.limit)
        .get();

      // Get the last visible document
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });

        const user = this.listUsers.find((item) => item.id === doc.id);
        if (!user) {
          this.$store.dispatch('ui/addUser', { id: doc.id, ...doc.data() });
        }
      });
      if (querySnapshot.docs.length < this.limit) {
        this.noMoreUser = true;
      }

      this.users = this.users.concat(data);
      this.loadingMore = false;
    },

    handleChangeFilter() {
      this.getData();
    },
  },
};
</script>
