<template>
  <bubble
    v-if="content"
    :userID="content.ownerID"
    :createdAt="content.createdAt"
    :borderColor="borderColor"
  >
    <p v-if="content.questionType">
      <el-tag type="success" effect="plain">
        Question about <b>{{ languageName }}</b>
      </el-tag>
    </p>
    <p class="color-secondary" v-if="content.questionType">{{ questionType }}</p>
    <div v-if="content.content">
      <div v-if="editVisible">
        <el-input
          type="textarea"
          resize="none"
          class="mb-8"
          :rows="2"
          :autosize="{ minRows: 4 }"
          v-model="editContent"
        ></el-input>
        <el-button type="primary" size="small" @click="updateContent" :loading="loading" plain>
          Save changes
        </el-button>
        <el-button size="small" plain @click="editVisible = false">Cancel</el-button>
      </div>
      <div v-else>
        <p class="chat-bubble__content" v-html="contentHTML"></p>
        <span v-if="content.updatedAt" class="text-small color-secondary">(edited)</span>
        <p class="py-8" v-loading="loadingTranslate">
          <span v-if="showTranslate">
            <el-divider>
              <img
                :src="require('@/assets/img/translated-by-google.png')"
                width="120"
                alt="translated-by-google"
              />
            </el-divider>
            {{ translatedText }}
            <br />
            <span class="text-secondary pointer" @click="showTranslate = false"
              >Hide translation</span
            >
          </span>
          <span v-else class="text-secondary pointer" @click="translate">
            See a translation
          </span>
        </p>
      </div>
    </div>
    <div v-if="content.photoURL">
      <el-image
        class="chat-bubble__image"
        :src="content.photoURL"
        :preview-src-list="[content.photoURL]"
        lazy
      ></el-image>
    </div>
    <div v-if="content.audioURL">
      <audio :src="content.audioURL" class="chat-bubble__audio" controls></audio>
    </div>
    <p
      class="chat-bubble__content chat-bubble__additional-info"
      v-if="content.additionalInformation"
    >
      {{ content.additionalInformation }}
    </p>

    <div class="chat-bubble__command" v-if="user">
      <div class="chat-bubble__social">
        <vote
          :votes="content.votes"
          @vote="handleVote"
          @unvote="handleUnvote"
          :disabled="isOwner"
        ></vote>
        <div class="chat-bubble__button" v-if="!isOwner && mode !== 'view'" @click="handleReply">
          <p><i class="iconfont icon-reply"></i></p>
          <p class="chat-bubble__button__text">Reply</p>
        </div>
        <bookmark
          v-if="!isOwner"
          :bookmarks="user.bookmarks"
          :id="content.id"
          @save="handleSave"
          @unsave="handleUnsave"
        ></bookmark>
      </div>

      <el-dropdown trigger="click" v-if="user" @command="handleCommand">
        <div class="chat-bubble__button">
          <p><i class="iconfont icon-ellipsis"></i></p>
          <p class="chat-bubble__button__text">More</p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" v-if="isOwner && content.content" command="edit">
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
  </bubble>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';
import Vote from '@/components/atoms/Vote.vue';
import Bookmark from '@/components/atoms/Bookmark.vue';
import languages from '@/data/languages';
import { mapState } from 'vuex';
import { db, FieldValue } from '@/firebase';
import { questionsIndex } from '@/algolia';
import translator from '@/translator';
import urlDetect from '@/helpers/urlDetect';
import detectLanguage from '@/helpers/detectLanguage';
import notiMixins from '@/mixins/notification';

