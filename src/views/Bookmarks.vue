<template>
  <div
    class="bookmarks"
    v-infinite-scroll="load"
    infinite-scroll-immediate-check="false"
    infinite-scroll-throttle-delay="500"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance="100"
  >
    <el-row>
      <el-col :xs="24" :md="16">
        <h1>Bookmarks</h1>

        <div v-if="loading" class="skeleton-wrapper">
          <base-skeleton></base-skeleton>
          <base-skeleton></base-skeleton>
          <base-skeleton></base-skeleton>
        </div>

        <template v-else>
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
            <bookmark-bubble v-for="item in bookmarks" :key="item.id" :content="item">
            </bookmark-bubble>
          </div>
          <div class="text-center">
            <p v-if="noMore">No more questions</p>
            <div v-if="scrollLoading" class="skeleton-wrapper">
              <base-skeleton></base-skeleton>
              <base-skeleton></base-skeleton>
            </div>
          </div>
        </template>
      </el-col>
      <el-col :xs="24" :md="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import BookmarkBubble from '@/components/molecules/BookmarkBubble.vue';
import BaseSkeleton from '@/components/atoms/Skeleton/BaseSkeleton.vue';
import { db } from '@/firebase';

export default {
  name: 'Bookmarks',
  components: {
    BookmarkBubble,
    BaseSkeleton,
  },
  data() {
    return {
      limit: 5,
      bookmarks: [],
      loading: false,
      scrollLoading: false,
      noMore: false,
      lastDoc: null,
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

          this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          console.log(bookmarks);

          this.bookmarks = this.bookmarks.concat(bookmarks);
          this.loading = false;
        });
    }
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

      const ref = db
        .collection('bookmarks')
        .where('userID', '==', this.user.id)
        .orderBy('savedAt', 'desc')
        .startAfter(this.lastDoc)
        .limit(this.limit);

      const querySnapshot = await ref.get();

      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

      const bookmarks = [];
      querySnapshot.forEach((doc) => {
        bookmarks.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const timeout = setTimeout(() => {
        this.bookmarks = this.bookmarks.concat(bookmarks);
        if (querySnapshot.docs.length < this.limit) {
          this.noMore = true;
        }
        this.scrollLoading = false;
        clearTimeout(timeout);
      }, 500);
    },
  },
};
</script>
