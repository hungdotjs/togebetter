<template>
  <div v-loading="loading" class="question-detail">
    <div class="question-detail__content">
      <chat-bubble
        :content="question"
        @delete="deleteQuestion(id)"
        @reply="reply(question.ownerID)"
        borderColor="#f65e39"
      ></chat-bubble>

      <div v-if="comments.length">
        <transition-group name="flip-list">
          <chat-bubble
            v-for="comment in comments"
            :key="comment.id"
            :content="comment"
            @delete="deleteComment(comment.id)"
            @reply="reply(comment.ownerID)"
          ></chat-bubble>
        </transition-group>
      </div>
    </div>

    <div class="answer-form">
      <div v-if="!user" class="text-center py-16">
        <p>
          Log in or sign up to leave a comment
        </p>
        <router-link to="/login">
          <el-button class="mr-16">Log in</el-button>
        </router-link>
        <router-link to="/signup">
          <el-button type="primary">Sign up</el-button>
        </router-link>
      </div>
      <div v-else>
        <div v-if="photoURL" style="position: relative; width: fit-content;">
          <el-image :src="photoURL" class="answer-form__image" fit="cover">
            <div slot="placeholder" class="text-center p-16">
              <i class="el-icon-loading"></i>
            </div>
          </el-image>
          <span @click="removePhoto" class="answer-form__image__remove">
            <i class="el-icon-error"></i>
          </span>
        </div>
        <div class="answer-form__audio" v-if="audioURL">
          <audio :src="audioURL" controls>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <span class="answer-form__audio__remove" @click="removeAudio">
            <i class="el-icon-error"></i>
          </span>
        </div>
        <div class="answer-form__input-wrapper">
          <mentionable
            class="answer-form__input"
            :keys="['@']"
            :items="listUsers"
            offset="6"
            @open="onOpenMention"
          >
            <textarea
              ref="answer"
              v-model="answer"
              rows="4"
              autofocus
              placeholder="Answer in his/her native language as he/she is a beginner speaker."
            />

            <template #item-@="{ item }">
              <div class="center-y">
                <el-avatar :src="item.photoURL" alt="#" :size="36" class="mr-8"></el-avatar>
                {{ item.username }}
              </div>
            </template>
          </mentionable>
          <el-button
            class="answer-form__send"
            type="primary"
            size="mini"
            :loading="loadingSubmit"
            :disabled="!alreadyInput"
            @click="submit"
          >
            Send
          </el-button>
        </div>
        <div class="button-group">
          <div class="button-group__item">
            <i class="iconfont icon-keyboard"></i>
          </div>
          <record-audio
            @done="handleRecordAudio"
            class="button-group__item"
            :disable-preview="true"
          >
            <i class="iconfont icon-mic"></i>
          </record-audio>
          <el-upload
            action="#"
            accept="image/*"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChangeUpload"
          >
            <div class="button-group__item">
              <i class="iconfont icon-camera"></i>
            </div>
          </el-upload>
          <chat-sticker @select="selectSticker">
            <div class="button-group__item">
              <i class="iconfont icon-smile"></i>
            </div>
          </chat-sticker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBubble from '@/components/molecules/ChatBubble.vue';
import RecordAudio from '@/components/atoms/RecordAudio.vue';
import ChatSticker from '@/components/atoms/ChatSticker.vue';
import { Mentionable } from 'vue-mention';
import { db, FieldValue } from '@/firebase';
import { mapState } from 'vuex';
import uploadMixin from '@/mixins/upload';
import savePosition from '@/mixins/savePosition';

export default {
  name: 'QuestionDetail',
  components: {
    ChatBubble,
    RecordAudio,
    ChatSticker,
    Mentionable,
  },
  mixins: [uploadMixin, savePosition],

  data() {
    return {
      loadingSubmit: false,
      answer: '',
      question: null,
      comments: [],
      snapshot: null,
      listIdUsers: new Set(),
      listUsers: [],
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      listUsersCached: (state) => state.ui.listUsers,
    }),

    id() {
      return this.$route.params.id;
    },

    alreadyInput() {
      return !!this.answer || !!this.audioURL || !!this.photoURL;
    },
  },

  created() {
    this.getData();
  },

  beforeDestroy() {
    this.snapshot();
  },

  methods: {
    onOpenMention() {
      this.listUsers = this.listUsersCached
        .filter((item) => this.listIdUsers.has(item.id))
        .map((item) => ({
          value: item.username,
          ...item,
        }));
    },

    async getData() {
      this.loading = true;
      const commentRef = db.collection('comments');
      const res = await db
        .collection('questions')
        .doc(this.id)
        .get();
      if (res.exists) {
        // Add user to push notification
        this.listIdUsers.add(res.data().ownerID);
        this.question = {
          id: this.id,
          ...res.data(),
        };
        this.snapshot = await commentRef
          .where('questionID', '==', this.id)
          .onSnapshot((querySnapshot) => {
            const comments = [];
            querySnapshot.forEach((doc) => {
              this.listIdUsers.add(doc.data().ownerID);
              comments.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            // Update comments
            this.comments = comments.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
            this.loading = false;
          });
      } else {
        this.$router.push({ name: '404' });
      }
    },

    selectSticker(stickerURL) {
      this.photoURL = stickerURL;
      this.answer = '';
      this.audioURL = '';
      this.submit();
    },

    deleteComment(commentID) {
      this.$confirm('Are you sure you want to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'danger',
      }).then(async () => {
        await db
          .collection('comments')
          .doc(commentID)
          .delete();
        await db
          .collection('questions')
          .doc(this.id)
          .update({
            comments: FieldValue.arrayRemove(commentID),
          });
        await db
          .collection('users')
          .doc(this.user.id)
          .update({
            totalAnswers: FieldValue.increment(-1),
          });
      });
    },

    deleteQuestion(questionID) {
      this.$confirm('Are you sure you want to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'danger',
      }).then(async () => {
        await db
          .collection('questions')
          .doc(questionID)
          .delete();
        await db
          .collection('users')
          .doc(this.user.id)
          .update({
            totalQuestions: FieldValue.increment(-1),
          });
        this.$router.push({ name: 'home' });
      });
    },

    reply(ownerID) {
      const user = this.listUsersCached.find((item) => item.id === ownerID);
      this.answer = `@${user.username} `;
      const inputRef = this.$refs.answer;
      inputRef.focus();
    },

    async submit() {
      this.loadingSubmit = true;
      const input = {
        questionID: this.$route.params.id,
        ownerID: this.user.id,
        content: this.answer,
        audioURL: this.audioURL,
        photoURL: this.photoURL,
        votes: [],
        createdAt: FieldValue.serverTimestamp(),
      };
      const comment = await db.collection('comments').add(input);
      await db
        .collection('questions')
        .doc(this.$route.params.id)
        .update({
          comments: FieldValue.arrayUnion(comment.id),
        });
      await db
        .collection('users')
        .doc(this.user.id)
        .update({
          totalAnswers: FieldValue.increment(1),
        });

      this.loadingSubmit = false;
      this.photoURL = '';
      this.audioURL = '';
      this.answer = '';
    },
  },
};
</script>
