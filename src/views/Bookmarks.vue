<template>
  <div class="bookmarks" v-loading="loading">
    <el-row>
      <el-col :xs="24" :md="16">
        <div class="bookmarks__content--empty" v-if="!bookmarks.length">
          <div class="bookmarks__image">
            <el-image
              src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fhugo-list-is-empty.png?alt=media&token=5383fc3d-a8da-4dbe-98fc-283e85610cd2"
              lazy
            ></el-image>
          </div>
          <p class="text-bold">No Bookmarks</p>
          <p class="color-secondary">
            You can bookmark on answers, posts.
          </p>
        </div>
        <div class="bookmarks__content" v-else>
          <h1>Bookmarks</h1>
          <bookmark-bubble v-for="item in bookmarks" :key="item.id" :content="item">
          </bookmark-bubble>
        </div>
      </el-col>
      <el-col :xs="24" :md="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import BookmarkBubble from '@/components/molecules/BookmarkBubble.vue';
import { db } from '@/firebase';

export default {
  name: 'Bookmarks',
  components: {
    BookmarkBubble,
  },
  data() {
    return {
      limit: 5,
      bookmarks: [],
      loading: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },

  created() {
    if (this.user) {
      this.loading = true;
      db.collection('bookmarks')
        .where('userID', '==', this.user.id)
        .orderBy('savedAt', 'desc')
        .limit(this.limit)
        .get()
        .then((querySnapshot) => {
          const bookmarks = [];
          querySnapshot.forEach((doc) => {
            bookmarks.push(doc.data());
          });
          console.log(bookmarks);
          this.bookmarks = this.bookmarks.concat(bookmarks);
          this.loading = false;
        });
    }
  },
};
</script>