export default {
  name: 'ChatBubble',
  mixins: [notiMixins],
  components: {
    Bubble,
    Bookmark,
    Vote,
  },

  props: {
    mode: {
      type: String,
      default: 'default',
    },
    content: {
      type: Object,
    },
    borderColor: {
      type: String,
      default: '#d7dae2',
    },
  },

  data() {
    return {
      loading: false,
      loadingTranslate: false,
      editVisible: false,
      editContent: '',
      showTranslate: false,
      translatedText: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      languageCode: (state) => state.ui.languageCode,
    }),

    isOwner() {
      if (this.user) return this.user.id === this.content.ownerID;
      return false;
    },

    languageName() {
      return languages.find((item) => item.code === this.content.lang).name;
    },

    contentHTML() {
      return urlDetect(this.content.content);
    },

    questionType() {
      switch (this.content.questionType) {
        case 'how-say':
          return `How do you say this in ${this.languageName}?`;
        case 'what-mean':
          return 'What does this mean?';
        case 'sound-natural':
          return 'Does this sound natural?';
        case 'example':
          return 'Please show me example sentences with?';
        case 'difference':
          return "What's the difference?";
        case 'your-pronounce':
          return 'Please show me how to pronounce?';
        case 'my-pronounce':
          return "How's my pronunciation? Please record yours too.";
        default:
          return '';
      }
    },
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case 'edit':
          this.$emit('edit');
          if (this.content.questionType) return;
          this.editVisible = true;
          this.editContent = this.content.content;
          break;
        case 'delete':
          this.$emit('delete');
          break;
        default:
          break;
      }
    },

    adjustUserPoint(point) {
      const userRef = db.collection('users');
      userRef.doc(this.content.ownerID).update({
        points: FieldValue.increment(point),
      });
    },

    handleReply() {
      this.$emit('reply');
    },

    async handleSave() {
      await db
        .collection('bookmarks')
        .doc(`${this.user.id}_${this.content.id}`)
        .set({
          userID: this.user.id,
          id: this.content.id,
          ownerID: this.content.ownerID,
          questionID: this.content.questionID || this.content.id,
          content: this.content.content,
          audioURL: this.content.audioURL,
          photoURL: this.content.photoURL,
          createdAt: this.content.createdAt,
          savedAt: FieldValue.serverTimestamp(),
        });
      await db
        .collection('users')
        .doc(this.user.id)
        .update({
          bookmarks: FieldValue.arrayUnion(this.content.id),
        });
      this.$message({
        type: 'success',
        message: 'Saved successfully',
      });
    },

    async handleUnsave() {
      await db
        .collection('bookmarks')
        .doc(`${this.user.id}_${this.content.id}`)
        .delete();
      await db
        .collection('users')
        .doc(this.user.id)
        .update({
          bookmarks: FieldValue.arrayRemove(this.content.id),
        });
      this.$message({
        type: 'success',
        message: 'Unsaved successfully',
      });
    },

    handleVote() {
      const ref = this.content.lang ? db.collection('questions') : db.collection('comments');
      ref
        .doc(this.content.id)
        .update({
          votes: FieldValue.arrayUnion(this.user.id),
        })
        .then(() => {
          this.adjustUserPoint(1);
        });

      // Send Notification to owner
      this.sendNotification({
        message: 'like',
        senderID: this.user.id,
        receiveID: this.content.ownerID,
        questionID: this.content.lang ? this.content.id : this.content.questionID,
        detectID: `${this.user.id}_${this.content.id}`,
      });

      // If user vote an question
      if (this.content.lang) {
        questionsIndex.partialUpdateObject({
          votes: {
            _operation: 'Increment',
            value: 1,
          },
          objectID: this.content.id,
        });
      }
    },

    handleUnvote() {
      const ref = this.content.lang ? db.collection('questions') : db.collection('comments');
      ref
        .doc(this.content.id)
        .update({
          votes: FieldValue.arrayRemove(this.user.id),
        })
        .then(() => {
          this.adjustUserPoint(-1);
        });

      this.removeNotification({
        detectID: `${this.user.id}_${this.content.id}`,
      });

      // If user vote an question
      if (this.content.lang) {
        questionsIndex.partialUpdateObject({
          votes: {
            _operation: 'Decrement',
            value: 1,
          },
          objectID: this.content.id,
        });
      }
    },

    async updateContent() {
      this.loading = true;
      await db
        .collection('comments')
        .doc(this.content.id)
        .update({
          content: this.editContent,
          updatedAt: FieldValue.serverTimestamp(),
        });
      this.content.content = this.editContent;
      this.editVisible = false;
      this.loading = false;
    },

    translate() {
      this.showTranslate = true;
      if (this.translatedText) {
        return;
      }

      this.loadingTranslate = true;
      const text = urlDetect(this.content.content, true);
      detectLanguage.detectCode(text).then((result) => {
        this.contentLanguage = result;
        const langpair = `${result}|${this.languageCode}`;
        translator(text, langpair)
          .then(({ data }) => {
            const { responseData } = data;
            this.translatedText = responseData.translatedText;
            this.loadingTranslate = false;
          })
          .catch((error) => {
            console.error(error);
            this.loadingTranslate = false;
          });
      });
    },
  },
};
</script>
