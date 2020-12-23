<template>
  <div class="users-page box-content">
    <h1>Leaderboards</h1>
    <div class="users__wrapper">
      <el-row v-if="users.length">
        <el-col :xs="24" :md="12" :lg="8" v-for="user in users" :key="user.id">
          <user-tag :user="user"></user-tag>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserTag from '@/components/atoms/UserTag.vue';
import { db } from '@/firebase';

export default {
  name: 'Users',
  components: {
    UserTag,
  },

  data() {
    return {
      users: [],
    };
  },

  created() {
    const usersRef = db.collection('users');
    usersRef
      .orderBy('points', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.users = users;
        console.log(users);
      });
  },
};
</script>
