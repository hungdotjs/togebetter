<template>
  <div class="container">
    <div v-loading="loading" class="question-detail main-layout">
      <div class="question-detail__content">
        <chat-bubble :content="question" @delete="deleteQuestion(id)"></chat-bubble>

        <div v-if="comments.length">
          <chat-bubble
            v-for="comment in comments"
            :key="comment.id"
            :content="comment"
            @delete="deleteComment(comment.id)"
          ></chat-bubble>
        </div>
      </div>

      <div class="answer-form">
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
          <el-input
            class="answer-form__input"
            type="textarea"
            v-model="answer"
            placeholder="Answer in his/her native language as he/she is a beginner speaker."
            :autosize="{ minRows: 3, maxRows: 5 }"
            resize="none"
          >
          </el-input>
          <el-button
            class="answer-form__send"
            type="primary"
            size="mini"
            icon="el-icon-right"
            :loading="loadingSubmit"
            :disabled="!alreadyInput"
            @click="submit"
          ></el-button>
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
import { db, FieldValue } from '@/firebase';
import { mapState } from 'vuex';
import uploadMixin from '@/mixins/upload';

export default {
  name: 'Home',
  components: {
    ChatBubble,
    RecordAudio,
    ChatSticker,
  },
  mixins: [uploadMixin],

  data() {
    return {
      loadingSubmit: false,
      answer: '',
      question: null,
      comments: [],
      snapshot: null,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    id() {
      return this.$route.params.id;
    },

    alreadyInput() {
      return !!this.answer || !!this.audioURL || !!this.photoURL;
    },
  },

  async created() {
    this.loading = true;
    const commentRef = db.collection('comments');
    const res = await db
      .collection('questions')
      .doc(this.id)
      .get();

    if (res.exists) {
      this.question = {
        id: this.id,
        ...res.data(),
      };
      this.snapshot = await commentRef
        .where('questionID', '==', this.id)
        .onSnapshot((querySnapshot) => {
          const comments = [];
          querySnapshot.forEach((doc) => {
            comments.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          this.comments = comments;
        });

      this.loading = false;
    } else {
      this.$router.push({ name: '404' });
    }
  },

  methods: {
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
      });
    },

    deleteQuestion(questionID) {
      this.$confirm('Are you sure you want to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'danger',
      }).then(() => {
        db.collection('questions')
          .doc(questionID)
          .delete()
          .then(() => {
            this.$router.push({ name: 'home' });
          });
      });
    },

    async submit() {
      this.loadingSubmit = true;
      const input = {
        questionID: this.$route.params.id,
        ownerID: this.user.id,
        ownerInfo: this.user,
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
      this.loadingSubmit = false;
      this.photoURL = '';
      this.audioURL = '';
      this.answer = '';
      this.$router.go();
    },
  },

  beforeDestroy() {
    this.snapshot();
  },
};
</script>
